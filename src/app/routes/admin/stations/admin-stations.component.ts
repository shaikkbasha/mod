import { TemplateRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MaintenancestationService } from '../../../shared/services/maintenancestation/maintenancestation.service';
import { RepairstationService } from '../../../shared/services/repairstation/repairstation.service';
import { MaintenanceStation } from './stations';
import { RepairStation } from './repair-stations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-stations',
  templateUrl: './admin-stations.component.html',
  styleUrls: ['./admin-stations.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminStationsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'fullName', 'shortName', 'locationName', 'createdDate', 'updatedDate'];
  dataSource: any = [];
  selection: any = new SelectionModel<MaintenanceStation>(false, []);
  updatedTime: any;
  isLoading = false;
  modalRef: any;
  maintenanceStationCommonObj: any = {
    selectedRow: [],
    formSubmitted: false,
    isFormSubmitted: false,
    isDeleted: false,
    isError: false,
    errorMsg: null,
    enableDelete: false
  };
  responseErrorMsg: string;
  maintenanceStationsForm: any = FormGroup;
  repairStationsForm: any = FormGroup;
  /***
    Repair Stations Properties Declarations
  */
  repairStationsDisplayedColumns: string[] = ['select', 'fullName', 'shortName', 'locationName', 'createdDate', 'updatedDate'];
  repairStationsDataSource: any = [];
  repairStationsSelection: any  = new SelectionModel<RepairStation>(false, []);
  loadingRepairStation = false;
  repairStationsUpdatedTime: any;
  repairStationCommonObj: any = {
    selectedRow: [],
    isDeleted: false,
    beforeValidFormSubmitted: false,
    validFormSubmitted: false,
    isError: false,
    errorMsg: null,
    selectedIndex: null,
    enableDelete: false
  };
  actionToolBarMStationConfig = {
    createLabel: 'Create station',
    moduleName: 'maintenanceStation',
    id: 'btn-create-adminStation',
    filterIds : {
      filterListId: 'filter-station-list',
      filterText: 'inp-filter-station-text'
    },
    enableSearch: true,
    enableCreate: true,
    buttonList : [
      {
        label: 'Delete',
        icon: 'fa fa-trash',
        id: 'btn-admin-station-delete',
        eventName: 'delete'
      },
      {
        label: 'Edit',
        id: 'btn-admin-station-edit',
        icon: 'fa fa-pencil-square-o',
        eventName: 'edit',
      }
    ]
  };
  actionToolBarRStationConfig = {
    createLabel: 'Create station',
    moduleName: 'repairStation',
    id: 'btn-admin-station-createStation',
    filterIds : {
      filterListId: 'filter-station-list',
      filterText: 'inp-filter-station-text'
    },
    enableSearch: true,
    enableCreate: true,
    buttonList : [
      {
        label: 'Edit',
        icon: 'fa fa-pencil-square-o',
        id: 'btn-admin-station-edit',
        eventName: 'edit',
      },
      {
        label: 'Delete',
        icon: 'fa fa-trash',
        id: 'lbl-admin-station-delete',
        eventName: 'delete'
      }
    ]
  };
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatPaginator) paginator = new QueryList();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;
  @ViewChild('createUpdateMaintenanceStationForm') private maintainStationModal: TemplateRef<any>;
  @ViewChild('createUpdateRepairStationForm') private repairStationModal: TemplateRef<any>;

  constructor(public toaster: ToastrService, config: NgbModalConfig, public modalService: NgbModal, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private maintenanceStationService: MaintenancestationService,
    private repairStationsService: RepairstationService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.getMaintenanceStationsList();
    this.getRepairStationList();

    this.maintenanceStationsForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      shortName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      locationName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      id: ['']
    });

    this.repairStationsForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      shortName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      locationName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      id: ['']
    });


  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource.sort = this.sort;
    this.repairStationsDataSource.paginator = this.paginator.toArray()[1];
    // this.repairStationsDataSource.sort = this.rsSort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  selectedRow(row) {
    if (this.selection.selected.length === 1) {
      this.maintenanceStationCommonObj['selectedIndex'] = this.dataSource.data.findIndex(x => x.id === this.selection.selected[0].id);
      this.maintenanceStationCommonObj.selectedRow = [this.selection.selected[0]];
    } else {
      this.maintenanceStationCommonObj.selectedRow = this.selection.selected;
    }
  }
  /** Fetch Stations List **/
  getMaintenanceStationsList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.selection.clear();
    this.maintenanceStationCommonObj.selectedRow = [];
    this.maintenanceStationService.getMaintenanceStationlist().subscribe(list => {
      const data: any = list;
      if (data.error) {
        this.dataSource = new MatTableDataSource<MaintenanceStation>([]);
      } else {
        this.dataSource = new MatTableDataSource<MaintenanceStation>(data);
        this.sortDataSource(this.dataSource);
      }
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort;
      this.updatedTime = new Date();
      this.isLoading = false;
    });
  }

  matSort(item, property) {
    switch (property) {
      case 'fullName': return item[property].toUpperCase();
      case 'shortName': return item[property].toUpperCase();
      case 'locationName': return item[property].toUpperCase();
      case 'createdDate': return new Date(item['createdAt']);
      case 'updatedDate': return new Date(item['updatedAt']);
      default: return item[property];
    }
  }
  maintenanceStationsFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.isLoading = false;
  }

  sortDataSource(dataSource) {
    dataSource.sortingDataAccessor = (item, property) => {
      if (item[property]) {
        this.matSort(item, property);
      }
    };
  }

  /***
   Repair Stations List
  */
  getRepairStationList() {
    this.loadingRepairStation = true;
    this.repairStationsDataSource.data = [];
    this.repairStationsSelection.clear();
    this.repairStationCommonObj.selectedRow = [];
    this.repairStationsService.getRepairStationslist().subscribe(list => {
      const data: any = list;
      if (data.error) {
        this.repairStationsDataSource = new MatTableDataSource<RepairStation>([]);
      } else {
        this.repairStationsDataSource = new MatTableDataSource<RepairStation>(data);
        this.sortDataSource(this.repairStationsDataSource);
      }
      this.repairStationsDataSource.paginator = this.paginator.toArray()[1];
      this.repairStationsDataSource.sort = this.rsSort;
      this.repairStationsUpdatedTime = new Date();
      this.loadingRepairStation = false;
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  repairStationsMasterToggle() {
    this.isRepairStationsAllSelected() ?
      this.repairStationsSelection.clear() :
      this.repairStationsDataSource.data.forEach(row => this.repairStationsSelection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isRepairStationsAllSelected() {
    let numSelected, numRows: any;
    if (this.repairStationsSelection && this.repairStationsSelection.selected) {
      numSelected = this.repairStationsSelection.selected.length;
    }
    if (this.repairStationsDataSource && this.repairStationsDataSource.data) {
      numRows = this.repairStationsDataSource.data.length;
    }

    return numSelected === numRows;
  }

  repairStationsFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.repairStationsDataSource.filter = filterValue;
    this.loadingRepairStation = false;
  }

  repairStationsSelectedRow(row) {
    if (this.repairStationsSelection.selected) {
      if (this.repairStationsSelection.selected.length === 1) {
        this.repairStationCommonObj.selectedIndex = this.repairStationsDataSource.data
          .findIndex(x => x.id === this.repairStationsSelection.selected[0].id);
        this.repairStationCommonObj.selectedRow = [this.repairStationsSelection.selected[0]];
      } else {
        this.repairStationCommonObj.selectedRow = this.repairStationsSelection.selected;
      }
    }
  }

  /** Reset Form Data **/
  resetMaintenanceStationFormData() {
    this.maintenanceStationCommonObj.formSubmitted = false;
    this.maintenanceStationCommonObj.isFormSubmitted = false;
    this.maintenanceStationsForm.reset();
    this.selection.clear();
    this.maintenanceStationCommonObj.selectedRow = [];
    this.maintenanceStationsFilter('');
  }
  open(content) {
    this.maintenanceStationCommonObj.isError = false;
    this.maintenanceStationCommonObj.errorMsg = null;
    this.repairStationCommonObj.isError = false;
    this.repairStationCommonObj.errorMsg = null;
    this.modalRef = this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
  }
  maintenanceStationErrorHandling(data) {
    this.maintenanceStationCommonObj.isFormSubmitted = false;
    this.responseErrorMsg = data.error.message || data.error.error_description;
    // this.toaster.error(this.responseErrorMsg, 'Update Maintenance Station');
    this.maintenanceStationCommonObj.isError = true;
    this.maintenanceStationCommonObj.errorMsg = this.responseErrorMsg;
  }
  updateMaintenanceStation(errorHandlingId) {
    this.maintenanceStationCommonObj.isFormSubmitted = true;
    this.maintenanceStationsForm.value.fullName = this.maintenanceStationsForm.value.fullName.trim();
    this.maintenanceStationsForm.value.shortName = this.maintenanceStationsForm.value.shortName.trim();
    this.maintenanceStationsForm.value.locationName = this.maintenanceStationsForm.value.locationName.trim();
    this.maintenanceStationService.updateMaintenanceStations(this.maintenanceStationsForm.value).subscribe(response => {
      const data: any = response;
      if (data && !data.error) {
        const msg = this.maintenanceStationsForm.value.fullName + ' maintenance station was successfully updated';
        this.toaster.success(msg, 'Update Maintenance Station!');
        // this.dataSource.data[this.maintenanceStationCommonObj.selectedIndex] = data;
        this.dataSource.data.splice(this.maintenanceStationCommonObj.selectedIndex, 1);
        this.dataSource.data.push(data);
        this.closeModal();
        this.resetMaintenanceStationFormData();
      } else if (data.error) {
        this.maintenanceStationErrorHandling(data);
        // this.modalService.open(errorHandlingId, {centered: true});
      }
    });
  }
  /** Create Maintenance Station **/
  createUpdateMaintenanceStationsOnSubmit(errorHandlingId) {
    this.maintenanceStationCommonObj.formSubmitted = true;
    if (this.maintenanceStationsForm.invalid) {
      return;
    }
    if (!this.maintenanceStationsForm.value.id) {
      this.maintenanceStationCommonObj.isFormSubmitted = true;
      this.maintenanceStationsForm.value.fullName = this.maintenanceStationsForm.value.fullName.trim();
      this.maintenanceStationsForm.value.shortName = this.maintenanceStationsForm.value.shortName.trim();
      this.maintenanceStationsForm.value.locationName = this.maintenanceStationsForm.value.locationName.trim();
      this.maintenanceStationService.createMaintenanceStations(this.maintenanceStationsForm.value).subscribe(response => {
        const data: any = response;
        if (data && !data.error) {
          const msg = this.maintenanceStationsForm.value.fullName + ' maintenance station was successfully created';
          this.toaster.success(msg, 'Create Maintenance Station');
          this.dataSource.data.push(data);
          this.maintenanceStationsFilter('');
          this.closeModal();
          this.resetMaintenanceStationFormData();
        } else if (data.error) {
          this.maintenanceStationErrorHandling(data);
        }
      });
    } else if (this.maintenanceStationsForm.value.id) {
      this.updateMaintenanceStation(errorHandlingId);
    }
  }
  deleteConfirmMaintenanceStations() {
    this.maintenanceStationCommonObj.isDeleted = true;
    this.maintenanceStationService.deleteMaintenanceStations(this.maintenanceStationCommonObj.selectedRow[0].id).subscribe(response => {
      const data: any = response;
      if (!data || data.code === 200) {
        const msg = this.maintenanceStationCommonObj.selectedRow[0].fullName + ' maintenance station was successfully deleted';
        this.toaster.success(msg, 'Delete Maintenance Station');
        this.closeModal();
        this.selection.clear();
        this.dataSource.data.splice(this.maintenanceStationCommonObj.selectedIndex, 1);
        this.maintenanceStationCommonObj.isDeleted = false;
        this.resetMaintenanceStationFormData();
      } else if (data && data.error) {
        this.deleteErrorHandling(data, 'maintenanceStations');
      }
    });
  }
  editMaintenanceStations(ref) {
    const selectedRow = this.maintenanceStationCommonObj.selectedRow;
    if (ref) {
      this.open(ref);
    }
    this.maintenanceStationsForm.controls['fullName'].setValue(selectedRow[0].fullName);
    this.maintenanceStationsForm.controls['shortName'].setValue(selectedRow[0].shortName);
    this.maintenanceStationsForm.controls['locationName'].setValue(selectedRow[0].locationName);
    this.maintenanceStationsForm.controls['id'].setValue(selectedRow[0].id);
  }

  /** Reset Repair Station Form Data **/
  resetRepairStationFormData() {
    this.repairStationCommonObj.selectedRow = [];
    this.repairStationCommonObj.beforeValidFormSubmitted = false;
    this.repairStationCommonObj.afterValidFormSubmitted = false;
    this.repairStationsForm.reset();
    this.repairStationsSelection.clear();
    this.repairStationsFilter('');
  }
  repairStationsErrorHandling(data) {
    this.repairStationCommonObj.afterValidFormSubmitted = false;
    this.responseErrorMsg = data.error.message || data.error.error_description;
    this.repairStationCommonObj.isError = true;
    this.repairStationCommonObj.errorMsg = this.responseErrorMsg;
  }
  /**
    Repair Station
   **/
  createUpdateRepairStationsOnSubmit(errorHandlingId) {
    this.repairStationCommonObj.beforeValidFormSubmitted = true;
    if (this.repairStationsForm.invalid) {
      return;
    }
    if (!this.repairStationsForm.value.id) {
      this.repairStationCommonObj.afterValidFormSubmitted = true;
      this.repairStationsForm.value.fullName = this.repairStationsForm.value.fullName.trim();
      this.repairStationsForm.value.shortName = this.repairStationsForm.value.shortName.trim();
      this.repairStationsForm.value.locationName = this.repairStationsForm.value.locationName.trim();
      this.repairStationsService.createRepairStations(this.repairStationsForm.value).subscribe(response => {
        const data: any = response;
        if (data && !data.error) {
          const msg = this.repairStationsForm.value.fullName + ' repair station was successfully created';
          this.toaster.success(msg, 'Create Repair Station');
          this.repairStationsDataSource.data.push(data);
          this.closeModal();
          this.resetRepairStationFormData();
        } else if (data.error) {
          this.repairStationsErrorHandling(data);
        }
      });
    } else if (this.repairStationsForm.value.id) {
      this.repairStationCommonObj.afterValidFormSubmitted = true;
      this.repairStationsForm.value.fullName = this.repairStationsForm.value.fullName.trim();
      this.repairStationsForm.value.shortName = this.repairStationsForm.value.shortName.trim();
      this.repairStationsForm.value.locationName = this.repairStationsForm.value.locationName.trim();
      this.repairStationsService.updateRepairStation(this.repairStationsForm.value).subscribe(response => {
        const data: any = response;
        if (data && !data.error) {
          const msg = this.repairStationsForm.value.fullName + ' repair station was successfully updated';
          this.toaster.success(msg, 'Update Repair Station');
          this.repairStationsDataSource.data.splice(this.repairStationCommonObj.selectedIndex, 1);
          this.repairStationsDataSource.data.push(data);
          this.closeModal();
          this.resetRepairStationFormData();
        } else if (data.error) {
          this.repairStationsErrorHandling(data);
        }
      });
    }
  }
  deleteErrorHandling(data, moduleName) {
    if (moduleName.toLowerCase() === 'repairstations') {
      this.repairStationCommonObj.isDeleted = false;
      this.repairStationCommonObj.isError = true;
      this.repairStationCommonObj.errorMsg = data.error.message;
    } else if (moduleName.toLowerCase() === 'maintenancestations') {
      this.maintenanceStationCommonObj.isError = true;
      this.maintenanceStationCommonObj.isDeleted = false;
      this.maintenanceStationCommonObj.errorMsg = data.error.message;
    }
  }

  deleteConfirmRepairStations() {
    this.repairStationCommonObj.isDeleted = true;
    this.repairStationsService.deleteRepairStations(this.repairStationCommonObj.selectedRow[0].id).subscribe(response => {
      const data: any = response;
      if (!data || data.code === 200) {
        const msg = this.repairStationCommonObj.selectedRow[0].fullName + ' repair station was successfully deleted';
        this.toaster.success(msg, 'Delete Repair Station');
        this.closeModal();
        this.repairStationsDataSource.data.splice(this.repairStationCommonObj.selectedIndex, 1);
        this.repairStationCommonObj.isDeleted = false;
        this.resetRepairStationFormData();
      } else if (data && data.error) {
        this.deleteErrorHandling(data, 'repairStations');
      }
    });
  }
  editRepairStation(ref) {
    const selectedRow = this.repairStationCommonObj.selectedRow;
    if (ref) {
      this.open(ref);
    }
    this.repairStationsForm.setValue({
      fullName: selectedRow[0].fullName,
      shortName: selectedRow[0].shortName,
      locationName: selectedRow[0].locationName,
      id: selectedRow[0].id
    });
  }
  closeModal() {
    this.modalRef.close();
  }
  getEvent(params) {
    if (params.moduleName === 'maintenanceStation') {
      this.maintenanceStationCommonObj.enableDelete = false;
      if (params.eventName === 'create') {
        this.open(this.maintainStationModal);
      } else if (params.eventName === 'edit') {
        this.editMaintenanceStations(this.maintainStationModal);
      } else if (params.eventName === 'delete') {
        this.maintenanceStationCommonObj.enableDelete = true;
        this.open(this.maintainStationModal);
      }
    } else if (params.moduleName === 'repairStation') {
      this.repairStationCommonObj.enableDelete = false;
      if (params.eventName === 'create') {
        this.open(this.repairStationModal);
      } else if (params.eventName === 'edit') {
        this.editRepairStation(this.repairStationModal);
      } else if (params.eventName === 'delete') {
        this.repairStationCommonObj.enableDelete = true;
        this.open(this.repairStationModal);
      }
    }
  }
}
