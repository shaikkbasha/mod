import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverageService } from '../../../shared/services/coverage/airlinecoverage.service';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { AirlineCoverageComponent } from './airline-coverage.component';
import { CommonModule } from '@angular/common';

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
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';
describe('AirlineCoverageComponent', () => {
  const mockFlightService = {
    getFlightList(): Observable<any>  {
      const response = [{
                'tailNumber': 'N902AA',
                'flightNumber': 'AAL311',
                'departureDate': '2019-02-04T00:06:03.000Z',
                'arrivalDate': '2019-02-04T00:50:16.000Z',
                'departureAirport': 'SAT',
                'arrivalAirport': 'DFW',
                'offloadReceived': 'NO'
              }
      ];
      return Observable.of(response);
    }
  };
  let component: AirlineCoverageComponent;
  let fixture: ComponentFixture<AirlineCoverageComponent>;
  let coverageService: any = CoverageService;
  let flightService: any = FlightService;
  const httpClient: any = HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineCoverageComponent, MatSort],
      imports: [
        ArtefactModule,
        NgPipesModule,
        CommonModule,
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
        MatTabsModule


      ],
      providers: [CoverageService, HttpClientModule, HttpClient, FlightService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    coverageService = TestBed.get(CoverageService);
    flightService = TestBed.get(FlightService);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('filter should be defined', () => {
    component.coverageFilter('Coverage');
    expect(component.coverageFilter).toBeDefined();
  });
  it('getCoverageList', () => {

    coverageService.getCoverageList().subscribe(response => {
      expect(response).toEqual([
        {
          dateCount:
            '{2019-01-24: "0/2", 2019-01-25: "0/2", 2019-01-26: "0/5", 2019-01-27: "0/0"}',
          flights: '9',
          offloads: '0',
          percentage: '0',
          tail: 'N101NN'
        }
      ]); // Your expected builds array previously set in spy
    });
    component.getCoverageList();
    expect(component.isLoading).toBe(true);
  });
  it('should be define get filter data', () => {
    const filterData = {
      'title': 'MISSING OFFLOADS',
      'filterValue': '100',
      'filterKey': 'percentage',
      'count': 197,
      'datasource': {
        'dateCount':
          '{2019-01-24: "0/2", 2019-01-25: "0/2", 2019-01-26: "0/5", 2019-01-27: "0/0"}',
        'flights': '9',
        'offloads': '0',
        'percentage': '0',
        'tail': 'N101NN'
      }
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
  it('should check number', () => {
    component.checkNumber(12);

  });
  it('should check col name equal', () => {
    component.show('percentage', 'percentage');

  });
  it('should check col name not equal', () => {
    component.show('percentage', 'count');

  });
  it('should get class name', () => {
    component.getClass(90);
    component.getClass(70);
    component.getClass(0);
  });
  it('should check column exists', () => {
    component.isColumnExist('percentage');
  });

  it('getFlightList', () => {
    component.id = 'qal';
    const spy = spyOn(flightService, 'getFlightList').and.callThrough();
    component.fetchFlightLists();
    expect(spy).toHaveBeenCalled();
  });

  // it('should get flight list for selected  tail', () => {
  //   flightService.getFlightList(1, '', '', 'N101NN').subscribe(response => {
  //     expect(response).toEqual([
  //       {
  //         'tailNumber': 'N902AA',
  //         'flightNumber': 'AAL311',
  //         'departureDate': '2019-02-04T00:06:03.000Z',
  //         'arrivalDate': '2019-02-04T00:50:16.000Z',
  //         'departureAirport': 'SAT',
  //         'arrivalAirport': 'DFW',
  //         'offloadReceived': 'NO'
  //       }
  //     ]); // Your expected builds array previously set in spy
  //     component.fetchFlightLists();
  //     expect(component.isLoading).toBe(true);
  //   });
  // });

  it('fetchFlightLists', () => {
    component.id = 'qal';
    component.fromDate = '2018-10-09 10:10:10';
    component.toDate = '2018-10-09 10:10:10';
    component.selectedTail = 'N101NN';
    const spy = spyOn(flightService, 'getFlightList').and.callThrough();
    component.fetchFlightLists();
    expect(spy).toHaveBeenCalled();
  });

  it('should display the aircraft for the flight', () => {
    component.displayAircraftFlight('N101NN');
  });
});
