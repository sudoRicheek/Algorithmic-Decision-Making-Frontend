import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ComprehensionComponent } from './comprehension/comprehension.component';
import { ReminderComponent } from './reminder/reminder.component';
import { HeaderComponent } from './header/header.component';
import { BeliefElicitationComponent } from './beliefElicitation/beliefElicitation.component';
import { ApproachDecisionComponent } from './approachDecision/approachDecision.component';
import { PostExperimentalQuestionsComponent } from './postExperimentalQuestions/postExperimentalQuestions.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { UniqueCodeComponent } from './uniqueCode/uniqueCode.component';

import { StorageService } from './services/storage.service';
import { UserExistsService } from './services/userExists.service';

import { LoadingScreenInterceptor } from './interceptors/loading.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import {
  DialogAttentionFail,
  DialogAttentionNoAttempt,
  DialogContentInstructions,
  InstructionsComponent,
} from './instructions/instructions.component';
import { DialogNoWorkerFoundComponent } from './dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import { ComprehensionFailComponent } from './dialogs/comprehensionFail/comprehensionFail.component';
import { ComprehensionNoAttemptComponent } from './dialogs/comprehensionNoAttempt/comprehensionNoAttempt.component';
import { ComprehensionAlreadyAttemptedComponent } from './dialogs/comprehensionAlreadyAttempted/comprehensionAlreadyAttempted.component';
import { AttentionAlreadyAttemptedComponent } from './dialogs/attentionAlreadyAttempted/attentionAlreadyAttempted.component';
import { DialogContentReminderComponent } from './dialogs/dialogContentReminder/dialogContentReminder.component';
import { ComprehensionSubmitDialogComponent } from './dialogs/comprehensionSubmitDialog/comprehensionSubmitDialog.component';
import { BeliefAlreadyAttemptedComponent } from './dialogs/beliefAlreadyAttempted/beliefAlreadyAttempted.component';
import { NotAllowedHereComponent } from './dialogs/notAllowedHere/notAllowedHere.component';
import { AttentionSucessfullySubmittedComponent } from './dialogs/attentionSucessfullySubmitted/attentionSucessfullySubmitted.component';
import { BeliefElicitationSubmittedComponent } from './dialogs/beliefElicitationSubmitted/beliefElicitationSubmitted.component';
import { PostExperimentalSubmissionComponent } from './dialogs/postExperimentalSubmission/postExperimentalSubmission.component';
import { ComprehensionBeliefPassedComponent } from './dialogs/comprehensionBeliefPassed/comprehensionBeliefPassed.component';
import { ComprehensionTryAgainComponent } from './dialogs/comprehensionTryAgain/comprehensionTryAgain.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule } from 'ng2-charts';
import { DssProposerComponent } from './dss-proposer/dss-proposer.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CompBeliefComponent } from './comp-belief/comp-belief.component';
import { ApproachDecisionReminderComponent } from './approachDecisionReminder/approachDecisionReminder.component';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    InstructionsComponent,
    ComprehensionComponent,
    ReminderComponent,
    DialogContentInstructions,
    DialogAttentionNoAttempt,
    DialogAttentionFail,
    DialogNoWorkerFoundComponent,
    ComprehensionFailComponent,
    ComprehensionNoAttemptComponent,
    ComprehensionAlreadyAttemptedComponent,
    AttentionAlreadyAttemptedComponent,
    DialogContentReminderComponent,
    BeliefElicitationComponent,
    ComprehensionSubmitDialogComponent,
    BeliefAlreadyAttemptedComponent,
    NotAllowedHereComponent,
    ApproachDecisionComponent,
    PostExperimentalQuestionsComponent,
    AttentionSucessfullySubmittedComponent,
    BeliefElicitationSubmittedComponent,
    LoadingScreenComponent,
    PostExperimentalSubmissionComponent,
    UniqueCodeComponent,
    DssProposerComponent,
    CompBeliefComponent,
    ComprehensionBeliefPassedComponent,
    ApproachDecisionReminderComponent,
    SurveyComponent,
    ComprehensionTryAgainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatStepperModule,

    ClipboardModule,

    NgbModule,

    ChartsModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'fill' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (router: Router, dialog: MatDialog) {
        return new AuthInterceptor(router, dialog);
      },
      multi: true,
      deps: [Router, MatDialog],
    },
    StorageService,
    UserExistsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
