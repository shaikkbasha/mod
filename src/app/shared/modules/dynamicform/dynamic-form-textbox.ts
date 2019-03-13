import { DynamicFormBase } from './dynamic-form-base';

export class TextBox extends DynamicFormBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
