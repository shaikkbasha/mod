import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapModule } from '../../shared/bootstrap.module';
import { AirlineOverviewComponent } from './overview/airline-overview.component';
import { AirlineFlightsComponent } from './flights/airline-flights.component';
import { AirlineComponent } from './airline/airline.component';
import { AirlineTailsComponent } from './tails/airline-tails.component';
import { AirlineOffloadsComponent } from './offloads/airline-offloads.component';
import { AirlineCoverageComponent } from './coverage/airline-coverage.component';
import { SharedModule } from '../../shared/shared.module';
import {NgPipesModule} from 'ngx-pipes';
import {MatRadioModule} from '@angular/material/radio';

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
import { ArtefactModule } from '../../shared/artefact.module';
import { TvPerformanceFlightsComponent } from './tv-performance-flights/tv-performance-flights.component';

const routes: Routes = [

  {
    path: '',
    component: AirlineComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full'},
      { path: 'overview', component: AirlineOverviewComponent},
      { path: 'flights', component: AirlineFlightsComponent},
      { path: 'tails', component: AirlineTailsComponent},
      { path: 'offloads', component: AirlineOffloadsComponent },
      { path: 'coverage', component: AirlineCoverageComponent },
      { path: 'tv-performance', component: TvPerformanceFlightsComponent}
    ]
  }
];

@NgModule({
  imports: [
    MatRadioModule,
    RouterModule.forChild(routes),
    BootstrapModule,
    SharedModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ArtefactModule,
    NgPipesModule
  ],
  declarations: [
    AirlineComponent,
    AirlineOverviewComponent,
    AirlineFlightsComponent,
    AirlineTailsComponent,
    AirlineOffloadsComponent,
    AirlineCoverageComponent,
    TvPerformanceFlightsComponent
  ],
  exports: [
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgPipesModule,
    MatRadioModule
  ]
})
export class AirlineModule { }
