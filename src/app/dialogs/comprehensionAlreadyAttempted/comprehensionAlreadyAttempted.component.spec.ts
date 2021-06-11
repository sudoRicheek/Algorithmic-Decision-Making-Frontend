/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComprehensionAlreadyAttemptedComponent } from './comprehensionAlreadyAttempted.component';

describe('ComprehensionAlreadyAttemptedComponent', () => {
  let component: ComprehensionAlreadyAttemptedComponent;
  let fixture: ComponentFixture<ComprehensionAlreadyAttemptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensionAlreadyAttemptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensionAlreadyAttemptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
