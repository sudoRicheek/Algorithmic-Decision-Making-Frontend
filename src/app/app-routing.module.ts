import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproachDecisionComponent } from './approachDecision/approachDecision.component';
import { ApproachDecisionReminderComponent } from './approachDecisionReminder/approachDecisionReminder.component';
import { BeliefElicitationComponent } from './beliefElicitation/beliefElicitation.component';
import { CompBeliefComponent } from './comp-belief/comp-belief.component';
import { ComprehensionComponent } from './comprehension/comprehension.component';
import { DssProposerComponent } from './dss-proposer/dss-proposer.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PostExperimentalQuestionsComponent } from './postExperimentalQuestions/postExperimentalQuestions.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NotFailedService } from './services/notFailed.service';
import { UserExistsService } from './services/userExists.service';
import { SurveyComponent } from './survey/survey.component';
import { UniqueCodeComponent } from './uniqueCode/uniqueCode.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instructions', component: InstructionsComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'comprehension', component: ComprehensionComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'reminder', component: ReminderComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'compbelief', component: CompBeliefComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'beliefelicitation', component: BeliefElicitationComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'postexperimental', component: PostExperimentalQuestionsComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'approachdecisionreminder', component: ApproachDecisionReminderComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'approachdecision', component: ApproachDecisionComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'uniquecode', component: UniqueCodeComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'dssproposer', component: DssProposerComponent, canActivate: [UserExistsService, NotFailedService] },
  { path: 'survey', component: SurveyComponent, canActivate: [UserExistsService, NotFailedService] },
  
  // should be at the bottom.
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
