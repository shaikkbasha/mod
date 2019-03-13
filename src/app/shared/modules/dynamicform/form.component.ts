import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormBase } from './dynamic-form-base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit, OnChanges {
  @Input() question: DynamicFormBase<any>;
  @Input() form: FormGroup;
  @Input() formSubmitObj;
  commonObj: any;
  get isValid() { return this.form.controls[this.question.key].valid; }
  ngOnInit() {
    this.commonObj = this.formSubmitObj;
  }
  ngOnChanges() {
    this.commonObj = this.formSubmitObj;
  }
}
