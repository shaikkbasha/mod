import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepicker } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
import * as moment from 'moment-timezone';

import { TvPerformanceFlightsService } from './../../../shared/services/tv-performance/tv-performance-flights.service';
import { TvPerformanceFlights } from './../../../shared/services/tv-performance/tv-performance-flights';
import { DateFormatterService } from './../../../shared/services/dateFormatter/dateformatter.service';
@Component({
  selector: 'app-tv-performance-flights',
  templateUrl: './tv-performance-flights.component.html',
  styleUrls: ['./tv-performance-flights.component.css']
})
export class TvPerformanceFlightsComponent implements OnInit {
  enableSearchToolBar = false;
  displayedColumns: string[] = ['tailNumber', 'flightNumber', 'departureAirport',
    'arrivalAirport', 'departureTime', 'arrivalTime'];
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  id: string;
  icao: string;
  toDate: any;
  fromDate: any;
  filterValue: string;
  datepickToDate: any = new Date();
  datepickFromDate: any = moment().subtract(3, 'days');
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'tvFlight',
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ArtupdatedtimeComponent) artUpdatedTimeComponent: ArtupdatedtimeComponent;
  constructor(
    private activeRoute: ActivatedRoute,
    private dateService: DateFormatterService,
    private tvFlightService: TvPerformanceFlightsService
  ) { }

  ngOnInit() {
    if (this.activeRoute.parent) {
      this.activeRoute.parent.params.subscribe(params => {
        this.icao = params['airlineIcao'];
      });
    }
    this.getFilterDate(this.datepickFromDate, this.datepickToDate);
  }

  getFlightsLists() {
    delete this.dataSource.isFiltered;
    this.tvFlightService.getAllFlights(this.icao, { from: this.fromDate, to: this.toDate }).subscribe(res => {
      this.updatedTime = new Date();
      this.dataSource = res.error ? new MatTableDataSource<TvPerformanceFlights>([]) :
        new MatTableDataSource<TvPerformanceFlights>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    }, err => console.log(err));
  }

  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.getFilterDate(data.fromDate, data.toDate);
  }

  getFilterDate(fromDate, toDate) {
    const dateObj = this.dateService.getDates(new Date(fromDate), new Date(toDate));
    this.fromDate = dateObj.fromDate;
    this.toDate = dateObj.toDate;
    this.getFlightsLists();
  }

  flightFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }
}
