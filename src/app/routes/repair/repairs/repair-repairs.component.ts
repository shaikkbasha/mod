import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepicker } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment-timezone';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RepairsService } from './../../../shared/services/repair/repairs/repairs.service';
import { RepairRepairsStations } from './../../../shared/services/repair/repairs/repairs';
import { DateFormatterService } from './../../../shared/services/dateFormatter/dateformatter.service';

@Component({
  selector: 'app-repair-repairs',
  templateUrl: './repair-repairs.component.html',
  styleUrls: ['./repair-repairs.component.css']
})
export class RepairRepairsComponent implements OnInit {
  enableSearchToolBar = false;
  enablesearchModal = false;
  displayedColumns: string[] = ['urlPartNumber', 'serialNumber', 'repairDate', 'repairStation', 'airline', 'tail'];
  dataSource: any = [];
  selection: any = new SelectionModel<RepairRepairsStations>(false, []);
  updatedTime: any;
  modalRef: any;
  isLoading = true;
  datepickFromDate: any = moment().subtract(15, 'days');
  datepickToDate: any = new Date();
  toDate: string;
  fromDate: string;
  repairLevel: string;
  actionToolBarConfig = {
    createLabel: 'Show Details',
    moduleName: 'Show Details',
    id: 'btn-overview',
    filterIds: {
      filterListId: 'filter-repairs-list',
      filterText: 'inp-filter-repairs-text'
    },
    enableSearch: true,
    enableCreate: true,
    buttonList: []
  };


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    public toaster: ToastrService, private dateService: DateFormatterService, config: NgbModalConfig, public modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  enableSerialInfo = false;
  ngOnInit() {
  }
  getRepairList() {
    this.isLoading = true;
    this.dataSource.data = [];
    this.updatedTime = new Date();
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }
  getEvent(params) {
    if (params.moduleName === 'Show Details') {
      if (params) {
        this.enablesearchModal = true;
      }
    }
  }
  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.getFilterDate(data.fromDate, data.toDate);
  }
  getFilterDate(fromDate, toDate) {
    const dateObj = this.dateService.getDates(new Date(fromDate), new Date(toDate));
    this.fromDate = dateObj.fromDate;
    this.toDate = dateObj.toDate;
  }
}
