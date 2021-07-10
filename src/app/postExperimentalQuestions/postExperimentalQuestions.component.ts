import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotAllowedHereComponent } from '../dialogs/notAllowedHere/notAllowedHere.component';
import { PostExperimentalSubmissionComponent } from '../dialogs/postExperimentalSubmission/postExperimentalSubmission.component';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-postExperimentalQuestions',
  templateUrl: './postExperimentalQuestions.component.html',
  styleUrls: ['./postExperimentalQuestions.component.css'],
})
export class PostExperimentalQuestionsComponent implements OnInit {
  questions: any;
  postExperimentalSubmitted: boolean;
  typeWorkAssigned: number;

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.questions = [];
    this.postExperimentalSubmitted = this.storageService.isPostExperimentalSubmitted();
    this.typeWorkAssigned = -1;
  }

  ngOnInit() {
    this.getPostExperimentalQuestions();
  }

  getPostExperimentalQuestions() {
    let worker_id = this.storageService.getWorker();
    if (worker_id) {
      this.questionService.getPostExperimentalQuestions(worker_id).subscribe(
        (response) => {
          this.questions = response.questions;
          this.typeWorkAssigned = response.type_work;

          let localPostExperimentalSubmissions =
            this.storageService.getPostExperimentalSubmissions();

          this.questions.forEach(
            (question: {
              id: any;
              answerSelected: any;
              choices: { id: any }[];
            }) => {
              if (
                localPostExperimentalSubmissions &&
                localPostExperimentalSubmissions.hasOwnProperty(question.id)
              )
                question.answerSelected =
                  localPostExperimentalSubmissions[question.id];
              else question.answerSelected = question.choices[0].id;
            }
          );
          console.log(this.questions);
        },
        (errors) => {
          console.log(errors);
          if (errors.error.status == 'fail') this.notAllowedHere();
        }
      );
    }
  }

  postPostExperimentalResponses() {
    let formData: any;
    formData = {};
    formData['worker_id'] = this.storageService.getWorker();
    formData['responses'] = [];

    this.questions.forEach((question: { id: any; answerSelected: any }) => {
      formData.responses.push({
        q_id: question.id,
        c_id: question.answerSelected,
      });
    });

    this.questionService.postPostExperimentalResponses(formData).subscribe(
      (response) => {
        console.log(response);
        this.storageService.storePostExperimentalSubmissions(
          formData['responses']
        );

        this.postExperimentalSubmitted = response.postexperimental_submitted;
        this.typeWorkAssigned = response.typeWorkAssigned;
        this.postExperimentalSubmissionDialog();
      },
      (errors) => {
        console.log(errors);
      }
    );
    console.log(formData);
  }

  notAllowedHere() {
    const dialogRef = this.dialog.open(NotAllowedHereComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
    });
  }

  postExperimentalSubmissionDialog() {
    const dialogRef = this.dialog.open(PostExperimentalSubmissionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['uniquecode']);
    });
  }

  nextSection() {
    this.router.navigate(['uniquecode']);
  }
}
