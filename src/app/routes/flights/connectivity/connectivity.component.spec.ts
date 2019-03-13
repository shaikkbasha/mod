import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { LabelValueComponent } from '../../../shared/modules/label-value/label-value.component';
import { FlightDetailsComponent } from '../../../shared/modules/flight-details/flight-details.component';
import { ConnectivityComponent } from './connectivity.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConnectivityService } from '../../../shared/services/airline-flights/connectivity/connectivity.service';
import { RouterTestingModule } from '@angular/router/testing';
declare var vis: any;

describe('ConnectivityComponent', () => {
  let component: ConnectivityComponent;
  let fixture: ComponentFixture<ConnectivityComponent>;
  let connectivityService: ConnectivityService;
  const response = {
    'flightLeg': {
        'id': '1',
        'flightNumber': '28',
        'departureAirport': 'LAX',
        'arrivalAirport': 'JFK',
        'startTime': '2019-03-13T21:32:15Z',
        'endTime': '2019-03-14T04:52:39Z'
    },
    'flightPhases': [
        {
          'flightPhaseId': '8',
          'flightPhaseDescription': 'CLIMB',
          'startTime': '2019-03-14T22:47:41',
          'endTime': '2019-03-14T22:48:21'
        },
        {
          'flightPhaseId': '7',
          'flightPhaseDescription': 'CLIMB 4',
          'startTime': '2019-02-14T22:47:41',
          'endTime': '2019-02-14T22:48:21'
        },
        {
          'flightPhaseId': '6',
          'flightPhaseDescription': 'CLIMB 6',
          'startTime': '2019-01-14T22:47:41',
          'endTime': '2019-01-15T23:20:46'
        }

    ],
    'kaEvents': [
        {
          'eventType': 'CRUEventHealth',
          'eventName': 'HotspotEnable',
          'eventData': '1',
          'eventTime': '2019-01-13T23:15:46z'
        },
        {
          'eventType': 'CRUEventHealth',
          'eventName': 'SwitchCommFault',
          'eventData': '1',
          'eventTime': '2019-01-14T23:40:46z'
        },
        {
          'eventType': 'CRUEventHealth',
          'eventName': 'LkmsConnect',
          'eventData': '0',
          'eventTime': '2019-01-15T23:20:46z'
        }
    ]
  };
  const mockConnectivityService = {
    getKAlogDetails(): Observable<any> {
      return Observable.of(response);
    },
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
      declarations: [ ConnectivityComponent ],
      imports: [
        ArtefactModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ConnectivityService, useValue: mockConnectivityService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectivityComponent);
    component = fixture.componentInstance;
    connectivityService = TestBed.get(ConnectivityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const spy = spyOn(connectivityService, 'getKAlogDetails').and.callThrough();
    expect(component).toBeTruthy();
    const params = {
      tailNumber: '1',
      airlineIcao: 'aal',
      flightLegId: '1080'
    };
    connectivityService.getKAlogDetails(params).subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('antennaFilter should be defined', () => {
    component.antennaFilter('');
    expect(component.antennaFilter).toBeDefined();
  });

  it('getEvent should be defined', () => {
    component.getEvent('');
    expect(component.getEvent).toBeDefined();
  });


  it('getFlightPhaseOrder should be defined', () => {
    component.getFlightPhaseOrder(1);
    component.getFlightPhaseOrder(2);
    component.getFlightPhaseOrder(3);
    component.getFlightPhaseOrder(4);
    component.getFlightPhaseOrder(5);
    component.getFlightPhaseOrder(6);
    component.getFlightPhaseOrder(7);
    component.getFlightPhaseOrder(8);
    component.getFlightPhaseOrder(9);
    component.getFlightPhaseOrder(10);
    expect(component.getFlightPhaseOrder).toBeDefined();
  });

  it('initializeVISTimeline should be defined', () => {
    component.initializeVISTimeline(response);
    expect(component.initializeVISTimeline).toBeDefined();
  });
});
