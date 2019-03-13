import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { Flights } from './tails';
import * as moment from 'moment-timezone';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tails',
  templateUrl: './tails.component.html',
  styleUrls: ['./tails.component.css']
})
export class TailsComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute, public flightsService: FlightsService, private dateService: DateFormatterService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  routeParams: any = {
    airlineId: null
  };
  updatedTime: any;
  dataSource: any = [];
  isLoading = false;
  toDate: string;
  fromDate: string;
  fromdates: any = moment().subtract(3, 'days');
  todates: any = new Date();
  selection: any = new SelectionModel<any>(false, []);
  displayedColumns: string[] = [
    'flightNumber',
    'departureAirport',
    'arrivalAirport',
    'startTime',
    'endTime'
  ];
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'flights',
    id: '',
    enableSearch: true,
    enableCreate: false,
    filterIds: {
      filterListId: 'filter-flights-list',
      filterText: 'inp-filter-flights-text'
    },
    buttonList: []
  };
  tailObj: any = {
    formObj: null,
    selectedRow: [],
    selectedIndex: null
  };

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.routeParams = params;
    });

    const now = new Date();
    now.setDate(now.getDate() - 3);
    this.processDate(new Date(now), new Date());
    this.updatedTime = new Date();
    this.getFlightsList();

  }

  /** Fetch Airlines List **/
  getFlightsList() {
    this.isLoading = true;
    this.dataSource.data = [];
    const params = this.routeParams;
    const dateObj = {
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    this.flightsService.getFlights(params.airlineIcao, params.tailNumber, dateObj).subscribe(list => {
      this.updatedTime = new Date();
      if (list && !list['error'] && !list['message']) {
        this.dataSource = new MatTableDataSource<Flights>(list);
      } else {
        this.dataSource = new MatTableDataSource<Flights>([]);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  getEvent(data) {
    console.log(data);
  }


  flightsFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.isLoading = false;
  }

  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }

  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.getFlightsList();
  }

  selectedRow() {
    if (this.selection.selected.length === 1) {
      this.tailObj['selectedIndex'] = this.dataSource.data.findIndex(
        x => x.id === this.selection.selected[0].id
      );
      this.tailObj.selectedRow = [this.selection.selected[0]];
    } else {
      this.tailObj.selectedRow = this.selection.selected;
    }
  }
}
