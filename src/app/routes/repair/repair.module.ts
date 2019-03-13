import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairComponent } from './repair/repair.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtefactModule } from '../../shared/artefact.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from '../../shared/bootstrap.module';

import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatSort, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
} from '@angular/material';

import { onAuthorizationRequired, onAuthRequired } from '../routes';
import { AuthGuard } from '../../shared/okta/auth.guard';
import { RepairRemovalComponent } from './removal/repair-removal.component';
import { RepairOverveiwComponent } from './overveiw/repair-overveiw.component';
import { RepairRepairsComponent } from './repairs/repair-repairs.component';
import { RepairReportComponent } from './report/repair-report.component';

const routes: Routes = [
  {
    path: '',
    component: RepairComponent,
    canActivate: [AuthGuard],
    data: {
      onAuthorizationRequired,
      authorities: ['admins']
    },
    children: [
      { path: '', redirectTo: 'overview' },
      { path: 'overview', component: RepairOverveiwComponent },
      { path: 'removals', component: RepairRemovalComponent },
      { path: 'repairs', component: RepairRepairsComponent },
      { path: 'reports', component: RepairReportComponent },
    ],
  }
];

@NgModule({
  declarations: [RepairComponent, RepairRemovalComponent, RepairOverveiwComponent, RepairRepairsComponent, RepairReportComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BootstrapModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ArtefactModule
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
  ]
})
export class RepairModule { }
