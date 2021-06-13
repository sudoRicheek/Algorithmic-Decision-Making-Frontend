import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproachDecisionComponent } from './approachDecision/approachDecision.component';
import { AttentioncheckComponent } from './attentioncheck/attentioncheck.component';
import { BeliefElicitationComponent } from './beliefElicitation/beliefElicitation.component';
import { ComprehensionComponent } from './comprehension/comprehension.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PostExperimentalQuestionsComponent } from './postExperimentalQuestions/postExperimentalQuestions.component';
import { ReminderComponent } from './reminder/reminder.component';
import { UserExistsService } from './services/userExists.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'attentioncheck', component: AttentioncheckComponent, canActivate: [UserExistsService] },
  { path: 'instructions', component: InstructionsComponent, canActivate: [UserExistsService] },
  { path: 'comprehension', component: ComprehensionComponent, canActivate: [UserExistsService] },
  { path: 'reminder', component: ReminderComponent, canActivate: [UserExistsService] },
  { path: 'beliefelicitation', component: BeliefElicitationComponent, canActivate: [UserExistsService] },
  { path: 'postexperimental', component: PostExperimentalQuestionsComponent, canActivate: [UserExistsService] },
  { path: 'approachdecision', component: ApproachDecisionComponent, canActivate: [UserExistsService] },


  // should be at the bottom.
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
