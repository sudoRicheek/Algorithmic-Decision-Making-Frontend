/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompBeliefComponent } from './comp-belief.component';

describe('CompBeliefComponent', () => {
  let component: CompBeliefComponent;
  let fixture: ComponentFixture<CompBeliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompBeliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompBeliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
