import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotAllowedHereComponent } from '../dialogs/notAllowedHere/notAllowedHere.component';
import { PostExperimentalSubmissionComponent } from '../dialogs/postExperimentalSubmission/postExperimentalSubmission.component';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-postExperimentalQuestions',
  templateUrl: './postExperimentalQuestions.component.html',
  styleUrls: ['./postExperimentalQuestions.component.css'],
})
export class PostExperimentalQuestionsComponent implements OnInit {
  proposerTypes: string[];
  likertOptions: string[];

  reasonApproach: string;
  rethinkApproach: number;

  unfair: number[];
  dss: number[];
  autonomousagent: number[];

  attentionCheck: number;
  personality: number;
  mostRespondersBargainWith: number;

  constructor(
    private storageService: StorageService,
    private workerService: WorkerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.reasonApproach = '';
    this.rethinkApproach = -1;
    this.proposerTypes = [
      'Human Proposer',
      'Human Proposer supported by an AI-system',
      'AI-system deciding on behalf of a Human Proposer',
    ];
    this.likertOptions = [
      'Strongly Disagree',
      'Disagree',
      'Somewhat Disagree',
      'Neutral',
      'Somewhat Agree',
      'Agree',
      'Strongly Agree',
    ];

    this.unfair = new Array(2).fill(-1);
    this.dss = new Array(3).fill(-1);
    this.autonomousagent = new Array(3).fill(-1);
    this.attentionCheck = -1;
    this.personality = -1;
    this.mostRespondersBargainWith = -1;
  }

  ngOnInit() {}

  nextSection() {
    let localWorker = this.storageService.getWorker();
    if (localWorker) {
      this.workerService
        .submitPostExperimentalResponder(
          localWorker,
          this.reasonApproach,
          this.rethinkApproach,
          this.unfair,
          this.dss,
          this.autonomousagent,
          this.attentionCheck,
          this.personality,
          this.mostRespondersBargainWith
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

  public showElement(): boolean {
    return (
      this.unfair.some((item) => item == -1) ||
      this.dss.some((item) => item == -1) ||
      this.autonomousagent.some((item) => item == -1)
    );
  }
}
