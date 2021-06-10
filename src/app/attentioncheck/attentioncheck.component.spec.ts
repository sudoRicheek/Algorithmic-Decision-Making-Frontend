/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AttentioncheckComponent } from './attentioncheck.component';

describe('AttentioncheckComponent', () => {
  let component: AttentioncheckComponent;
  let fixture: ComponentFixture<AttentioncheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentioncheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentioncheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
