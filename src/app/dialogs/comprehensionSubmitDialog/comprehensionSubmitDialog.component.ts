import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  comprehensionSectionPassed: boolean,
  typeWorkAssigned: string,
}

@Component({
  selector: 'app-comprehensionSubmitDialog',
  templateUrl: './comprehensionSubmitDialog.component.html',
  styleUrls: ['./comprehensionSubmitDialog.component.css']
})
export class ComprehensionSubmitDialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
