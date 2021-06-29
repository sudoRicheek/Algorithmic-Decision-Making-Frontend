/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AttentionSucessfullySubmittedComponent } from './attentionSucessfullySubmitted.component';

describe('AttentionSucessfullySubmittedComponent', () => {
  let component: AttentionSucessfullySubmittedComponent;
  let fixture: ComponentFixture<AttentionSucessfullySubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionSucessfullySubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionSucessfullySubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
