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
import { AttentioncheckComponent } from './attentioncheck/attentioncheck.component';
import { BeliefElicitationComponent } from './beliefElicitation/beliefElicitation.component';
import { ApproachDecisionComponent } from './approachDecision/approachDecision.component';
import { PostExperimentalQuestionsComponent } from './postExperimentalQuestions/postExperimentalQuestions.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

import { StorageService } from './services/storage.service';
import { UserExistsService } from './services/userExists.service';

import { LoadingScreenInterceptor } from './interceptors/loading.interceptor';

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


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AttentioncheckComponent,
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

    NgbModule,

    ChartsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'fill' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
    StorageService,
    UserExistsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
