import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNoWorkerFoundComponent } from '../dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  attentionAttempted: boolean;
  attentionPassed: boolean;

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
