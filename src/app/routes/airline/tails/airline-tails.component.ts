import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { formatDate } from '@angular/common';
import { AirlineTailService } from '../../../shared/services/tails/airlinetails.service';
import { AircraftModel } from '../../../shared/services/tails/airlinetails';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
@Component({
  selector: 'app-airline-tails',
  templateUrl: './airline-tails.component.html',
  styleUrls: ['./airline-tails.component.css']
})


export class AirlineTailsComponent implements OnInit {

  displayedColumns: string[] = ['status', 'tailNumber', 'type', 'acConfiguration', 'msn',
    'lfrf', 'eis', 'platform', 'swBaseline', 'software', 'swPartNo', 'swInstalled', 'mapVersion', 'content'];
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  id: string;
  sourceNames = { 0: 'OK', '-1': 'NOT_COMPUTED', 1: 'WARNING', 2: 'DANGER' };

  navigationSubscription;
  actionToolBarConfig = {
    createLabel: 'airline',
    moduleName: 'airline-tails',
    enableSearch: true,
    enableCreate: false,
    id: 'btn-tails',
    filterIds : {
      filterListId: 'filter-tails-list',
      filterText: 'inp-Ffilter-tails-text'
    },
    buttonList : []
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;
  @ViewChild(ArtupdatedtimeComponent) artUpdatedTimeComponent: ArtupdatedtimeComponent;
  constructor(private router: Router, private airlineTailService: AirlineTailService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.id = params['airlineIcao'];

      });
    }
    this.getAircraftList();
    this.updatedTime = new Date();
  }


  getAircraftList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }


    this.airlineTailService.getAircraftlist(this.id).subscribe(list => {
      const data: any = list;
      if (data.error) {
        this.dataSource = new MatTableDataSource<AircraftModel>([]);
      } else {
        this.dataSource = new MatTableDataSource<AircraftModel>(data);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  aircraftTailsFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
