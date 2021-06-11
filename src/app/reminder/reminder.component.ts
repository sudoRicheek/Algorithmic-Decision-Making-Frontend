import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComprehensionFailComponent } from '../dialogs/comprehensionFail/comprehensionFail.component';
import { ComprehensionNoAttemptComponent } from '../dialogs/comprehensionNoAttempt/comprehensionNoAttempt.component';
import { DialogContentReminderComponent } from '../dialogs/dialogContentReminder/dialogContentReminder.component';
import { DialogNoWorkerFoundComponent } from '../dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
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
    if (!worker_id) this.noWorkerFound();
    else {
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

  noWorkerFound() {
    const dialogRef = this.dialog.open(DialogNoWorkerFoundComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
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
    this.router.navigate(['beliefelicitation']);
  }
}
