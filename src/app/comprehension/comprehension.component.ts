import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComprehensionAlreadyAttemptedComponent } from '../dialogs/comprehensionAlreadyAttempted/comprehensionAlreadyAttempted.component';
import { ComprehensionSubmitDialogComponent } from '../dialogs/comprehensionSubmitDialog/comprehensionSubmitDialog.component';
import { ComprehensionTryAgainComponent } from '../dialogs/comprehensionTryAgain/comprehensionTryAgain.component';
import { DialogNoWorkerFoundComponent } from '../dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import {
  DialogAttentionFail,
  DialogAttentionNoAttempt,
} from '../instructions/instructions.component';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-comprehension',
  templateUrl: './comprehension.component.html',
  styleUrls: ['./comprehension.component.css'],
})
export class ComprehensionComponent implements OnInit {
  questions: any;
  formData: any;
  comprehensionSubmitted: boolean;
  comprehensionSectionPassed: boolean;
  comprehensionFailedTimes: number;
  typeWorkAssigned: number;

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.questions = [];
    this.comprehensionSubmitted =
      this.storageService.isComprehensionSubmitted();
    this.comprehensionSectionPassed = false;
    this.typeWorkAssigned = -1;
  }

  ngOnInit() {
    this.getComprehensionQuestions();
  }

  getComprehensionQuestions() {
    this.questionService.getComprehensionQuestions().subscribe(
      (response) => {
        this.questions = response.questions;

        let localComprehensionSubmissions =
          this.storageService.getComprehensionSubmissions();

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

  postComprehensionAnswers() {
    this.formData = {};
    this.formData['worker_id'] = this.storageService.getWorker();

    this.formData['answers'] = [];

    this.questions.forEach((question: { id: any; answerSelected: any }) => {
      this.formData.answers.push({
        q_id: question.id,
        c_id: question.answerSelected,
      });
    });

    this.questionService.postComprehensionAnswers(this.formData).subscribe(
      (response) => {
        console.log(response);

        this.comprehensionSubmitted = response.comprehension_all_attempted;
        this.comprehensionSectionPassed = response.comprehension_passed;
        this.comprehensionFailedTimes = response.comprehension_failed_times;
        this.typeWorkAssigned = response.type_work;

        if (this.comprehensionSectionPassed) {
          this.storageService.storeComprehensionSubmissions(
            this.formData['answers']
          );
          this.comprehensionSubmissionDialog();
          this.router.navigate(['reminder']);
        } else if (this.comprehensionFailedTimes >= 2) {
          this.comprehensionSubmissionDialog();
          this.storageService.setFailed();
          this.router.navigate(['/']);
        } else this.comprehensionTryAgain();
      },
      (errors) => {
        console.log(errors);
        // if (errors.error.status == 'attentionNoAttempt')
        //   this.attentionNoAttempt();
        // else if (errors.error.status == 'attentionFailed')
        //   this.attentionFailed();
        // else if (errors.error.status == 'alreadyAttempted') {
        //   this.storageService.comprehensionSubmitted();
        //   this.comprehensionSubmitted = true;
        //   this.alreadyAttempted();
        // }
      }
    );
    console.log(this.formData);
  }

  nextSection() {
    this.router.navigate(['reminder']);
  }

  comprehensionTryAgain() {
    const dialogRef = this.dialog.open(ComprehensionTryAgainComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  attentionNoAttempt() {
    const dialogRef = this.dialog.open(DialogAttentionNoAttempt);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['attentioncheck']);
    });
  }

  attentionFailed() {
    const dialogRef = this.dialog.open(DialogAttentionFail);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
    });
  }

  alreadyAttempted() {
    const dialogRef = this.dialog.open(ComprehensionAlreadyAttemptedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['reminder']);
    });
  }

  comprehensionSubmissionDialog() {
    this.dialog.open(ComprehensionSubmitDialogComponent, {
      data: {
        comprehensionSectionPassed: this.comprehensionSectionPassed,
        typeWorkAssigned: this.typeWorkAssigned == 0 ? 'Responder' : 'Proposer',
      },
      panelClass: this.comprehensionSectionPassed
        ? 'comprehension-submit-passed-dialog'
        : 'comprehension-submit-failed-dialog',
    });
  }
}
