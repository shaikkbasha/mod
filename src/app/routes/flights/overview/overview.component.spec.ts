import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { OverviewComponent } from './overview.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConnectivityService } from '../../../shared/services/airline-flights/connectivity/connectivity.service';
import { RouterTestingModule } from '@angular/router/testing';
declare var vis: any;

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let connectivityService: ConnectivityService;
  const response = {
      'flightLeg': {
         'flightNumber': 'UAL264',
         'departureAirport': 'KDEN',
         'arrivalAirport': 'KSFO',
         'startTime': '2018-12-09T18:17:45Z',
         'endTime': '2018-12-09T22:16:17Z',
         'type' : 'OPP'
      },
      'flightPhases': [
         {
            'flightPhaseId': 1,
            'flightPhaseDescription': 'PRE-FLIGHT',
            'startTime': '2018-12-09T18:17:45.000Z',
            'endTime': '2018-12-09T19:06:43.000Z'
         },
      ],
     'statuses' : {
        'systemResetStatus' : 'ok',
        'headEndStatus' : 'ko',
        'firstClassStatus' : 'none',
        'businessClassStatus' : 'warning',
        'economyClassStatus' : 'none',
    }
  };
  const mockAntennaService = {
    getFlightDetails(): Observable<any> {
      return Observable.of(response);
    }
    ,
    setFlightNumber(): Observable<any> {
      return Observable.of({});
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
      declarations: [ OverviewComponent ],
      imports: [
        ArtefactModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ConnectivityService, useValue: mockAntennaService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    connectivityService = TestBed.get(ConnectivityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const spy = spyOn(connectivityService, 'getFlightDetails').and.callThrough();
    expect(component).toBeTruthy();
    const params = {
      tailNumber: '1',
      airlineIcao: 'aal',
      flightLegId: '1080'
    };
    connectivityService.getFlightDetails(params).subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
