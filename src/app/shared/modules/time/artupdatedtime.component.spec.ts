import { ArtupdatedtimeComponent } from './artupdatedtime.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { computeStyle } from '@angular/animations/browser/src/util';

describe('ArtupdatedtimeComponent', () => {
  let component: ArtupdatedtimeComponent;
  let fixture: ComponentFixture<ArtupdatedtimeComponent>;
  const changesObj: SimpleChanges = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtupdatedtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtupdatedtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should define updatedTime', () => {
    component.updatedTime();
    expect(component.updatedTime).toBeDefined();
  });
  it('should define refresh', () => {
    component.refresh();
    expect(component.refresh).toBeDefined();
  });
  it('should define ngOnChanges', () => {
    component.time = new Date();
    component.ngOnChanges(changesObj);
    expect(component.refresh).toBeDefined();
  });
});
