import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComprehensionAlreadyAttemptedComponent } from '../dialogs/comprehensionAlreadyAttempted/comprehensionAlreadyAttempted.component';
import { ComprehensionBeliefPassedComponent } from '../dialogs/comprehensionBeliefPassed/comprehensionBeliefPassed.component';
import { ComprehensionTryAgainComponent } from '../dialogs/comprehensionTryAgain/comprehensionTryAgain.component';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

export interface ReducedData {
  position: any;
  plarger: any;
  plower: any;
  p: any;
}

const ReducedDataSource: ReducedData[] = [
  { position: 1, plarger: 1.0, plower: 0.0, p: 0.0 },
  { position: 2, plarger: 0.9975, plower: 0.0975, p: 0.0975 },
  { position: 3, plarger: 0.99, plower: 0.19, p: 0.19 },
  { position: "...", plarger: "...", plower: "...", p: "..." },
  { position: 19, plarger: 0.19, plower: 0.99, p: 0.99 },
  { position: 20, plarger: 0.0975, plower: 0.9975, p: 0.9975 },
  { position: 21, plarger: 0.0, plower: 1.0, p: 1.0 },
];

@Component({
  selector: 'app-comp-belief',
  templateUrl: './comp-belief.component.html',
  styleUrls: ['./comp-belief.component.css'],
})
export class CompBeliefComponent implements OnInit {
  displayedColumns: string[] = ['position', 'plarger', 'plower', 'p'];
  dataSourceReduced = ReducedDataSource;

  questions: any;
  formData: any;
  comprehensionBeliefSubmitted: boolean;
  comprehensionBeliefSectionPassed: boolean;
  comprehensionBeliefFailedTimes: number;
  typeWorkAssigned: number;

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService,
    private workerService: WorkerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.questions = [];
    this.comprehensionBeliefSubmitted =
      this.storageService.isComprehensionBeliefSubmitted();
    this.comprehensionBeliefSectionPassed = false;
    this.typeWorkAssigned = -1;
  }

  ngOnInit() {
    this.getComprehensionBeliefQuestions();
  }

  getComprehensionBeliefQuestions() {
    this.questionService.getComprehensionBeliefQuestions().subscribe(
      (response) => {
        this.questions = response.questions;

        let localComprehensionSubmissions =
          this.storageService.getComprehensionBeliefSubmissions();

        this.questions.forEach(
          (question: {
            id: any;
            answerSelected: any;
            choices: { id: any }[];
          }) => {
            if (
              localComprehensionSubmissions &&
              localComprehensionSubmissions.hasOwnProperty(question.id)
            )
              question.answerSelected =
                localComprehensionSubmissions[question.id];
            else question.answerSelected = question.choices[0].id;
          }
        );
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postComprehensionBeliefAnswers() {
    this.formData = {};
    this.formData['worker_id'] = this.storageService.getWorker();

    this.formData['answers'] = [];

    this.questions.forEach((question: { id: any; answerSelected: any }) => {
      this.formData.answers.push({
        q_id: question.id,
        c_id: question.answerSelected,
      });
    });

    this.questionService
      .postComprehensionBeliefAnswers(this.formData)
      .subscribe(
        (response) => {
          console.log(response);

          this.comprehensionBeliefSubmitted =
            response.comprehension_belief_all_attempted;
          this.comprehensionBeliefFailedTimes =
            response.comprehension_belief_failed_times;
          this.comprehensionBeliefSectionPassed =
            response.comprehension_belief_passed;

          this.typeWorkAssigned = response.type_work;

          if (this.comprehensionBeliefSectionPassed) {
            this.storageService.storeComprehensionBeliefSubmissions(
              this.formData['answers']
            );
            this.comprehensionBeliefSubmitDialog();
            if (this.typeWorkAssigned == 0)
              this.router.navigate(['beliefelicitation']);
            else if (this.typeWorkAssigned == 1)
              this.router.navigate(['dssproposer']);
            else if (this.typeWorkAssigned == -1) this.router.navigate(['/']);
          } else if (this.comprehensionBeliefFailedTimes >= 2) {
            this.comprehensionBeliefSubmitDialog();
            this.storageService.setFailed();
            this.router.navigate(['/']);
          } else this.comprehensionTryAgain();
        },
        (errors) => {
          console.log(errors);
          if (errors.error.status == 'alreadyAttempted') {
            this.storageService.comprehensionSubmitted();
            this.comprehensionBeliefSubmitted = true;
            this.alreadyAttempted();
          } else {
            this.router.navigate(['/']);
          }
        }
      );
    console.log(this.formData);
  }

  comprehensionTryAgain() {
    const dialogRef = this.dialog.open(ComprehensionTryAgainComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  alreadyAttempted() {
    const dialogRef = this.dialog.open(ComprehensionAlreadyAttemptedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
    });
  }

  comprehensionBeliefSubmitDialog() {
    this.dialog.open(ComprehensionBeliefPassedComponent, {
      data: {
        comprehensionSectionPassed: this.comprehensionBeliefSectionPassed,
      },
      panelClass: this.comprehensionBeliefSectionPassed
        ? 'comprehension-submit-passed-dialog'
        : 'comprehension-submit-failed-dialog',
    });
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

  goToInstructions() {
    this.router.navigate(['reminder']);
  }
}
