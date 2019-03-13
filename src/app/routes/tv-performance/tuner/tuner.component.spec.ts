import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MatTableModule, MatCardModule, MatSortModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TunerComponent } from './tuner.component';
import { ArtActionToolBarComponent } from './../../../shared/modules/artactiontoolbar/artactiontoolbar.component';
import { SectionTitleComponent } from './../../../shared/modules/section-title/section-title.component';
import { FlightDetailsComponent } from './../../../shared/modules/flight-details/flight-details.component';
import { LabelValueComponent } from './../../../shared/modules/label-value/label-value.component';
import { TunerService } from './../../../shared/services/tv-performance/tuner/tuner.service';
import { TvPerformanceDataService } from './../../../shared/services/tv-performance/tv-performance-data.service';
import { FlightPhasePipe } from './../../../shared/pipes/tv-performance/flight-phase.pipe';

describe('TunerComponent', () => {
  let fixture: ComponentFixture<TunerComponent>;
  let component: TunerComponent;
  let tunerService: TunerService;
  let dataService: TvPerformanceDataService;

  const mockTunerService = {
    getTunerDetails(): Observable<any> {
      const response = [
        {
          'timeStamp': '2019-01-18T05:21:22Z',
          'flightPhase': 'PRE-FLIGHT',
          'boardNumber': 1,
          'tunerNumber': 1,
          'channelNumber': 0,
          'channelId': 0,
          'receiverId': '036625559012',
          'camId': '003805236126',
          'networkId': 0,
          'cnr': 0,
          'cnrLowThreshold': 0,
          'agc': -127.5,
          'lock': 'NOT_LOCKED',
          'transponder': 0,
          'centerFreq': 0,
          'paired': true,
          'authorized': true,
          'polarization': '',
          'antennaState': 'Tracking',
          'rssi': 1,
          'flightPhaseId': 1
        },
        {
          'timeStamp': '2019-01-18T05:26:22Z',
          'flightPhase': 'PRE-FLIGHT',
          'boardNumber': 1,
          'tunerNumber': 1,
          'channelNumber': 0,
          'channelId': 0,
          'receiverId': '036625559012',
          'camId': '003805236126',
          'networkId': 0,
          'cnr': 0,
          'cnrLowThreshold': 0,
          'agc': -127.5,
          'lock': 'NOT_LOCKED',
          'transponder': 0,
          'centerFreq': 0,
          'paired': true,
          'authorized': true,
          'polarization': '',
          'antennaState': 'Tracking',
          'rssi': 1.06,
          'flightPhaseId': 1
        }
      ];
      return Observable.of(response);
    },

    getTunerParameterDetails(): Observable<any> {
      const response = [
        {
          'timeStamp': '2019-01-18T05:21:22Z',
          'flightPhaseId': 1,
          'flightPhase': 'PRE-FLIGHT',
          '1-1': 1,
          '1-2': 2,
          '1-3': 1,
          '1-4': 2,
          '1-5': 1,
          '1-6': 2,
          '1-7': 1,
          '1-8': 2,
        },
        {
          'timeStamp': '2019-01-19T05:21:22Z',
          'flightPhaseId': 1,
          'flightPhase': 'PRE-FLIGHT',
          '1-1': 1,
          '1-2': 2,
          '1-3': 1,
          '1-4': 2,
          '1-5': 1,
          '1-6': 2,
          '1-7': 1,
          '1-8': 2,
        }
      ];
      return Observable.of(response);
    }

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatCardModule, FormsModule, HttpClientModule, MatSortModule, NgbModule],
      declarations: [
        TunerComponent,
        ArtActionToolBarComponent,
        SectionTitleComponent,
        LabelValueComponent,
        FlightDetailsComponent,
        FlightPhasePipe
      ],
      providers: [
        { provide: TunerService, useValue: mockTunerService },
        TvPerformanceDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tunerService = TestBed.get(TunerService);
    dataService = TestBed.get(TvPerformanceDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get flightDetails', () => {
    fixture.detectChanges();
    const response = {};
    const flightData = {
      'id': '5c580079e2a2aa00148ab66f',
      'tailNumber': 'N239JB',
      'flightNumber': '3006',
      'departureTime': '2019-01-18T05:21:22Z',
      'arrivalTime': '1970-01-01T00:00:00Z',
      'departureAirport': 'JFK',
      'arrivalAirport': 'ICN',
      'icao': 'jbu',
      'dateFormat': {}
    };
    component.flightDetails = {};
    spyOn(dataService, 'getData').and.returnValue(of(response));
    fixture.detectChanges();
    dataService.sendData(flightData);
    component.ngOnInit();
    expect(Object.keys(component.flightDetails)).toContain('icao');
    expect(Object.keys(component.flightDetails)).toContain('id');
  });

  it('should modify filterValue', () => {
    component.flightFilter('allFLight  ');
    expect(component.filterValue).toEqual('allflight');
    expect(component.dataSource.filter).toEqual('allflight');
  });

  it('should get tuner details', () => {
    component.flightDetails = {
      airlineIcao: 'aal',
      flightId: '5c011a1e53b7fd001fec504a'
    };
    component.boardFilter = 1;
    component.tunerFilter = 1;
    const spy = spyOn(tunerService, 'getTunerDetails').and.callThrough();
    component.getTunerDetails();
    expect(spy).toHaveBeenCalled();
  });

  it('should get tunerParamDetails', () => {
    component.flightDetails = {
      icao: 'aal',
      id: '5c011a1e53b7fd001fec504a'
    };
    component.tunerParam = '';
    component.paramBoardFilter = 2;
    const spy = spyOn(tunerService, 'getTunerParameterDetails').and.callThrough();
    component.getTunerParameterDetails('Cam Id');
    expect(component.tunerParam).toEqual('camId');
    expect(spy).toHaveBeenCalled();
  });

  it('should boardActiveFilterMouseDown truthy', () => {
    component.boardFilter = 2;
    component.tunerFilterMouseDown('board', 2);
    expect(component.boardMouseDownFilter).toEqual(2);
    expect(component.boardActiveFilterMouseDown).toBeTruthy();
  });

  it('should boardInActiveFilterMouseDown truthy', () => {
    component.boardFilter = 1;
    component.tunerFilterMouseDown('board', 2);
    expect(component.boardMouseDownFilter).toEqual(2);
    expect(component.boardInActiveFilterMouseDown).toBeTruthy();
  });

  it('should call based on tunerView', () => {
    component.flightDetails = {
      'id': '5c580079e2a2aa00148ab66f',
      'tailNumber': 'N239JB',
      'flightNumber': '3006',
      'departureTime': '2019-01-18T05:21:22Z',
      'arrivalTime': '1970-01-01T00:00:00Z',
      'departureAirport': 'JFK',
      'arrivalAirport': 'ICN',
      'icao': 'jbu',
      'dateFormat': {}
    };
    component.tunerView = 'boardTuner';
    const spy = spyOn(component, 'getTunerDetails').and.callThrough();
    component.tunerFilterOption();
    expect(spy).toHaveBeenCalled();
  });

  it('should call based on tunerView', () => {
    component.flightDetails = {
      'id': '5c580079e2a2aa00148ab66f',
      'tailNumber': 'N239JB',
      'flightNumber': '3006',
      'departureTime': '2019-01-18T05:21:22Z',
      'arrivalTime': '1970-01-01T00:00:00Z',
      'departureAirport': 'JFK',
      'arrivalAirport': 'ICN',
      'icao': 'jbu',
      'dateFormat': {}
    };
    component.tunerView = 'parameter';
    component.tunerParamFilters = ['camId'];
    const spy = spyOn(component, 'getTunerParameterDetails').and.callThrough();
    component.tunerFilterOption();
    expect(component.tunerParam).toEqual('camId');
    expect(spy).toHaveBeenCalled();
  });

  it('should tunerActiveFilterMouseDown truthy', () => {
    component.tunerFilter = 2;
    component.tunerFilterMouseDown('tuner', 2);
    expect(component.tunerMouseDownFilter).toEqual(2);
    expect(component.tunerActiveFilterMouseDown).toBeTruthy();
  });

  it('should boardInActiveFilterMouseDown truthy', () => {
    component.tunerFilter = 1;
    component.tunerFilterMouseDown('tuner', 2);
    expect(component.tunerMouseDownFilter).toEqual(2);
    expect(component.tunerInActiveFilterMouseDown).toBeTruthy();
  });

  it('should make falsy all tuner board boolean properties', () => {
    component.tunerFilterMouseUp();
    expect(component.boardActiveFilterMouseDown).toBeFalsy();
    expect(component.boardInActiveFilterMouseDown).toBeFalsy();
    expect(component.tunerActiveFilterMouseDown).toBeFalsy();
    expect(component.tunerInActiveFilterMouseDown).toBeFalsy();
  });
});
