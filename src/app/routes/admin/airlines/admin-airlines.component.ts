import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Airlines } from './airlines';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeModel, TreeNode } from 'angular-tree-component';

@Component({
  selector: 'app-equipment',
  templateUrl: './admin-airlines.component.html',
  styleUrls: ['./admin-airlines.component.css']
})
export class AdminAirlinesComponent implements OnInit {
  enableSearchToolBar = false;
  displayedColumns: string[] = [
    'select',
    'name',
    'acronym',
    'icao',
    'iata',
    'createdAt',
    'updatedAt'
  ];
  dataSource: any = [];
  selection: any = new SelectionModel<Airlines>(false, []);
  updatedTime: any;
  isLoading = false;
  actionToolBarConfig = {
    createLabel: 'Create Airline',
    moduleName: 'airline',
    id: 'btn-create-airline',
    enableSearch: true,
    enableCreate: true,
    filterIds: {
      filterListId: 'filter-airline-list',
      filterText: 'inp-filter-airline-text'
    },
    buttonList: [
      {
        label: 'Delete',
        icon: 'fa fa-times',
        id: 'btn-arilines-delete',
        eventName: 'delete'
      },
      {
        label: 'Edit',
        icon: 'fa fa-pencil-square-o',
        id: 'btn-arilines-edit',
        eventName: 'edit'
      }
    ]
  };
  airLineObj = {
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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('airlineModal') private airlineModal: TemplateRef<any>;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toaster: ToastrService,
    config: NgbModalConfig,
    public modalService: NgbModal,
    private router: Router,
    private airlineService: AirlineService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

 ngOnInit() {
   this.getAirlinesList();
   this.airLineObj.formObj = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
    acronym: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[A-Za-z0-9" "]*$')]],
    icao: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[A-Za-z0-9" "]*$')]],
    iata: ['', [Validators.required, Validators.maxLength(2), Validators.pattern('^[A-Za-z0-9" "]*$')]],
    id: ['']
  });
 }

  airlineFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.isLoading = false;
  }

  /** Fetch Airlines List **/
  getAirlinesList() {
    this.isLoading = true;
    this.dataSource.data = [];
    this.airlineService.getAirlines().subscribe(list => {
      this.updatedTime = new Date();
      const data: any = list;
      this.dataSource = new MatTableDataSource<Airlines>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
  selectedRow() {
    if (this.selection.selected.length === 1) {
      this.airLineObj['selectedIndex'] = this.dataSource.data.findIndex(
        x => x.id === this.selection.selected[0].id
      );
      this.airLineObj.selectedRow = [this.selection.selected[0]];
    } else {
      this.airLineObj.selectedRow = this.selection.selected;
    }
  }
  airlineFormSubmit() {
    this.airLineObj.formSubmitted = true;
    if (this.airLineObj.formObj.invalid) {
      return;
    }
    this.airLineObj.isFormSubmitted = true;
    if (!this.airLineObj.formObj.value.id) {
      this.createAirline();
    } else if (this.airLineObj.formObj.value.id) {
      this.updateAirline();
    }
  }

  createAirline() {
    this.airlineService.create(this.airLineObj.formObj.value)
      .subscribe(list => {
        const data: any = list;
        if (data && !data.error) {
          const msg = this.airLineObj.formObj.value.name + ' airline was successfully created';
          this.airlineOperationSuccessHandler(data, {msg: msg, operation: 'Create Airline'});
        } else if (data.error) {
          this.airlineOperationErrorHandler(data.error);
        }
      });
  }

  updateAirline() {
    this.airlineService.update(this.airLineObj.formObj.value)
      .subscribe(list => {
        const data: any = list;
        if (data && !data.error) {
          const msg = this.airLineObj.formObj.value.name + ' airline was successfully updated';
          this.dataSource.data.splice(this.airLineObj['selectedIndex'], 1);
          this.airlineOperationSuccessHandler(data, {msg: msg, operation: 'Update Airline'});
        } else if (data.error) {
          this.airlineOperationErrorHandler(data.error);
        }
      });
  }

  airlineOperationSuccessHandler(data, toastr) {
    this.toaster.success(toastr.msg, toastr.operation);
    this.resetFormData();
    this.selection.clear();
    if (toastr.operation !== 'Delete Airline') {
      this.dataSource.data.push(data);
    }
    this.airlineFilter('');
    this.closeModal();
  }

  airlineOperationErrorHandler(error) {
    this.airLineObj.isFormSubmitted = false;
    this.airLineObj.formObj.isError = true;
    this.airLineObj.formObj.errorMsg =
     error.message || error.error_description;
  }

  deleteAirline() {
    this.airLineObj.isDeleted = true;
    this.airlineService
      .delete(this.airLineObj.selectedRow[0].id)
      .subscribe(response => {
        const data: any = response;
        if (!data) {
          const msg = this.airLineObj.selectedRow[0].name + ' airline was successfully deleted';
          this.dataSource.data.splice(this.airLineObj['selectedIndex'], 1);
          this.airlineOperationSuccessHandler('', {msg: msg, operation: 'Delete Airline'});
          this.airLineObj.isDeleted = false;
        } else if (data && data.error) {
          this.airLineObj.isError = true;
          this.airLineObj.isDeleted = false;
          this.airLineObj.errorMsg = data.error.message;
        }
      });
  }
  getEvent(params) {
    this.airLineObj.enableDelete = false;
    if (params.moduleName === 'airline') {
      if (params.eventName === 'create') {
        this.open(this.airlineModal);
      } else if (params.eventName === 'edit') {
        this.editAirline(this.airlineModal);
      } else if (params.eventName === 'delete') {
        this.airLineObj.enableDelete = true;
        this.open(this.airlineModal);
      }
    }
  }
  editAirline(ref) {
    const selectedRow = this.selection.selected; // this.airLineObj.selectedRow;
    if (ref) {
      this.open(ref);
    }
    this.airLineObj.formObj.setValue({
      name: selectedRow[0].name,
      acronym: selectedRow[0].acronym,
      icao: selectedRow[0]['icao'],
      iata: selectedRow[0]['iata'],
      id: selectedRow[0].id
    });
  }
  resetFormData() {
    this.airLineObj.formSubmitted = false;
    this.airLineObj.isFormSubmitted = false;
    this.airLineObj.formObj.reset();
    this.airLineObj.selectedRow = [];
    this.airlineFilter('');
    // this.selection.clear();
  }
  open(content) {
    this.airLineObj.modalRef = this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
  }
  closeModal() {
    if (this.airLineObj.modalRef) {
      this.airLineObj.modalRef.close();
    }
  }
}
