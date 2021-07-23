/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComprehensionBeliefPassedComponent } from './comprehensionBeliefPassed.component';

describe('ComprehensionBeliefPassedComponent', () => {
  let component: ComprehensionBeliefPassedComponent;
  let fixture: ComponentFixture<ComprehensionBeliefPassedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensionBeliefPassedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensionBeliefPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
