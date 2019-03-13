import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule
  ],
  providers: [
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  exports: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
