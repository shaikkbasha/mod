import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AirlineTailService } from '../../../shared/services/tails/airlinetails.service';
import { AirlineTailsComponent } from './airline-tails.component';
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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtefactModule } from '../../../shared/artefact.module';

describe('AirlineTailsComponent', () => {

  let component: AirlineTailsComponent;
  let fixture: ComponentFixture<AirlineTailsComponent>;
  let airlineTailService: any = AirlineTailService;
  const mockAirlineTailService = {
    getAircraftlist(): Observable<any>  {
      const response = [{
          'id': 176,
          'repairTailName': '31214',
          'noseNumber': '3MJ',
          'msn': 31214,
          'type': 'B737',
          'airlineId': 8,
          'databaseName': 'AAL_N967NN',
          'platform': 'AVANT',
          'software': 'v2.2.1',
          'systemResetStatus': 0,
          'headEndStatus': 0,
          'firstClassStatus': -1,
          'businessClassStatus': -1,
          'economyClassStatus': -1,
          'connectivityStatus': -1,
          'status': 0,
          'isp': null,
          'acConfiguration': 'B737',
          'eis': '2015-03-12',
          'configStatus': '',
          'lfrf': '',
          'swPartNo': '',
          'swBaseline': 'PI4',
          'swInstalled': '2017-04-02',
          'mapVersion': '',
          'content': '',
          'createdAt': null,
          'updatedAt': null,
          'tailNumber': 'N967NN'
        },
        {
          'id': 261,
          'repairTailName': 'H5827',
          'noseNumber': '013',
          'msn': 5827,
          'type': 'A319',
          'airlineId': 8,
          'databaseName': 'AAL_N9013A',
          'platform': 'AVANT',
          'software': 'v2.2.1',
          'systemResetStatus': 0,
          'headEndStatus': 0,
          'firstClassStatus': -1,
          'businessClassStatus': -1,
          'economyClassStatus': -1,
          'connectivityStatus': -1,
          'status': 0,
          'isp': 'NONE',
          'acConfiguration': 'A319',
          'eis': '2013-11-21',
          'configStatus': 'ok',
          'lfrf': '',
          'swPartNo': '',
          'swBaseline': 'PI4',
          'swInstalled': '2017-07-07',
          'mapVersion': '',
          'content': '',
          'createdAt': null,
          'updatedAt': null,
          'tailNumber': 'N9013A'
        }
      ];
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
      declarations: [AirlineTailsComponent, MatSort],
      imports: [
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        ArtefactModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AirlineTailService, useValue: mockAirlineTailService },
        { provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineTailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    airlineTailService = TestBed.get(AirlineTailService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get router param', () => {
    const spy = spyOn(component, 'getAircraftList');
    component.ngOnInit();
    expect(component.id).toEqual('qal');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should modify filterValue', () => {
    component.aircraftTailsFilter('allFLight  ');
    expect(component.dataSource.filter).toEqual('allflight');
  });

  it('getAircraftList', () => {
    component.id = 'qal';
    const spy = spyOn(airlineTailService, 'getAircraftlist').and.callThrough();
    component.getAircraftList();
    expect(spy).toHaveBeenCalled();
  });
});
