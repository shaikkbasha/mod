import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TailsComponent } from './tails/tails.component';
import { FlightsComponent } from './flights/flights.component';
import { ArtefactModule } from '../../shared/artefact.module';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

const routes: Routes = [

  {
    path: '',
    component: FlightsComponent,
    children: [
      { path: '', redirectTo: 'flights', pathMatch: 'full'},
      { path: 'flights', component: TailsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    TailsComponent,
    FlightsComponent
  ],
  imports: [
    CommonModule,
    ArtefactModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule
  ],
  exports: [
    CommonModule,
    ArtefactModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule
  ]
})
export class TailsModule { }
