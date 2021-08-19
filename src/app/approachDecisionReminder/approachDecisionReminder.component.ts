import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-approachDecisionReminder',
  templateUrl: './approachDecisionReminder.component.html',
  styleUrls: ['./approachDecisionReminder.component.css'],
})
export class ApproachDecisionReminderComponent implements OnInit {
  proposer_type: number;

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private storageService: StorageService
  ) {
    this.proposer_type = -1;
  }

  ngOnInit() {
    let localworker = this.storageService.getWorker();
    if (localworker) {
      this.workerService.getWorkerType(localworker).subscribe(
        (response) => {
          this.proposer_type = response.proposer_type;
          if (this.proposer_type == -1) {
            this.router.navigate(['/']);
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    }
  }

  nextSection() {
    this.router.navigate(['dssproposer']);
  }
}
