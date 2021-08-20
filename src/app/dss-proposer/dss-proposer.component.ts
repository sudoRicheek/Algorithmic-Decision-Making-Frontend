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

  type_work: number;
  proposer_type: number;

  allocationSelected: number;

  progressmode: ProgressSpinnerMode = 'determinate';
  likelihoodRejection: number;
  likelihoodMaximumIncome: number;

  colSpan: number;
  rowHeight: string;
  chartColSpan: number;
  chartRowSpan: number;
  responseCardColSpan: number;
  responseCardRowSpan: number;
  referColSpan: number;
  referRowSpan: number;
  textColSpan: number;
  textRowSpan: number;
  submitColSpan: number;
  submitRowSpan: number;
  triggerBreakpoint: boolean;

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
    this.proposer_type = -1;
    this.type_work = -1;

    this.dssCalledOnce = false;
    this.dssSubmitted = false;
    this.allocationSentToDSS = -1;

    this.likelihoodRejection = 0.5;
    this.likelihoodMaximumIncome = 0.5;
    this.allocationSelected = -1;

    // PIE CHART SETTINGS
    this.chartLabels = ['Proposer', 'Responder'];
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
          this.type_work = response.type_work;
          this.proposer_type = response.proposer_type;
          if (this.type_work != 1) this.router.navigate(['/']);
        },
        (error) => {}
      );

    this.dssSubmitted = this.storageService.isDSSProposerSubmitted();
    let alloc = this.storageService.getDSSProposerAllocation();
    if (alloc) this.allocationSelected = alloc;

    if (this.allocationSelected == -1) this.chartData = [500, 0];
    else this.chartData = [600 - this.allocationSelected * 100, this.allocationSelected * 100 - 100];

    if (window.innerWidth <= 992) {
      this.colSpan = 5;
      this.chartColSpan = 5;
      this.chartRowSpan = 2;
      this.responseCardColSpan = 5;
      this.responseCardRowSpan = 2;
      this.referColSpan = 2;
      this.referRowSpan = 1;
      this.submitColSpan = 3;
      this.submitRowSpan = 1;
      this.rowHeight = '11:20';
      this.triggerBreakpoint = true;
    } else {
      this.colSpan = 5;
      this.chartColSpan = 3;
      this.chartRowSpan = 2;
      this.responseCardColSpan = 2;
      this.responseCardRowSpan = 4;
      this.textColSpan = 3;
      this.textRowSpan = 1;
      this.referColSpan = 1;
      this.referRowSpan = 1;
      this.submitColSpan = 2;
      this.submitRowSpan = 1;
      this.rowHeight = '1.75:1';
      this.triggerBreakpoint = false;
    }
  }

  onInputChange(event: MatSliderChange) {
    this.chartData.length = 0;

    if (event.value != null) {
      this.chartData = [600 - event.value * 100, event.value * 100 - 100];
      this.allocationSelected = event.value;
    }
  }

  submitToDSS() {
    let rejectionProbability: number[] = [96.4, 73, 13.5, 2.7, 0.9, 0];
    let maximizingProbability: number[] = [3.6, 23.4, 59.5, 10.8, 1.8, 0.9];
    this.dssCalledOnce = true;
    this.allocationSentToDSS = this.allocationSelected;

    this.likelihoodRejection =
      rejectionProbability[this.allocationSentToDSS - 1];
    this.likelihoodMaximumIncome =
      maximizingProbability[this.allocationSentToDSS - 1];
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

            this.router.navigate(['survey']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  nextSection() {
    if (this.dssSubmitted) this.router.navigate(['survey']);
  }

  onResize(event: any) {
    if (window.innerWidth <= 992) {
      this.colSpan = 5;
      this.chartColSpan = 5;
      this.chartRowSpan = 2;
      this.responseCardColSpan = 5;
      this.responseCardRowSpan = 2;
      this.referColSpan = 2;
      this.referRowSpan = 1;
      this.submitColSpan = 3;
      this.submitRowSpan = 1;
      this.rowHeight = '11:20';
      this.triggerBreakpoint = true;
    } else {
      this.colSpan = 5;
      this.chartColSpan = 3;
      this.chartRowSpan = 2;
      this.responseCardColSpan = 2;
      this.responseCardRowSpan = 4;
      this.referColSpan = 1;
      this.referRowSpan = 1;
      this.textColSpan = 3;
      this.textRowSpan = 1;
      this.submitColSpan = 2;
      this.submitRowSpan = 1;
      this.rowHeight = '1.75:1';
      this.triggerBreakpoint = false;
    }
  }
}
