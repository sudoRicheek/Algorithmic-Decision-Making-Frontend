import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.questions = [];
    this.alreadySubmitted = this.storageService.isAttentionSubmitted();
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
            if (localAttentionSubmissions && localAttentionSubmissions.hasOwnProperty(question.id))
              question.answerSelected = localAttentionSubmissions[question.id];
            else 
              question.answerSelected = question.choices[0].id;
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
    if (!this.formData['worker_id']) {
      alert('No worker signed in!');
      this.router.navigate(['/']);
    }

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
        console.log()
        this.storageService.storeAttentionSubmissions(this.formData['answers']);
        this.alreadySubmitted = true;
      },
      (errors) => {
        console.log(errors);
        alert('Already Attempted Attention Check!');
      }
    );
    console.log(this.formData);
  }

  nextSection() {
    this.router.navigate(['instructions']);
  }
}
