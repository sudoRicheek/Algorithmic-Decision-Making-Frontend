import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.questions = [];
    this.comprehensionSubmitted = this.storageService.isComprehensionSubmitted();
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
            if (localComprehensionSubmissions && localComprehensionSubmissions.hasOwnProperty(question.id))
              question.answerSelected = localComprehensionSubmissions[question.id];
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

  postComprehensionAnswers() {
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

    this.questionService.postComprehensionAnswers(this.formData).subscribe(
      (response) => {
        console.log(response);
        console.log()
        this.storageService.storeComprehensionSubmissions(this.formData['answers']);
        this.comprehensionSubmitted = true;
      },
      (errors) => {
        console.log(errors);
        alert('Already Attempted Comprehension Questions!');
      }
    );
    console.log(this.formData);
  }

  nextSection() {
    this.router.navigate(['reminder']);
  }
}
