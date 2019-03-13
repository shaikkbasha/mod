import { TemplateRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { FlightModel } from '../../../shared/services/flights/airlineflights';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import * as moment from 'moment-timezone';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-airline-flights',
  templateUrl: './airline-flights.component.html',
  styleUrls: ['./airline-flights.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class AirlineFlightsComponent implements OnInit {
  enableSearchToolBar = true;
  displayedColumns: string[] = ['select', 'tailNumber', 'flightNumber', 'arrivalAirport', 'departureAirport',
    'departureDate', 'arrivalDate', 'isDarkFlight', 'offloadReceived'];
  selection: any = new SelectionModel<any>(false, []);
  modalRef: any;
  labelValueFormat: any;
  dataSource: any = [];
  flightObj: any = {
    isLoading: false,
    getAirlines: [],
    getTails: [],
    isFormSubmitted: false,
    isError: false,
    errorMsg: null,
    formSubmitted: false,
    darkFlightList: [
      {
        name: 'No',
        value: 'NO'
      },
      {
        name: 'Yes',
        value: 'YES'
      }
    ],
    formObj: {
      airlineId: null,
      isDarkFlight: '',
      airline: '',
      tail: '',
      squawk: '',
      maintenaceAction: '',
      description: '',
      rootCause: null,
      maintenanceRecommendations: '',
      engineeringNotes: '',
      openDate: null,
      closedDate: null,
      aircraftId: 445,
      flightNumber: '',
      departureDate: null,
      arrivalDate: null,
      departureAirport: '',
      arrivalAirport: '',
      flightDuration: null,
      insertDate: '',
      createdAt: ''
    }
  };
  updatedTime: any;
  isLoading = false;
  id: string;
  selectedRowObj: any = {
    selectedRow: []
  };
  toDate: string;
  fromDate: string;
  fromdates: any = moment().subtract(3, 'days');
  todates: any = new Date();
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'flight',
    id: 'btn-flight',
    filterIds: {
      filterListId: 'filter-flight-list',
      filterText: 'inp-filter-flight-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: [
      {
        label: 'Edit',
        icon: 'fa fa-pencil-square-o',
        id: 'btn-admin-station-edit',
        eventName: 'edit',
      }
    ]
  };
  data: any = [
    { title: 'ALL FLIGHTS', filterValue: 'all', filterKey: 'offloadReceived' },
    { title: 'RECEIVED OFFLOADS', filterValue: 'yes', filterKey: 'offloadReceived' },
    { title: 'MISSING OFFLOADS', filterValue: 'no', filterKey: 'offloadReceived' }
  ];
  widgetFilterObj: any = {
    allFlights: [],
    offloadReceived: [],
    offloadMissing: []
  };
  @ViewChild('editFlightModal') private editFlightModal: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('rsSort') sort: MatSort;
  @ViewChild(ArtupdatedtimeComponent) artUpdatedTimeComponent: ArtupdatedtimeComponent;
  constructor(config: NgbModalConfig, public modalService: NgbModal, private router: Router,
    private flightService: FlightService, public toaster: ToastrService,
    private route: ActivatedRoute, private dateService: DateFormatterService) {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit() {
    console.log(this.route);
    this.labelValueFormat = {
      format: 'Date',
      conversionFormat: `MM/dd/yyyy HH:mm`,
      timeZone: 'UTC'
    };
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.id = params['airlineIcao'];

      });
    }

    const now = new Date();
    now.setDate(now.getDate() - 3);
    this.processDate(new Date(now), new Date());
    this.getFlightList();
    this.updatedTime = new Date();
  }
  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }
  fetchFlightLists() {
    delete this.dataSource.isFiltered;
    this.flightService.getFlightList(this.id, this.fromDate, this.toDate, '').subscribe(list => {
      const data: any = list;
      if (data.error) {
        this.dataSource = new MatTableDataSource<FlightModel>([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<FlightModel>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isLoading = false;
    });
  }
  getFlightList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.fetchFlightLists();
  }

  flightFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.fetchFlightLists();
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
  getSelectedRows(row) {
    if (this.selection.selected.length === 1) {
      this.selectedRowObj['selectedIndex'] = this.dataSource.data.findIndex(x => x.id === this.selection.selected[0].id);
      this.selectedRowObj.selectedRow = [this.selection.selected[0]];
    } else {
      this.selectedRowObj.selectedRow = this.selection.selected;
    }
  }
  closeModal() {
    this.modalRef.close();
  }
  open(content) {
    this.modalRef = this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
  }
  getEvent(params) {
    if (params.moduleName === 'flight') {
      if (params.eventName === 'edit') {
        this.flightObj.isLoading = true;
        this.flightService.getFlightDetails(this.id, this.selectedRowObj.selectedRow[0].id).subscribe(response => {
          this.flightObj.isLoading = false;
          this.updateFormDetails(response);
        });
        this.open(this.editFlightModal);
      }
    }
  }
  updateFormDetails(details) {
    this.flightObj.getFlightDetails = this.selectedRowObj.selectedRow[0];
    this.flightObj.formObj.airline = this.id.toUpperCase();
    this.flightObj.formObj.tail = this.selectedRowObj.selectedRow[0].tailNumber;

    this.flightObj.formObj.flightNumber = details.flightNumber;
    const aDate = new Date(details.arrivalDate);
    this.flightObj.formObj.arrivalDate = aDate;
    const dDate = new Date(details.departureDate);
    this.flightObj.formObj.departureDate = dDate;
    this.flightObj.formObj.isDarkFlight = details.isDarkFlight;

    if (details.openDate) {
      const oDates = new Date(details.openDate);
      const oDate = { year: oDates.getFullYear(), month: oDates.getMonth() + 1, day: oDates.getDate() };
      this.flightObj.formObj.openDate = oDate;
    } else {
      this.flightObj.formObj.openDate = null;
    }
    if (details.closedDate) {
      const cDates = new Date(details.closedDate);
      const cDate = { year: cDates.getFullYear(), month: cDates.getMonth() + 1, day: cDates.getDate() };

      this.flightObj.formObj.closedDate = cDate;
    } else {
      this.flightObj.formObj.closedDate = null;
    }


    this.flightObj.formObj.squawk = details.squawk;
    this.flightObj.formObj.maintenaceAction = details.maintenaceAction;
    this.flightObj.formObj.description = details.description;
    this.flightObj.formObj.rootCause = details.rootCause;
    this.flightObj.formObj.maintenanceRecommendations = details.maintenanceRecommendations;
    this.flightObj.formObj.engineeringNotes = details.engineeringNotes;

    this.flightObj.formObj.arrivalAirport = details.arrivalAirport;
    this.flightObj.formObj.departureAirport = details.departureAirport;
  }
  resetFormData() {
    this.flightObj.formObj.description = null;
    this.flightObj.formObj.tail = null;
    this.flightObj.formObj.isDarkFlight = null;
    this.flightObj.formObj.airline = null;
    this.flightObj.formObj.squawk = null;
    this.flightObj.formObj.maintenaceAction = null;
    this.flightObj.formObj.rootCause = null;
    this.flightObj.formObj.maintenanceRecommendations = null;
    this.flightObj.formObj.engineeringNotes = null;
    this.flightObj.formObj.openDate = null;

    this.flightObj.formObj.closedDate = null;
    this.flightObj.formObj.aircraftId = null;
    this.flightObj.formObj.flightNumber = null;
    this.flightObj.formObj.departureDate = null;
    this.flightObj.formObj.arrivalDate = null;
    this.flightObj.formObj.departureAirport = null;
    this.flightObj.formObj.arrivalAirport = null;
    this.flightObj.formObj.flightDuration = null;
    this.flightObj.isFormSubmitted = false;
    this.flightObj.isError = false;
    this.flightObj.errorMsg = null;
    this.flightObj.formSubmitted = false;

  }
  addPrefixZero(number) {
    if (number !== 'NaN' && number !== undefined && number !== null) {
      if (number.toString().length < 2) {
          return '0' + number;
      } else {
        return number;
      }
    } else {
        return number;
    }
  }
  updateFlightDetails() {
    this.flightObj.formSubmitted = true;
    this.flightObj.isError = false;

    if (this.flightObj.formObj.isDarkFlight.toUpperCase() === 'YES' && !this.flightObj.formObj.openDate) {
        return true;
    } else {
      if (!this.flightObj.formObj.openDate) {
        this.flightObj.formObj.openDate = {};
      }
      if (!this.flightObj.formObj.closedDate) {
        this.flightObj.formObj.closedDate = {};
      }
      console.log(this.flightObj.formObj);
      const isDarkFlight = this.flightObj.formObj.isDarkFlight;
      const openDate = this.flightObj.formObj.openDate;
      const closedDate = this.flightObj.formObj.closedDate;
      const darkFlight = isDarkFlight.toUpperCase();
      const updateObj: any = {
        isDarkFlight: this.flightObj.formObj.isDarkFlight,
        squawk: (darkFlight === 'YES' ?  this.flightObj.formObj.squawk : null),
        maintenaceAction: (darkFlight === 'YES' ?  this.flightObj.formObj.maintenaceAction : null),
        description: (darkFlight === 'YES' ?  this.flightObj.formObj.description : null),
        rootCause:  (darkFlight === 'YES' ?  this.flightObj.formObj.rootCause : null),
        maintenanceRecommendations: (darkFlight === 'YES' ?  this.flightObj.formObj.maintenanceRecommendations : null),
        engineeringNotes: (darkFlight === 'YES' ?  this.flightObj.formObj.engineeringNotes : null),
        openDate: (darkFlight === 'YES' ?  new Date(openDate.year + '-' + openDate.month + '-' + openDate.day) : null),
        closedDate: (darkFlight === 'YES' ? new Date(closedDate.year + '-' + closedDate.month + '-' + closedDate.day) : null)
      };

      const oDateObj =  {
        hh:  this.addPrefixZero(new Date(openDate.year + '-' + openDate.month + '-' + openDate.day).getHours()),
        min: this.addPrefixZero(new Date(openDate.year + '-' + openDate.month + '-' + openDate.day).getMinutes()),
        sec: this.addPrefixZero(new Date(openDate.year + '-' + openDate.month + '-' + openDate.day).getSeconds()),
        month: this.addPrefixZero(openDate.month),
        day: this.addPrefixZero(openDate.day)
      };
      if (oDateObj.hh && oDateObj.min && oDateObj.sec) {
        const oDateTime = oDateObj.hh + ':' + oDateObj.min + ':' + oDateObj.sec + 'Z';
        updateObj.openDate = openDate.year + '-' + oDateObj.month + '-' + oDateObj.day + 'T' + oDateTime;
      } else if (!oDateObj.hh && !oDateObj.min && !oDateObj.sec) {
        updateObj.openDate = null;
      }

      const cDateObj =  {
        hh:  this.addPrefixZero(new Date(closedDate.year + '-' + closedDate.month + '-' + closedDate.day).getHours()),
        min: this.addPrefixZero(new Date(closedDate.year + '-' + closedDate.month + '-' + closedDate.day).getMinutes()),
        sec: this.addPrefixZero(new Date(closedDate.year + '-' + closedDate.month + '-' + closedDate.day).getSeconds()),
        month: this.addPrefixZero(closedDate.month),
        day: this.addPrefixZero(closedDate.day)
      };
      if (cDateObj.hh && cDateObj.min && cDateObj.sec) {
        const cDateTime = cDateObj.hh + ':' + cDateObj.min + ':' + cDateObj.sec + 'Z';
        updateObj.closedDate = closedDate.year + '-' + cDateObj.month + '-' + cDateObj.day + 'T' + cDateTime;
      } else if (!cDateObj.hh && !cDateObj.min && !cDateObj.sec) {
        updateObj.closedDate = null;
      }

      console.log(updateObj);

      this.flightObj.formSubmitted = false;
      this.flightObj.isFormSubmitted = true;

      this.flightService.updateFlightDetails(this.id, this.selectedRowObj.selectedRow[0].id, updateObj).subscribe(response => {
        this.flightObj.isFormSubmitted = false;
        const data: any = response;
        if (data && !data.error && (data.status === 200 || !data.status)) {
          const msg = this.selectedRowObj.selectedRow[0].flightNumber + ' flight was successfully updated';
          this.toaster.success(msg, 'Update Flight');
          this.dataSource.data.splice(this.selectedRowObj.selectedIndex, 1);
          response['tailNumber'] = this.flightObj.formObj.tail;
          response['offloadReceived'] = this.flightObj.getFlightDetails.offloadReceived;
          this.dataSource.data.push(response);
          this.closeModal();
          this.resetFormData();
          this.flightFilter('');
          this.selection.clear();
          this.selectedRowObj.selectedRow = [];
        } else if (data.error || data.status !== 200 || !data.status) {
          if ((data.error && (data.error.message || data.error.error_description))) {
            this.flightObj.isError = true;
            this.flightObj.errorMsg = (data.error && (data.error.message || data.error.error_description));
          }
        }
      });
    }

  }
}
