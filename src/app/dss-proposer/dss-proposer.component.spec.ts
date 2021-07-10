/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DssProposerComponent } from './dss-proposer.component';

describe('DssProposerComponent', () => {
  let component: DssProposerComponent;
  let fixture: ComponentFixture<DssProposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DssProposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DssProposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
