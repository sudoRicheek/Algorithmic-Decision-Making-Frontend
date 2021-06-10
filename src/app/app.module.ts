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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { InstructionsComponent } from './instructions/instructions.component';
import { ComprehensionComponent } from './comprehension/comprehension.component';
import { ReminderComponent } from './reminder/reminder.component';

@NgModule({
  declarations: [						
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AttentioncheckComponent,
      InstructionsComponent,
      ComprehensionComponent,
      ReminderComponent
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
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always', appearance: 'fill' }},
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
