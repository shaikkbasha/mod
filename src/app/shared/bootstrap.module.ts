import { NgModule } from '@angular/core';

import { NgbButtonsModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    NgbButtonsModule,
    NgbDropdownModule
  ],
  exports: [
    NgbButtonsModule,
    NgbDropdownModule
  ],
})
export class BootstrapModule { }
