import { DynamicFormBase } from './dynamic-form-base';

export class DropDown extends DynamicFormBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
