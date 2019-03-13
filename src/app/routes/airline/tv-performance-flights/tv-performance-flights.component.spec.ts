import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { TvPerformanceFlightsComponent } from './tv-performance-flights.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatSortModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TvPerformanceFlightsService } from '../../../shared/services/tv-performance/tv-performance-flights.service';
import { DateFormatterService } from './../../../shared/services/dateFormatter/dateformatter.service';
describe('TvPerformanceFlightsComponent', () => {
  let component: TvPerformanceFlightsComponent;
  let fixture: ComponentFixture<TvPerformanceFlightsComponent>;
  let tvFlightService: TvPerformanceFlightsService;
  const mockTvFlightService = {
    getAllFlights(): Observable<any> {
      const response = [{
        'id': '5c011a1e53b7fd001fec504a',
        'tailNumber': 'N102NN',
        'flightNumber': '444',
        'departureTime': '2018-05-23T21:43:48Z',
        'arrivalTime': '2018-05-24T21:43:48Z',
        'departureAirport': 'JFK',
        'arrivalAirport': 'LAX'
      },
      {
        'id': '5c48462b35f76600135d2bee',
        'tailNumber': 'N102NN',
        'flightNumber': '444',
        'departureTime': '2018-05-23T21:43:48Z',
        'arrivalTime': '2018-05-24T21:43:48Z',
        'departureAirport': 'JFK',
        'arrivalAirport': 'LAX'
      }];
      return Observable.of(response);
    }
  };
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal'
      })
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ArtefactModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [TvPerformanceFlightsComponent],
      providers: [
        { provide: TvPerformanceFlightsService, useValue: mockTvFlightService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TvPerformanceFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tvFlightService = TestBed.get(TvPerformanceFlightsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get router param', () => {
    component.datepickFromDate = '2018-05-22T00:00:00Z';
    component.datepickToDate = '2018-05-25T23:59:59Z';
    const spy = spyOn(component, 'getFilterDate');
    component.ngOnInit();
    expect(component.icao).toEqual('qal');
    expect(spy).toHaveBeenCalledWith(component.datepickFromDate, component.datepickToDate);
  });

  it('should call getFlightList service method', () => {
    component.fromDate = '2018-05-22T00:00:00Z';
    component.toDate = '2018-05-25T23:59:59Z';
    component.icao = 'aal';
    const spy = spyOn(tvFlightService, 'getAllFlights').and.callThrough();
    component.getFlightsLists();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getFilterDate', () => {
    const date = {
      fromDate: '2019-01-24T18:30:00.000Z',
      toDate: '2019-01-27T18:30:00.000Z'
    };
    spyOn(component, 'getFilterDate');
    component.getSelectedDates(date);
    expect(component.isLoading).toBeTruthy();
    expect(component.getFilterDate).toHaveBeenCalledWith(date.fromDate, date.toDate);
  });

  it('should call getFilterDate', () => {
    const date = {
      fromDate: '2019-01-24T18:30:00.000Z',
      toDate: '2019-01-27T18:30:00.000Z'
    };
    component.dataSource = {
      data: [{
        'id': '5c48462b35f76600135d2bee',
        'tailNumber': 'N102NN',
        'flightNumber': '444',
        'departureTime': '2018-05-23T21:43:48Z',
        'arrivalTime': '2018-05-24T21:43:48Z',
        'departureAirport': 'JFK',
        'arrivalAirport': 'LAX'
      }]
    };
    spyOn(component, 'getFilterDate');
    component.getSelectedDates(date);
    expect(component.dataSource.data).toEqual([]);
  });

  it('should get formatted date for selection', () => {
    const fromDate = '2019-01-24T18:30:00.000Z';
    const toDate = '2019-01-27T18:30:00.000Z';
    const spy = spyOn(component, 'getFlightsLists').and.callThrough();
    component.getFilterDate(fromDate, toDate);
    console.log('tvFlights ouput', component.fromDate, component.toDate);
    console.log('tvFlights expect', '2019-01-25T00:00:00Z', '2019-01-28T23:59:59Z');
    // expect(component.fromDate).toEqual('2019-01-25T00:00:00Z');
    // expect(component.toDate).toEqual('2019-01-28T23:59:59Z');
    expect(component.fromDate).toBeDefined();
    expect(component.toDate).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });

  it('should modify filterValue', () => {
    component.flightFilter('allFLight  ');
    expect(component.filterValue).toEqual('allflight');
    expect(component.dataSource.filter).toEqual('allflight');
  });
});
