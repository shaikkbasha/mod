import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PeriodicTunerStatusService } from '../../../shared/services/tv-performance/periodic-tuner-status/periodic-tuner-status.service';
import { TvPerformanceDataService } from '../../../shared/services/tv-performance/tv-performance-data.service';

@Component({
  selector: 'app-periodic-tuner-status',
  templateUrl: './periodic-tuner-status.component.html',
  styleUrls: ['./periodic-tuner-status.component.css']
})
export class PeriodicTunerStatusComponent implements OnInit {

  isLoading = false;
  tableData = [];
  flightDetails: any;
  tooltipData = {
    'timestamp': '2018-05-23T21:43:48Z',
    'authorized': 'true',
    'paired': 'true',
    'channelId': '0',
    'channelNumber': '0',
    'transponder': '0',
    'cnr': '-1.0',
    'agc': '-127.5',
    tuner: 1
  };
  selectedTuner: string;
  dataSource: any = [];
  displayedColumns = [];
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private periodicTunerService: PeriodicTunerStatusService,
    private dataService: TvPerformanceDataService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      if (data['id'] && data['icao']) {
        this.flightDetails = data;
        this.getPeriodicTunerData();
      }
    });
  }

  getPeriodicTunerData() {
    this.periodicTunerService.getPeriodicTunerData(this.flightDetails['id'], this.flightDetails['icao']).subscribe(
      res => {
        if (res.length) {
          this.tableData = res;
          for (const key in this.tableData[0]) {
            if (!this.displayedColumns.includes('key')) {
              this.displayedColumns.push(key);
            }
          }
        }
      }, err => console.log(err));
  }

  getPeriodicTunerDetails(timeStamp, boardTuner) {
    this.isLoading = true;
    this.selectedTuner = boardTuner;
    const boardTunerFltr = boardTuner.split('-');
    const filterObj = {
      timeStamp: timeStamp,
      board: boardTunerFltr[0],
      tuner: boardTunerFltr[1],
    };
    this.periodicTunerService.getPeriodicTunerDetails(this.flightDetails['id'], this.flightDetails['icao'], filterObj)
    .subscribe(res => {
        if (res) {
          this.isLoading = false;
          this.tooltipData = res[0];
        }
      }, err => console.log(err));
  }

}
