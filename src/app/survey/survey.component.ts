import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  trustauto: number[];
  likertOptions: string[];

  respondersTakeDSSForDecidingProposer: number; // 0 is false, 1 is true
  whichProposerYouChooseToBe: number;
  asAResponderWhichProposerWouldYouApproach: number;
  proposerMostRespondersApproach: number;
  iThinkResponders: number[];

  sex: string;
  age: number;
  employmentStatus: string;
  highestDegree: string;

  sexOptions: string[];
  employmentOptions: string[];
  degreeOptions: string[];
  proposerTypes: string[];
  otherlikertOptions: string[];

  proposerType: number;

  constructor(
    private workerService: WorkerService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.trustauto = new Array(19).fill(-1);

    this.likertOptions = [
      'Strongly disagree',
      'Rather disagree',
      'Neither disagree nor agree',
      'Rather agree',
      'Strongly agree',
      'No response',
    ];

    this.otherlikertOptions = [
      'Strongly Disagree',
      'Disagree',
      'Somewhat Disagree',
      'Neutral',
      'Somewhat Agree',
      'Agree',
      'Strongly Agree',
    ];

    this.sexOptions = ['Male', 'Female', 'Non-Binary'];
    this.employmentOptions = [
      'Working (paid employee)',
      'Working (self-employed)',
      'Not working (temporary layoff from a job)',
      'Not working (looking for work)',
      'Not working (retired)',
      'Not working (disabled)',
      'Not working (other)',
      'Prefer not to answer',
    ];
    this.degreeOptions = [
      'Less than high school degree',
      'High school graduate (high school diploma or equivalent including GED)',
      'Some college but no degree',
      'Associate degree in college (2-year)',
      'Bachelor’s degree in college (4-year)',
      'Master’s degree',
      'Doctoral degree',
      'Professional degree (JD, MD)',
    ];
    this.proposerTypes = [
      'Human Proposer',
      'Human Proposer supported by an AI-system',
      'AI-system deciding on behalf of a Human Proposer',
    ];

    this.sex = '';
    this.employmentStatus = '';
    this.highestDegree = '';

    this.respondersTakeDSSForDecidingProposer = -1;
    this.whichProposerYouChooseToBe = -1;
    this.asAResponderWhichProposerWouldYouApproach = -1;
    this.proposerMostRespondersApproach = -1;
    this.iThinkResponders = new Array(2).fill(-1);

    this.proposerType = -1;
  }

  ngOnInit() {
    let localWorker = this.storageService.getWorker();
    if (localWorker) {
      this.workerService.getWorkerType(localWorker).subscribe(
        (response) => {
          this.proposerType = response.proposer_type;
        },
        (errors) => {
          console.log(errors);
        }
      );
    }
  }

  showElementTrustAuto(): boolean {
    return this.trustauto.some((item) => item == -1);
  }

  secondPageButton(): boolean {
    return (
      this.respondersTakeDSSForDecidingProposer == -1 ||
      this.whichProposerYouChooseToBe == -1 ||
      this.asAResponderWhichProposerWouldYouApproach == -1 ||
      this.proposerMostRespondersApproach == -1 ||
      this.iThinkResponders.some((item) => item == -1)
    );
  }

  showElementDemo(): boolean {
    return (
      this.sex == '' ||
      this.employmentStatus == '' ||
      this.highestDegree == '' ||
      this.age < 1
    );
  }

  nextSection() {
    let localWorker = this.storageService.getWorker();
    if (localWorker) {
      this.workerService
        .submitSurveyResponses(
          localWorker,
          this.trustauto,
          this.respondersTakeDSSForDecidingProposer,
          this.whichProposerYouChooseToBe,
          this.asAResponderWhichProposerWouldYouApproach,
          this.proposerMostRespondersApproach,
          this.iThinkResponders,
          this.sex,
          this.age,
          this.employmentStatus,
          this.highestDegree
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['uniquecode']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
