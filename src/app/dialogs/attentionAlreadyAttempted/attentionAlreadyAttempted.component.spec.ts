/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AttentionAlreadyAttemptedComponent } from './attentionAlreadyAttempted.component';

describe('AttentionAlreadyAttemptedComponent', () => {
  let component: AttentionAlreadyAttemptedComponent;
  let fixture: ComponentFixture<AttentionAlreadyAttemptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionAlreadyAttemptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionAlreadyAttemptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
