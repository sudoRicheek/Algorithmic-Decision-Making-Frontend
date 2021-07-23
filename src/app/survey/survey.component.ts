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

  nextSection() {
    let localWorker = this.storageService.getWorker();
    if (localWorker) {
      this.workerService
        .submitSurveyResponses(
          localWorker,
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
