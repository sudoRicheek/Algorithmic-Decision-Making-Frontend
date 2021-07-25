/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComprehensionTryAgainComponent } from './comprehensionTryAgain.component';

describe('ComprehensionTryAgainComponent', () => {
  let component: ComprehensionTryAgainComponent;
  let fixture: ComponentFixture<ComprehensionTryAgainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensionTryAgainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensionTryAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
