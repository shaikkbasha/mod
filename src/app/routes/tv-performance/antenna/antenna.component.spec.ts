import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AntennaComponent } from './antenna.component';
import { MatTableModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';
import { FilterButtonComponent } from './../../../shared/modules/filterbutton/filterbutton.component';
import { ArtActionToolBarComponent } from './../../../shared/modules/artactiontoolbar/artactiontoolbar.component';
import { ArtKpiCardComponent } from './../../../shared/modules/art-kpi-card/art-kpi-card.component';
import { LabelValueComponent } from './../../../shared/modules/label-value/label-value.component';
import { SectionTitleComponent } from './../../../shared/modules/section-title/section-title.component';
import { FlightDetailsComponent } from './../../../shared/modules/flight-details/flight-details.component';
import { AntennaService } from './../../../shared/services/tv-performance/antenna/antenna.service';
import { TvPerformanceDataService } from './../../../shared/services/tv-performance/tv-performance-data.service';
import { EtiPipe } from './../../../shared/pipes/tv-performance/eti.pipe';
import { FlightPhasePipe } from './../../../shared/pipes/tv-performance/flight-phase.pipe';

describe('AntennaComponent', () => {
  let fixture: ComponentFixture<AntennaComponent>;
  let component: AntennaComponent;
  let antennaService: AntennaService;
  let dataService: TvPerformanceDataService;
  const mockAntennaService = {
    getAntennaDetails(): Observable<any> {
      const response = [
        {
          'timeStamp': '2019-01-18T05:21:22Z',
          'flightPhase': 'PRE-FLIGHT',
          'antennaType': 'EMS',
          'eti': '57559.8',
          'latitude': '33.66367',
          'longitude': '-117.759026',
          'altitude': 37.7,
          'rssi': 0.1,
          'heading': 0,
          'speed': 0.1,
          'antennaState': 'Tracking',
          'commState': 'GOOD',
          'azimuth': 327.18,
          'elevation': 49.37,
          'bitFlag': 'fffe',
          'unixTime': '2019-01-18T05:19:48Z',
          'controllerState': 'TRACKING_STABLE',
          'flightPhaseId': 1,
          'event': ''
        },
        {
          'timeStamp': '2019-01-18T05:26:22Z',
          'flightPhase': 'PRE-FLIGHT',
          'antennaType': 'EMS',
          'eti': '57859.7',
          'latitude': '33.663662',
          'longitude': '-117.75897',
          'altitude': 35.7,
          'rssi': 1.06,
          'heading': 0,
          'speed': 0.1,
          'antennaState': 'Tracking',
          'commState': 'GOOD',
          'azimuth': 327.38,
          'elevation': 49.85,
          'bitFlag': 'fffe',
          'unixTime': '2019-01-18T05:24:48Z',
          'controllerState': 'TRACKING_STABLE',
          'flightPhaseId': 1,
          'event': ''
        }
      ];
      return Observable.of(response);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatCardModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ChartModule
      ],
      declarations: [
        AntennaComponent,
        FilterButtonComponent,
        ArtActionToolBarComponent,
        ArtKpiCardComponent,
        SectionTitleComponent,
        FlightDetailsComponent,
        LabelValueComponent,
        EtiPipe,
        FlightPhasePipe
      ],
      providers: [
        {provide : AntennaService, useValue: mockAntennaService },
        TvPerformanceDataService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    antennaService = TestBed.get(AntennaService);
    dataService = TestBed.get(TvPerformanceDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get flightDetails', () => {

    fixture.detectChanges();
    const response = {};
    component.flightDetails = {};
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
    spyOn(dataService, 'getData').and.returnValue(of(response));
    fixture.detectChanges();
    dataService.sendData(flightData);
    component.ngOnInit();
    expect(Object.keys(component.flightDetails)).toContain('icao');
    expect(Object.keys(component.flightDetails)).toContain('id');
  });

  it('should get antennaList', () => {
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
    const spy = spyOn(antennaService, 'getAntennaDetails').and.callThrough();
    component.getAntennaList();
    expect(spy).toHaveBeenCalled();
  });


  it('displayedCoulmnList should not be empty', () => {
    mockAntennaService.getAntennaDetails().subscribe(res => {
      component.tableData = res;
    });
    component.getAllColumns();
    expect(component.dataSource.data).toEqual(component.tableData);
    expect(component.dataSource.sort).toEqual(component.sort);
  });

  it('rssi min max', () => {
    mockAntennaService.getAntennaDetails().subscribe(res => {
      component.tableData = res;
    });
    component.findRSSIValue();
    expect(component.rssiRange['highest']).toEqual(1.06);
    expect(component.rssiRange['lowest']).toEqual(0.1);
  });

  it('should get filtered data', (done) => {
    const data = {};
    mockAntennaService.getAntennaDetails().subscribe(res => {
      data['dataSource'] = res;
    });
    component.getFilteredData(data);
    expect(component.dataSource.data).toEqual([]);
    const timer = setTimeout(() => {
      component.dataSource.data = [];
      expect(Object.keys(component.dataSource)).toContain('data');
      clearTimeout(timer);
      done();
    }, 502);
  });
  it('should modify filterValue', () => {
    component.flightFilter('allFLight  ');
    expect(component.filterValue).toEqual('allflight');
    expect(component.dataSource.filter).toEqual('allflight');
  });
});
