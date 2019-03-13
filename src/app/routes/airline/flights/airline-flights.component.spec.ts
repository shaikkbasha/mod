import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { AirlineFlightsComponent } from './airline-flights.component';
import {
  MatButtonModule,
  MatCardModule,
  MatSort,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule
} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AirlineFlightsComponent', () => {

  let component: AirlineFlightsComponent;
  let fixture: ComponentFixture<AirlineFlightsComponent>;
  let flightService: any = FlightService;
  const mockFlightService = {
    getFlightList(): Observable<any> {
      return Observable.of({error: 'Internal Server Error'});
    },
    updateFlightDetails(): Observable<any> {
      return Observable.of({
        tailNumber: 'N901',
        offloadReceived: '',
        status: 200
      });
    },
    getFlightDetails(): Observable<any> {
      return Observable.of([]);
    }
  };
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal',
        flightId: 'abcd123'
      })
    }
  };
  const httpClient: any = HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineFlightsComponent, MatSort],
      imports: [
        MatRadioModule,
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        ToastrModule.forRoot(),


      ],
      providers: [
        HttpClientModule, HttpClient,
        { provide: FlightService, useValue: mockFlightService},
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flightService = TestBed.get(FlightService);

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('filter should be defined', () => {
    component.flightFilter('Flight');
    expect(component.flightFilter).toBeDefined();
  });
  it('getFlightList', () => {
    const getFlightList = spyOn(flightService, 'getFlightList').and.callThrough();
    flightService.getFlightList().subscribe(response => {
      expect(getFlightList).toHaveBeenCalled();
    });
    component.getFlightList();
    expect(component.isLoading).toBe(false);
  });
  it('should be define get filter data', () => {
    const filterData = {
      'title': 'MISSING OFFLOADS',
      'filterValue': 'no',
      'filterKey': 'offloadReceived',
      'count': 1972,
      'datasource': {
        'tailNumber': 'N906AA',
        'flightNumber': 'AAL2372',
        'departureDate': '2019-01-24T00:03:55.000Z',
        'arrivalDate': '2019-01-24T00:48:44.000Z',
        'departureAirport': 'DFW',
        'arrivalAirport': 'SAT',
        'offloadReceived': 'NO'
      }
    };
    component.dataSource = {
      data: [{id: 1}]
    };
    component.getFilteredData(filterData);
  });
  it('should be define get filter data', () => {
    const filterData = {
      'fromDate': '2019-01-23T18:30:00.000Z',
      'toDate': '2019-01-24T18:30:00.000Z'
    };
    component.getSelectedDates(filterData);
  });

  it('getSelectedRows should be defined', () => {
      component.getSelectedRows([]);
      expect(component.selectedRowObj.selectedRow ).toEqual([]);
      const data = [{
        'id': 0,
        'tailNumber': 'N906AA',
        'flightNumber': 'AAL2372',
        'departureDate': '2019-01-24T00:03:55.000Z',
        'arrivalDate': '2019-01-24T00:48:44.000Z',
        'departureAirport': 'DFW',
        'arrivalAirport': 'SAT',
        'offloadReceived': 'NO'
      }];
      component.selection = {
        selected: data
      };
      component.getSelectedRows([]);
      expect(component.selectedRowObj.selectedRow ).toEqual(data);
  });

  it('getEvent should be defined', () => {
    component.selectedRowObj = {
      selectedIndex: 0,
      selectedRow: [
        {
           id: 1,
          'tailNumber': 'N906AA',
          'flightNumber': 'AAL2372',
          'departureDate': '2019-01-24T00:03:55.000Z',
          'arrivalDate': '2019-01-24T00:48:44.000Z',
          'departureAirport': 'DFW',
          'arrivalAirport': 'SAT',
          'offloadReceived': 'NO',
          isDarkFlight: 'N/A',
          openDate: '2019-01-24T00:48:44.000Z',
          closedDate: '2019-01-24T00:48:44.000Z',
          squawk: '',
          maintenaceAction: '',
          description: '',
          rootCause: '',
          maintenanceRecommendations: '',
          engineeringNotes: ''
        }
      ]
    };
    component.getEvent({moduleName: 'flight', eventName: 'edit'});
    expect(component.getEvent).toBeDefined();
  });

  it('updateFlightDetails should be defined', () => {
    component.flightObj = {
          isLoading: false,
          getAirlines: [{name: ''}],
          getTails: [{name : ''}],
          isFormSubmitted: false,
          isError: false,
          errorMsg: null,
          formSubmitted: false,
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
            openDate: new Date('2019-01-24T00:03:55.000Z'),
            closedDate: new Date('2019-01-24T00:03:55.000Z'),
            aircraftId: 445,
            flightNumber: '',
            departureDate: null,
            arrivalDate: null,
            departureAirport: '',
            arrivalAirport: '',
            flightDuration: null,
            insertDate: '',
            createdAt: '',
            getFlightDetails: {
              offloadReceived: ''
            }
          },
          getFlightDetails: {
            offloadReceived: ''
          }
        };
    component.id = 'aal';
    component.selectedRowObj = {
      selectedIndex: 0,
      selectedRow: [
        {
          id: 1,
          flightNumber: '	AAL1471',
          tailNumber: 'aal',
          arrivalAirport: '2019-02-15T14:23:00.000Z',
          departureDate: '2019-02-15T10:47:02.000Z'
        }
      ]
    };
    component.dataSource = {
      data: [{id: 1}]
    };
    component.modalRef = {
      close: function() {}
    };
    component.updateFlightDetails();
    expect(component.updateFlightDetails).toBeDefined();
  });
});
