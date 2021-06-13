/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BeliefAlreadyAttemptedComponent } from './beliefAlreadyAttempted.component';

describe('BeliefAlreadyAttemptedComponent', () => {
  let component: BeliefAlreadyAttemptedComponent;
  let fixture: ComponentFixture<BeliefAlreadyAttemptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeliefAlreadyAttemptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeliefAlreadyAttemptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
