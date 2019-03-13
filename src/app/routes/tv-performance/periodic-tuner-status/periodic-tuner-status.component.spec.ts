import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ArtActionToolBarComponent } from './../../../shared/modules/artactiontoolbar/artactiontoolbar.component';
import { SectionTitleComponent } from './../../../shared/modules/section-title/section-title.component';
import { FlightDetailsComponent } from './../../../shared/modules/flight-details/flight-details.component';
import { LabelValueComponent } from './../../../shared/modules/label-value/label-value.component';
import { PeriodicTunerStatusComponent } from './periodic-tuner-status.component';
import { PeriodicTunerStatusService } from './../../../shared/services/tv-performance/periodic-tuner-status/periodic-tuner-status.service';
import { TvPerformanceDataService } from './../../../shared/services/tv-performance/tv-performance-data.service';
import { FlightPhasePipe } from './../../../shared/pipes/tv-performance/flight-phase.pipe';


describe('PeriodicTunerStatusComponent', () => {
  let component: PeriodicTunerStatusComponent;
  let fixture: ComponentFixture<PeriodicTunerStatusComponent>;
  let periodicTunerService: PeriodicTunerStatusService;
  let dataService: TvPerformanceDataService;

  const mockPeriodicTunerService = {
    getPeriodicTunerData(): Observable<any> {
      const response = [
        {
          'timeStamp': '2019-01-18T05:21:22Z',
          '5-1': 'not_used',
          '5-2': 'not_used',
          '5-3': 'not_used',
          '5-4': 'not_used',
          '5-5': 'not_used',
          '5-6': 'not_used',
          '5-7': 'not_used',
          '5-8': 'not_used',
          '6-1': 'not_used',
          '6-2': 'not_used',
          '6-3': 'not_used',
          '6-4': 'not_used',
          '6-5': 'not_used',
          '6-6': 'not_used',
          '6-7': 'not_used',
          '6-8': 'not_used',
          '7-1': 'not_used',
          '7-2': 'not_used',
          '7-3': 'not_used',
          '7-4': 'not_used',
          '7-5': 'not_used',
          '7-6': 'not_used',
          '7-7': 'not_used',
          '7-8': 'not_used',
          '1-1': 'not_used',
          '1-2': 'not_used',
          '1-3': 'not_used',
          '1-4': 'not_used',
          '1-5': 'not_used',
          '1-6': 'not_used',
          '1-7': 'not_used',
          '1-8': 'not_used',
          '2-1': 'not_used',
          '2-2': 'not_used',
          '2-3': 'not_used',
          '2-4': 'not_used',
          '2-5': 'not_used',
          '2-6': 'not_used',
          '2-7': 'not_used',
          '2-8': 'not_used',
          '3-1': 'not_used',
          '3-2': 'not_used',
          '3-3': 'not_used',
          '3-4': 'not_used',
          '3-5': 'not_used',
          '3-6': 'not_used',
          '3-7': 'not_used',
          '3-8': 'not_used',
          '4-1': 'not_used',
          '4-2': 'not_used',
          '4-3': 'not_used',
          '4-4': 'not_used',
          '4-5': 'not_used',
          '4-6': 'not_used',
          '4-7': 'not_used',
          '4-8': 'not_used'
        },
        {
          'timeStamp': '2019-01-18T05:26:22Z',
          '5-1': 'not_used',
          '5-2': 'not_used',
          '5-3': 'not_used',
          '5-4': 'not_used',
          '5-5': 'not_used',
          '5-6': 'not_used',
          '5-7': 'not_used',
          '5-8': 'not_used',
          '6-1': 'not_used',
          '6-2': 'not_used',
          '6-3': 'not_used',
          '6-4': 'not_used',
          '6-5': 'not_used',
          '6-6': 'not_used',
          '6-7': 'not_used',
          '6-8': 'not_used',
          '7-1': 'not_used',
          '7-2': 'not_used',
          '7-3': 'not_used',
          '7-4': 'not_used',
          '7-5': 'not_used',
          '7-6': 'not_used',
          '7-7': 'not_used',
          '7-8': 'not_used',
          '1-1': 'not_used',
          '1-2': 'not_used',
          '1-3': 'not_used',
          '1-4': 'not_used',
          '1-5': 'not_used',
          '1-6': 'not_used',
          '1-7': 'not_used',
          '1-8': 'not_used',
          '2-1': 'not_used',
          '2-2': 'not_used',
          '2-3': 'not_used',
          '2-4': 'not_used',
          '2-5': 'not_used',
          '2-6': 'not_used',
          '2-7': 'not_used',
          '2-8': 'not_used',
          '3-1': 'not_used',
          '3-2': 'not_used',
          '3-3': 'not_used',
          '3-4': 'not_used',
          '3-5': 'not_used',
          '3-6': 'not_used',
          '3-7': 'not_used',
          '3-8': 'not_used',
          '4-1': 'not_used',
          '4-2': 'not_used',
          '4-3': 'not_used',
          '4-4': 'not_used',
          '4-5': 'not_used',
          '4-6': 'not_used',
          '4-7': 'not_used',
          '4-8': 'not_used'
        }];
      return Observable.of(response);
    },

    getPeriodicTunerDetails(): Observable<any> {
      const response = [{
        'timestamp': '2018-05-23T21:43:48Z',
        'authorized': 'true',
        'paired': 'true',
        'channelId': '0',
        'channelNumber': '0',
        'transponder': '0',
        'cnr': '-1.0',
        'agc': '-127.5'
      }];
      return Observable.of(response);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, NgbModule],
      declarations: [
        PeriodicTunerStatusComponent,
        ArtActionToolBarComponent,
        SectionTitleComponent,
        LabelValueComponent,
        FlightDetailsComponent,
        FlightPhasePipe
      ],
      providers: [
        { provide: PeriodicTunerStatusService, useValue: mockPeriodicTunerService },
        TvPerformanceDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicTunerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    periodicTunerService = TestBed.get(PeriodicTunerStatusService);
    dataService = TestBed.get(TvPerformanceDataService);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get flightDetails', () => {
    fixture.detectChanges();
    const response = {};
    const flightData = component.flightDetails;
    component.flightDetails = {};
    spyOn(dataService, 'getData').and.returnValue(of(response));
    fixture.detectChanges();
    dataService.sendData(flightData);
    component.ngOnInit();
    expect(Object.keys(component.flightDetails)).toContain('icao');
    expect(Object.keys(component.flightDetails)).toContain('id');
  });

  it('getPeriodicTunerData()', () => {
    component.tableData = [];
    component.getPeriodicTunerData();
    expect(component.tableData.length).toEqual(2);
  });

  it('getPeriodicTunerData()', () => {
    const timeStamp = '2018-05-23T21:43:48Z';
    const boardTuner = '2-3';
    component.tableData = [];
    component.getPeriodicTunerDetails(timeStamp, boardTuner);
    expect(Object.keys(component.tooltipData)).toContain('timestamp');
    expect(Object.keys(component.tooltipData)).toContain('agc');
  });
});
