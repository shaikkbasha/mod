import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepairRepairsComponent } from './repair-repairs.component';
import { ArtefactModule } from '../../../shared/artefact.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
  MatTabsModule,
} from '@angular/material';

describe('RepairRepairsComponent', () => {
  let component: RepairRepairsComponent;
  let fixture: ComponentFixture<RepairRepairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepairRepairsComponent],
      imports: [
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        FormsModule,
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
        ToastrModule.forRoot()
      ],
      providers: [
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(function () {
    TestBed.resetTestingModule();
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
  it('getrepairList', () => {
    component.dataSource = {};
    component.getRepairList();
    expect(component.dataSource.data).toEqual([]);
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

});
