import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { DynamicFormService } from './dynamic-form-service';
import { Component } from '@angular/core';

describe('DynamicFormService', () => {

  let dynamicFormService: DynamicFormService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicFormService]
    });

    dynamicFormService = TestBed.get(DynamicFormService);
  });

  it('should be created', () => {
    expect(dynamicFormService).toBeTruthy();
  });
  it('should be define getForm event', () => {
    const data = [
        {
          'key': 'category',
          'label': 'Category',
          'type': 'select',
          'options': [
            {
              'key': 'head-end',
              'value': 'Head-end'
            },
            {
              'key': 'distribution',
              'value': 'Distribution'
            },
            {
              'key': 'seat-end',
              'value': 'Seat-end'
            },
            {
              'key': 'connectivity',
              'value': 'Connectivity'
            }
          ],
          'required': true,
          'order': 3
        },
        {
          'key': 'name',
          'label': 'Name',
          'value': '',
          'type': 'text',
          'required': true,
          'pattern': true,
          'order': 1
        }
    ];
    dynamicFormService.getFrom(data);
  });
});
