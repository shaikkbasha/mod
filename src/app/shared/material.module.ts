import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule
  ],
})
export class MaterialModule { }
