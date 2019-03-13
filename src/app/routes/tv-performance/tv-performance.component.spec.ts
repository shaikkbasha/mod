import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TvPerformanceComponent } from './tv-performance.component';
import { TvPerformanceDataService } from '../../shared/services/tv-performance/tv-performance-data.service';
import { SectionTitleComponent } from './../../shared/modules/section-title/section-title.component';
import { LabelValueComponent } from './../../shared/modules/label-value/label-value.component';
import { AntennaService } from '../../shared/services/tv-performance/antenna/antenna.service';

describe('TvPerformanceComponent', () => {
  let component: TvPerformanceComponent;
  let fixture: ComponentFixture<TvPerformanceComponent>;
  let dataService: TvPerformanceDataService;
  let antennaService: AntennaService;
  const mockTvAntennaService = {
    getFlightDetails(): Observable<any> {
      const response = {
        'id': '5c48462b35f76600135d2bee',
        'tailNumber': 'N102NN',
        'flightNumber': '444',
        'departureTime': '2018-05-23T21:43:48Z',
        'arrivalTime': '2018-05-24T21:43:48Z',
        'departureAirport': 'JFK',
        'arrivalAirport': 'LAX'
      };
      return Observable.of(response);
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [TvPerformanceComponent, SectionTitleComponent, LabelValueComponent],
      providers: [
        TvPerformanceDataService,
        { provide: AntennaService, useValue: mockTvAntennaService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    antennaService = TestBed.get(AntennaService);
    dataService = TestBed.get(TvPerformanceDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFlightDetails', () => {
    const spy = spyOn(component, 'getFlightDetails').and.callThrough();
    const dataSpy = spyOn(dataService, 'sendData').and.callThrough();
    component.ngOnInit();
    expect(component.airlineIcao).toEqual('qal');
    expect(component.flightId).toEqual('abcd123');
    expect(dataSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should get the flight details', () => {
    const spy = spyOn(antennaService, 'getFlightDetails').and.callThrough();
    component.getFlightDetails();
    expect(spy).toHaveBeenCalled();
    expect(Object.keys(component.flightDetails)).toContain('id');
    expect(Object.keys(component.flightDetails)).toContain('flightNumber');
    expect(Object.keys(component.flightDetails)).toContain('departureTime');
    expect(Object.keys(component.flightDetails)).toContain('arrivalTime');
    expect(Object.keys(component.flightDetails)).toContain('departureAirport');
    expect(Object.keys(component.flightDetails)).toContain('arrivalAirport');
  });

});
