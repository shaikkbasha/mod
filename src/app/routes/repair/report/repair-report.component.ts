import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repair-report',
  templateUrl: './repair-report.component.html',
  styleUrls: ['./repair-report.component.css']
})
export class RepairReportComponent implements OnInit {
  enableSearchToolBar = false;
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  constructor() { }
  actionToolBarConfig = {
    createLabel: 'Create Repair',
    moduleName: 'Create Repair',
    id: 'btn-overview',
    filterIds : {
      filterListId: 'filter-overview-list',
      filterText: 'inp-filter-overview-text'
    },
    enableSearch: true,
    enableCreate: true,
    buttonList: []
  };

  ngOnInit() {
    if (!this.dataSource.data) {
      this.dataSource.data = [];
    }
  }
}
