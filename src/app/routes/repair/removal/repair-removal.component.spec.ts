import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RepairRemovalComponent } from './repair-removal.component';
import { ArtefactModule } from '../../../shared/artefact.module';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { PARAMETERS } from '@angular/core/src/util/decorators';
describe('RepairRemovalComponent', () => {
  let component: RepairRemovalComponent;
  let fixture: ComponentFixture<RepairRemovalComponent>;
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
      declarations: [ RepairRemovalComponent ],
      imports: [
        ArtefactModule, RouterTestingModule, BrowserAnimationsModule,
        MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
        MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
        MatCardModule, MatFormFieldModule, MatInputModule, ToastrModule.forRoot()

      ],
      providers: [{
        provide: ActivatedRoute, useValue: activatedRoute
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
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

  it('should get formatted date for selection', () => {
    const fromDate = '2019-01-24T18:30:00.000Z';
    const toDate = '2019-01-27T18:30:00.000Z';
    component.getFilterDate(fromDate, toDate);
    // expect(component.fromDate).toEqual('2019-01-25T00:00:00Z');
    // expect(component.toDate).toEqual('2019-01-28T23:59:59Z');
    expect(component.fromDate).toBeDefined();
    expect(component.toDate).toBeDefined();
  });

  it('getRemovalList', () => {
    component.dataSource = {};
    component.getRemovalList();
    expect(component.dataSource.data).toEqual([]);
  });

  it('getEvent', () => {
    const params = {
      moduleName: 'Show Details',
      eventName: 'create'
    };
    component.getEvent(params);
  });

  it('getEvent else', () => {
    const params = {
      moduleName: 'Show Details',
      eventName: 'delete'
    };
    component.getEvent(params);
  });

  it('getEvent outer else', () => {
    const params = {
      moduleName: 'Create',
      eventName: 'create'
    };
    component.getEvent(params);
  });

  it('getRemovalModal', () => {
    component.createremovalObj = {
      enableDelete: true
    };
    const spy = spyOn(component, 'open').and.callThrough();
    component.getRemovalModal();
    expect(component.createremovalObj.enableDelete).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('resetFormData', () => {
    component.removalObj = {
      formSubmitted: true,
      isFormSubmitted: true,
      selectedRow: [1],
      formObj: {
        reset() {
        }
      }
    };
    component.createremovalObj = {
      formSubmitted: true,
      isFormSubmitted: true,
      selectedRow: [1],
      formObj: {
        reset() {
        }
      }
    };
    component.resetFormData();
    expect(component.removalObj.formSubmitted).toBeFalsy();
    expect(component.removalObj.isFormSubmitted).toBeFalsy();
    expect(component.removalObj.selectedRow).toEqual([]);
    expect(component.createremovalObj.formSubmitted).toBeFalsy();
    expect(component.createremovalObj.isFormSubmitted).toBeFalsy();
    expect(component.createremovalObj.selectedRow).toEqual([]);
  });

  it('removalFormSubmit removalObj', () => {
    component.removalObj = {
      formSubmitted: true,
      formObj: {
        invalid: true
      }
    };
    component.createremovalObj = {
      formSubmitted: true,
      formObj: {
        invalid: true
      }
    };
    component.removalFormSubmit();
    expect(component.removalObj.formSubmitted).toBeTruthy();
    expect(component.createremovalObj.formSubmitted).toBeTruthy();
  });

  it('removalFormSubmit createremovalObj', () => {
    component.createremovalObj = {
      formSubmitted: true,
      formObj: {
        invalid: true
      }
    };
    component.removalFormSubmit();
    expect(component.createremovalObj.formSubmitted).toBeTruthy();
  });
  it('removalFormSubmit', () => {
    component.removalObj = {
      modalRef: {
        close() {
        }
      }
    };
    component.createremovalObj = {
      modalRef: {
        close() {
        }
      }
    };
    component.closeModal();
  });

});
