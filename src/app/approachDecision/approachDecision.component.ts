import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotAllowedHereComponent } from '../dialogs/notAllowedHere/notAllowedHere.component';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';
import { ChartType, ChartOptions } from 'chart.js';
import { MatSliderChange } from '@angular/material/slider';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-approachDecision',
  templateUrl: './approachDecision.component.html',
  styleUrls: ['./approachDecision.component.css'],
})
export class ApproachDecisionComponent implements OnInit {
  type_work: number;
  approachDecision: number;
  proposerTypes: string[];

  approachDecisionConfirmed: boolean;

  allocationSelected: number;

  alreadySubmitted: boolean;

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: ChartType;
  public pieChartOptions: ChartOptions;
  public pieChartColours: [{ backgroundColor: string[] }];

  constructor(
    private storageService: StorageService,
    private workerService: WorkerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.approachDecisionConfirmed = false;

    let localApproachDecisionSubmissions =
      this.storageService.getApproachDecisionSubmissions();
    if (localApproachDecisionSubmissions) {
      this.approachDecision =
        localApproachDecisionSubmissions['approachDecision'];
      this.allocationSelected =
        localApproachDecisionSubmissions['allocationSelected'];
      this.approachDecisionConfirmed = true;
    } else {
      let approachDecisionConfirmed =
        this.storageService.getApproachDecisionConfirmedSubmissions();
      if (approachDecisionConfirmed) {
        this.approachDecision = approachDecisionConfirmed;
        this.approachDecisionConfirmed = true;
      }
      this.allocationSelected = -1;
    }

    this.type_work = -1;
    this.proposerTypes = [
      'Human Proposer',
      'Human Proposer supported by an AI-system',
      'AI-system deciding on behalf of a Human Proposer',
    ];
    this.alreadySubmitted = this.storageService.isApproachDecisionSubmitted();

    // PIE CHART SETTINGS
    this.pieChartLabels = ['Proposer', 'Responder'];
    this.pieChartData = [500, 0];
    this.pieChartType = 'doughnut';
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        position: 'right',
        labels: {
          fontSize: 14,
        },
      },
    };
    this.pieChartColours = [
      {
        backgroundColor: ['#3700b3', '#f4511e'],
      },
    ];
  }

  ngOnInit() {
    let worker_id = this.storageService.getWorker();
    if (worker_id)
      this.workerService.getWorkerType(worker_id).subscribe(
        (response) => {
          this.type_work = response.type_work;
          if (this.type_work != 0) this.notAllowedHere();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  notAllowedHere() {
    const dialogRef = this.dialog.open(NotAllowedHereComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
    });
  }

  onInputChange(event: MatSliderChange) {
    this.pieChartData.length = 0;

    if (event.value != null) {
      this.pieChartData = [600 - event.value * 100, event.value * 100 - 100];
      this.allocationSelected = event.value
    }
  }

  submitDecision() {
    let formData: any;
    formData = {};
    let worker_id = this.storageService.getWorker();
    if (worker_id) {
      formData['worker_id'] = this.storageService.getWorker();
      formData['approach_decision'] = this.approachDecision;
      formData['minimum_offer'] = this.allocationSelected;

      this.workerService.submitWorkerDecisions(formData).subscribe(
        (response) => {
          console.log(response);
          this.alreadySubmitted = true;
          this.storageService.approachDecisionSubmitted();
          this.storageService.storeApproachDecisionSubmissions(
            this.approachDecision,
            this.allocationSelected
          );

          this.router.navigate(['postexperimental']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  confirmApproachDecision() {
    this.approachDecisionConfirmed = true;
    this.storageService.storeApproachDecisionConfirmedSubmissions(
      this.approachDecision
    );
  }

  nextSection() {
    this.router.navigate(['postexperimental']);
  }

  blankFn(value: number): string {
    return '';
  }
}
