import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepairsService } from './../../../shared/services/repair/repairs/repairs.service';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from './../../../shared/services/dateFormatter/dateformatter.service';
import { RepairOverveiwComponent } from './repair-overveiw.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule
} from '@angular/material';

describe('Repair Overview Component', () => {
  let component: RepairOverveiwComponent;
  let fixture: ComponentFixture<RepairOverveiwComponent>;
  let repairService: RepairsService;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockRepairService = {
    getRepair(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getLruName(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    ReasonRemoval(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getMaintenanceStationlist(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getLruPartNumber(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    createRemoval(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getTails(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getAirlinelist(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getLru(data: any): Observable<any> {
      const responed = [
        {
          'id': 31,
          'removalDate': '2019-01-23 04:50:14',
          'maintenanceStationId': 21,
          'lruPartNumberId': 38,
          'serialNumberOFF': 'A0123456',
          'serialNumberON': 'A1234560',
          'modDotIn': null,
          'otherReasonOfRemoval': null,
          'aircraftId': 889,
          'createdAt': '2019-01-23 04:50:14',
          'updatedAt': '2019-01-23 04:50:14',
          'airlineName': 'HZ-AK35',
          'tailSign': 'Saudia Airlines',
          lruPartNumber: {
            'id': 38,
            'lruPartNumber': '183330-101',
            'partNumberId': 1,
            'createdAt': '2019-02-14 09:16:43',
            'updatedAt': '2019-02-14 09:16:43'
          },
          maintenanceStation: {
            'id': 21,
            'fullName': 'Servo Data 3',
            'shortName': 'LHR',
            'locationName': 'dfgdg',
            'createdAt': '2019-02-13 06:24:54',
            'updatedAt': '2019-02-13 06:24:54',
          },
          reasonOfRemoval: {
            'id': 31,
            'lruTypeId': 40,
            'description': 'Blank Screen',
            'allPN': true,
            'createdAt': '2019-01-31 10:35:51',
            'updatedAt': '2019-01-31 10:35:51'
          }
        }

      ];
      return Observable.of(responed);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepairOverveiwComponent],
      imports: [
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatIconModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatTabsModule,
        BrowserAnimationsModule,
        NgbModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: RepairsService, useValue: mockRepairService },
        ToastrService, { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairOverveiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    repairService = TestBed.get(RepairsService);
  });

  afterEach(function () {
    TestBed.resetTestingModule();
  });
  it('should return the repair lists', () => {
    const spy = spyOn(repairService, 'getRepair').and.callThrough();
    component.repairList();
    expect(spy).toHaveBeenCalled();
  });
  it('should return the removal lists', () => {
    const spy = spyOn(repairService, 'getLru').and.callThrough();
    component.getLruSerial('10');
    expect(spy).toHaveBeenCalled();
  });
  it('should create removal', () => {
    const repairSpy = spyOn(repairService, 'getLru').and.callThrough();
    repairService.getLru('10').subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  });
  it('should create repair', () => {
    const repairSpy = spyOn(repairService, 'getRepair').and.callThrough();
    repairService.getRepair().subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  });
  it('closeModal should be defined', () => {
    component.repairObj.modalRef = {
      close: function () { }
    };
    component.removalObj.modalRef = {
      close: function () { }
    };
    component.closeModal();
    expect(component.closeModal).toBeDefined();
  });

  it('resetFormData should be defined', () => {
    component.resetFormData();
    expect(component.repairObj.formSubmitted).toBeFalsy();
  });
  it('resetFormData should be defined', () => {
    component.resetFormData();
    expect(component.createRemovalObj.formSubmitted).toBeFalsy();
  });
  it('resetFormData should be defined', () => {
    component.resetFormData();
    expect(component.removalObj.formSubmitted).toBeFalsy();
  });
  it('resetFormData should be defined', () => {
    component.resetFormData();
    expect(component.faultObj.formSubmitted).toBeFalsy();
  });
  it('removalFormSubmit should be defined', () => {
    component.repairFormSubmit();
    expect(component.repairObj.formSubmitted).toBeTruthy();
  });
  it('faultFormSubmit should be defined', () => {
    component.faultFormSubmit();
    expect(component.faultObj.formSubmitted).toBeTruthy();
  });
  it('modFormSubmit should be defined', () => {
    component.modFormSubmit();
    expect(component.modObj.formSubmitted).toBeTruthy();
  });
  it('repairFormSubmit should be defined', () => {
    component.removalFormSubmit();
    expect(component.removalObj.formSubmitted).toBeTruthy();
  });
  it('createrepairFormSubmit should be defined', () => {
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.createFormSubmit();
    expect(component.createRemovalObj.formSubmitted).toBeTruthy();
  });
  it('getEvent create should be defined', () => {
    component.selection = {
      selected: [{
        serialNumber: 'Test'
      }]
    };
    component.getEvent({ moduleName: 'Create Repair', eventName: 'create' });
    expect(component.repairObj.enableDelete).toBeFalsy();
  });
  it('getRepairModal create should be defined', () => {
    component.selection = {
      selected: [{
        pickerModel: 'Test',
        techician: 'Test',
        repairStation: 'Test'
      }]
    };
    component.getRepairModal();
    expect(component.removalObj.enableDelete).toBeFalsy();
  });
  it('getCreateRemovalModal create should be defined', () => {
    component.selection = {
      selected: [{
        pickerModel: 'Test',
        maintenanceSation: 'Test',
        repairAiline: 'Test',
        repairlruName: 'Test',
        repairlruPartNumber: 'Test',
        repairReasonOfRemoval: 'Test',
        repairRevision: 'Test'
      }]
    };
   /*  component.getRemovalModal();
    expect(component.removalObj.enableDelete).toBeFalsy(); */
  });

  it('should call getFilterDate', () => {
    const date = {
      fromDate: '2019-01-24T18:30:00.000Z',
      toDate: '2019-01-27T18:30:00.000Z'
    };
    spyOn(component, 'getFilterDate');
    component.getSelectedDates(date);
    expect(component.isLoading).toBeTruthy();
    expect(component.getFilterDate).toHaveBeenCalledWith(date.fromDate, date.toDate);
  });

  it('should call getFilterDate', () => {
    const date = {
      fromDate: '2019-01-24T18:30:00.000Z',
      toDate: '2019-01-27T18:30:00.000Z'
    };
    spyOn(component, 'getFilterDate');
    component.getSelectedDates(date);
    expect(component.isLoading).toBeTruthy();
    expect(component.getFilterDate).toHaveBeenCalledWith(date.fromDate, date.toDate);
  });

  it('selectedBtn should be defined', () => {
    component.selectedBtn(1);
    expect(component.empMod).toContain(1);

    component.selectedBtn(1);
    expect(component.empMod).toBeDefined();

  });

  it('getAircraftList should be defined', () => {
    component.getAircraftList(2);
    expect(component.getAircraftList).toBeDefined();
  });

  it('getRemovalModal should be defined', () => {
    component.getRemovalModal(2);
    expect(component.getRemovalModal).toBeDefined();
  });
  it('getfaultModal should be defined', () => {
    component.getfaultModal();
    expect(component.getfaultModal).toBeDefined();
  });
  it('getmodout Modal should be defined', () => {
    component.getModOutModal();
    expect(component.getModOutModal).toBeDefined();
  });
  it('createFormSubmit should be defined', () => {
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.createRemovalObj.formObj = {
      invalid: false,
      value: {
        pickerModel: {
          year: '2019',
          month: 2,
          day: 2
        },
        maintenanceSation: '10',
        repairReasonOfRemoval: '10',
        repairlruPartNumber: '10',
        repairAiline: 'aal',
        repairRevisionApi: '',
        repairRevisionNumber: ''
      },
      close: function () { },
      reset: function () {}
    };
    component.maintenancedata = [
      {
        id: 10,
        name: ''
      }
    ];
    component.ReasonData = [
      {
        id: 10,
        name: ''
      }
    ];
    component.LruNumberData = [
      {
        id: 10,
        name: ''
      }
    ];
    component.airData = [
      {
        id: 10,
        name: '',
        icao: 'aal'
      }
    ];
    component.createFormSubmit();
    expect(component.createFormSubmit).toBeDefined();
  });

  it('repairFormSubmit should be defined', () => {
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () {}
    };
    component.repairObj.formObj = {
      invalid: false,
      value: {
        pickerModel: {
          year: '2019',
          month: 2,
          day: 2
        },
        techician: '1',
        repairStation: '1',
      },
      close: function () { },
      reset: function () {}
    };
    component.list = [
      {
        id: 10,
        name: ''
      }
    ];
    component.repairFormSubmit();
    expect(component.repairFormSubmit).toBeDefined();
  });
  it('should  mod boolean properties', () => {
    component.modFilterMouseUp();
    expect(component.modActiveFilterMouseDown).toBeFalsy();
    expect(component.modInActiveFilterMouseDown).toBeFalsy();
  });

  it('should modActicveFilterMouseDown truthy', () => {
    component.modFilter = 2;
    component.modFilterMouseDown(2);
    expect(component.modMouseDownFilter).toEqual(2);
    expect(component.modActiveFilterMouseDown).toBeTruthy();

  });

 });
