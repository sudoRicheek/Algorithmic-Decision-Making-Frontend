import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  comprehensionSectionPassed: boolean,
}
@Component({
  selector: 'app-comprehensionBeliefPassed',
  templateUrl: './comprehensionBeliefPassed.component.html',
  styleUrls: ['./comprehensionBeliefPassed.component.css']
})
export class ComprehensionBeliefPassedComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
