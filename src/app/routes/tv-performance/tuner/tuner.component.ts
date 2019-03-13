import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TunerService } from '../../../shared/services/tv-performance/tuner/tuner.service';
import { TvPerformanceDataService } from '../../../shared/services/tv-performance/tv-performance-data.service';
@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.css']
})
export class TunerComponent implements OnInit {

  isLoading = false;
  boardFilter = 1;
  tunerFilter = 1;
  paramBoardFilter = 1;
  tunerView = 'boardTuner';
  flightId = '';
  airlineIcao = '';
  flightDetails: any;
  filterValue: string;
  tunerParam: string;
  camId: string;
  receiverId: string;
  tableData: Array<Object> = [];
  dataSource: any = [];
  boardFilterArr: Array<number> = [1, 2, 3, 4, 5, 6, 7];
  tunerFilterArr: Array<number> = [...this.boardFilterArr, 8];
  displayedColumns: Array<string>;
  tunerParameterDisplayColumns: string[] = [];
  tunerBoardDisplayColumns: Array<string> = [
    'timeStamp',
    // 'camId',
    // 'receiverId',
    'authorized',
    'flightPhaseId',
    'paired',
    'channelId',
    'channelNumber',
    // 'networkId',
    // 'cnrLowThreshold',
    // 'lock',
    'transponder',
    // 'centerFreq',
    // 'polarization',
    'cnr',
    'agc',
    'rssi',
    'antennaState'
  ];
  tunerParamFilters: Array<string> = [];

  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'tuner',
    enableSearch: true,
    enableCreate: false,
    filterIds: {
      filterListId: 'filter-tuner-list',
      filterText: 'inp-filter-tuner-text',
    },
    buttonList: []
  };
  boardMouseDownFilter: number;
  boardActiveFilterMouseDown: boolean;
  boardInActiveFilterMouseDown: boolean;
  tunerMouseDownFilter: number;
  tunerActiveFilterMouseDown: boolean;
  tunerInActiveFilterMouseDown: boolean;
  @ViewChild('btSort') btSort: MatSort;
  @ViewChild('sort') sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tunerService: TunerService,
    private dataService: TvPerformanceDataService) {
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      if (data['id'] && data['icao']) {
        this.flightDetails = data;
        this.getTunerDetails();
        this.getParamList();
      }
    });
  }

  getTunerDetails() {
    this.isLoading = true;
    this.camId = null;
    this.receiverId = null;
    this.displayedColumns = this.tunerBoardDisplayColumns;
    if (this.boardFilter && this.tunerFilter) {
      this.dataSource = [];
      const boardTunerObj = {
        boardId: this.boardFilter,
        tunerId: this.tunerFilter
      };
      this.tunerService.getTunerDetails(this.flightDetails['id'], this.flightDetails['icao'], boardTunerObj)
      .subscribe(res => {
        this.isLoading = false;
        this.tableData = res;
        this.camId = res[0]['camId'];
        this.receiverId = res[0]['receiverId'];
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.btSort;
      }, err => console.log(err));
    }
  }

  getTunerParameterDetails(param) {
    this.isLoading = true;
    this.dataSource = [];
    param = param.split(' ').join('');
    this.tunerParam = param.charAt(0).toLowerCase() + param.slice(1);
    const filters = {
      tunerParam: this.tunerParam,
      boardParam: this.paramBoardFilter
    };
    this.tunerService.getTunerParameterDetails(this.flightDetails['id'], this.flightDetails['icao'], filters)
    .subscribe(res => {
      this.tableData = res;
      this.getTunerParameterColumns();
    }, err => console.log(err));
  }

  getTunerParameterColumns() {
    this.isLoading = false;
    this.tunerParameterDisplayColumns = [];
    // if (!this.tunerParameterDisplayColumns.length) {
      for (const key in this.tableData[0]) {
        if (!this.tunerParameterDisplayColumns.includes(key) && key !== 'flightPhase') {
          this.tunerParameterDisplayColumns.push(key);
        }
      }
    // }
    this.displayedColumns = this.tunerParameterDisplayColumns;
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  tunerFilterOption() {
    this.isLoading = true;
    this.dataSource = [];
    if (this.tunerView === 'boardTuner') {
      this.getTunerDetails();
    } else {
      this.tunerParam = this.tunerParamFilters[0];
      this.getTunerParameterDetails(this.tunerParam);
    }
  }

  flightFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  getParamList() {
    const tableColumns = [...this.tunerBoardDisplayColumns];
    tableColumns.sort();
    tableColumns.forEach(param => {
      if (param !== 'timeStamp' && param !== 'rssi' && param !== 'antennaState') {
        const arr = param.split(/(?=[A-Z])/);
        arr.forEach((ele, i) => {
          arr[i] = ele.charAt(0).toUpperCase() + ele.slice(1);
        });
        this.tunerParamFilters.push(arr.join(' '));
      }
    });
  }

  tunerFilterMouseDown(filterType, filter) {
    if (filterType === 'board') {
      this.boardMouseDownFilter = filter;
      this.boardFilter === filter ? this.boardActiveFilterMouseDown = true : this.boardInActiveFilterMouseDown = true;
    } else {
      this.tunerMouseDownFilter = filter;
      this.tunerFilter === filter ? this.tunerActiveFilterMouseDown = true : this.tunerInActiveFilterMouseDown = true;
    }
  }

  tunerFilterMouseUp() {
    this.boardActiveFilterMouseDown = false;
    this.boardInActiveFilterMouseDown = false;
    this.tunerActiveFilterMouseDown = false;
    this.tunerInActiveFilterMouseDown = false;
  }
}
