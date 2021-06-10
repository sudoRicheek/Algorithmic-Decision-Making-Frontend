import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private workerService: WorkerService
  ) {}

  ngOnInit() {
    const worker_id = this.route.snapshot.queryParamMap.get('worker_id');
    console.log(worker_id);
    if (worker_id != null && worker_id != this.storage.getWorker()) {
      this.storage.addWorker(worker_id);
      this.workerService.addWorker(worker_id).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (worker_id == null && this.storage.getWorker() == null) {
      alert('Worker not found');
    }
    console.log(this.storage.getWorker());
  }

  attentionCheckPage() {
    this.router.navigate(['/attentioncheck']);
  }
}
