import { TemplateRef, Component, OnInit, AfterViewInit, QueryList, ViewChild, ViewChildren, HostListener } from '@angular/core';
import { TreeModel, TreeNode, TreeComponent, ITreeOptions, IActionMapping, TREE_ACTIONS, KEYS } from 'angular-tree-component';
import { ProductsService } from '../../../shared/services/admin/products/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { LruNameService } from '../../../shared/services/admin/products/lrunames/lrunames.service';
import { LruPartNumberService } from '../../../shared/services/admin/products/lrupartnumber/lrupartnumber.service';
import { PartNumberService } from '../../../shared/services/admin/products/partnumber/partnumber.service';
import { DynamicFormService } from '../../../shared/modules/dynamicform/dynamic-form-service';
import { LruTypeService } from '../../../shared/services/admin/products/lrutypes/lrutypes.service';
import { MatTabChangeEvent } from '@angular/material';
import { ReasonofremovalService } from '../../../shared/services/admin/products/reasonofremoval/reasonofremoval.service';
import { RepairActionService } from '../../../shared/services/admin/products/repairaction/repairaction.service';


@Component({
  selector: 'app-equipment',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, AfterViewInit {
  nodes: any = [{ name: '' }];
  dataSource: any = [];
  getSelectedTabName = '';
  deleteObj: any = {
    isError: false,
    isDeleted: false,
    errorMsg: '',
    moduleName: '',
    name: '',
    id: ''
  };
  lrunPartNoModalIds: any = {
    closeBtn: 'btn-admin-product-closeBtn',
    saveUpdateBtn: 'btn-admin-product-saveBtn'
  };
  repairAction: any = {
    headText: 'Create Repair Action',
    selectedIndex: null,
    selectedRow: [],
    form: {
      obj: {
        description: '',
        partnumber: '',
        partnumbersList: [],
        saveButtonLabel: 'Save repair action',
        getLruType: null
      },
      isSubmitted: false,
      isFormLoading: false,
      isError: false,
      errorMsg: null
    },
    radioList: [
      { name: 'All', value: 'all' },
      { name: 'Specific', value: 'specific' }
    ],
    getTableData: false,
    lruTypes: [],
    isLoading: false,
    dataSource: [],
    partNumbers: [],
    displayColumns: ['description', 'allPN', 'partNumbersListId', 'createdAt', 'updatedAt'],
    displayHeader: ['DESCRIPTION', 'ALL P/N', 'SPECIFIC P/N', 'CREATED AT', 'UPDATED AT']
  };
  reasonOfRemoval: any = {
    headText: 'Create reasons of removal',
    selectedIndex: null,
    selectedRow: [],
    form: {
      obj: {
        description: '',
        partnumber: '',
        partnumbersList: [],
        saveButtonLabel: 'Save reason of removal',
        getLruType: null
      },
      isSubmitted: false,
      isFormLoading: false,
      isError: false,
      errorMsg: null
    },
    radioList: [
      { name: 'All', value: 'all' },
      { name: 'Specific', value: 'specific' }
    ],
    getTableData: false,
    lruTypes: [],
    isLoading: false,
    dataSource: [],
    partNumbers: [],
    displayColumns: ['description', 'allPN', 'partNumbersListId', 'createdAt', 'updatedAt'],
    displayHeader: ['DESCRIPTION', 'ALL P/N', 'SPECIFIC P/N', 'CREATED AT', 'UPDATED AT']
  };
  productsObj: any = {
    lruNameForm: null,
    getSelectedNode: {},
    lruTypeForm: null,
    selectedRow: [],
    modalConfig: {},
    configData: [],
    lruConfigData: [],
    getIndexOfNodes: [],
    isLoading: false,
    modalRef: null,
    breadCrumbObj : [],
    lruPartNumber: { value: null, isSubmitted: false },
    displayColumns: ['name', 'createdAt', 'updatedAt'],
    displayHeader: ['LRU TYPE', 'CREATED AT', 'UPDATED AT'],
    buttonList : [
      {
        label: 'Delete',
        icon: 'fa fa-times',
        eventName: 'delete',
        id: 'btn-admin-product-delete'
      },
      {
        label: 'Edit',
        icon: 'fa fa-pencil-square-o',
        eventName: 'edit',
        id: 'btn-admin-product-edit'
      }
    ],
    config: {
      enableSearch: true,
      enableCreate: true,
      createLabel: 'Create LRU Type',
      moduleName: 'createLRUType',
      id: 'btn-admin-product-createLRUType',
      filterIds : {
        filterListId: 'filter-product-list',
        filterText: 'inp-filter-product-text'
      },
      buttonList: [
        {
          label: 'Delete',
          icon: 'fa fa-times',
          eventName: 'delete',
          id: 'btn-admin-product-delete'
        },
        {
          label: 'Edit',
          icon: 'fa fa-pencil-square-o',
          eventName: 'edit',
          id: 'btn-admin-product-edit'
        }
      ]
    },
    form: {
      isError: false,
      name: 'Create LRU Type',
      saveButtonLabel: 'Save LRU Type',
      families: ['Head-end', 'Distribution', 'Seat-end', 'Connectivity'],
      errorMsg: null,
      lruNameConfigData: {
        saveButtonLabel: 'Save LRU Name',
        isLoading: false,
        id: 'btn-admin-product-saveLRUName'
      },
      lruTypeConfigData: {
        saveButtonLabel: 'Save LRU Type',
        isLoading: false,
        id: 'btn-admin-product-saveLRUType'
      },
      partNumberConfigData: {
        saveButtonLabel: 'Save Part Number',
        isLoading: false,
        id: 'btn-admin-product-savePartNumber'
      }
    }
  };
  selection: any = new SelectionModel<any>(false, []);
  removalSelection: any = new SelectionModel<any>(false, []);
  repairActionSelection: any = new SelectionModel<any>(false, []);
  @ViewChild(TreeComponent) private tree: TreeComponent;
  @ViewChildren(MatPaginator) paginator = new QueryList();
  @ViewChild(MatSort) pSort: MatSort;
  @ViewChild('reasonsoFRemovalSort') reasonsoFRemovalSort: MatSort;
  @ViewChild('repairActionsSort') repairActionsSort: MatSort;
  @ViewChild('productForm') private productForm: TemplateRef<any>;
  @ViewChild('reaonsOfRemoval') private reaonsOfRemoval: TemplateRef<any>;
  @ViewChild('repairactionTemplate') private repairactionTemplate: TemplateRef<any>;
  @ViewChild('lruPartNumberForm') private lruPartNumberForm: TemplateRef<any>;
  @ViewChild('lruNamePartNoForm') private lruNamePartNoForm: TemplateRef<any>;
  @ViewChild('deleteModal') private deleteModal: TemplateRef<any>;
  options: ITreeOptions = {
    idField: '_id',
    useVirtualScroll: false,
    displayField: 'name',
    nodeClass: (node: TreeNode) => {
      return 'icon-' + node.data.icon;
    }
  };
  displayedColumns: string[] = ['select', 'name', 'createdAt', 'updatedAt'];
  removalDisplayedColumns: string[] = ['select', 'description', 'allPN', 'partNumbersListId', 'createdAt', 'updatedAt'];
  constructor(
    private dynamicFormService: DynamicFormService,
    private lruPartNumberService: LruPartNumberService,
    private partNumberService: PartNumberService,
    private lruNameService: LruNameService,
    private lruTypesService: LruTypeService,
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private productsService: ProductsService,
    public modalService: NgbModal,
    private config: NgbModalConfig,
    private reasonofremovalService: ReasonofremovalService,
    private repairActionService: RepairActionService
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }
  ngOnInit() {
    /** LRU Name Form **/
    this.productsObj.configData = [
      {
        key: 'category',
        label: 'Category',
        id: 'category',
        type: 'select',
        options: [
          {key: 'head-end',  value: 'Head-end'},
          {key: 'distribution',  value: 'Distribution'},
          {key: 'seat-end',   value: 'Seat-end'},
          {key: 'connectivity', value: 'Connectivity'}
        ],
        required: true,
        order: 3
      },
      {
        key: 'name',
        label: 'Name',
        id: 'name',
        value: '',
        type: 'text',
        required: true,
        pattern: true,
        order: 1
      }
    ];
    this.productsObj.lruNameForm = this.dynamicFormService.getFrom(this.productsObj.configData);
    /** LRU Name Form **/
    this.productsObj.lruConfigData = [
      {
        key: 'name',
        label: 'Name',
        id: 'name',
        value: '',
        type: 'text',
        required: true,
        pattern: false,
        order: 1
      }
    ];
    this.productsObj.lruTypeForm = this.dynamicFormService.getFrom(this.productsObj.lruConfigData);

    this.productsObj.isLoading = true;
    /** Get Tree List **/
    // this.dataSource.data = [];
    this.productsService.getTreeList().subscribe((data) => {
      this.productsObj.isLoading = false;
      if (data && !data['error']) {
        const list = this.treeManipulation(data);
        this.nodes = [...list];
        this.dataSource = new MatTableDataSource(data['lruTypes']);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.pSort;
      }
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator.toArray()[0];
    // this.dataSource.sort = this.pSort;
  }
  getNode(args) {
    /** Get Table List **/
    const getLists = [];
    // getLists.push(args);
    this.productsObj.getSelectedNode = args;
    this.selection.clear();
    // setTimeout(() => {
      if (Object.keys(args).indexOf('lruNames') !== -1) {
        this.productsObj.displayColumns = ['name', 'createdAt', 'updatedAt'];
        this.productsObj.displayHeader = ['LRU NAME', 'CREATED AT', 'UPDATED AT'];
        this.productsObj.form.name = 'Create LRU Name';
        this.productsObj.form.saveButtonLabel = 'Save LRU Name';
        this.productsObj.config = {
          enableCreate: true,
          enableSearch: true,
          createLabel: 'Create LRU Name',
          id: 'btn-admin-product-createLruName',
          moduleName: 'createLRUName',
          buttonList: this.productsObj.buttonList
        };
      } else if (Object.keys(args).indexOf('partNumbers') !== -1) {
        this.productsObj.displayColumns = ['name', 'createdAt', 'updatedAt'];
        this.productsObj.displayHeader = ['NAME', 'CREATED AT', 'UPDATED AT'];
        this.productsObj.form.name = 'Create Part Number';
        this.productsObj.form.saveButtonLabel = 'Save Part Number';
        this.productsObj.config = {
          enableCreate: true,
          enableSearch: true,
          createLabel: 'Create Part Number',
          moduleName: 'createPartNumber',
          id: 'btn-admin-product-createPartNumber',
          buttonList: this.productsObj.buttonList
        };
      } else if (Object.keys(args).indexOf('lruPartNumbers') !== -1) {
        this.productsObj.displayColumns = ['name', 'createdAt', 'updatedAt'];
        this.productsObj.displayHeader = ['LRU PART NUMBER NAME', 'CREATED AT', 'UPDATED AT'];
        this.productsObj.form.name = 'Create LRU Part Number';
        this.productsObj.form.saveButtonLabel = 'Save LRU Part Number';
        this.productsObj.config = {
          enableCreate: true,
          enableSearch: true,
          createLabel: 'Create LRU Part Number',
          moduleName: 'createLRUPartNumber',
          id: 'btn-admin-product-createLRUPartNumber',
          buttonList: this.productsObj.buttonList
        };
      } else if (Object.keys(args).indexOf('lruPartNumber') !== -1) {
        this.productsObj.displayColumns = ['name', 'createdAt', 'updatedAt'];
        this.productsObj.displayHeader = ['LRU PART NUMBER NAME', 'CREATED AT', 'UPDATED AT'];
        this.productsObj.form.name = 'Create LRU Part Number';
        this.productsObj.form.saveButtonLabel = 'Save LRU Part Number';
        this.productsObj.config = {
          enableCreate: false,
          enableSearch: true,
          createLabel: 'Create LRU Part Number',
          id: 'btn-admin-product-createLRUPartNumber',
          moduleName: 'createLRUPartNumber',
          buttonList: [] // this.productsObj.buttonList
        };
      }
      this.productsObj.breadCrumbObj = []; // [args.name];
      let breadCrumbObj = false;
      let breadCrumbData = [];
      const getIndexOfNodes = [];
      this.nodes.some((res, index) => {
          if (!breadCrumbObj) {
              this.productsObj.getIndexOfNodes = [];
              breadCrumbData = [];
              if (res['id'] === args.id) {
                breadCrumbObj = true;
                breadCrumbData.push(res['name']);
                getIndexOfNodes.push(index);
                return true;
              }
              if (res['children']) {
                res['children'].some((res1, index1) => {
                  if (res1['id'] === args.id) {
                    breadCrumbObj = true;
                    breadCrumbData.push([res['name'], ...res1['name']]);
                    getIndexOfNodes.push([index, ...index1]);
                    return true;
                  }
                  if (res1['children']) {
                    res1['children'].some((res2, index2) => {
                      if (res2['id'] === args.id) {
                        breadCrumbObj = true;
                        breadCrumbData.push([res['name'], ...res1['name'], ...res2['name']]);
                        getIndexOfNodes.push([index, ...index1, ...index2]);
                        return true;
                      }
                      if (res2['children']) {
                        res2['children'].some((res3, index3) => {
                          if (res3['id'] === args.id) {
                            breadCrumbObj = true;
                            getIndexOfNodes.push([index, ...index1, ...index2, ...index3]);
                            breadCrumbData.push([res['name'], ...res1['name'], ...res2['name'], ...res3['name']]);
                            return true;
                          }
                        });
                      }
                    });
                  }
                });
              }
          }
        });
      if (breadCrumbObj) {
        this.productsObj.breadCrumbObj =  (typeof breadCrumbData[0] === 'object') ? [...breadCrumbData[0]] : [...breadCrumbData];
        this.productsObj.getIndexOfNodes =  (typeof getIndexOfNodes[0] === 'object') ? [...getIndexOfNodes[0]] : [...getIndexOfNodes];
      }
      if (args.children && args.children.length) {
        getLists.push(...args.children);
      }
      this.dataSource = new MatTableDataSource<any>(getLists);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.pSort;
      this.productsSearch('');
    // }, 500);
  }
  selectedRow(row) {
    if (this.selection.selected.length === 1) {
      this.productsObj['selectedIndex'] = this.dataSource.data.findIndex(x => x.id === this.selection.selected[0].id);
      this.productsObj.selectedRow = [this.selection.selected[0]];
    } else {
      this.productsObj.selectedRow = this.selection.selected;
    }
  }
  treeManipulation(data) {
    data.lruTypes.filter((lruType, lruTypeIndex) => { // GET LRU TYPE
      data.lruTypes[lruTypeIndex].children = lruType.lruNames;
      const id = data.lruTypes[lruTypeIndex].id;
      data.lruTypes[lruTypeIndex].id = 'lruType-' + id;
      if (lruType.lruNames && lruType.lruNames.length) {
        lruType.lruNames.filter((lruPartNumbers, lruPartNumbersIndex) => { // GET PART NO
          const pid = data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].id;
          data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].id = 'lruName-' + pid;
          data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].children = lruPartNumbers.partNumbers || [];
          if (lruPartNumbers.partNumbers && lruPartNumbers.partNumbers.length) {
            lruPartNumbers.partNumbers.filter((partNumbers, partNumbersIndex) => { // GET LRU PART NUMBERS
              const lruPId = lruPartNumbers.partNumbers[partNumbersIndex];
              data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].partNumbers[partNumbersIndex].id = 'pNo-' + lruPId.id;
              data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].partNumbers[partNumbersIndex].name = lruPId.partNumber;
              if (partNumbers.lruPartNumbers && partNumbers.lruPartNumbers.length) {
               const partData = lruPartNumbers.partNumbers[partNumbersIndex].lruPartNumbers;
               data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].partNumbers[partNumbersIndex].children = partData || [];
                partData.filter((obj, index) => {
                  const res = 'lruPno-' + obj.id;
                  const pNo = obj.lruPartNumber;
                  data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].partNumbers[partNumbersIndex].lruPartNumbers[index].id = res;
                  data.lruTypes[lruTypeIndex].lruNames[lruPartNumbersIndex].partNumbers[partNumbersIndex].lruPartNumbers[index].name = pNo;
                });
              }
            });
          }
        });
      }
    });
    return data.lruTypes;
  }
  open(content) {
   this.productsObj.modalRef =  this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
  }
  closeModal() {
    if (this.productsObj.modalRef) {
      this.productsObj.modalRef.close();
    }
  }
  saveProducts(apiMethod, formData) {
      this.productsObj.form.isError = false;
      apiMethod.subscribe(response => {
        const data: any = response;
        this.productsObj.modalConfig.isLoading = false;
        if (data && !data.error && (data.status === 200 || !data.status)) {
          let msg = '';
          if (this.productsObj.form.name.indexOf('Create') !== -1) {
            msg = formData.name + ' was successfully created';
            if (!data.name && data.partNumber) {
              data.name = data.partNumber;
              this.dataSource.data.push(data);
            } else if (data.lruPartNumber) {
              data.name = data.lruPartNumber;
              this.dataSource.data.push(data);
            } else {
              this.dataSource.data.push(data);
            }
          } else if (this.productsObj.form.name.indexOf('Update') !== -1) {
            msg = formData.name + ' was successfully updated';
            this.dataSource.data.splice(this.productsObj.selectedIndex, 1);
            if (!data.name && data.partNumber) {
              data.name = data.partNumber;
              this.dataSource.data.push(data);
            } else if (data.lruPartNumber) {
              data.name = data.lruPartNumber;
              this.dataSource.data.push(data);
            } else {
              this.dataSource.data.push(data);
            }
          }
          this.updateTreeNode(data);
          this.selection.clear();
          this.productsSearch('');
          this.resetForm();
          this.toaster.success(msg, this.productsObj.form.name);
          this.closeModal();
          this.tree.treeModel.update();
        } else if (data.error || data.status !== 200 || !data.status) {
          // if (this.reasonOfRemoval.form.obj.isFormLoading) {
            this.productsObj.form.isError = true;
            this.productsObj.form.errorMsg = (data.error && (data.error.message || data.error.error_description)) || data.statusText;
          // }
        }
      }, error => {
        this.productsObj.form.isError = true;
        this.productsObj.form.errorMsg = (error.error && (error.error.message || error.error.error_description)) || error.statusText;
      });
  }
  openDialogModal(evt) {
    if (evt.moduleName === 'createLRUType' && evt.eventName === 'create') {
      this.productsObj.modalConfig = this.productsObj.form.lruTypeConfigData;
      this.productsObj.form.name = 'Create LRU Type';
      this.open(this.lruNamePartNoForm);
    } else if (evt.eventName === 'create') {
      if (evt.moduleName === 'createLRUName') {
        this.productsObj.modalConfig = this.productsObj.form.lruNameConfigData;
        this.productsObj.form.name = 'Create LRU Name';
        this.productsObj.modalIds = {
          closeBtnId: 'btn-admin-product-closeLruName',
          saveBtnId: 'btn-admin-product-saveLruName'
        };
        this.open(this.productForm);
      } else if (evt.moduleName === 'createLRUPartNumber') {
        this.productsObj.modalConfig = this.productsObj.form.lruNameConfigData;
        this.productsObj.form.name = 'Create LRU Part Number';
        this.productsObj.modalConfig.saveButtonLabel = 'Save part number';
        this.lrunPartNoModalIds.closeBtn = 'closeBtn';
        this.lrunPartNoModalIds.saveUpdateBtn = 'saveBtn';
        this.open(this.lruPartNumberForm);
      } else if (evt.moduleName === 'createPartNumber') {
        this.productsObj.modalConfig = this.productsObj.form.lruNameConfigData;
        this.productsObj.form.name = 'Create Part Number';
        this.productsObj.modalConfig.saveButtonLabel = 'Save part number';
        this.productsObj.modalIds = {
          closeBtnId: 'btn-admin-product-closepartNumber',
          saveBtnId: 'btn-admin-product-savepartNumber'
        };
        this.open(this.productForm);
      } else if (evt.moduleName === 'createReasonOfRemoval') {
        this.reasonOfRemoval.headText = 'Create Reason of Removal';
        this.reasonOfRemoval.form.obj.saveButtonLabel = 'Create reason of removal';
        this.clearRemoval();
        this.open(this.reaonsOfRemoval);
      } else if (evt.moduleName === 'createRepairAction') {
        this.repairAction.headText = 'Create Repair Action';
        this.repairAction.form.obj.saveButtonLabel = 'Create repair action';
        this.clearRemoval();
        this.open(this.repairactionTemplate);
      }

    } else if (evt.eventName === 'delete') {
      if (evt.moduleName === 'createLRUType') {
        this.deleteObj.moduleName = 'LRU Type';
        this.deleteObj.name = 'lru type';
        this.deleteObj.selectedObj = this.productsObj.selectedRow;
        this.open(this.deleteModal);
      } else if (evt.moduleName === 'createLRUName') {
        this.deleteObj.moduleName = 'LRU Name';
        this.deleteObj.name = 'lru name';
        this.deleteObj.selectedObj = this.productsObj.selectedRow;
        this.open(this.deleteModal);
      } else if (evt.moduleName === 'createPartNumber') {
        this.deleteObj.moduleName = 'Part Number';
        this.deleteObj.name = 'part number';
        this.deleteObj.selectedObj = this.productsObj.selectedRow;
        this.open(this.deleteModal);
      } else if (evt.moduleName === 'createLRUPartNumber') {
        this.productsObj.getSelectedNode.partNumber = this.getConfigPartNo();
        this.deleteObj.moduleName = 'LRU Part Number';
        this.deleteObj.name = 'lru part number';
        this.productsObj.modalConfig.saveButtonLabel = 'Save Part Number';
        this.deleteObj.selectedObj = this.productsObj.selectedRow;
        this.productsObj.modalIds = {
          closeBtnId: 'btn-admin-product-closepartNumber',
          saveBtnId: 'btn-admin-product-savepartNumber'
        };
        this.open(this.deleteModal);
      } else if (evt.moduleName === 'createReasonOfRemoval') {
        this.deleteObj.moduleName = 'Reason of Removal';
        this.productsObj.form.name = 'reason of removal';
        this.deleteObj.selectedObj = this.removalSelection.selectedRow;
        this.deleteObj.name = this.removalSelection.selectedRow[0].description;
        this.open(this.deleteModal);
      } else if (evt.moduleName === 'createRepairAction') {
        this.deleteObj.moduleName = 'Repair Actions';
        this.productsObj.form.name = 'repair action';
        this.deleteObj.selectedObj = this.repairActionSelection.selectedRow;
        const row = this.repairActionSelection.selectedRow;
        this.deleteObj.name = (row[0]) ? row[0].description : '';
        this.open(this.deleteModal);
      }
    } else if (evt.eventName === 'edit') {
      if (evt.moduleName === 'createLRUType') {
        this.productsObj.configData[0].value = this.productsObj.selectedRow[0].category.toLowerCase();
        this.productsObj.configData[1].value = this.productsObj.selectedRow[0].name;
        this.productsObj.modalConfig.saveButtonLabel = 'Update LRU Type';
        this.productsObj.form.name = 'Update LRU Type';
        this.productsObj.lruNameForm = this.dynamicFormService.getFrom(this.productsObj.configData);
        this.productsObj.modalIds = {
          closeBtnId: 'btn-admin-product-closeUpdateLru',
          saveBtnId: 'btn-admin-product-saveUpdateLru'
        };
        this.open(this.lruNamePartNoForm);
      } else if (evt.moduleName === 'createLRUName') {
        this.productsObj.lruConfigData[0].value = this.productsObj.selectedRow[0].name;
        this.productsObj.modalConfig.saveButtonLabel = 'Update LRU Name';
        this.productsObj.form.name = 'Update LRU Name';
        this.productsObj.lruTypeForm = this.dynamicFormService.getFrom(this.productsObj.lruConfigData);
        this.productsObj.modalIds = {
          closeBtnId: 'btn-admin-product-closeUpdateLru',
          saveBtnId: 'btn-admin-product-saveUpdateLru'
        };
        this.open(this.productForm);
      } else if (evt.moduleName === 'createPartNumber') {
        this.productsObj.lruConfigData[0].value = this.productsObj.selectedRow[0].name;
        this.productsObj.modalConfig.saveButtonLabel = 'Update Part Number';
        this.productsObj.form.name = 'Update Part Number';
        this.productsObj.lruTypeForm = this.dynamicFormService.getFrom(this.productsObj.lruConfigData);
        this.open(this.productForm);
      } else if (evt.moduleName === 'createLRUPartNumber') {
        this.productsObj.getSelectedNode.partNumber = this.getConfigPartNo();
        this.productsObj.lruPartNumber.value = this.productsObj.selectedRow[0].lruPartNumber.split('-')[1];
        this.productsObj.getSelectedNode.lruPartNumber = this.productsObj.selectedRow[0].lruPartNumber;
        this.productsObj.modalConfig.saveButtonLabel = 'Update Part Number';
        this.productsObj.form.name = 'Update LRU Part Number';
        this.productsObj.lruTypeForm = this.dynamicFormService.getFrom(this.productsObj.lruConfigData);
        this.lrunPartNoModalIds.closeBtn = 'closebtn';
        this.lrunPartNoModalIds.saveUpdateBtn = 'savebtn';
        this.open(this.lruPartNumberForm);

      } else if (evt.moduleName === 'createReasonOfRemoval') {
        this.reasonOfRemoval.headText = 'Update Reason of Removal';
        const row = this.removalSelection.selectedRow;
        this.reasonOfRemoval.form.obj.description = row[0].description;
        this.reasonOfRemoval.form.obj.partnumbersList = [];
        if (row[0].allPN) {
          this.reasonOfRemoval.form.obj.partnumber = this.reasonOfRemoval.radioList[0].value;
        } else {
          this.reasonOfRemoval.form.obj.partnumber = this.reasonOfRemoval.radioList[1].value;
          const selectedIds = [];
          row[0].partNumbersList.forEach((val, index) => {
            selectedIds.push(val.id);
          });
          this.reasonOfRemoval.form.obj.partnumbersList = selectedIds;
        }
        this.reasonOfRemoval.form.obj.description = row[0].description;
        this.reasonOfRemoval.form.obj.saveButtonLabel = 'Update reason of removal';
        this.open(this.reaonsOfRemoval);
      } else if (evt.moduleName === 'createRepairAction') {
        this.repairAction.headText = 'Update Repair Action';
        const row = this.repairActionSelection.selectedRow;
        this.repairAction.form.obj.description = (row[0]) ? row[0].description : '';
        this.repairAction.form.obj.partnumbersList = [];
        if (row[0] && row[0].allPN) {
          this.repairAction.form.obj.partnumber = this.repairAction.radioList[0].value;
        } else {
          this.repairAction.form.obj.partnumber = this.repairAction.radioList[1].value;
          const selectedIds = [];
          row[0].partNumbersList.forEach((val, index) => {
            selectedIds.push(val.id);
          });
          this.repairAction.form.obj.partnumbersList = selectedIds;
        }
        this.repairAction.form.obj.description = row[0].description;
        this.repairAction.form.obj.saveButtonLabel = 'Update repair action';
        this.open(this.repairactionTemplate);
      }
    }
}
  getConfigPartNo() {
    const selectedNode = this.productsObj.getIndexOfNodes;
    return this.nodes[selectedNode[0]]['children'][selectedNode[1]]['children'][selectedNode[2]].name;
  }
  productsSearch(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    if (this.getSelectedTabName === 'Details' || !this.getSelectedTabName) {
      this.dataSource.filter = filterValue;
    } else if (this.getSelectedTabName === 'Repair Actions') {
      this.repairAction.dataSource.filter = filterValue;
    } else if (this.getSelectedTabName === 'Reasons of Removal') {
      this.reasonOfRemoval.dataSource.filter = filterValue;
    }
    this.productsObj.isLoading = false;
  }
  getFormData(data) {
    this.productsObj.modalConfig = {
      isLoading: true
    };
    let apiMethod: any;
    const formData: any = data.formData;
    if (this.productsObj.form.name.indexOf('Create') !== -1) {
      this.productsObj.selectedRow = [];
      if (this.productsObj.form.name === 'Create LRU Type') {
        apiMethod = this.lruTypesService.createLRUTypes(formData);
        this.saveProducts(apiMethod, formData);
      } else if (this.productsObj.form.name === 'Create LRU Name') {
        const getId = this.productsObj.getSelectedNode.id;
        const id: any = (getId.toString().indexOf('-')  !== -1) ? getId.split('-')[1] : getId;
        const input = {
          lruTypeId: id,
          name: data.formData.name,
        };
        apiMethod = this.lruNameService.createLRUName(input);
        this.saveProducts(apiMethod, formData);
      } else if (this.productsObj.form.name === 'Create Part Number') {
        const getId = this.productsObj.getSelectedNode.id;
        const id: any = (getId.toString().indexOf('-')  !== -1) ? getId.split('-')[1] : getId;
        const input = {
          lruNameId: id,
          partNumber: data.formData.name,
        };
        apiMethod = this.partNumberService.createPartNumber(input);
        this.saveProducts(apiMethod, formData);
      } else if (this.productsObj.form.name === 'Create LRU Part Number') {
        const getId = this.productsObj.getSelectedNode.id;
        const id: any = (getId.toString().indexOf('-')  !== -1) ? getId.split('-')[1] : getId;
        const input = {
          lruPartNumber: data.formData.name,
          partNumberId: id
         };
        apiMethod = this.lruPartNumberService.createLRUPartNumber(input);
        this.saveProducts(apiMethod, formData);
      }
    } else if (this.productsObj.form.name.indexOf('Update') !== -1) {
      const getId = this.productsObj.selectedRow[0].id;
      const id: any = (getId.toString().indexOf('-')  !== -1) ? getId.split('-')[1] : getId;
      if (this.productsObj.form.name === 'Update LRU Type') {
        formData.id = id;
        this.saveProducts(this.lruTypesService.updateLRUTypes(formData), formData);
      } else if (this.productsObj.form.name === 'Update LRU Name') {
        const input = {
          id: id,
          lruTypeId: this.productsObj.selectedRow[0].lruTypeId,
          name: data.formData.name
        };
        this.saveProducts(this.lruNameService.updateLRUName(input), formData);
      } else if (this.productsObj.form.name === 'Update Part Number') {
        const input = {
          id: id,
          lruNameId: this.productsObj.selectedRow[0].lruNameId,
          partNumber: data.formData.name
        };
        this.saveProducts(this.partNumberService.updatePartNumber(input), formData);
      } else if (this.productsObj.form.name === 'Update LRU Part Number') {
        const input = {
          lruPartNumber: data.formData.name,
          partNumberId: this.productsObj.selectedRow[0].partNumberId,
          id: id,
         };
        this.saveProducts(this.lruPartNumberService.updateLRUPartNumber(input), formData);
      }
    }
  }
  cancelEvent() {
    this.productsObj.form.isError = false;
    this.resetForm();
    this.closeModal();
  }
  deleteConfirm(params) {
    this.deleteObj.isDeleted = true;
    this.deleteObj.isError = false;
    let deleteApiMethod: any = null;
    const getId = this.deleteObj.selectedObj[0].id;
    const id: any = (getId.toString().indexOf('-')  !== -1) ? getId.split('-')[1] : getId;
    if (this.productsObj.form.name.indexOf('LRU Type') !== -1) {
      deleteApiMethod = this.lruTypesService.deleteLRUTypes(id);
    } else if (this.productsObj.form.name.indexOf('LRU Name') !== -1) {
      deleteApiMethod = this.lruNameService.deleteLRUName(id);
    } else if (this.productsObj.form.name.indexOf('Part Number') !== -1 && this.productsObj.form.name.indexOf('LRU Part Number') === -1) {
      deleteApiMethod = this.partNumberService.deletePartNumber(id);
    } else if (this.productsObj.form.name.indexOf('LRU Part Number') !== -1) {
      deleteApiMethod = this.lruPartNumberService.deleteLRUPartNumber(id);
    } else if (this.productsObj.form.name.indexOf('reason of removal') !== -1) {
      deleteApiMethod = this.reasonofremovalService.deleteRemovals(id);
    } else if (this.productsObj.form.name.indexOf('repair action') !== -1) {
      deleteApiMethod = this.repairActionService.deleteRepairAction(id);
    }
    deleteApiMethod.subscribe(response => {
      const data: any = response;
      if (!data) {
        let msg = this.deleteObj.selectedObj[0].name + ' was successfully deleted';
        this.closeModal();
        this.deleteObj.isDeleted = false;
        if (this.productsObj.form.name.indexOf('reason of removal') !== -1) {
          msg = this.deleteObj.selectedObj[0].description + ' was successfully deleted';
          this.reasonOfRemoval.dataSource.data.splice(this.removalSelection.selectedIndex, 1);
          this.removalSelection.clear();
          this.reasonOfRemoval.dataSource.filter = '';
        } else  if (this.productsObj.form.name.indexOf('repair action') !== -1) {
          msg = this.deleteObj.selectedObj[0].description + ' was successfully deleted';
          this.repairAction.dataSource.data.splice(this.repairActionSelection.selectedIndex, 1);
          this.repairActionSelection.clear();
          this.repairAction.dataSource.filter = '';
        } else {
          this.deleteTreeNodes();
          this.dataSource.data.splice(this.productsObj.selectedIndex, 1);
          this.selection.clear();
          this.productsSearch('');
          this.tree.treeModel.update();
        }
        this.toaster.success(msg, 'Delete ' + this.deleteObj.moduleName);
        // const list = this.treeManipulation(this.nodes);
        // this.nodes = [...list];
      } else if (data.error) {
        this.productsObj.isError = true;
        this.deleteObj.errorMsg = data.error.message || data.error.error_description;
        this.deleteObj.isError = true;
        this.deleteObj.isDeleted = false;
      }
    });
  }
  resetForm() {
    this.productsObj.lruTypeForm[0].value = '';
    this.productsObj.lruNameForm[0].value = '';
    this.productsObj.lruNameForm[1].value = '';
    this.productsObj.lruPartNumber.value = '';
  }
  getLRUPartNumber(partNumber) {
    this.productsObj.lruPartNumber.value = partNumber;
    this.productsObj.lruPartNumber.isSubmitted = true;
    if (partNumber) {
      const pNo = this.productsObj.getSelectedNode.partNumber + '-' + partNumber;
      this.getFormData({formData: {name: pNo}});
      if (this.productsObj.form.name === 'Update LRU Part Number') {
        this.productsObj.modalConfig.saveButtonLabel = 'Update part number';
      } else {
        this.productsObj.modalConfig.saveButtonLabel = 'Save part number';
      }
      this.productsObj.lruPartNumber.isSubmitted = false;
    }
  }
  updateTreeNode(data) {
    const name = this.productsObj.form.name;
    if (name.indexOf('Create LRU Type') !== -1 || name.indexOf('Update LRU Type') !== -1) {
      data.lruNames = [];
    } else if (name.indexOf('Create LRU Name') !== -1 || name.indexOf('Update LRU Name') !== -1) {
      data.partNumbers = [];
    } else if (name.indexOf('Create Part Number') !== -1 || name.indexOf('Update Part Number') !== -1) {
      data.lruPartNumbers = [];
    }

    data.id = Math.random().toFixed(3).toString() + '-' + data.id;

    if (this.productsObj.getIndexOfNodes.length === 1) {
      if (!this.nodes[this.productsObj.getIndexOfNodes[0]]['children']) {
        this.nodes[this.productsObj.getIndexOfNodes[0]]['children'] = [];
      }
      this.nodes[this.productsObj.getIndexOfNodes[0]]['children'].filter((val, index) => {
        if (parseFloat(val.id.split('-')[1]) === parseFloat(data.id.split('-')[1])) {
          this.nodes[this.productsObj.getIndexOfNodes[0]]['children'].splice(index , 1);
        }
      });
      this.nodes[this.productsObj.getIndexOfNodes[0]]['children'].push(data);
    } else if (this.productsObj.getIndexOfNodes.length === 2) {
      const pNo = this.productsObj.getIndexOfNodes;
      if (!this.nodes[pNo[0]]['children'][pNo[1]]['children']) {
        this.nodes[pNo[0]]['children'][pNo[1]]['children'] = [];
      }
      this.nodes[pNo[0]]['children'][pNo[1]]['children'].filter((val, index) => {
        if (parseFloat(val.id.split('-')[1]) === parseFloat(data.id.split('-')[1])) {
          data.children = this.nodes[pNo[0]]['children'][pNo[1]]['children'][index]['children'];
          this.nodes[pNo[0]]['children'][pNo[1]]['children'].splice(index , 1);
        }
      });
      this.nodes[pNo[0]]['children'][pNo[1]]['children'].push(data);
    } else if (this.productsObj.getIndexOfNodes.length === 3) {
      const pNo = this.productsObj.getIndexOfNodes;
      if (!this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children']) {
        this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'] = [];
      }
      this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'].filter((val, index) => {
        if (parseFloat(val.id.split('-')[1]) === parseFloat(data.id.split('-')[1])) {
          this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'].splice(index , 1);
        }
      });
      this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'].push(data);
    } else if (this.productsObj.getIndexOfNodes.length === 4) {
      const pNo = this.productsObj.getIndexOfNodes;
      if (!this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'][pNo[3]]['children']) {
        this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'][pNo[3]]['children'] = [];
      }
      this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'][pNo[3]]['children'].filter((val, index) => {
        if (parseFloat(val.id.split('-')[1]) === parseFloat(data.id.split('-')[1])) {
          this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'][pNo[3]]['children'].splice(index , 1);
        }
      });
      this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'][pNo[3]]['children'].push(data);
    } else if (!this.productsObj.getIndexOfNodes.length) {
      let getIndex = null;
      this.nodes.filter((val, index) => {
        const id = val['id'].split('-')[1];
        if (id === data.id.split('-')[1]) {
          getIndex = index;
        }
      });
      if (getIndex !== null) {
        this.nodes.splice(getIndex , 1);
      }
      this.nodes.push(data);
    }
  }
  deleteTreeNodes () {
    if (!this.productsObj.getIndexOfNodes.length) {
      this.nodes.splice(this.productsObj.selectedIndex, 1);
    } else if (this.productsObj.getIndexOfNodes.length === 1) {
      this.nodes[this.productsObj.getIndexOfNodes[0]]['children'].splice(this.productsObj.selectedIndex, 1);
    } else if (this.productsObj.getIndexOfNodes.length === 2) {
      const pNo = this.productsObj.getIndexOfNodes;
      this.nodes[pNo[0]]['children'][pNo[1]]['children'].splice(this.productsObj.selectedIndex, 1);
    } else if (this.productsObj.getIndexOfNodes.length === 3) {
      const pNo = this.productsObj.getIndexOfNodes;
      this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'].splice(this.productsObj.selectedIndex , 1);
    } else if (this.productsObj.getIndexOfNodes.length === 4) {
      const pNo = this.productsObj.getIndexOfNodes;
      this.nodes[pNo[0]]['children'][pNo[1]]['children'][pNo[2]]['children'][pNo[3]]['children'].splice(this.productsObj.selectedIndex , 1);
    }
  }
  /***********
   * Reason of removals
   ********* */
  getLRUTypeList (selectedType) {
    if (this.getSelectedTabName === 'Reasons of Removal') {
      this.reasonOfRemoval.getselectedType = selectedType;
      this.reasonOfRemoval.getTableData = true;
      this.reasonOfRemoval.dataSource = new MatTableDataSource<any>([]);
      this.reasonOfRemoval.dataSource.sort = this.reasonsoFRemovalSort;
      const apiMethod = {
        apiUrl: this.reasonofremovalService.getReasonOFRemoval(selectedType),
        moduleName: 'reasonOfRemovals'
      };
      this.getReasonOfRemovals(apiMethod);
      const partNumbers = {
        apiUrl: this.reasonofremovalService.getPartNumbers(selectedType),
        moduleName: 'partNumbers'
      };
      this.getReasonOfRemovals(partNumbers);
    } else if (this.getSelectedTabName === 'Repair Actions') {
      this.repairAction.getselectedType = selectedType;
      this.repairAction.getTableData = true;
      this.repairAction.dataSource = [];
      this.repairAction.dataSource.sort = this.repairActionsSort;
      const apiMethod = {
        apiUrl: this.repairActionService.getRepairActionList(selectedType),
        moduleName: 'repairAction'
      };
      this.getReasonOfRemovals(apiMethod);
      const partNumbers = {
        apiUrl: this.repairActionService.getPartNumbers(selectedType),
        moduleName: 'partNumbers'
      };
      this.getReasonOfRemovals(partNumbers);
    }
  }
  getTabName (event) {
    this.getSelectedTabName = event.tab.textLabel;
    if (event.tab.textLabel === 'Reasons of Removal') {
      if (!this.reasonOfRemoval.form.obj.getLruType) {
        this.reasonOfRemoval.form.obj.getLruType = '';
      }
      this.reasonOfRemoval.form.obj.partnumber = this.reasonOfRemoval.radioList[0].value;
      this.productsObj.config.createLabel = 'Create reason of removal';
      this.productsObj.config.moduleName = 'createReasonOfRemoval';
      const apiMethod = {
        apiUrl: this.reasonofremovalService.getLRUTypes(),
        moduleName: 'lruTypeList'
      };
      if (!this.reasonOfRemoval.dataSource.data) {
        this.reasonOfRemoval.isLoading = true;
        this.getReasonOfRemovals(apiMethod);
      }
    } else if (event.tab.textLabel === 'Details') {
      this.productsObj.config.createLabel = 'Create LRU Type';
      this.productsObj.config.moduleName = 'createLRUType';
    } else if (event.tab.textLabel === 'Repair Actions') {
      if (!this.repairAction.form.obj.getLruType) {
        this.repairAction.form.obj.getLruType = '';
      }
      this.repairAction.form.obj.partnumber = this.repairAction.radioList[0].value;
      this.productsObj.config.createLabel = 'Create repair action';
      this.productsObj.config.moduleName = 'createRepairAction';
      const apiMethod = {
        apiUrl: this.repairActionService.getLRUTypes(),
        moduleName: 'lruTypeList'
      };
      if (!this.repairAction.dataSource.data) {
        this.repairAction.isLoading = true;
        this.getReasonOfRemovals(apiMethod);
      }
    }
  }
  getReasonOfRemovals(apiInfo) {
    apiInfo.apiUrl.subscribe(response => {
      const data: any = response;
      if (this.getSelectedTabName === 'Reasons of Removal') {
        this.reasonOfRemoval.isLoading = false;
        this.reasonOfRemoval.form.isSubmitted = false;
        this.reasonOfRemoval.form.obj.isFormLoading = false;
      } else if (this.getSelectedTabName === 'Repair Actions') {
        this.repairAction.isLoading = false;
        this.repairAction.form.isSubmitted = false;
        this.repairAction.form.obj.isFormLoading = false;
      }
      if (data && !data.error && (data.status === 200 || !data.status)) {
      // if (data) {
        if (this.getSelectedTabName === 'Reasons of Removal') {
          this.updateReasonOfRemoval(apiInfo, response);
        } else if (this.getSelectedTabName === 'Repair Actions') {
          this.updateRepairAction(apiInfo, response);
        }
      } else if (data.error || data.status !== 200 || !data.status) {
        if (this.getSelectedTabName === 'Reasons of Removal') {
          this.reasonOfRemoval.getTableData = false;
          this.reasonOfRemoval.form.isError = true;
          this.reasonOfRemoval.form.errorMsg = (data.error && (data.error.message || data.error.error_description)) || data.statusText;
        } else if (this.getSelectedTabName === 'Repair Actions') {
          this.repairAction.getTableData = false;
          this.repairAction.form.isError = true;
          this.repairAction.form.errorMsg = (data.error && (data.error.message || data.error.error_description)) || data.statusText;
        }
      }
    });
  }
  getSelectedPartNumbers(eve) {
      console.log(eve);
  }
  getAllPin(partNumber) {
    if (partNumber === 'specific') {
      return false;
    }
    return true;
  }

  saveReasonOfRemoval() {
    let apiMethod = {};
    if (this.getSelectedTabName === 'Reasons of Removal') {
      this.reasonOfRemoval.form.isSubmitted = true;
      const formObj = this.reasonOfRemoval.form.obj;
      const pnolist = formObj.partnumbersList;
      if (formObj.partnumber === 'all') {
        formObj.partnumbersList = [];
      }
      const validation = (formObj.partnumber === 'all' || (formObj.partnumber === 'specific' && (pnolist && pnolist.length)));
      if (this.reasonOfRemoval.form.obj.description && validation) {
        this.reasonOfRemoval.form.obj.isFormLoading = true;
        const createData = {
          description: formObj.description,
          lruTypeId: formObj.getLruType,
          allPN: this.getAllPin(formObj.partnumber),
          partNumbersList: this.getPartNumbersList(formObj.partnumbersList)
        };
          apiMethod = {
            apiUrl: this.reasonofremovalService.createRemovals(createData),
            moduleName: 'createRemovals'
          };
          if (this.removalSelection.selectedRow && this.removalSelection.selectedRow.length) {
            const row = this.removalSelection.selectedRow[0];
            apiMethod = {
              apiUrl: this.reasonofremovalService.updateRemovals(createData, row.id),
              moduleName: 'updateRemovals'
            };
          }
      }
    } else if (this.getSelectedTabName === 'Repair Actions') {
      this.repairAction.form.isSubmitted = true;
      const formObj = this.repairAction.form.obj;
      const pnolist = formObj.partnumbersList;
      if (formObj.partnumber === 'all') {
        formObj.partnumbersList = [];
      }
      const validation = (formObj.partnumber === 'all' || (formObj.partnumber === 'specific' && (pnolist && pnolist.length)));
      if (this.repairAction.form.obj.description && validation) {
        this.repairAction.form.obj.isFormLoading = true;
        const createData = {
          description: formObj.description,
          lruTypeId: formObj.getLruType,
          allPN: this.getAllPin(formObj.partnumber),
          partNumbersList: this.getPartNumbersList(formObj.partnumbersList)
        };
          apiMethod = {
            apiUrl: this.repairActionService.createRepairAction(createData),
            moduleName: 'createRepairAction'
          };
          if (this.repairActionSelection.selectedRow && this.repairActionSelection.selectedRow.length) {
            const row = this.repairActionSelection.selectedRow[0];
            apiMethod = {
              apiUrl: this.repairActionService.updateRepairAction(createData, row.id),
              moduleName: 'updateRepairAction'
            };
          }
      }
    }
    this.getReasonOfRemovals(apiMethod);
  }
  clearRemoval() {
    // this.removalSelection.clear();
    if (this.getSelectedTabName === 'Reasons of Removal') {
      this.reasonOfRemoval.form.isError = false;
      this.reasonOfRemoval.form.errorMsg = null;
      this.reasonOfRemoval.form.isSubmitted = false;
      this.reasonOfRemoval.form.description = null;
      this.reasonOfRemoval.form.obj.description = null;
      this.reasonOfRemoval.form.obj.partnumbersList = [];
      this.reasonOfRemoval.form.obj.partnumber = this.reasonOfRemoval.radioList[0].value;
    } else if (this.getSelectedTabName === 'Repair Actions') {
      this.repairAction.form.isError = false;
      this.repairAction.form.errorMsg = null;
      this.repairAction.form.isSubmitted = false;
      this.repairAction.form.description = null;
      this.repairAction.form.obj.description = null;
      this.repairAction.form.obj.partnumbersList = [];
      this.repairAction.form.obj.partnumber = this.repairAction.radioList[0].value;
    }
  }

  getPartNumber(ids, partNumbers) {
    const getList = [];
    partNumbers.forEach((data, i) => {
        if (ids.indexOf(data.id) !== -1) {
        getList.push(data);
        }
    });
    return getList;
  }

  getPartNumbersList(ids) {
    let getList = [];
    if (this.getSelectedTabName === 'Reasons of Removal') {
      if (ids) {
        getList = this.getPartNumber(ids, this.reasonOfRemoval.partNumbers);
      }
    } else if (this.getSelectedTabName === 'Repair Actions') {
      if (ids) {
        getList = this.getPartNumber(ids, this.repairAction.partNumbers);
      }
    }
    return getList;
  }
  removalSelectedRow() {
    if (this.getSelectedTabName === 'Reasons of Removal') {
      if (this.removalSelection.selected.length === 1) {
        const data = this.reasonOfRemoval.dataSource.data;
        this.removalSelection['selectedIndex'] = data.findIndex(x => x.id === this.removalSelection.selected[0].id);
        this.removalSelection.selectedRow = [this.removalSelection.selected[0]];
      } else {
        this.removalSelection.selectedRow = this.removalSelection.selected;
      }
    } else if (this.getSelectedTabName === 'Repair Actions') {
      if (this.repairActionSelection.selected.length === 1) {
        const data = this.repairAction.dataSource.data;
        this.repairActionSelection['selectedIndex'] = data.findIndex(x => x.id === this.repairActionSelection.selected[0].id);
        this.repairActionSelection.selectedRow = [this.repairActionSelection.selected[0]];
      } else {
        this.repairActionSelection.selectedRow = this.repairActionSelection.selected;
      }
    }
  }

  getPinNumbers(val) {
    let pin = '';
    if (val.partNumbersList) {
      val.partNumbersList.forEach((id, i) => {
        if (!pin) {
          pin = id.partNumber;
        } else {
          pin = pin + ',' + id.partNumber;
        }
      });
    }
    return pin;
  }

  specificPin() {
    if (this.getSelectedTabName === 'Reasons of Removal') {
        this.getPinNumbers(this.reasonOfRemoval.dataSource.data);
      this.reasonOfRemoval.dataSource.data.forEach((val, index) => {
         let pin = '';
         pin = this.getPinNumbers(val);
        this.reasonOfRemoval.dataSource.data[index].partNumbersListId = pin;
      });
    } else if (this.getSelectedTabName === 'Repair Actions') {
      this.repairAction.dataSource.data.forEach((val, index) => {
        let pin = '';
        pin = this.getPinNumbers(val);
        this.repairAction.dataSource.data[index].partNumbersListId = pin;
      });
    }
  }
  updateReasonOfRemoval(apiInfo, response) {
    const data = response;
    this.removalSelection.clear();
    if (apiInfo.moduleName === 'createRemovals') {
      if (this.reasonOfRemoval.dataSource.data) {
        this.reasonOfRemoval.dataSource.data.push(response);
        this.specificPin();
      } else {
        this.reasonOfRemoval.dataSource = new MatTableDataSource<any>([data]);
        this.reasonOfRemoval.dataSource.sort = this.reasonsoFRemovalSort;
      }
      this.reasonOfRemoval.dataSource.filter = '';
      this.specificPin();
      this.closeModal();
      const msg =  response.description + ' was successfully created';
      this.toaster.success(msg, 'Create reason of removals');
    } else if (apiInfo.moduleName === 'updateRemovals') {
      this.reasonOfRemoval.dataSource.data.splice(this.removalSelection.selectedIndex, 1);
      this.reasonOfRemoval.dataSource.data.push(response);
      this.reasonOfRemoval.dataSource.filter = '';
      this.specificPin();
      this.closeModal();
      const msg =  response.description + ' was successfully updated';
      this.toaster.success(msg, 'Update reason of removals');
    } else if (apiInfo.moduleName === 'lruTypeList') {
      this.reasonOfRemoval.lruTypes = data;
      this.reasonOfRemoval.form.obj.getLruType = data[0].id;
      this.getLRUTypeList(data[0].id);
    } else if (apiInfo.moduleName === 'partNumbers') {
      data.forEach((val, index) => {
        val['name'] = val.partNumber;
      });
      this.reasonOfRemoval.partNumbers = data;
    } else if (apiInfo.moduleName === 'reasonOfRemovals') {
      this.reasonOfRemoval.dataSource = new MatTableDataSource(data);
      this.reasonOfRemoval.dataSource.filter = '';
      this.reasonOfRemoval.dataSource.sort = this.reasonsoFRemovalSort;
      this.specificPin();
      this.reasonOfRemoval.getTableData = false;
    }
    this.removalSelection.selectedRow = [];
  }
  updateRepairAction(apiInfo, response) {
    this.repairActionSelection.selectedRow = [];
    this.repairActionSelection.clear();
    const data = response;
    this.productsObj.config.enableSearch = true;
    this.productsObj.config.enableCreate = true;
    this.productsObj.config.createLabel = 'Create repair actions';
    this.productsObj.config.moduleName = 'createRepairAction';
    if (apiInfo.moduleName === 'createRepairAction') {
      if (this.repairAction.dataSource.data) {
        this.repairAction.dataSource.data.push(response);
        this.specificPin();
      } else {
        this.repairAction.dataSource = new MatTableDataSource<any>([data]);
        this.repairAction.dataSource.sort = this.repairActionsSort;
      }
      this.repairAction.dataSource.filter = '';
      this.specificPin();
      this.closeModal();
      const msg =  response.description + ' was successfully created';
      this.toaster.success(msg, 'Create repair action');
    } else if (apiInfo.moduleName === 'updateRepairAction') {
      this.repairAction.dataSource.data.splice(this.repairActionSelection.selectedIndex, 1);
      this.repairAction.dataSource.data.push(response);
      this.repairAction.dataSource.filter = '';
      this.specificPin();
      this.closeModal();
      const msg =  response.description + ' was successfully updated';
      this.toaster.success(msg, 'Update repair action');
    } else if (apiInfo.moduleName === 'lruTypeList') {
      this.repairAction.lruTypes = data;
      this.repairAction.form.obj.getLruType = data[0].id;
      this.getLRUTypeList(data[0].id);
    } else if (apiInfo.moduleName === 'partNumbers') {
      data.forEach((val, index) => {
        val['name'] = val.partNumber;
      });
      this.repairAction.partNumbers = data;
    } else if (apiInfo.moduleName === 'repairAction') {
      this.repairAction.dataSource = new MatTableDataSource(data);
      this.repairAction.dataSource.sort = this.repairActionsSort;
      this.repairAction.dataSource.filter = '';
      this.specificPin();
      this.repairAction.getTableData = false;
    }
  }
}
