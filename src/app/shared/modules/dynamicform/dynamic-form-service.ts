import { Injectable } from '@angular/core';

import { DropDown } from './dynamic-form-dropdown';
import { DynamicFormBase } from './dynamic-form-base';
import { TextBox } from './dynamic-form-textbox';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getFrom(configData) {
    const formData = [];
    configData.forEach((element) => {
      if (element.type === 'text') {
        formData.push(new TextBox(element));
      } else if (element.type === 'select') {
        formData.push(new DropDown(element));
      }
    });
    const form: DynamicFormBase<any>[] = formData;

    return form.sort((a, b) => a.order - b.order);
  }
}
