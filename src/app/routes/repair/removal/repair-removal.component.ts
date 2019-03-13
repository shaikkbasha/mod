import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepicker } from '@angular/material';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import * as moment from 'moment-timezone';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateFormatterService } from './../../../shared/services/dateFormatter/dateformatter.service';

@Component({
  selector: 'app-repair-removal',
  templateUrl: './repair-removal.component.html',
  styleUrls: ['./repair-removal.component.css']
})
export class RepairRemovalComponent implements OnInit {
  repairDate = new FormControl(new Date());
  enableSearchToolBar = false;
  displayedColumns: string[] = ['urlPartNumber', 'serialNumber', 'removalDate', 'maintenanceSation', 'airline', 'tail'];
  dataSource: any = [];
  selection: any = new SelectionModel<any>(false, []);
  updatedTime: any;
  modalRef: any;
  isLoading = false;
  datepickFromDate: any = moment().subtract(15, 'days');
  datepickToDate: any = new Date();
  toDate: string;
  fromDate: string;
  repairs: any[] = [
    { id: 1, name: 'aeo' },
    { id: 2, name: 'aeo' },
    { id: 3, name: 'aeo' },
    { id: 4, name: 'aeo' },
  ];
  repairLevel: string;
  repairTypes: string[] = ['NO Falut Found (NFF)', 'Level 1 Repair', 'Level 2 Repair', 'Level 3 Repair'];
  actionToolBarConfig = {
    createLabel: 'Show Details',
    moduleName: 'Show Details',
    id: 'btn-overview',
    filterIds: {
      filterListId: 'filter-overview-list',
      filterText: 'inp-filter-overview-text'
    },
    enableSearch: true,
    enableCreate: true,
    buttonList: []
  };
  removalObj: any = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    isFormSubmitted: false,
    isError: false,
    selectedRow: [],
    isDeleted: false,
    enableDelete: false
  };
  createremovalObj: any = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    isFormSubmitted: false,
    isError: false,
    selectedRow: [],
    isDeleted: false,
    enableDelete: false
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('removalModal') private removalModal: TemplateRef<any>;
  @ViewChild('createremovalModal') private createremovalModal: TemplateRef<any>;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, public toaster: ToastrService, config: NgbModalConfig, public modalService: NgbModal,
    private router: Router, private dateService: DateFormatterService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  getRemovalList() {
    this.isLoading = true;
    this.dataSource.data = [];
    this.updatedTime = new Date();
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }
  getEvent(params) {
    this.removalObj.enableDelete = false;
    // this.open(this.removalModal);
    if (params.moduleName === 'Show Details') {
      if (params.eventName === 'create') {
        // this.open(this.removalModal);
      }
    }
  }
  getRemovalModal() {
    this.createremovalObj.enableDelete = false;
    this.open(this.createremovalModal);
  }
  ngOnInit() {
    this.getRemovalList();
    this.getFilterDate(this.datepickFromDate, this.datepickToDate);
    if (!this.dataSource.data) {
      this.dataSource.data = [];
    }
    this.removalObj.formObj = this.formBuilder.group({
      repairDate: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      repairControl: ['', []],
    });
    this.createremovalObj.formObj = this.formBuilder.group({
      repairDate: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      repairControl: ['', []],
    });
  }

  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.getFilterDate(data.fromDate, data.toDate);
  }

  resetFormData() {
    this.removalObj.formSubmitted = false;
    this.removalObj.isFormSubmitted = false;
    this.removalObj.formObj.reset();
    this.removalObj.selectedRow = [];
    // this.selection.clear();
    this.createremovalObj.formSubmitted = false;
    this.createremovalObj.isFormSubmitted = false;
    this.createremovalObj.formObj.reset();
    this.createremovalObj.selectedRow = [];
  }

  removalFormSubmit() {
    this.removalObj.formSubmitted = true;
    if (this.removalObj.formObj.invalid) {
      return;
    }
    this.createremovalObj.formSubmitted = true;
    if (this.createremovalObj.formObj.invalid) {
      return;
    }
  }

  getFilterDate(fromDate, toDate) {
    const dateObj = this.dateService.getDates(new Date(fromDate), new Date(toDate));
    this.fromDate = dateObj.fromDate;
    this.toDate = dateObj.toDate;
    // const nowDate = (new Date(fromDate).getDate().toString().length === 1)
    //   ? '0' + new Date(fromDate).getDate() : new Date(fromDate).getDate();
    // const nowToDate = (new Date(toDate).getDate().toString().length === 1)
    //   ? '0' + new Date(toDate).getDate() : new Date(toDate).getDate();
    // const nowMonth = (new Date(fromDate).getMonth().toString().length === 1) ?
    //   '0' + (new Date(fromDate).getMonth() + 1) : (new Date(fromDate).getMonth() + 1);
    // const nowToMonth = (new Date(toDate).getMonth().toString().length === 1) ?
    //   '0' + (new Date(toDate).getMonth() + 1) : (new Date(toDate).getMonth() + 1);
    // this.fromDate = new Date(fromDate).getFullYear() + '-' + nowMonth + '-' + nowDate + 'T00:00:00Z';
    // this.toDate = new Date(toDate).getFullYear() + '-' + nowToMonth + '-' + nowToDate + 'T23:59:59Z';
  }

  open(content) {
    this.removalObj.modalRef = this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
    this.createremovalObj.modalRef = this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
  }
  closeModal() {
    this.removalObj.modalRef.close();
    this.createremovalObj.modalRef.close();
  }
}
