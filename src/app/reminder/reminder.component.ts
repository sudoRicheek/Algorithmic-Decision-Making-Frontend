import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComprehensionFailComponent } from '../dialogs/comprehensionFail/comprehensionFail.component';
import { ComprehensionNoAttemptComponent } from '../dialogs/comprehensionNoAttempt/comprehensionNoAttempt.component';
import { DialogContentReminderComponent } from '../dialogs/dialogContentReminder/dialogContentReminder.component';
import { DialogNoWorkerFoundComponent } from '../dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

export interface PeriodicElement {
  position: number;
  plarger: number;
  plower: number;
  p: number;
}

export interface ReducedData {
  position: any;
  plarger: any;
  plower : any;
  p: any;
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

const ReducedDataSource: ReducedData[] = [
  { position: 1, plarger: 1.0, plower: 0.0, p: 0.0 },
  { position: 2, plarger: 0.9975, plower: 0.0975, p: 0.0975 },
  { position: 3, plarger: 0.99, plower: 0.19, p: 0.19 },
  { position: "...", plarger: "...", plower: "...", p: "..." },
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
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
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

  dataSourceReduced = ReducedDataSource;

  comprehensionAttempted: boolean;
  comprehensionPassed: boolean;

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {
    this.comprehensionAttempted = false;
    this.comprehensionPassed = false;
  }

  ngOnInit() {
    let worker_id = this.storageService.getWorker();
    if (worker_id) {
      this.workerService.getComprehensionResults(worker_id).subscribe(
        (response) => {
          this.comprehensionPassed = response.passed;
          this.comprehensionAttempted = response.attempted;
          if (!this.comprehensionAttempted) {
            this.comprehensionNoAttempt();
            this.router.navigate(['comprehension']);
          } else if (!this.comprehensionPassed) {
            this.comprehensionFail();
            this.router.navigate(['/']);
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    }
  }

  openReminder() {
    const dialogRef = this.dialog.open(DialogContentReminderComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  comprehensionNoAttempt() {
    const dialogRef = this.dialog.open(ComprehensionNoAttemptComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  comprehensionFail() {
    const dialogRef = this.dialog.open(ComprehensionFailComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  nextSection() {
    let localWorker = this.storageService.getWorker();
    let type_work: number;
    if (localWorker) {
      this.workerService.getWorkerType(localWorker).subscribe(
        (response) => {
          type_work = response.type_work;
          if (type_work == 0) this.router.navigate(['beliefelicitation']);
          else if (type_work == 1) this.router.navigate(['dssproposer']);
          else if (type_work == -1) this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
