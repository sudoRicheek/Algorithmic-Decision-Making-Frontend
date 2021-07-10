import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-dss-proposer',
  templateUrl: './dss-proposer.component.html',
  styleUrls: ['./dss-proposer.component.css'],
})
export class DssProposerComponent implements OnInit {
  dssCalledOnce: boolean;
  dssSubmitted: boolean;
  allocationSentToDSS: number;

  allocationSelected: number;

  progressmode: ProgressSpinnerMode = 'determinate';
  likelihoodAcceptanceValue: number;
  likelihoodMaximumIncome: number;

  public chartLabels: string[];
  public chartData: number[];
  public chartType: ChartType;
  public chartOptions: ChartOptions;
  public chartColours: [{ backgroundColor: string[] }];

  constructor(
    private storageService: StorageService,
    private questionService: QuestionService,
    private workerService: WorkerService,
    private router: Router
  ) {
    this.dssCalledOnce = false;
    this.dssSubmitted = false;
    this.allocationSentToDSS = -1;

    this.likelihoodAcceptanceValue = 0.5;
    this.likelihoodMaximumIncome = 0.5;
    this.allocationSelected = 2;

    // PIE CHART SETTINGS
    this.chartLabels = ['Proposer', 'Responder'];
    this.chartData = [
      24 - this.allocationSelected * 4,
      this.allocationSelected * 4 - 4,
    ];
    this.chartType = 'doughnut';
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        position: 'right',
        labels: {
          fontSize: 14,
        },
      },
    };
    this.chartColours = [
      {
        backgroundColor: ['#3700b3', '#f4511e'],
      },
    ];
  }

  ngOnInit() {
    let localWorker = this.storageService.getWorker();
    if (localWorker)
      this.workerService.getWorkerType(localWorker).subscribe(
        (response) => {
          let type_work = response.type_work;
          if (type_work != 1) this.router.navigate(['/']);
        },
        (error) => {}
      );

    this.dssSubmitted = this.storageService.isDSSProposerSubmitted();
    let alloc = this.storageService.getDSSProposerAllocation();
    if (alloc) this.allocationSelected = alloc;
  }

  onInputChange(event: MatSliderChange) {
    this.chartData.length = 0;

    if (event.value != null) {
      this.chartData = [24 - event.value * 4, event.value * 4 - 4];
    }
  }

  submitToDSS() {
    this.dssCalledOnce = true;
    this.allocationSentToDSS = this.allocationSelected;

    this.questionService.getDSSResponse(this.allocationSentToDSS).subscribe(
      (response) => {
        this.likelihoodAcceptanceValue = response.likelihoodAcceptanceValue;
        this.likelihoodMaximumIncome = response.likelihoodMaximumIncome;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitFinally() {
    let localWorker = this.storageService.getWorker();
    if (localWorker) {
      this.workerService
        .submitDSSProposerResponse(localWorker, this.allocationSelected)
        .subscribe(
          (response) => {
            this.dssSubmitted = true;
            this.storageService.storeDSSProposerData(
              response.allocationSubmitted
            );
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  nextSection() {
    if (this.dssSubmitted) this.router.navigate(['beliefelicitation']);
  }
}
