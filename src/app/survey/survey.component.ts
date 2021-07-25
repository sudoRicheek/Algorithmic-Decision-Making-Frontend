import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  SVO: number[];
  Nr: number[]; // Negative Reciprocity
  likertOptions: string[];

  sex: string;
  age: number;
  employmentStatus: string;
  highestDegree: string;

  sexOptions: string[];
  employmentOptions: string[];
  degreeOptions: string[];

  constructor(
    private workerService: WorkerService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.Nr = new Array(9).fill(-1);
    this.SVO = new Array(6).fill(-1);

    this.likertOptions = [
      'Very untrue of me',
      'Untrue of me',
      'Somewhat untrue of me',
      'Neutral',
      'Somewhat true of me',
      'True of me',
      'Very true of me',
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

    this.sex = '';
    this.employmentStatus = '';
    this.highestDegree = '';
  }

  ngOnInit() {}

  showElementNr(): boolean {
    return this.Nr.some((item) => item == -1);
  }

  showElementDemo(): boolean {
    return (
      this.sex == '' ||
      this.employmentStatus == '' ||
      this.highestDegree == '' ||
      this.age < 1
    );
  }

  showElementSVO(): boolean {
    return this.SVO.some((item) => item == -1);
  }

  q1Label(value: number) {
    let qlabels = [
      '85:85',
      '85:76',
      '85:68',
      '85:59',
      '85:50',
      '85:41',
      '85:33',
      '85:24',
      '85:15',
    ];
    return qlabels[value - 1];
  }

  q2Label(value: number) {
    let qlabels = [
      '85:15',
      '87:19',
      '89:24',
      '91:28',
      '93:33',
      '94:37',
      '96:41',
      '98:46',
      '100:50',
    ];
    return qlabels[value - 1];
  }

  q3Label(value: number) {
    let qlabels = [
      '50:100',
      '54:98',
      '59:96',
      '63:94',
      '68:93',
      '72:91',
      '76:89',
      '81:87',
      '85:85',
    ];
    return qlabels[value - 1];
  }

  q4Label(value: number) {
    let qlabels = [
      '50:100',
      '54:89',
      '59:79',
      '63:68',
      '68:58',
      '72:47',
      '76:36',
      '81:26',
      '85:15',
    ];
    return qlabels[value - 1];
  }

  q5Label(value: number) {
    let qlabels = [
      '100:50',
      '94:56',
      '88:63',
      '81:69',
      '75:75',
      '69:81',
      '63:88',
      '56:94',
      '50:100',
    ];
    return qlabels[value - 1];
  }

  q6Label(value: number) {
    let qlabels = [
      '100:50',
      '98:54',
      '96:59',
      '94:63',
      '93:68',
      '91:72',
      '89:76',
      '87:81',
      '85:85',
    ];
    return qlabels[value - 1];
  }

  nextSection() {
    let localWorker = this.storageService.getWorker();
    if (localWorker) {
      this.workerService
        .submitSurveyResponses(
          localWorker,
          this.SVO,
          this.Nr,
          this.sex,
          this.age,
          this.employmentStatus,
          this.highestDegree
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['instructions']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
