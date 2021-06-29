/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BeliefElicitationSubmittedComponent } from './beliefElicitationSubmitted.component';

describe('BeliefElicitationSubmittedComponent', () => {
  let component: BeliefElicitationSubmittedComponent;
  let fixture: ComponentFixture<BeliefElicitationSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeliefElicitationSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeliefElicitationSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
