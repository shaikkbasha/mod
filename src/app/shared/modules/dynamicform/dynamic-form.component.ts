import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from './dynamic-form-control-service';
import { DynamicFormBase } from './dynamic-form-base';

@Component({
  selector: 'art-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
    @Input() formConfig: DynamicFormBase<any>[] = [];
    @Input() configObj: any = {};
    @Output() formData: any = new EventEmitter<any>();
    @Output() cancelEvent: any = new EventEmitter<any>();
    form: FormGroup;
    formObj: any;
    commonObj: any = {
      formIsInvalid: false
    };
    constructor(private qcs: FormControlService) {  }
    ngOnInit() {
      this.formObj = this.configObj;
      console.log(this.configObj);
      this.form = this.qcs.toFormGroup(this.formConfig);
    }
    onSubmit() {
     this.commonObj.formIsInvalid = true;
     if (!this.form.invalid) {
        this.commonObj.formIsInvalid = false;
        const obj = {
          formData: this.form.value
        };
        this.formData.emit(obj);
     }
    //  this.formIsInvalid = false;
    }
    cancelForm() {
      this.cancelEvent.emit();
    }
  }
