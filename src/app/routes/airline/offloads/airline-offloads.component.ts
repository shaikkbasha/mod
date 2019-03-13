import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepicker } from '@angular/material';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { OffloadService } from '../../../shared/services/offloads/airlineoffloads.service';
import { OffloadModel } from '../../../shared/services/offloads/airlineofflods';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-airline-offloads',
  templateUrl: './airline-offloads.component.html',
  styleUrls: ['./airline-offloads.component.css']
})

export class AirlineOffloadsComponent implements OnInit {
  displayedColumns: string[] = ['fileName', 'fileSize', 'status', 'tailNumber', 'flightNumber',
    'flightLegStartTime', 'flightLegEndTime', 'departureAirport', 'arrivalAirport', 'uploadedTime'];
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  id: string;
  toDate: string;
  fromDate: string;
  fromdates: any = moment().subtract(3, 'days');
  todates: any = new Date();
  actionToolBarConfig = {
    createLabel: 'offloads',
    moduleName: 'offloads',
    id: 'btn-offloads',
    filterIds : {
      filterListId: 'filter-offloads-list',
      filterText: 'inp-filter-offloads-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  data: any = [
    { title: 'ALL OFFLOADS ', filterValue: 'all', filterKey: 'status' },
    { title: 'PROCESSED', filterValue: 'processed', filterKey: 'status' },
    { title: 'REJECTED', filterValue: 'rejected', filterKey: 'status' }
  ];
  widgetFilterObj: any = {
    allOffloads: [],
    processed: [],
    rejected: []
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;

  constructor(private router: Router,
    private offloadService: OffloadService,
    private route: ActivatedRoute,
    private dateService: DateFormatterService,
    breakpointObserver: BreakpointObserver) {

    // https://github.com/angular/material2/issues/10732

    breakpointObserver.observe(['(max-width: 414px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['status', 'fileName'] :
        ['status', 'fileName', 'uploadedTime'];
    });

    breakpointObserver.observe(['(max-width: 1022px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['status', 'fileName', 'uploadedTime'] :
        ['status', 'fileName', 'tailNumber', 'flightNumber', 'uploadedTime'];
    });

    breakpointObserver.observe(['(max-width: 1223px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['status', 'fileName', 'tailNumber', 'flightNumber', 'uploadedTime'] :
        ['status', 'fileName', 'tailNumber', 'flightNumber', 'flightLegStartTime', 'flightLegEndTime', 'uploadedTime'];
    });

    breakpointObserver.observe(['(max-width: 1595px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['status', 'fileName', 'tailNumber', 'flightNumber', 'flightLegStartTime',
          'flightLegEndTime', 'uploadedTime'] :
        ['status', 'fileName', 'fileSize', 'tailNumber', 'flightNumber',
          'flightLegStartTime', 'flightLegEndTime', 'departureAirport', 'arrivalAirport', 'uploadedTime'];
    });
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.id = params['airlineIcao'];



      });
    }
    const now = new Date();
    now.setDate(now.getDate() - 3);
    this.processDate(new Date(now), new Date());
    this.getOffloadList();
    this.updatedTime = new Date();
  }
  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }
  fetchOffLoads() {
    this.offloadService.getOffloadList(this.id, this.fromDate, this.toDate).subscribe(list => {
      const data: any = list;
      data.forEach(function(ele) {
        if (ele['flightLegIds']) {
       const val =  (ele['flightLegIds']).split(',');
        ele['flightLegIds'] = val[val.length - 1].trim();
        }
        data.push(ele);
      });

      if (data.error) {
        this.dataSource = new MatTableDataSource<OffloadModel>([]);
      } else {
        this.dataSource = new MatTableDataSource<OffloadModel>(data);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
  getOffloadList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }

    this.fetchOffLoads();
  }

  offloadFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getSelectedDates(data) {
    console.log(data);
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.fetchOffLoads();
  }

  getFilteredData(data) {
    this.isLoading = true;
    this.dataSource.data = [];
    const timer = setTimeout(() => {
      this.dataSource.data = data.datasource;
      this.isLoading = false;
      clearTimeout(timer);
    }, 500);
  }
}
