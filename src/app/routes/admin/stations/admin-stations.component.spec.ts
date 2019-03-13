import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { AdminStationsComponent } from './admin-stations.component';
import { ArtefactModule } from '../../../shared/artefact.module';
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
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenancestationService } from '../../../shared/services/maintenancestation/maintenancestation.service';
import { RepairstationService } from '../../../shared/services/repairstation/repairstation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { ToastrService, ToastrModule } from 'ngx-toastr';
describe('StationsComponent', () => {
  let component: AdminStationsComponent;
  let fixture: ComponentFixture<AdminStationsComponent>;
  let maintenanceStationService: any = MaintenancestationService;
  let repairstationService: RepairstationService;
  const httpClient: any = HttpClient;
  const mockMaintenanceStationService = {
    getMaintenanceStationlist(): Observable<any> {
      const response = [
        {
          'id': 2,
          'fullName': 'rafaf',
          'shortName': 'afafa',
          'locationName': 'fafafaf',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    createMaintenanceStations(postData): Observable<any> {
      // if (postData) {
        const response = [
          {
            'id': 2,
            'fullName': 'rafaf',
            'shortName': 'afafa',
            'locationName': 'fafafaf',
            'createdAt': '2018-12-24 10:17:01',
            'updatedAt': '2018-12-24 10:17:01'
          }
        ];
        return Observable.of(response);
      // } else {
      //   return Observable.throw(JSON.parse(JSON.stringify({error: {message: 'Internal Server Error'}, status: 500})));  // not working
      // }
    },
    updateMaintenanceStations(postData): Observable<any> {
      // if (postData) {
        const response = [
          {
            'id': 2,
            'fullName': 'rafaf',
            'shortName': 'afafa',
            'locationName': 'fafafaf',
            'createdAt': '2018-12-24 10:17:01',
            'updatedAt': '2018-12-24 10:17:01'
          }
        ];
        return Observable.of(response);
      // }
      // else {
      //   return Observable.throw(JSON.parse(JSON.stringify({error: {message: 'Internal Server Error'}, status: 500})));  // not working
      // }
    },
    deleteMaintenanceStations(): Observable<any> {
      return Observable.of(null);
    }
  };
  const mockRepairStationsService = {
    getRepairStationslist(): Observable<any> {
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
    deleteRepairStations(): Observable<any> {
      return Observable.of(null);
    },
    updateRepairStation(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'test',
          'shortName': 'test',
          'locationName': 'test',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    createRepairStations(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'test',
          'shortName': 'test',
          'locationName': 'test',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStationsComponent, MatSort],
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
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          closeButton: true
        })
      ],
      providers: [
        {provide: MaintenancestationService, useValue: mockMaintenanceStationService},
        {provide: RepairstationService, useValue: mockRepairStationsService},
        HttpClientModule,
        HttpClient,
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // maintenancestationService = new MaintenancestationService(httpClient);
    maintenanceStationService = TestBed.get(MaintenancestationService);
    repairstationService = TestBed.get(RepairstationService);
  });

  it('should create', () => {
    const spy = spyOn(maintenanceStationService, 'getMaintenanceStationlist').and.callThrough();
    maintenanceStationService.getMaintenanceStationlist().subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
    const repairSpy = spyOn(repairstationService, 'getRepairStationslist').and.callThrough();
    repairstationService.getRepairStationslist().subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  });

  it('should createUpdateMaintenanceStationsOnSubmit to be defined', () => {
    component.maintenanceStationsForm = {
      invalid: false
    };
    component.maintenanceStationsForm.value = {
      fullName: 'dfdfgf',
      id: '',
      locationName: 'dfgdg',
      shortName: 'gdfgfdg'
    };
    component.modalRef = {
      close: function() {}
    };
    component.maintenanceStationsForm.reset = function() {};
    const spy = spyOn(maintenanceStationService, 'createMaintenanceStations').and.callThrough();
    maintenanceStationService.createMaintenanceStations(null).subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
    component.createUpdateMaintenanceStationsOnSubmit(undefined);

    /** Update Maintenance Station **/
    const updateMainStationSpy = spyOn(maintenanceStationService, 'updateMaintenanceStations').and.callThrough();
    maintenanceStationService.updateMaintenanceStations().subscribe((results) => {
      expect(updateMainStationSpy).toHaveBeenCalled();
    });
    component.maintenanceStationsForm.value.id = 2;
    component.createUpdateMaintenanceStationsOnSubmit(undefined);
    expect(component.maintenanceStationCommonObj.isFormSubmitted).toBeFalsy();

    component.maintenanceStationsForm.invalid = true;
    component.createUpdateMaintenanceStationsOnSubmit(undefined);
    expect(component.maintenanceStationCommonObj.isFormSubmitted).toBeFalsy();
  });

  it('should selected row to be defined', () => {
    const selectedData = [
      {
        'id': 15,
        'fullName': 'dfdfgf',
        'shortName': 'gdfgfdg',
        'locationName': 'dfgdg',
        'createdAt': '2019-02-05 12:56:40',
        'updatedAt': '2019-02-05 12:56:40'
      }
    ];
    component.selection = {
        selected : selectedData
    };
    component.selectedRow(selectedData);
    expect(component.maintenanceStationCommonObj.selectedRow).toEqual(selectedData);
    component.selection = {
      selected : []
    };
    component.selectedRow([]);
    expect(component.maintenanceStationCommonObj.selectedRow).toEqual([]);
  });

  it('should repairStationsSelectedRow to be defined', () => {
    const selectedData = [
      {
        'id': 15,
        'fullName': 'dfdfgf',
        'shortName': 'gdfgfdg',
        'locationName': 'dfgdg',
        'createdAt': '2019-02-05 12:56:40',
        'updatedAt': '2019-02-05 12:56:40'
      }
    ];
    component.repairStationsSelection = {
        selected : selectedData
    };
    component.repairStationsSelectedRow(selectedData);
    expect(component.repairStationCommonObj.selectedRow).toEqual(selectedData);
    component.repairStationsSelection = {
      selected : []
    };
    component.repairStationsSelectedRow([]);
    expect(component.repairStationCommonObj.selectedRow).toEqual([]);
  });

  it('should repairStationsMasterToggle to be defined', () => {
    component.repairStationsMasterToggle();
    expect(component.repairStationsMasterToggle).toBeDefined();
  });

  it('should getEvent to be defined', () => {
    component.getEvent({moduleName: 'maintenanceStation', eventName: 'create'});
    expect(component.getEvent).toBeDefined();
    // component.maintenanceStationsForm.controls = {
    //     fullName: '',
    //     id: 1
    // };
    // component.getEvent({moduleName: 'maintenanceStation', eventName: 'edit'});
    // expect(component.getEvent).toBeDefined();
    component.getEvent({moduleName: 'maintenanceStation', eventName: 'delete'});
    expect(component.getEvent).toBeDefined();

    component.getEvent({moduleName: 'repairStation', eventName: 'create'});
    expect(component.getEvent).toBeDefined();

    component.repairStationCommonObj.selectedRow = [
      {
        fullName: 'test',
        shortName: 'test',
        locationName: 'test',
        id: 1
      }
    ];
    component.getEvent({moduleName: 'repairStation', eventName: 'edit'});
    expect(component.getEvent).toBeDefined();

    component.getEvent({moduleName: 'repairStation', eventName: 'delete'});
    expect(component.getEvent).toBeDefined();


    component.maintenanceStationCommonObj = {
      selectedRow: [
        {
          fullName: 'test',
          shortName: 'test',
          locationName: 'test',
          id: 1
        }
      ]
    };
    component.getEvent({moduleName: 'maintenanceStation', eventName: 'edit'});
    expect(component.getEvent).toBeDefined();
  });

  it('should deleteConfirmRepairStations to be defined', () => {
    const repairSpy = spyOn(repairstationService, 'deleteRepairStations').and.callThrough();
    component.repairStationCommonObj.selectedRow = [
      {
        fullName: 'test',
        shortName: 'test',
        locationName: 'test',
        id: 1
      }
    ];
    component.modalRef = {
      close: function() {}
    };
    repairstationService.deleteRepairStations(component.repairStationCommonObj.selectedRow[0].id).subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    component.deleteConfirmRepairStations();
  });

  it('should deleteMaintenanceStations to be defined', () => {
    const maintenanceSpy = spyOn(maintenanceStationService, 'deleteMaintenanceStations').and.callThrough();
    component.maintenanceStationCommonObj.selectedRow = [
      {
        fullName: 'test',
        shortName: 'test',
        locationName: 'test',
        id: 1
      }
    ];
    const data = component.maintenanceStationCommonObj.selectedRow;
    component.modalRef = {
      close: function() {}
    };
    maintenanceStationService.deleteMaintenanceStations(data[0].id).subscribe((results) => {
      expect(maintenanceSpy).toHaveBeenCalled();
    });
    component.deleteConfirmMaintenanceStations();
  });

  it('should createUpdateRepairStationsOnSubmit to be defined', () => {
    component.createUpdateRepairStationsOnSubmit('');
    expect(component.repairStationCommonObj.beforeValidFormSubmitted).toBeTruthy();

    const repairSpy = spyOn(repairstationService, 'updateRepairStation').and.callThrough();
    component.repairStationsForm = {
      invalid: false,
      value: {
        fullName: 'test',
        shortName: 'test',
        locationName: 'test',
        id: 1
      }
    };
    component.modalRef = {
      close: function() {}
    };
    component.repairStationsForm.reset = function() {};
    component.repairStationsSelection.clear = function() {};
    repairstationService.updateRepairStation(component.repairStationsForm.value).subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    component.createUpdateRepairStationsOnSubmit('');
    expect(component.repairStationCommonObj.beforeValidFormSubmitted).toBeFalsy();

    /** Create Repair **/
    const createRepairSpy = spyOn(repairstationService, 'createRepairStations').and.callThrough();
    component.repairStationsForm.value.id = null;
    component.modalRef = {
      close: function() {}
    };
    component.repairStationsForm.reset = function() {};
    component.repairStationsSelection.clear = function() {};
    repairstationService.createRepairStations(component.repairStationsForm.value).subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    component.createUpdateRepairStationsOnSubmit('');
    expect(component.repairStationCommonObj.beforeValidFormSubmitted).toBeFalsy();
  });

  it('matSort should be defined', () => {
    const item = {
      fullName: 'Test',
      shortName: 'Test',
      locationName: 'Test',
      createdDate: '2019-02-01',
      updatedDate: '2019-02-02'
    };
    component.matSort(item, '');
    component.matSort(item, 'fullName');
    component.matSort(item, 'shortName');
    component.matSort(item, 'locationName');
    component.matSort(item, 'createdDate');
    component.matSort(item, 'updatedDate');
    expect(component.matSort).toBeDefined();
  });

  it('maintenanceStationErrorHandling should be defined', () => {
    let data: any = {
      error: {
        message: 'Failed to update'
      }
    };
    component.maintenanceStationErrorHandling(data);

    data = {
      error: {
        error_description: 'Failed to update'
      }
    };
    component.maintenanceStationErrorHandling(data);
    expect(component.maintenanceStationCommonObj.isError).toBeTruthy();
  });


  it('repairStationsErrorHandling should be defined', () => {
    let data: any = {
      error: {
        message: 'Failed to update'
      }
    };
    component.repairStationsErrorHandling(data);

    data = {
      error: {
        error_description: 'Failed to update'
      }
    };
    component.repairStationsErrorHandling(data);
    expect(component.repairStationCommonObj.isError).toBeTruthy();
  });


  it('deleteErrorHandling should be defined', () => {
    let data: any = {
      error: {
        message: 'Failed to update'
      }
    };
    component.deleteErrorHandling(data, 'repairStations');
    expect(component.repairStationCommonObj.isError).toBeTruthy();

    data = {
      error: {
        message: 'Failed to update'
      }
    };
    component.deleteErrorHandling(data, 'maintenanceStations');
    expect(component.maintenanceStationCommonObj.isError).toBeTruthy();

  });

  afterEach(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });
});
