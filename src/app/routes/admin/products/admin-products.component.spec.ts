import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeModel, TreeNode, TreeComponent, ITreeOptions, IActionMapping, TREE_ACTIONS, KEYS } from 'angular-tree-component';
import { AdminProductsComponent } from './admin-products.component';
import { LruPartNumberService } from '../../../shared/services/admin/products/lrupartnumber/lrupartnumber.service';
import { LruTypeService } from '../../../shared/services/admin/products/lrutypes/lrutypes.service';
import { PartNumberService } from '../../../shared/services/admin/products/partnumber/partnumber.service';
import { MaterialModule } from '../../../shared/material.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TreeModule } from 'angular-tree-component';
import { ProductsService } from '../../../shared/services/admin/products/products.service';
import { LruNameService } from '../../../shared/services/admin/products/lrunames/lrunames.service';
import { ReasonofremovalService } from '../../../shared/services/admin/products/reasonofremoval/reasonofremoval.service';
import { RepairActionService } from '../../../shared/services/admin/products/repairaction/repairaction.service';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule
} from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';
import { ArtefactModule } from '../../../shared/artefact.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModule } from '../../../shared/bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let lruTypeService: LruTypeService;
  let lruNameService: LruNameService;
  let partNumberService: PartNumberService;
  let lruPartNumberService: LruPartNumberService;
  let reasonofremovalService: ReasonofremovalService;
  let repairActionService: RepairActionService;
  const treeNode = {
    'lruTypes': [{
      'id': 53,
      'name': '11',
      'category': 'connectivity',
      'createdAt': '2019-01-23 04:12:30',
      'updatedAt': '2019-01-23 04:12:30',
      'children' : [
        {
          'id': 59,
          'name': '78',
          'lruTypeId': 53,
          'createdAt': '2019-01-23 04:12:39',
          'updatedAt': '2019-01-23 04:12:39',
          'children' : [
            {
              'id': 59,
              'name': '78',
              'lruTypeId': 53,
              'createdAt': '2019-01-23 04:12:39',
              'updatedAt': '2019-01-23 04:12:39',
              'children' : [
                {
                  'id': 59,
                  'name': '78',
                  'lruTypeId': 53,
                  'createdAt': '2019-01-23 04:12:39',
                  'updatedAt': '2019-01-23 04:12:39',
                  'children' : [
                    {
                      'id': 59,
                      'name': '78',
                      'lruTypeId': 53,
                      'createdAt': '2019-01-23 04:12:39',
                      'updatedAt': '2019-01-23 04:12:39',
                      'partNumbers': [
                        {
                          'id': 9,
                          'partNumber': '78partno',
                          'lruNameId': 59,
                          'createdAt': '2019-01-23 04:12:54',
                          'updatedAt': '2019-01-23 04:12:54',
                          'lruPartNumbers': [
                            {
                              'id': 22,
                              'lruPartNumber': '78partno-1005',
                              'partNumberId': 9,
                              'createdAt': '2019-01-23 04:19:34',
                              'updatedAt': '2019-01-23 04:19:53'
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  'partNumbers': [
                    {
                      'id': 9,
                      'partNumber': '78partno',
                      'lruNameId': 59,
                      'createdAt': '2019-01-23 04:12:54',
                      'updatedAt': '2019-01-23 04:12:54',
                      'lruPartNumbers': [
                        {
                          'id': 22,
                          'lruPartNumber': '78partno-1005',
                          'partNumberId': 9,
                          'createdAt': '2019-01-23 04:19:34',
                          'updatedAt': '2019-01-23 04:19:53'
                        }
                      ]
                    }
                  ]
                }
              ],
              'partNumbers': [
                {
                  'id': 9,
                  'partNumber': '78partno',
                  'lruNameId': 59,
                  'createdAt': '2019-01-23 04:12:54',
                  'updatedAt': '2019-01-23 04:12:54',
                  'lruPartNumbers': [
                    {
                      'id': 22,
                      'lruPartNumber': '78partno-1005',
                      'partNumberId': 9,
                      'createdAt': '2019-01-23 04:19:34',
                      'updatedAt': '2019-01-23 04:19:53'
                    }
                  ]
                }
              ]
            }
          ],
          'partNumbers': [
            {
              'id': 9,
              'partNumber': '78partno',
              'lruNameId': 59,
              'createdAt': '2019-01-23 04:12:54',
              'updatedAt': '2019-01-23 04:12:54',
              'lruPartNumbers': [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ]
            }
          ]
        }
      ],
      'lruNames': [
        {
          'id': 59,
          'name': '78',
          'lruTypeId': 53,
          'createdAt': '2019-01-23 04:12:39',
          'updatedAt': '2019-01-23 04:12:39',
          'children' : [
            {
              'id': 9,
              'partNumber': '78partno',
              'lruNameId': 59,
              'createdAt': '2019-01-23 04:12:54',
              'updatedAt': '2019-01-23 04:12:54',
              'lruPartNumbers': [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ]
            }
          ],
          'partNumbers': [
            {
              'id': 9,
              'partNumber': '78partno',
              'lruNameId': 59,
              'createdAt': '2019-01-23 04:12:54',
              'updatedAt': '2019-01-23 04:12:54',
              'children' : [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ],
              'lruPartNumbers': [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ]
            }
          ]
        }
      ]
    }]
  };
  const treeNodes = {
    'lruTypes': [{
      'id': 53,
      'name': '11',
      'category': 'connectivity',
      'createdAt': '2019-01-23 04:12:30',
      'updatedAt': '2019-01-23 04:12:30',
      'children' : [
        {
          'id': 59,
          'name': '78',
          'lruTypeId': 53,
          'createdAt': '2019-01-23 04:12:39',
          'updatedAt': '2019-01-23 04:12:39',
          'partNumbers': [
            {
              'id': 9,
              'partNumber': '78partno',
              'lruNameId': 59,
              'createdAt': '2019-01-23 04:12:54',
              'updatedAt': '2019-01-23 04:12:54',
              'lruPartNumbers': [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ]
            }
          ]
        }
      ],
      'lruNames': [
        {
          'id': 59,
          'name': '78',
          'lruTypeId': 53,
          'createdAt': '2019-01-23 04:12:39',
          'updatedAt': '2019-01-23 04:12:39',
          'children' : [
            {
              'id': 9,
              'partNumber': '78partno',
              'lruNameId': 59,
              'createdAt': '2019-01-23 04:12:54',
              'updatedAt': '2019-01-23 04:12:54',
              'lruPartNumbers': [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ]
            }
          ],
          'partNumbers': [
            {
              'id': 9,
              'partNumber': '78partno',
              'lruNameId': 59,
              'createdAt': '2019-01-23 04:12:54',
              'updatedAt': '2019-01-23 04:12:54',
              'children' : [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ],
              'lruPartNumbers': [
                {
                  'id': 22,
                  'lruPartNumber': '78partno-1005',
                  'partNumberId': 9,
                  'createdAt': '2019-01-23 04:19:34',
                  'updatedAt': '2019-01-23 04:19:53'
                }
              ]
            }
          ]
        }
      ]
    }]
  };
  let getNodes: any = {'id': '53', 'name': '111', 'category': 'head-end',
  'createdAt': '2019-02-04 10:09:03', 'updatedAt': '2019-02-04 10:09:03', 'lruNames': [],
  'children': [], '_id': 7672868845858};
  const mockProductService = {
    getTreeList(): Observable<any> {
      return Observable.of(treeNodes);
    }
  };
  const mockLruTypeService = {
    deleteLRUTypes(): Observable<any> {
      return Observable.of(null);
    },
    createLRUTypes(data): Observable<any> {
      return Observable.of({status: 200, partNumber: '1', lruPartNumber: 20, lruNames: []});
    },
    updateLRUTypes(data): Observable<any> {
      return Observable.of({status: 200});
    }
  };
  const mocklruNameService = {
    deleteLRUName(data): Observable<any> {
      return Observable.of(null);
    },
    updateLRUName(data): Observable<any> {
      return Observable.of({status: 200, partNumber: '1', lruPartNumber: 20, lruNames: []});
    },
    createLRUName(data): Observable<any> {
      return Observable.of({status: 200, partNumber: '1', lruPartNumber: 20, lruNames: []});
    }
  };
  const mockpartNumberService = {
    deletePartNumber(): Observable<any> {
      return Observable.of(null);
    },
    updatePartNumber(): Observable<any> {
      return Observable.of({status: 200, partNumber: '1', lruPartNumber: 20, lruNames: []});
    },
    createPartNumber(data): Observable<any> {
      return Observable.of({status: 200, partNumber: '1', lruPartNumber: 20, lruNames: []});
    }
  };
  const mocklruPartNumberService = {
    deleteLRUPartNumber(): Observable<any> {
      return Observable.of(null);
    },
    updateLRUPartNumber(): Observable<any> {
      return Observable.of({status: 200});
    },
    createLRUPartNumber(): Observable<any> {
      return Observable.of({status: 200, partNumber: '1', lruPartNumber: 20, lruNames: []});
    }
  };
  const mockreasonofremovalService = {
    deleteRemovals(): Observable<any> {
      return Observable.of(null);
    },
    createRemovals(): Observable<any> {
      return Observable.of({status: 200});
    },
    updateRemovals(): Observable<any> {
      return Observable.of({status: 200});
    },
    getLRUTypes(): Observable<any> {
      return Observable.of({status: 200, data: [{id: 1}]});
    },
    getReasonOFRemoval(): Observable<any> {
      return Observable.of({status: 200, data: [{id: 1}]});
    },
    getPartNumbers(): Observable<any> {
      return Observable.of({status: 200, data: [{id: 1}]});
    }
  };
  const mockrepairActionService = {
    deleteRepairAction(): Observable<any> {
      return Observable.of(null);
    },
    createRepairAction(): Observable<any> {
      return Observable.of({status: 200});
    },
    updateRepairAction(): Observable<any> {
      return Observable.of({status: 200});
    },
    getLRUTypes(): Observable<any> {
      return Observable.of({status: 200});
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminProductsComponent
      ],
      imports: [
        MatRadioModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        BootstrapModule,
        MatFormFieldModule,
        MatInputModule,
        ArtefactModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        NgbModule,
        MultiselectDropdownModule,
        TreeModule.forRoot()
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductService },
        { provide: LruTypeService, useValue: mockLruTypeService },
        { provide: LruNameService, useValue: mocklruNameService },
        { provide: PartNumberService, useValue: mockpartNumberService },
        { provide: LruPartNumberService, useValue: mocklruPartNumberService },
        { provide: ReasonofremovalService, useValue: mockreasonofremovalService },
        { provide: RepairActionService, useValue: mockrepairActionService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lruTypeService = TestBed.get(LruTypeService);
    lruNameService = TestBed.get(LruNameService);
    partNumberService = TestBed.get(PartNumberService);
    lruPartNumberService = TestBed.get(LruPartNumberService);
    reasonofremovalService = TestBed.get(ReasonofremovalService);
    repairActionService = TestBed.get(RepairActionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getNodes should be defined', () => {
    component.nodes = [
      {
        'id': '53',
        'name': '11',
        'category': 'connectivity',
        'createdAt': '2019-01-23 04:12:30',
        'updatedAt': '2019-01-23 04:12:30',
        'lruNames': [
          {
            'id': 'lruName-59',
            'name': '78',
            'lruTypeId': 53,
            'createdAt': '2019-01-23 04:12:39',
            'updatedAt': '2019-01-23 04:12:39',
            'partNumbers': [
              {
                'id': 'pNo-9',
                'partNumber': '78partno',
                'lruNameId': 59,
                'createdAt': '2019-01-23 04:12:54',
                'updatedAt': '2019-01-23 04:12:54',
                'lruPartNumbers': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                'name': '78partno',
                'children': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                '_id': 695827268488
              }
            ],
            'children': [
              {
                'id': 'pNo-9',
                'partNumber': '78partno',
                'lruNameId': 59,
                'createdAt': '2019-01-23 04:12:54',
                'updatedAt': '2019-01-23 04:12:54',
                'lruPartNumbers': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                'name': '78partno',
                'children': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                '_id': 695827268488
              }
            ],
            '_id': 402816626691
          }
        ],
        'children': [
          {
            'id': 'lruName-59',
            'name': '78',
            'lruTypeId': 53,
            'createdAt': '2019-01-23 04:12:39',
            'updatedAt': '2019-01-23 04:12:39',
            'partNumbers': [
              {
                'id': 'pNo-9',
                'partNumber': '78partno',
                'lruNameId': 59,
                'createdAt': '2019-01-23 04:12:54',
                'updatedAt': '2019-01-23 04:12:54',
                'lruPartNumbers': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                'name': '78partno',
                'children': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756,
                    'children': [
                      {
                        'id': 'lruPno-22',
                        'lruPartNumber': '78partno-1005',
                        'partNumberId': 9,
                        'createdAt': '2019-01-23 04:19:34',
                        'updatedAt': '2019-01-23 04:19:53',
                        'name': '78partno-1005',
                        '_id': 1885645593756
                      }
                    ]
                  }
                ],
                '_id': 695827268488
              }
            ],
            'children': [
              {
                'id': 'pNo-9',
                'partNumber': '78partno',
                'lruNameId': 59,
                'createdAt': '2019-01-23 04:12:54',
                'updatedAt': '2019-01-23 04:12:54',
                'lruPartNumbers': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                'name': '78partno',
                'children': [
                  {
                    'id': 'lruPno-22',
                    'lruPartNumber': '78partno-1005',
                    'partNumberId': 9,
                    'createdAt': '2019-01-23 04:19:34',
                    'updatedAt': '2019-01-23 04:19:53',
                    'name': '78partno-1005',
                    '_id': 1885645593756
                  }
                ],
                '_id': 695827268488
              }
            ],
            '_id': 402816626691
          }
        ],
        '_id': 1388023199002
      }
    ];
    component.getNode(getNodes);
    expect(component.productsObj.getSelectedNode).toEqual(getNodes);

    // Test partNumbers
    getNodes = {'id': 'lruName-59', 'name': '111', 'category': 'head-end',
    'createdAt': '2019-02-04 10:09:03', 'updatedAt': '2019-02-04 10:09:03', 'partNumbers': [],
    'children': [{id: '53'}], '_id': 7672868845858};
    component.getNode(getNodes);
    expect(component.productsObj.getSelectedNode).toEqual(getNodes);

    // Test lruPartNumbers
    getNodes = {
      'id': '53',
      'name': '2',
      'lruTypeId': '54',
      'createdAt': '2019-01-23 09:56:42',
      'updatedAt': '2019-01-23 09:56:55',
      'lruPartNumbers': [],
      'children': [],
      '_id': 8564422006152
    };
    component.getNode(getNodes);
    expect(component.productsObj.getSelectedNode).toEqual(getNodes);

    // Test lruPartNumber
    getNodes = {
      'id': 'lruPno-22',
      'name': '2',
      'lruTypeId': '54',
      'createdAt': '2019-01-23 09:56:42',
      'updatedAt': '2019-01-23 09:56:55',
      'lruPartNumber': [],
      'children': [],
      '_id': 8564422006152
    };
    component.getNode(getNodes);
    expect(component.productsObj.getSelectedNode).toEqual(getNodes);

     // Test lruPartNumber
     getNodes = {
      'id': 'pNo-9',
      'name': '2',
      'lruTypeId': '54',
      'createdAt': '2019-01-23 09:56:42',
      'updatedAt': '2019-01-23 09:56:55',
      'lruPartNumber': [],
      'children': [],
      '_id': 8564422006152
    };
    component.getNode(getNodes);
    expect(component.productsObj.getSelectedNode).toEqual(getNodes);
  });

  it('selecrow should be defined', () => {
    const row = [
      {
      'id': 'pNo-9',
      'name': '2',
      'lruTypeId': '54',
      'createdAt': '2019-01-23 09:56:42',
      'updatedAt': '2019-01-23 09:56:55',
      'lruPartNumber': [],
      'children': [],
      '_id': 8564422006152
      }
    ];
    component.selection = {
      selected: row
    };
    component.selectedRow(row);
    expect(component.productsObj.selectedRow).toEqual(row);

    component.selection = {
      selected: []
    };
    component.selectedRow(row);
    expect(component.productsObj.selectedRow).toEqual(component.selection.selected);
  });

  it('openDialogModal should be defined', () => {
    const eve = {
      moduleName: 'createLRUType',
      eventName: 'create'
    };
    component.openDialogModal(eve);
    expect(component.productsObj.form.name).toEqual('Create LRU Type');

    const params = {
      moduleName: 'createLRUName',
      eventName: 'create'
    };
    component.openDialogModal(params);
    expect(component.productsObj.form.name).toEqual('Create LRU Name');

    const lruPno = {
      moduleName: 'createLRUPartNumber',
      eventName: 'create'
    };
    component.openDialogModal(lruPno);
    expect(component.productsObj.form.name).toEqual('Create LRU Part Number');

    const pno = {
      moduleName: 'createPartNumber',
      eventName: 'create'
    };
    component.openDialogModal(pno);
    expect(component.productsObj.form.name).toEqual('Create Part Number');

    const reasonofremoval = {
      moduleName: 'createReasonOfRemoval',
      eventName: 'create'
    };
    component.openDialogModal(reasonofremoval);
    expect(component.reasonOfRemoval.headText).toEqual('Create Reason of Removal');

    const createRepairAction = {
      moduleName: 'createRepairAction',
      eventName: 'create'
    };
    component.openDialogModal(createRepairAction);
    expect(component.repairAction.headText).toEqual('Create Repair Action');

    // Delete
    component.productsObj.getIndexOfNodes = [0, 0, 0];
    component.repairActionSelection.selectedRow = [
      {
        description: '',
      }
    ];
    component.removalSelection.selectedRow = [
      {
        description: ''
      }
    ];
    const deleteeve = {
      moduleName: 'createLRUType',
      eventName: 'delete'
    };
    component.openDialogModal(deleteeve);
    expect(component.deleteObj.moduleName).toEqual('LRU Type');

    const deleteparams = {
      moduleName: 'createLRUName',
      eventName: 'delete'
    };
    component.openDialogModal(deleteparams);
    expect(component.deleteObj.moduleName).toEqual('LRU Name');

    const deletelruPno = {
      moduleName: 'createLRUPartNumber',
      eventName: 'delete'
    };
    component.openDialogModal(deletelruPno);
    expect(component.deleteObj.moduleName).toEqual('LRU Part Number');

    const deletepno = {
      moduleName: 'createPartNumber',
      eventName: 'delete'
    };
    component.openDialogModal(deletepno);
    expect(component.deleteObj.moduleName).toEqual('Part Number');

    const deletereasonofremoval = {
      moduleName: 'createReasonOfRemoval',
      eventName: 'delete'
    };
    component.openDialogModal(deletereasonofremoval);
    expect(component.deleteObj.moduleName).toEqual('Reason of Removal');

    const deletecreateRepairAction = {
      moduleName: 'createRepairAction',
      eventName: 'delete'
    };
    component.openDialogModal(deletecreateRepairAction);
    expect(component.deleteObj.moduleName).toEqual('Repair Actions');


    // Edit
    component.productsObj.selectedRow = [
      {
        category: 'Test',
        name: 'Test',
        lruPartNumber: '12-200',
        allPN: '1'
      }
    ];
    component.removalSelection.selectedRow = [
      {
        description: '',
        partNumbersList: [
          {
            id: 10
          }
        ]
      }
    ];
    component.repairActionSelection.selectedRow = [
      {
        description: '',
        allPN: '1',
        partnumbersList: [
          {
            id: 10
          }
        ]
      }
    ];
    component.repairAction.radioList = [
      {
        value: '10-200'
      },
      {
        value: '10-201'
      }
    ];
    component.repairAction.form = {
      obj: {
        partnumbersList: []
      }
    };
    const editeeve = {
      moduleName: 'createLRUType',
      eventName: 'edit'
    };
    component.openDialogModal(editeeve);
    expect(component.productsObj.form.name).toEqual('Update LRU Type');

    const editparams = {
      moduleName: 'createLRUName',
      eventName: 'edit'
    };
    component.openDialogModal(editparams);
    expect(component.productsObj.form.name).toEqual('Update LRU Name');

    const editlruPno = {
      moduleName: 'createLRUPartNumber',
      eventName: 'edit'
    };
    component.openDialogModal(editlruPno);
    expect(component.productsObj.form.name).toEqual('Update LRU Part Number');

    const editepno = {
      moduleName: 'createPartNumber',
      eventName: 'edit'
    };
    component.openDialogModal(editepno);
    expect(component.productsObj.form.name).toEqual('Update Part Number');

    const editreasonofremoval = {
      moduleName: 'createReasonOfRemoval',
      eventName: 'edit'
    };
    component.openDialogModal(editreasonofremoval);
    expect(component.reasonOfRemoval.headText ).toEqual('Update Reason of Removal');

    // Test allPin
    component.removalSelection.selectedRow[0].allPN = 1;
    component.openDialogModal(editreasonofremoval);
    expect(component.reasonOfRemoval.headText ).toEqual('Update Reason of Removal');


    const editcreateRepairAction = {
      moduleName: 'createRepairAction',
      eventName: 'edit'
    };
    component.openDialogModal(editcreateRepairAction);
    expect(component.repairAction.headText).toEqual('Update Repair Action');

    component.repairActionSelection.selectedRow[0].allPN = null;
    component.repairActionSelection.selectedRow[0].partNumbersList = [
      {
        id: 20
      }
    ];
    component.openDialogModal(editcreateRepairAction);
    expect(component.repairAction.headText).toEqual('Update Repair Action');
  });

  it('productsSearch should be defined', () => {
    component.getSelectedTabName = 'Repair Actions';
    component.productsSearch('test');
    expect(component.repairAction.dataSource.filter).toEqual('test');

    component.getSelectedTabName = 'Reasons of Removal';
    component.productsSearch('test');
    expect(component.reasonOfRemoval.dataSource.filter).toEqual('test');
  });

  it('delete lru name should be defined', () => {
    component.deleteObj.selectedObj = [
      {
        id: 10
      }
    ];
    const deleteLRUType = spyOn(lruTypeService, 'deleteLRUTypes').and.callThrough();
    lruTypeService.deleteLRUTypes(10).subscribe(response => {
      expect(deleteLRUType).toHaveBeenCalled();
    });
    component.deleteConfirm(1);
    expect(component.deleteObj.isDeleted).toBeFalsy();

    component.productsObj.form.name = 'Create LRU Name';
    const deleteLRUName = spyOn(lruNameService, 'deleteLRUName').and.callThrough();
    lruNameService.deleteLRUName(10).subscribe(response => {
      expect(deleteLRUName).toHaveBeenCalled();
    });
    component.deleteConfirm(1);
    expect(component.deleteObj.isDeleted).toBeFalsy();

    component.productsObj.form.name = 'Part Number';
    const deletePartNumber = spyOn(partNumberService, 'deletePartNumber').and.callThrough();
    partNumberService.deletePartNumber(10).subscribe(response => {
      expect(deletePartNumber).toHaveBeenCalled();
    });
    component.deleteConfirm(1);
    expect(component.deleteObj.isDeleted).toBeFalsy();

    component.productsObj.form.name = 'LRU Part Number';
    const deleteLRUPartNumber = spyOn(lruPartNumberService, 'deleteLRUPartNumber').and.callThrough();
    lruPartNumberService.deleteLRUPartNumber(10).subscribe(response => {
      expect(deleteLRUPartNumber).toHaveBeenCalled();
    });
    component.deleteConfirm(1);
    expect(component.deleteObj.isDeleted).toBeFalsy();

    component.reasonOfRemoval.dataSource = {
      data: []
    };
    component.productsObj.form.name = 'reason of removal';
    const deleteRemovals = spyOn(reasonofremovalService, 'deleteRemovals').and.callThrough();
    reasonofremovalService.deleteRemovals(10).subscribe(response => {
      expect(deleteRemovals).toHaveBeenCalled();
    });
    component.deleteConfirm(1);
    expect(component.deleteObj.isDeleted).toBeFalsy();

    component.repairAction.dataSource = {
      data: []
    };
    component.productsObj.form.name = 'repair action';
    const deleteRepairAction = spyOn(repairActionService, 'deleteRepairAction').and.callThrough();
    repairActionService.deleteRepairAction(10).subscribe(response => {
      expect(deleteRemovals).toHaveBeenCalled();
    });
    component.deleteConfirm(1);
    expect(component.deleteObj.isDeleted).toBeFalsy();
  });

  it('clearRemoval should be defined', () => {
    component.getSelectedTabName = 'Reasons of Removal';
    component.clearRemoval();
    expect(component.reasonOfRemoval.form.isError).toBeFalsy();

    component.getSelectedTabName = 'Repair Actions';
    component.clearRemoval();
    expect(component.reasonOfRemoval.form.errorMsg).toEqual(null);
  });

  it('removalSelectedRow should be defined', () => {
    component.getSelectedTabName = 'Reasons of Removal';
    component.removalSelectedRow();

    component.removalSelection = {
     selected: [{id: 1}]
    };
    component.reasonOfRemoval.dataSource = {
      data: [{id: 1}]
     };
    component.getSelectedTabName = 'Reasons of Removal';
    component.removalSelectedRow();

    component.getSelectedTabName = 'Repair Actions';
    component.removalSelectedRow();

    component.repairActionSelection = {
      selected: [{id: 1}]
    };
    component.repairAction.dataSource = {
      data: [{id: 1}]
    };
    component.getSelectedTabName = 'Repair Actions';
    component.removalSelectedRow();
    expect(component.repairActionSelection.selectedRow).toEqual(component.repairActionSelection.selected);
  });

  it('getSelectedPartNumbers should be defined', () => {
    component.getSelectedPartNumbers('');
    expect(component.getSelectedPartNumbers).toBeDefined();
  });

  it('saveReasonOfRemoval should be defined', () => {
    const createData = {
      description: '',
      lruTypeId: 10,
      allPN: true,
      partNumbersList: component.getPartNumbersList([])
    };
    const createRemovals = spyOn(reasonofremovalService, 'createRemovals').and.callThrough();
    reasonofremovalService.createRemovals(createData).subscribe(response => {
      expect(createRemovals).toHaveBeenCalled();
    });
    component.reasonOfRemoval.form.obj = {
      partnumber: 'all',
      partnumbersList: [],
      description: 'test'
    };
    component.getSelectedTabName = 'Reasons of Removal';
    component.saveReasonOfRemoval();

    component.removalSelection.selectedRow = [
     {
      id: 1,
      description: 'test',
      lruTypeId: 1,
      allPN: true,
      partNumbersList: []
     }
    ];
    const updateRemovals = spyOn(reasonofremovalService, 'updateRemovals').and.callThrough();
    reasonofremovalService.updateRemovals(createData, 1).subscribe(response => {
      expect(updateRemovals).toHaveBeenCalled();
    });
    component.saveReasonOfRemoval();

    component.getSelectedTabName = 'Repair Actions';
    component.repairAction.form = {
      isSubmitted: true,
      obj: {
        description: 'test',
        partnumber: 'all',
        getLruType: 10,
        partnumbersList: [
          {
            id: 1
          }
        ]
      },
      partnumbersList: []
    };
    const createRepairAction = spyOn(repairActionService, 'createRepairAction').and.callThrough();
    repairActionService.createRepairAction(createData).subscribe(response => {
      expect(createRepairAction).toHaveBeenCalled();
    });
    component.saveReasonOfRemoval();

    component.repairActionSelection.selectedRow = [{
      id: 1,
      description: 'test',
      lruTypeId: 1,
      allPN: true,
      partNumbersList: []
     }];
    const updateRepairAction = spyOn(repairActionService, 'updateRepairAction').and.callThrough();
    repairActionService.updateRepairAction(createData, 1).subscribe(response => {
      expect(updateRepairAction).toHaveBeenCalled();
    });
    component.saveReasonOfRemoval();
  });

  it('getLRUPartNumber should be defined', () => {
    component.productsObj.selectedRow = [
      {
        id: 'lrutype-50',
        description: 'test',
        lruTypeId: 1,
        allPN: true,
        partNumberId: 10,
        partNumbersList: [],
        lruNameId: '10'
      }
    ];
    component.productsObj.form = {
      isError: false,
      name: 'Update LRU Part Number',
      id: 'lrutype-10'
    };
    const updateRepairAction = spyOn(lruTypeService, 'createLRUTypes').and.callThrough();
    lruTypeService.createLRUTypes({id: ''}).subscribe(response => {
      expect(updateRepairAction).toHaveBeenCalled();
    });
    const updateLRUPartNumber = spyOn(lruPartNumberService, 'updateLRUPartNumber').and.callThrough();
    lruPartNumberService.updateLRUPartNumber({id: ''}).subscribe(response => {
      expect(updateRepairAction).toHaveBeenCalled();
    });
    component.getLRUPartNumber('100');
    component.selection = {
      clear: function() {}
    };
    component.productsObj = {
      selectedIndex: 1,
      form: {
        isError: false,
        name: 'Create LRU Part Number',
        id: 'lrutype-10'
      },
      lruPartNumber: {
        value: 'test',
        isSubmitted: false
      },
      getSelectedNode: {
        partNumber: '10',
        id: 'pno-20'
      },
      modalConfig: {
        isLoading: false
      },
      getIndexOfNodes: treeNodes,
      lruTypeForm: [
        {value: ''}
      ],
      lruNameForm: [{value: ''}, {value: ''}]
    };
    const createLRUPartNumber = spyOn(lruPartNumberService, 'createLRUPartNumber').and.callThrough();
    lruPartNumberService.createLRUPartNumber({id: ''}).subscribe(response => {
      expect(createLRUPartNumber).toHaveBeenCalled();
    });
    component.selection = {
      clear: function() {}
    };
    component.getLRUPartNumber('100');

    component.productsObj.selectedRow = [
      {
        id: 'lrutype-50',
        description: 'test',
        lruTypeId: 1,
        allPN: true,
        partNumberId: 10,
        partNumbersList: [],
        lruNameId: '10'
      }
    ];
    const updatePartNumber = spyOn(partNumberService, 'updatePartNumber').and.callThrough();
    partNumberService.updatePartNumber({id: ''}).subscribe(response => {
      expect(updatePartNumber).toHaveBeenCalled();
    });
    component.productsObj.form.name = 'Update Part Number';
    component.getLRUPartNumber('100');

    const updateLRUName = spyOn(lruNameService, 'updateLRUName').and.callThrough();
    lruNameService.updateLRUName({id: ''}).subscribe(response => {
      expect(updateLRUName).toHaveBeenCalled();
    });
    component.productsObj.form.name = 'Update LRU Name';
    component.getLRUPartNumber('100');

    const updateLRUTypes = spyOn(lruTypeService, 'updateLRUTypes').and.callThrough();
    lruTypeService.updateLRUTypes({id: ''}).subscribe(response => {
      expect(updateLRUTypes).toHaveBeenCalled();
    });
    component.productsObj.form.name = 'Update LRU Type';
    component.getLRUPartNumber('100');

    const createPartNumber = spyOn(partNumberService, 'createPartNumber').and.callThrough();
    partNumberService.createPartNumber({id: ''}).subscribe(response => {
      expect(createPartNumber).toHaveBeenCalled();
    });
    component.productsObj.form.name = 'Create Part Number';
    component.getLRUPartNumber('100');

    const createLRUName = spyOn(lruNameService, 'createLRUName').and.callThrough();
    lruNameService.createLRUName({id: ''}).subscribe(response => {
      expect(createLRUName).toHaveBeenCalled();
    });
    component.productsObj.form.name = 'Create LRU Name';
    component.getLRUPartNumber('100');

    component.productsObj.form.name = 'Create LRU Type';
    component.getLRUPartNumber('100');
  });

  it('updateReasonOfRemoval should be defined', () => {
    const apiInfo = {
      moduleName: 'lruTypeList'
    };
    component.updateReasonOfRemoval(apiInfo, [{id: 10}]);
    expect(component.reasonOfRemoval.lruTypes).toEqual([{id: 10}]);

    const reasonOfRemovals = {
      moduleName: 'reasonOfRemovals'
    };
    component.updateReasonOfRemoval(reasonOfRemovals, [{id: 10}]);
    expect(component.reasonOfRemoval.dataSource.filter).toEqual('');
  });

  it('updateRepairAction should be defined', () => {
    const apiInfo = {
      moduleName: 'lruTypeList'
    };
    component.updateRepairAction(apiInfo, [{id: 10}]);
    expect(component.repairAction.lruTypes).toEqual([{id: 10}]);

    const repairAction = {
      moduleName: 'repairAction'
    };
    component.updateRepairAction(repairAction, [{id: 10, partNumber: '10'}]);
    expect(component.repairAction.dataSource.filter).toEqual('');

    const partNumbers = {
      moduleName: 'partNumbers'
    };
    component.updateRepairAction(partNumbers, [{id: 10, partNumber: '10'}]);
    expect(component.repairAction.dataSource.filter).toEqual('');

    const createRepairAction = {
      moduleName: 'createRepairAction'
    };
    component.repairAction.dataSource.data = [
      {
        id: 1
      }
    ];
    component.updateRepairAction(createRepairAction, [{id: 10, partNumber: '10'}]);
    expect(component.repairAction.dataSource.filter).toEqual('');
  });

  it('specificPin should be defined', () => {
    const data =  [
      {
        id: 10,
        partNumbersList: [
          {
            'id': 22,
            'partNumber': '78partno-1005',
            'partNumberId': 9,
            'createdAt': '2019-01-23 04:19:34',
            'updatedAt': '2019-01-23 04:19:53'
          },
          {
            'id': 23,
            'partNumber': '78partno-1004',
            'partNumberId': 9,
            'createdAt': '2019-01-23 04:19:34',
            'updatedAt': '2019-01-23 04:19:53'
          }
        ]
      }
    ];
    component.getSelectedTabName = 'Reasons of Removal';
    component.reasonOfRemoval.dataSource.data = data;
    component.specificPin();
    expect(component.specificPin).toBeDefined();

    component.repairAction.dataSource.data = data;
    component.getSelectedTabName = 'Repair Actions';
    component.specificPin();
    expect(component.specificPin).toBeDefined();
  });

  it('getPartNumbersList should be defined', () => {
    const data = [
      {
        'id': 1,
        'partNumber': '78partno-1004',
        'partNumberId': 9,
        'createdAt': '2019-01-23 04:19:34',
        'updatedAt': '2019-01-23 04:19:53'
      }
    ];
    component.reasonOfRemoval.partNumbers = data;
    component.getSelectedTabName = 'Reasons of Removal';
    component.getPartNumbersList([1]);

    component.repairAction.partNumbers = data;
    component.getSelectedTabName = 'Repair Actions';
    component.getPartNumbersList([1]);
    expect(component.getPartNumbersList).toBeDefined();
  });

  it('getTabName should be defined', () => {
    component.getSelectedTabName = 'Reasons of Removal';
    const data = {
      tab: {
        textLabel: 'Reasons of Removal'
      }
    };
    component.removalSelection = {
      clear: function() {}
    };
    const getLRUTypes = spyOn(reasonofremovalService, 'getLRUTypes').and.callThrough();
    reasonofremovalService.getLRUTypes().subscribe(response => {
      expect(getLRUTypes).toHaveBeenCalled();
    });
    component.reasonOfRemoval = {
      dataSource: {
        data: []
      },
      radioList: [{value: 'test'}],
      lruTypes: '',
      form: {
        obj: {
        id: '11uhnknstsvJ',
        firstName: 'Test User',
        lastName: 'T',
        email: 'example@gmail.com',
        groups: ['Everyone', 'admins'],
        authorities: ['Everyone', 'admins'],
        airlines: [''],
        accessToAllAirlines: true,
        currentAirline: 'T',
        getLruType: ''
      }
    }};
    component.getTabName(data);
    expect(component.repairAction.form.isSubmitted).toBeFalsy();

    const details = {
      tab: {
        textLabel: 'Details'
      }
    };
    component.getTabName(details);
  });

  it('cancelEvent should be defined', () => {
    component.cancelEvent();
    expect(component.cancelEvent).toBeDefined();
  });

  it('deleteTreeNodes should be defined', () => {

    component.deleteTreeNodes();

    component.nodes = treeNode.lruTypes;
    component.productsObj.getIndexOfNodes = [0, 0, 0, 0];
    component.deleteTreeNodes();

    component.nodes = treeNode.lruTypes;
    component.productsObj.getIndexOfNodes = [0, 0, 0];
    component.deleteTreeNodes();

    component.nodes = treeNode.lruTypes;
    component.productsObj.getIndexOfNodes = [0, 0];
    component.deleteTreeNodes();

    component.nodes = treeNode.lruTypes;
    component.productsObj.getIndexOfNodes = [0];
    component.deleteTreeNodes();
    expect(component.deleteTreeNodes).toBeDefined();

  });

  it('updateTreeNode should be defined', () => {
    component.productsObj.form.name = 'Create LRU Type';
    const node = [
      {
        'id': 'lrutype-59',
        'name': '78',
        'lruTypeId': 53,
        'createdAt': '2019-01-23 04:12:39',
        'updatedAt': '2019-01-23 04:12:39',
        'children': []
      }
    ];

    component.productsObj.getIndexOfNodes = [0];
    component.updateTreeNode({id: '59'});

    component.nodes = treeNode.lruTypes;
    component.nodes[0].children = node;
    component.productsObj.getIndexOfNodes = [0];
    component.updateTreeNode({id: '59'});

    component.productsObj.getIndexOfNodes = [0, 0];
    component.updateTreeNode({id: '80'});

    component.nodes[0].children[0].children = node;
    component.productsObj.getIndexOfNodes = [0, 0];
    component.updateTreeNode({id: '80'});

    component.nodes[0].children[0].children[0].children = node;
    component.productsObj.getIndexOfNodes = [0, 0, 0];
    component.updateTreeNode({id: '80'});


    component.productsObj.getIndexOfNodes = [0, 0, 0, 0];
    component.updateTreeNode({id: '80'});

    component.nodes[0].children[0].children[0].children[0].children = node;
    component.productsObj.getIndexOfNodes = [0, 0, 0, 0];
    component.updateTreeNode({id: '80'});
    expect(component.updateTreeNode).toBeDefined();

  });

  // it('getAllPN should be defined', () => {
  //   component.getAllPN('specific');
  //   expect(component.getAllPN).toBeDefined();
  // });

  // it('getAllPN False should be defined', () => {
  //   component.getAllPN('');
  //   expect(component.getAllPN).toBeDefined();
  // });


});
