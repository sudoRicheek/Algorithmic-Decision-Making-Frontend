import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

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
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  attentionAttempted: boolean;
  attentionPassed: boolean;

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

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {
    this.attentionAttempted = false;
    this.attentionPassed = false;
  }

  ngOnInit() {
    let worker_id = this.storageService.getWorker();
    if (worker_id) {
      this.workerService.getAttentionResults(worker_id).subscribe(
        (response) => {
          this.attentionPassed = response.passed;
          this.attentionAttempted = response.attempted;
          if (!this.attentionAttempted) {
            this.attentionNoAttempt();
            this.router.navigate(['attentioncheck']);
          } else if (!this.attentionPassed) {
            this.attentionFail();
            this.router.navigate(['/']);
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    }
  }

  openInstructions() {
    const dialogRef = this.dialog.open(DialogContentInstructions);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  attentionNoAttempt() {
    const dialogRef = this.dialog.open(DialogAttentionNoAttempt);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  attentionFail() {
    const dialogRef = this.dialog.open(DialogAttentionFail);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  nextSection() {
    this.router.navigate(['comprehension']);
  }
}

@Component({
  selector: 'dialog-content-instructions',
  templateUrl: 'dialog-content-instructions.html',
})
export class DialogContentInstructions {
  instructionsRead: boolean;

  constructor(public router: Router) {
    this.instructionsRead = false;
  }

  nextSection() {
    this.router.navigate(['comprehension']);
  }
}

@Component({
  selector: 'dialog-attention-noattempt',
  templateUrl: 'dialog-attention-noattempt.html',
})
export class DialogAttentionNoAttempt {}

@Component({
  selector: 'dialog-attention-fail',
  templateUrl: 'dialog-attention-fail.html',
})
export class DialogAttentionFail {}
