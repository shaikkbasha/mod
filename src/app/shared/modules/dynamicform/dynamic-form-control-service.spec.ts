import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FormControlService } from './dynamic-form-control-service';

describe('FormControlService', () => {

  let formControlService: FormControlService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormControlService]
    });

    formControlService = TestBed.get(FormControlService);
  });

  it('should be created', () => {
    expect(formControlService).toBeTruthy();
  });
  it('should be defined toFormGroup event', () => {
    const form: any = [
        {
          'value': '',
          'key': 'name',
          'label': 'Name',
          'required': true,
          'order': 1,
          'controlType': 'textbox',
          'pattern': true,
          'type': 'text'
        },
        {
          'key': 'category',
          'label': 'Category',
          'required': true,
          'order': 3,
          'controlType': 'dropdown',
          'pattern': '',
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
          ]
        }
      ];
    formControlService.toFormGroup(form);
  });
});
