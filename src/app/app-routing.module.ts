import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttentioncheckComponent } from './attentioncheck/attentioncheck.component';
import { ComprehensionComponent } from './comprehension/comprehension.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ReminderComponent } from './reminder/reminder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'attentioncheck', component: AttentioncheckComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'comprehension', component: ComprehensionComponent },
  { path: 'reminder', component: ReminderComponent},

  // should be at the bottom.
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
