import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OffloadService } from '../../../shared/services/offloads/airlineoffloads.service';
import { AirlineOffloadsComponent } from './airline-offloads.component';
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
import { ActivatedRoute } from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AirlineOffloadsComponent', () => {
  const mockAirlineOffloadService = {
    getOffloadList(): Observable<any>  {
      const response = [{
        airlineId : '8',
        arrivalAirport: null,
        departureAirport: null,
        failureReason: null,
        fileName: 'TVPERF_20190820002652_AAL_N344PP_705.tgz',
        fileSize: '112695',
        flightLegEndTime: null,
        flightLegIds: null,
        flightLegStartTime : null,
        flightNumber: null,
        id: '115600',
        offloadDate: null,
        oppFileFound: 'false',
        remarks: 'File processed successfully',
        source: 'Manual',
        status: 'Processed',
        tailNumber: null,
        tailNumberInFile: null,
        tailNumberSource: null,
        uploadedTime: '2019-01-24T07:01:24.000Z'
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
  let component: AirlineOffloadsComponent;
  let fixture: ComponentFixture<AirlineOffloadsComponent>;
  let offloadService: any = OffloadService;

  const httpClient: any = HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineOffloadsComponent, MatSort],
      imports: [
        NgPipesModule,
        ArtefactModule,
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
      providers: [OffloadService, HttpClientModule, HttpClient,
        { provide: ActivatedRoute, useValue: activatedRoute},
        { provide: OffloadService, useValue: mockAirlineOffloadService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineOffloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    offloadService = TestBed.get(OffloadService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should get router param', () => {
    const spy = spyOn(component, 'fetchOffLoads');
    component.ngOnInit();
    expect(component.id).toEqual('qal');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should modify filterValue', () => {
    component.offloadFilter('alloffloads  ');
    expect(component.dataSource.filter).toEqual('alloffloads');
  });
  it('fetchOffLoads', () => {
    component.id = 'qal';
    component.fromDate = '2018-10-09 10:10:10';
    component.toDate = '2018-10-09 10:10:10';
    const spy = spyOn(offloadService, 'getOffloadList').and.callThrough();
    component.fetchOffLoads();
    expect(spy).toHaveBeenCalled();
  });
  it('should be define get filter data', () => {
    const filterData = {
      'fromDate': '2019-01-23T18:30:00.000Z',
      'toDate': '2019-01-24T18:30:00.000Z'
    };
    component.getSelectedDates(filterData);
  });
  xit('should get filtered data', (done) => {
    const data = {};
    offloadService.getOffloadList().subscribe(res => {
    });
    component.getFilteredData(data);
    expect(component.dataSource.data).toEqual([]);
    const timer = setTimeout(() => {
      component.dataSource.data = [];
      expect(Object.keys(component.dataSource)).toContain('_data');
      clearTimeout(timer);
      done();
    }, 502);
  });
});
