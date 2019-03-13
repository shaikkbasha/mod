import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { ArtefactModule } from '../../shared/artefact.module';
import { TvPerformanceComponent } from './tv-performance.component';
import { AntennaComponent } from './antenna/antenna.component';
import { TunerComponent } from './tuner/tuner.component';
import { MapComponent } from './map/map.component';
import { PeriodicTunerStatusComponent } from './periodic-tuner-status/periodic-tuner-status.component';

import { TvPerformanceDataService } from '../../shared/services/tv-performance/tv-performance-data.service';
import { EtiPipe } from '../../shared/pipes/tv-performance/eti.pipe';
import { FlightPhasePipe } from '../../shared/pipes/tv-performance/flight-phase.pipe';

const routes: Routes = [
  {path: '', component: TvPerformanceComponent,
    children: [
      { path: '', redirectTo: 'antenna', pathMatch: 'full' },
      { path: 'antenna', component: AntennaComponent },
      { path: 'tuner', component: TunerComponent },
      { path: 'map', component: MapComponent },
      { path: 'periodic-tuner-status', component: PeriodicTunerStatusComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    NgbModule,
    ArtefactModule,
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
    ChartModule
  ],
  declarations: [
    TvPerformanceComponent,
    AntennaComponent,
    TunerComponent,
    MapComponent,
    PeriodicTunerStatusComponent,
    FlightPhasePipe,
    EtiPipe
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] },
    TvPerformanceDataService
  ]
})
export class TvPerformanceModule { }
