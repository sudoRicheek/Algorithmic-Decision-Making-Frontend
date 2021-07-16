import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-dialogContentReminder',
  templateUrl: './dialogContentReminder.component.html',
  styleUrls: ['./dialogContentReminder.component.css'],
})
export class DialogContentReminderComponent {
  reminderRead: boolean;

  constructor(
    public router: Router,
    public storageService: StorageService,
    public workerService: WorkerService,
    ){
    this.reminderRead = false;
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
