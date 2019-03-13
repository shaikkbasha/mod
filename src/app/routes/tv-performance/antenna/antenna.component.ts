import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment-timezone';
import { AntennaService } from '../../../shared/services/tv-performance/antenna/antenna.service';
import { TvPerformanceDataService } from '../../../shared/services/tv-performance/tv-performance-data.service';
@Component({
  selector: 'app-antenna',
  templateUrl: './antenna.component.html',
  styleUrls: ['./antenna.component.css'],
})
export class AntennaComponent implements OnInit {

  splineChart: any;
  isLoading = false;
  flightId = '';
  airlineIcao = '';
  filterValue: string;
  flightDetails: any;
  // displayedColumns: Array<string> = [];
  tableData: Array<Object> = [];
  rssiDataArr: Array<Object> = [];
  rssiRange: Object = {};
  startingTimeStamp: any;
  data: any = [
    { title: 'ALL', filterValue: 'all', filterKey: 'antennaType' },
    { title: 'BAD RSSI', filterValue: 'badRssi', filterKey: 'rssi' },
    { title: 'HIGH RSSI', filterValue: 'high', filterKey: 'rssi' },
    { title: 'LOW RSSI', filterValue: 'low', filterKey: 'rssi' },
    { title: 'EXTRA LOW RSSI', filterValue: 'extralow', filterKey: 'rssi' }
  ];
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'antenna',
    id: 'btn-create-airline',
    enableSearch: true,
    enableCreate: false,
    filterIds: {
      filterListId: 'filter-antenna-list',
      filterText: 'inp-filter-antenna-text',
    },
    buttonList: [
      // {
      //   label: 'Export',
      //   icon: 'fa fa-download',
      //   id: 'btn-antenna-export',
      //   eventName: 'export',
      //   isTableOperation: false
      // }
    ],
  };
  dataSource: any = [];
  displayedColumns = [
    'timeStamp',
    'antennaState',
    'flightPhaseId',
    'eti',
    'rssi',
    'azimuth',
    'elevation',
    'latitude',
    'longitude',
    'altitude',
    'heading',
    'speed',
    'bitFlag'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private antennaService: AntennaService,
    private dataService: TvPerformanceDataService) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getData().subscribe(data => {
      if (data['icao'] && data['id']) {
        this.flightDetails = data;
        this.getAntennaList();
      }
    });
  }

  getAntennaList() {
    this.isLoading = true;
    this.antennaService.getAntennaDetails(this.flightDetails['icao'], this.flightDetails['id'])
      .subscribe(res => {
        this.tableData = res;
        if (this.tableData.length) {
          this.findRSSIValue();
          this.renderRssiChart();
          this.getAllColumns();
        }
        this.isLoading = false;
      }, err => console.log(err));
  }

  renderRssiChart() {
    this.splineChart = new Chart({
      chart: {
        type: 'spline',
        zoomType: 'x'
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      yAxis: {
        title: {
          text: 'RSSI'
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: [{
          from: -100,
          to: -24.1,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            text: 'Extra Low',
            style: {
              color: '#606060'
            }
          }
        }, {
          from: -24,
          to: -17.1,
          color: 'rgba(255, 255, 102, 0.28)',
          label: {
            text: 'Low',
            style: {
              color: '#606060'
            }
          }
        },
        {
          from: 7.9,
          to: 100,
          color: 'rgba(255, 51, 0, 0.18)',
          label: {
            text: 'High',
            style: {
              color: '#606060'
            }
          }
        }]
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          marker: {
            enabled: false
          },
          pointInterval: 150000,
          pointStart: Date.UTC(
            this.startingTimeStamp.year(),
            this.startingTimeStamp.month(),
            this.startingTimeStamp.date(),
            this.startingTimeStamp.hours(),
            this.startingTimeStamp.minutes(),
            this.startingTimeStamp.seconds()
          )
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'spline',
          name: 'RSSI',
          showInLegend: false,
          data: this.rssiDataArr
        }
      ]
    });
  }

  getAllColumns() {
    this.isLoading = false;
    this.dataSource = [];
    this.dataSource.paginator = null;
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  findRSSIValue() {
    this.rssiDataArr = [];
    this.startingTimeStamp = moment.utc(this.tableData[0]['timeStamp']);
    this.tableData.forEach(data => {
      if (data['rssi']) {
        this.rssiDataArr.push(data['rssi']);
      }
    });
    this.rssiRange['highest'] = Math.max.apply(null, this.rssiDataArr);
    this.rssiRange['lowest'] = Math.min.apply(null, this.rssiDataArr);
  }

  getFilteredData(data) {
    this.isLoading = true;
    this.dataSource.data = [];
    const timer = setTimeout(() => {
      this.dataSource.data = data.datasource;
      this.isLoading = false;
      clearTimeout(timer);
    }, 500);
  }

  flightFilter(filterValue: string) {
    this.filterValue = filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  // actionToolbarEventHandler(eventObj) {
  //   if (eventObj && eventObj['moduleName'] === 'antenna') {
  //     if (eventObj['eventName'] === 'export') {
  //       this.antennaService.exportAntennaData(this.flightDetails['icao'], this.flightDetails['id'])
  //         .subscribe(data => {
  //           this.downloadFile(data);
  //         }, err => console.log(err));
  //     }
  //   }
  // }

  // downloadFile(data) {
  //   // const contentType = 'text/csv';
  //   // const blob = new Blob(res, { type: contentType });
  //   // const url = window.URL.createObjectURL(blob);
  //   // window.open(url);

  //   const parsedResponse = data;
  //   const blob = new Blob([parsedResponse], { type: 'text/csv' });
  //   const url = window.URL.createObjectURL(blob);

  //   if (navigator.msSaveOrOpenBlob) {
  //       navigator.msSaveBlob(blob, 'Book.csv');
  //   } else {
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'Book.csv';
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //   }
  //   window.URL.revokeObjectURL(url);
  // }

}
