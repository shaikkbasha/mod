import { TemplateRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CoverageService } from '../../../shared/services/coverage/airlinecoverage.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { FlightModel } from '../../../shared/services/flights/airlineflights';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
@Component({
  selector: 'app-airline-coverage',
  templateUrl: './airline-coverage.component.html',
  styleUrls: ['./airline-coverage.component.css']
})


export class AirlineCoverageComponent implements OnInit {
  selectedTail: string;
  productsObj: any = {
    dataSource: [],

    isLoading: false,
    displayedColumns: ['flightNumber', 'arrivalAirport', 'departureAirport',
      'departureDate', 'arrivalDate', 'offloadReceived']

  };
  displayedColumns: string[] = [];
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  id: string;
  toDate: string;
  fromDate: string;
  fromdates: any = moment().subtract('days', 3);
  todates: any = new Date();
  actionToolBarConfig = {
    createLabel: 'coverage',
    moduleName: 'coverage',
    id: 'btn-coverage',
    filterIds : {
      filterListId: 'filter-coverage-list',
      filterText: 'inp-filter-coverage-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  data: any = [
    { title: 'ALL TAILS ', filterValue: 'all', filterKey: 'tail' },
    { title: 'MISSING OFFLOADS', filterValue: '100', filterKey: 'percentage' },
    { title: 'MISSING ALL OFFLOADS', filterValue: '0', filterKey: 'offloads' }
  ];
  widgetFilterObj: any = {
    allOffloads: [],
    missing: [],
    allmissing: []
  };
  navigationSubscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;
  @ViewChild('coverageTailForm') private coverageTailForm: TemplateRef<any>;
  constructor(private router: Router,
    private coverageService: CoverageService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private flightService: FlightService,
    private dateService: DateFormatterService
  ) {
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
    this.getCoverageList();
    this.updatedTime = new Date();


  }
  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }
  fetchCoverages() {
    this.coverageService.getCoverageList(this.id, this.fromDate, this.toDate).subscribe(list => {
      const ELEMENT_DATA: any = list;
      const own = this;
      const dataToMap = [];
      if (ELEMENT_DATA.error) {
        this.dataSource = new MatTableDataSource([]);
      } else {
        ELEMENT_DATA.forEach(ele => {
          const data = [];
          for (const key in ele) {
            if (typeof ele[key] !== 'object') {
              data[key] = ele[key];
              own.isColumnExist(key);
            } else {
              for (const k in ele[key]) {
                if (ele[key].hasOwnProperty(k)) {
                  data[k] = ele[key][k];
                  own.isColumnExist(k);
                }
              }
            }
          }
          dataToMap.push(data);
        });
      }
      this.dataSource = new MatTableDataSource(dataToMap);
      console.log(this.dataSource, this.displayedColumns);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  isColumnExist(column) {
    let isColFound = false;
    this.displayedColumns.forEach(col => {
      if (col === column) {
        isColFound = true;
      }
    });
    if (!isColFound) {
      this.displayedColumns.push(column);
    }
  }

  checkNumber(value) {
    return new Date(value).toString();
  }

  show(col, expectCol) {
    if (col === expectCol) {
      return true;
    }
    return false;
  }

  getClass(value) {
    if (value >= 90) {
      return 'circle-success';
    }
    if (value < 80) {
      return 'circle-danger';
    }
    return 'circle-warning';
  }
  getCoverageList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource = [];
      this.displayedColumns = [];
    }
    this.fetchCoverages();
  }

  coverageFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getSelectedDates(data) {
    console.log(data);
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource = [];
      this.displayedColumns = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.fetchCoverages();
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

  fetchFlightLists() {
    delete this.dataSource.isFiltered;
    this.flightService.getFlightList(this.id, this.fromDate, this.toDate, this.selectedTail).subscribe(list => {
      const data: any = list;

      if (data.error) {
        this.productsObj.dataSource = new MatTableDataSource<FlightModel>([]);
      } else {

        this.productsObj.dataSource = new MatTableDataSource<FlightModel>(data);
      }
      this.productsObj.isLoading = false;
    });
  }

  displayAircraftFlight(tail) {
    this.selectedTail = tail;

    this.fetchFlightLists();
    this.open(this.coverageTailForm);
  }

  open(content) {
    this.productsObj.modalRef = this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
  }
}
