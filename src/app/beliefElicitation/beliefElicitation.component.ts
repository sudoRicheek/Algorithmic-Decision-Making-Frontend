import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComprehensionFailComponent } from '../dialogs/comprehensionFail/comprehensionFail.component';
import { ComprehensionNoAttemptComponent } from '../dialogs/comprehensionNoAttempt/comprehensionNoAttempt.component';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { BeliefAlreadyAttemptedComponent } from '../dialogs/beliefAlreadyAttempted/beliefAlreadyAttempted.component';
import { NotAllowedHereComponent } from '../dialogs/notAllowedHere/notAllowedHere.component';
import { BeliefElicitationSubmittedComponent } from '../dialogs/beliefElicitationSubmitted/beliefElicitationSubmitted.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface AllocationTable {
  name: string;
  al1: number;
  al2: number;
  al3: number;
  al4: number;
  al5: number;
  al6: number;
}

const ALLOCATION_DATA: AllocationTable[] = [
  { name: 'Proposer', al1: 20, al2: 16, al3: 12, al4: 8, al5: 4, al6: 0 },
  { name: 'Responder', al1: 0, al2: 4, al3: 8, al4: 12, al5: 16, al6: 20 },
];

@Component({
  selector: 'app-beliefElicitation',
  templateUrl: './beliefElicitation.component.html',
  styleUrls: ['./beliefElicitation.component.css'],
})
export class BeliefElicitationComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  allocationColumns: string[] = [
    'name',
    'al1',
    'al2',
    'al3',
    'al4',
    'al5',
    'al6',
  ];
  allocationDataSource = ALLOCATION_DATA;

  lenlist: number;
  listnums: number[];
  questionsFormArray = new FormArray([]);
  beliefSubmitted: boolean;

  comprehension_all_attempted: number;
  comprehension_passed: number;
  type_work: number;
  type_work_name: string;

  proposerType: string[];

  constructor(
    private storageService: StorageService,
    private workerService: WorkerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.type_work_name = '';
    this.proposerType = ['Human', 'Human + DSS', 'Autonomous Agent'];
    this.beliefSubmitted = this.storageService.isBeliefElicitationSubmitted();
  }

  ngOnInit() {
    this.workerService
      .getWorkerType(this.storageService.getWorker()!)
      .subscribe(
        (response) => {
          this.type_work = response.type_work;
          this.comprehension_all_attempted =
            response.comprehension_all_attempted;
          this.comprehension_passed = response.comprehension_passed;

          if (this.type_work == 0) {
            this.type_work_name = 'Responder';
            this.lenlist = 18;
            this.listnums = new Array(18).fill(0).map((x, i) => i);
          } else if (this.type_work == 1) {
            this.type_work_name = 'Proposer';
            this.lenlist = 6;
            this.listnums = new Array(6).fill(0).map((x, i) => i);
          } else if (this.type_work == -1) {
            this.typeWorkNotAssignedDialog();
            this.router.navigate(['/']);
          }

          let localStoredBeliefs =
            this.storageService.getBeliefElicitationSubmissions();
          if (!localStoredBeliefs)
            localStoredBeliefs = new Array(this.lenlist).fill(1);

          this.listnums.forEach((i) =>
            this.questionsFormArray.push(
              new FormControl(localStoredBeliefs[i], [
                Validators.required,
                Validators.min(1),
                Validators.max(21),
              ])
            )
          );
          console.log(this.listnums);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  typeWorkNotAssignedDialog() {
    if (!this.comprehension_all_attempted) {
      const dialogRef = this.dialog.open(ComprehensionNoAttemptComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        this.router.navigate(['comprehension']);
      });
    } else if (!this.comprehension_passed) {
      const dialogRef = this.dialog.open(ComprehensionFailComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        this.router.navigate(['/']);
      });
    }
  }

  submitBeliefs() {
    if (this.questionsFormArray.status == 'VALID') {
      let predictions = new Array();
      this.questionsFormArray.value.forEach((element: number) => {
        predictions.push(element);
      });
      this.beliefSubmitted = true;
      let worker_id = this.storageService.getWorker();
      if (worker_id)
        this.workerService
          .submitWorkerBeliefs(worker_id, predictions)
          .subscribe(
            (response) => {
              console.log(response);
              this.beliefSubmitted = true;
              this.storageService.beliefElicitationSubmitted();
              this.storageService.storeBeliefElicitationSubmissions(
                predictions
              );
              this.beliefsSubmitted();

              this.type_work = response.type_work;
              if (this.type_work == 0)
                this.router.navigate(['approachdecision']);
              else if (this.type_work == 1)
                this.router.navigate(['postexperimental']);
            },
            (error) => {
              if (error.error.status == 'alreadyAttempted')
                this.alreadyAttempted();
              else if (error.error.status == 'forbidden') this.notAllowedHere();
              console.log(error);
            }
          );
    }
  }

  alreadyAttempted() {
    const dialogRef = this.dialog.open(BeliefAlreadyAttemptedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (this.type_work == 0) this.router.navigate(['approachdecision']);
      else if (this.type_work == 1) this.router.navigate(['postexperimental']);
    });
  }

  beliefsSubmitted() {
    const dialogRef = this.dialog.open(BeliefElicitationSubmittedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  notAllowedHere() {
    const dialogRef = this.dialog.open(NotAllowedHereComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
    });
  }

  nextSection() {
    if (this.type_work == 0) this.router.navigate(['approachdecision']);
    else if (this.type_work == 1) this.router.navigate(['postexperimental']);
  }
}
