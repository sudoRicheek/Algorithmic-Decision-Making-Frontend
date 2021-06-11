import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComprehensionAlreadyAttemptedComponent } from '../dialogs/comprehensionAlreadyAttempted/comprehensionAlreadyAttempted.component';
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

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.questions = [];
    this.comprehensionSubmitted =
      this.storageService.isComprehensionSubmitted();
  }

  ngOnInit() {
    this.getComprehensionQuestions();
    if (!this.storageService.getWorker()) this.noWorkerFound();
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
    if (!this.formData['worker_id']) {
      this.noWorkerFound();
    }

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
        console.log();
        this.storageService.storeComprehensionSubmissions(
          this.formData['answers']
        );
        this.comprehensionSubmitted = true;
      },
      (errors) => {
        console.log(errors);
        if (errors.error.status == 'attentionNoAttempt') this.attentionNoAttempt();
        else if (errors.error.status == 'attentionFailed') this.attentionFailed();
        else if (errors.error.status == 'alreadyAttempted') {
          this.storageService.comprehensionSubmitted();
          this.comprehensionSubmitted = true;
          this.alreadyAttempted();
        }
      }
    );
    console.log(this.formData);
  }

  nextSection() {
    this.router.navigate(['reminder']);
  }

  noWorkerFound() {
    const dialogRef = this.dialog.open(DialogNoWorkerFoundComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
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
}
