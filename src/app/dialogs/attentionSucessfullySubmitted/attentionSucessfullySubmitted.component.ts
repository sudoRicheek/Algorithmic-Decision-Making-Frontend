import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  attentionSectionPassed: boolean;
}

@Component({
  selector: 'app-attentionSucessfullySubmitted',
  templateUrl: './attentionSucessfullySubmitted.component.html',
  styleUrls: ['./attentionSucessfullySubmitted.component.css'],
})
export class AttentionSucessfullySubmittedComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
