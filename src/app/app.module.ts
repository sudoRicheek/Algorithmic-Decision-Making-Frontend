import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AttentioncheckComponent } from './attentioncheck/attentioncheck.component';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import {
  DialogAttentionFail,
  DialogAttentionNoAttempt,
  DialogContentInstructions,
  InstructionsComponent,
} from './instructions/instructions.component';
import { ComprehensionComponent } from './comprehension/comprehension.component';
import { ReminderComponent } from './reminder/reminder.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DialogNoWorkerFoundComponent } from './dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import { ComprehensionFailComponent } from './dialogs/comprehensionFail/comprehensionFail.component';
import { ComprehensionNoAttemptComponent } from './dialogs/comprehensionNoAttempt/comprehensionNoAttempt.component';
import { ComprehensionAlreadyAttemptedComponent } from './dialogs/comprehensionAlreadyAttempted/comprehensionAlreadyAttempted.component';
import { AttentionAlreadyAttemptedComponent } from './dialogs/attentionAlreadyAttempted/attentionAlreadyAttempted.component';
import { DialogContentReminderComponent } from './dialogs/dialogContentReminder/dialogContentReminder.component';
import { BeliefElicitationComponent } from './beliefElicitation/beliefElicitation.component';

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
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
      BeliefElicitationComponent
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
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'fill' },
    },
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
