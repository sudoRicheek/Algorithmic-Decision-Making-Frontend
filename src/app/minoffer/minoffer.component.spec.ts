/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinofferComponent } from './minoffer.component';

describe('MinofferComponent', () => {
  let component: MinofferComponent;
  let fixture: ComponentFixture<MinofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
