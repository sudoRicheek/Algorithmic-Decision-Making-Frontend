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
  position: number;
  plarger: number;
  plower: number;
  p: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, plarger: 1.0, plower: 0.0, p: 0.0 },
  { position: 2, plarger: 0.9975, plower: 0.0975, p: 0.0975 },
  { position: 3, plarger: 0.99, plower: 0.19, p: 0.19 },
  { position: 4, plarger: 0.9775, plower: 0.2775, p: 0.2775 },
  { position: 5, plarger: 0.96, plower: 0.36, p: 0.36 },
  { position: 6, plarger: 0.9375, plower: 0.4375, p: 0.4375 },
  { position: 7, plarger: 0.91, plower: 0.51, p: 0.51 },
  { position: 8, plarger: 0.8775, plower: 0.5775, p: 0.5775 },
  { position: 9, plarger: 0.84, plower: 0.64, p: 0.64 },
  { position: 10, plarger: 0.7975, plower: 0.6975, p: 0.6975 },
  { position: 11, plarger: 0.75, plower: 0.75, p: 0.75 },
  { position: 12, plarger: 0.6975, plower: 0.7975, p: 0.7975 },
  { position: 13, plarger: 0.64, plower: 0.84, p: 0.84 },
  { position: 14, plarger: 0.5775, plower: 0.8775, p: 0.8775 },
  { position: 15, plarger: 0.51, plower: 0.91, p: 0.91 },
  { position: 16, plarger: 0.4375, plower: 0.9375, p: 0.9375 },
  { position: 17, plarger: 0.36, plower: 0.96, p: 0.96 },
  { position: 18, plarger: 0.2775, plower: 0.9775, p: 0.9775 },
  { position: 19, plarger: 0.19, plower: 0.99, p: 0.99 },
  { position: 20, plarger: 0.0975, plower: 0.9975, p: 0.9975 },
  { position: 21, plarger: 0.0, plower: 1.0, p: 1.0 },
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
  displayedColumns: string[] = ['position', 'plarger', 'plower', 'p'];
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
    this.proposerType = [
      'Human',
      'Human Proposer supported by an AI-system',
      'AI-system deciding on behalf of a Human Proposer',
    ];
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
            localStoredBeliefs = new Array(this.lenlist).fill('');

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
      if (this.type_work == 0) this.router.navigate(['approachdecisionreminder']);
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
    if (this.type_work == 0) this.router.navigate(['approachdecisionreminder']);
    else if (this.type_work == 1) this.router.navigate(['postexperimental']);
  }
}
