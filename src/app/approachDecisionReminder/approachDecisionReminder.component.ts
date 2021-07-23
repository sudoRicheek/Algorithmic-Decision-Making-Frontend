import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approachDecisionReminder',
  templateUrl: './approachDecisionReminder.component.html',
  styleUrls: ['./approachDecisionReminder.component.css']
})
export class ApproachDecisionReminderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextSection() {
    this.router.navigate(['approachdecision']);
  }
}
