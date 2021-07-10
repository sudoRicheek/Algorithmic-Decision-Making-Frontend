import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AttentionAlreadyAttemptedComponent } from '../dialogs/attentionAlreadyAttempted/attentionAlreadyAttempted.component';
import { AttentionSucessfullySubmittedComponent } from '../dialogs/attentionSucessfullySubmitted/attentionSucessfullySubmitted.component';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-attentioncheck',
  templateUrl: './attentioncheck.component.html',
  styleUrls: ['./attentioncheck.component.css'],
})
export class AttentioncheckComponent implements OnInit {
  questions: any;
  formData: any;
  alreadySubmitted: boolean;
  attentionPassed: boolean;

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.questions = [];
    this.alreadySubmitted = this.storageService.isAttentionSubmitted();
    this.attentionPassed = false;
  }

  ngOnInit() {
    this.getAttentionQuestions();
  }

  getAttentionQuestions() {
    this.questionService.getAttentionCheckQuestions().subscribe(
      (response) => {
        this.questions = response.questions;

        let localAttentionSubmissions =
          this.storageService.getAttentionSubmissions();

        this.questions.forEach(
          (question: {
            id: any;
            answerSelected: any;
            choices: { id: any }[];
          }) => {
            if (
              localAttentionSubmissions &&
              localAttentionSubmissions.hasOwnProperty(question.id)
            )
              question.answerSelected = localAttentionSubmissions[question.id];
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

  postAttentionAnswers() {
    this.formData = {};
    this.formData['worker_id'] = this.storageService.getWorker();

    this.formData['answers'] = [];

    this.questions.forEach((question: { id: any; answerSelected: any }) => {
      this.formData.answers.push({
        q_id: question.id,
        c_id: question.answerSelected,
      });
    });

    this.questionService.postAttentionAnswers(this.formData).subscribe(
      (response) => {
        console.log(response);
        this.storageService.storeAttentionSubmissions(this.formData['answers']);
        this.alreadySubmitted = true;
        this.attentionPassed = response['attention_passed'];
        this.attentionSubmissionDialog();
      },
      (errors) => {
        console.log(errors);
        if (errors.error.status == 'alreadyAttempted') {
          this.alreadyAttempted();
          this.storageService.attentionSubmitted();
          this.alreadySubmitted = true;
        }
      }
    );
    console.log(this.formData);
  }

  alreadyAttempted() {
    const dialogRef = this.dialog.open(AttentionAlreadyAttemptedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['instructions']);
    });
  }

  attentionSubmissionDialog() {
    this.dialog.open(AttentionSucessfullySubmittedComponent, {
      data: {
        attentionSectionPassed: this.attentionPassed,
      },
    });
  }

  nextSection() {
    this.router.navigate(['instructions']);
  }
}
