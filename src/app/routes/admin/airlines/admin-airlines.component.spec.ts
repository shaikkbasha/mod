import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  getTestBed
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AdminAirlinesComponent } from './admin-airlines.component';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
import {
  HttpClientModule,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';

describe('AdminAirlineComponent', () => {
  let component: AdminAirlinesComponent;
  let fixture: ComponentFixture<AdminAirlinesComponent>;
  let airlineService: AirlineService;
  const mockAirlineService = {
    getAirlines(): Observable<any> {
      const response = [
        {
          'id': 1,
          'name': 'Qatar',
          'acronym': 'QTR',
          'status': 1,
          'icao': 'QTR',
          'iata': 'AA',
          'createdAt': '2019-01-30 18:12:49',
          'updatedAt': '2019-01-30 18:12:51'
        },
        {
          'id': 2,
          'name': 'Emirates',
          'acronym': 'UAE',
          'status': 1,
          'icao': 'UAE',
          'iata': 'AA',
          'createdAt': '2019-01-30 18:12:51',
          'updatedAt': '2019-01-30 18:12:52'
        }
      ];
      return Observable.of(response);
    },
    create(postParam): Observable<any> {
      const response = { 'id': 61, 'name': 'Airline', 'acronym': 'ALL', 'status': 0, 'icao': 'aln', 'iata': 'da',
      'createdAt': '2019-02-05 10:03:16', 'updatedAt': '2019-02-05 10:03:16'};
      return Observable.of(response);
    },
    delete(postParam): Observable<any> {
      return Observable.of(null);
    },
    update(postParam) {
      const response = { 'id': 71, 'name': 'asw', 'acronym': 'we', 'status': 0, 'icao': 'sa', 'iata': 'bd', 'createdAt': null,
      'updatedAt': '2019-02-06 09:38:11'};
      return Observable.of(response);
    }
  };

  beforeEach(async(() => {
    // const airlineService = jasmine.createSpyObj('AirlineService', ['getAirlines', 'create', 'update', 'delete']);
    TestBed.configureTestingModule({
      declarations: [AdminAirlinesComponent],
      imports: [
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgbModule
      ],
      providers: [
        { provide: AirlineService, useValue: mockAirlineService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    airlineService = TestBed.get(AirlineService);
  });

  afterEach(function() {
    TestBed.resetTestingModule();
  });

  it('should create AirlineComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return the airline lists', () => {
      const spy = spyOn(airlineService, 'getAirlines').and.callThrough();
      component.getAirlinesList();
      expect(spy).toHaveBeenCalled();
    });

  it('should modify filterValue', () => {
    component.airlineFilter('allFLight  ');
    expect(component.dataSource.filter).toEqual('allflight');
  });

  it('closeModal should be defined', () => {
    component.airLineObj.modalRef = {
      close: function() {}
    };
    component.closeModal();
    expect(component.closeModal).toBeDefined();
  });

  it('resetFormData should be defined', () => {
    component.resetFormData();
    expect(component.airLineObj.formSubmitted).toBeFalsy();
  });

  it('getEvent edit should be defined', () => {
    const data = [{
        name: 'Test',
        acronym: 'Test',
        icao: '1',
        iata: '2',
        id: 1
      }];
    component.selection = {
      selected: data
    };
    component.airLineObj.selectedRow = data;
    component.getEvent({ moduleName: 'airline', eventName: 'edit' });
    expect(component.airLineObj.enableDelete).toBeFalsy();
  });
  it('getEvent create should be defined', () => {
    component.selection = {
      selected: [{
          name: 'Test',
          acronym: 'Test',
          icao: '1',
          iata: '2',
          id: 1
        }]
    };
    component.getEvent({ moduleName: 'airline', eventName: 'create' });
    expect(component.airLineObj.enableDelete).toBeFalsy();
  });
  it('getEvent delete should be defined', () => {
    component.selection = {
      selected: [{
          name: 'Test',
          acronym: 'Test',
          icao: '1',
          iata: '2',
          id: 1
        }]
    };
    component.getEvent({ moduleName: 'airline', eventName: 'delete' });
    expect(component.airLineObj.enableDelete).toBeTruthy();
  });
  it('should create airline', () => {
    component.airLineObj.formObj = {
      value : { name: 'Airline', acronym: 'ALL', icao: 'aln', iata: 'da', id: ''},
      reset() {
      }
    };
    const spy = spyOn(airlineService, 'create').and.callThrough();
    airlineService.create(component.airLineObj.formObj.value).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.createAirline();
  });

  it('should update airLineObj.selectedRow in selectedRow()', () => {

    component.selection = {
      selected : [{'id': 26, 'name': 'Aeroflot', 'acronym': 'AFL', 'status': -1,
      'icao': null, 'iata': null, 'createdAt': null, 'updatedAt': null}]
    };
    component.selectedRow();
    expect(component.airLineObj.selectedRow).toEqual(component.selection.selected);
  });

  it('should update airLineObj.selectedRow in selectedRow()', () => {

    component.selection = {
      selected : []
    };
    component.selectedRow();
    expect(component.airLineObj.selectedRow).toEqual(component.selection.selected);
  });
  it('should update airline', () => {
    component.airLineObj.selectedRow = [
       { id: 71, name: 'asw', acronym: 'we', icao: 'sa', iata: 'bd'}
      ];
    const spy = spyOn(airlineService, 'update').and.callThrough();
    airlineService.update(component.airLineObj.formObj.value).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.updateAirline();
  });

  it('should delete airline', () => {
    component.airLineObj.selectedRow = [
      { id: 71, name: 'asw', acronym: 'we', icao: 'sa', iata: 'bd' }
    ];
    const spy = spyOn(airlineService, 'delete').and.callThrough();
    airlineService.delete(component.airLineObj.formObj.value).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.deleteAirline();
  });

  it('should handle error from API', () => {

    const error = {
      message: 'error',
      error_description: 'error occured'
    };
    component.airlineOperationErrorHandler(error);
    expect(component.airLineObj.isFormSubmitted).toBeFalsy();
    expect(component.airLineObj.formObj.isError).toBeTruthy();
    expect(component.airLineObj.formObj.errorMsg).toEqual(error.message);
  });
  it('should handle error_description from API', () => {
    const error = {
      error_description: 'error occured'
    };
    component.airlineOperationErrorHandler(error);
    expect(component.airLineObj.formObj.errorMsg).toEqual(error.error_description);
  });

  // xit('should call updateAirline from airlineFormSubmit()', () => {
  //   component.airLineObj.formObj = {
  //     value : {
  //       id: 78
  //     },
  //     reset: function() {}
  //   };
  //   const spy = spyOn(component, 'updateAirline').and.callThrough();
  //   component.airlineFormSubmit();
  //   expect(spy).toHaveBeenCalled();
  // });
  // xit('should call createAirline from airlineFormSubmit()', () => {
  //   component.airLineObj.formObj = {
  //     value : {
  //       id: ''
  //     },
  //     reset: function() {}
  //   };
  //   const spy = spyOn(component, 'createAirline').and.callThrough();
  //   component.airlineFormSubmit();
  //   expect(spy).toHaveBeenCalled();
  // });
});
