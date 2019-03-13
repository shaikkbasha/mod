import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TailsComponent } from './tails.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { Observable, of } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';


describe('TailComponent', () => {
  let component: TailsComponent;
  let fixture: ComponentFixture<TailsComponent>;
  let flightService: FlightsService;
  const mockFlightsService = {
    getFlights(): Observable<any> {
      const response = [
        {
            'id': '1234',
            'flightNumber': '28',
            'departureAirport': 'LAX',
            'arrivalAirport': 'JFK',
            'startTime': '2019-01-14T21:32:15Z',
            'endTime': '2019-01-15T04:52:39Z'
        },
        {
            'id': '1234',
            'flightNumber': '29',
            'departureAirport': 'LAX',
            'arrivalAirport': 'JFK',
            'startTime': '2019-01-14T21:32:15Z',
            'endTime': '2019-01-15T04:52:39Z'
        }
      ];
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
      declarations: [ TailsComponent ],
      imports: [
        ArtefactModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        RouterTestingModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: FlightsService, useValue: mockFlightsService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flightService = TestBed.get(FlightsService);
  });

  it('should create', () => {
    const spy = spyOn(flightService, 'getFlights').and.callThrough();
    expect(component).toBeTruthy();
    flightService.getFlights('aal', '1', {fromDate: '', toDate: ''}).subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('getEvent should be defined', () => {
    component.getEvent('');
    expect(component.getEvent).toBeDefined();
  });

  it('flightsFilter should be defined', () => {
    component.flightsFilter('');
    expect(component.flightsFilter).toBeDefined();
  });

  it('processDate should be defined', () => {
    component.processDate(new Date(), new Date());
    expect(component.processDate).toBeDefined();
  });

  it('getSelectedDates should be defined', () => {
    component.getSelectedDates({fromDate: new Date(), toDate: new Date()});
    expect(component.getSelectedDates).toBeDefined();
  });


  it('selectedRow should be defined', () => {
    component.dataSource = {
      data: [{id : 1}],
      findIndex: 0
  };
    component.selectedRow();
    expect(component.selectedRow).toBeDefined();

    component.selection = {
      selected: [
        {
          'id': '1234',
          'flightNumber': '29',
          'departureAirport': 'LAX',
          'arrivalAirport': 'JFK',
          'startTime': '2019-01-14T21:32:15Z',
          'endTime': '2019-01-15T04:52:39Z'
        }
      ]
    };
    component.selectedRow();
    expect(component.selectedRow).toBeDefined();
  });



});
