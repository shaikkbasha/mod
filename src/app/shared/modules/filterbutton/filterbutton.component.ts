import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
@Component({
  selector: 'art-filter-button',
  templateUrl: './filterbutton.component.html'
})
export class FilterButtonComponent implements OnInit, OnChanges {
  activeWidgetObj: any = {
    activeWidget: 0,
    isHovered: null,
    changeActivatedWidgetStyle: null
  };
  loadingStatus = false;
  dataSourceCopy: any = [];
  filterButtonLoading = false;
  @Input() filterData;
  @Input() isloading;
  @Input() datasource;
  @Output() selectFilter = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    /** get filter data **/
    if (!this.isloading) {
      if (this.datasource.isFiltered) {
        // this.datasource.data = this.dataSourceCopy;
        this.filterData.filter((args, i) => {
          if (args.title === this.datasource.isFiltered.title && args.filterKey === this.datasource.isFiltered.filterKey) {
            this.datasource.data = this.datasource.isFiltered.datasource;
          }
        });
      } else if (!this.datasource.isFiltered) {
        this.dataSourceCopy = JSON.parse(JSON.stringify(this.datasource.data));
        this.activeWidgetObj.activeWidget = 0;
      }
    }
    if (!this.datasource.isFiltered) {
      this.filterButtonLoading = false;
    }
    if (this.isloading) {
      this.loadingStatus = true;
    }
    this.loadingStatus = true;
    if (!this.datasource.isFiltered) {
      this.resetFilterData();
    }
    if (this.datasource && this.datasource.data && !this.datasource.isFiltered) {
      this.datasource.data.filter((item, index) => {
        this.filterData.filter((args, i) => {
          if (!this.filterData[i].count) {
            this.filterData[i].count = 0;
          }
          if (isNumeric(item[args.filterKey])) {
            if (args.filterKey === 'rssi') {
              if (args.filterValue === 'high' && item[args.filterKey] >= 7.9) {
                this.formFilterData(i, item);
              } else if (args.filterValue === 'low' && item[args.filterKey] > -24 && item[args.filterKey] < -17.1) {
                this.formFilterData(i, item);
              } else if (args.filterValue === 'extralow' && item[args.filterKey] <= -24) {
                this.formFilterData(i, item);
              } else if (args.filterValue === 'badRssi' && (item[args.filterKey] >= 7.9 || item[args.filterKey] < -17.1)) {
                this.formFilterData(i, item);
              }
            }

            if (args.filterKey === 'percentage' && item[args.filterKey] !== parseFloat(args.filterValue)) {
              this.formFilterData(i, item);
            } else if (args.filterKey !== 'percentage' && item[args.filterKey] === parseFloat(args.filterValue)) {
              this.formFilterData(i, item);
            }
          } else if (item[args.filterKey] && item[args.filterKey].toLowerCase() !== 'all' &&
            item[args.filterKey].toLowerCase() === args.filterValue.toLowerCase()) {
            this.formFilterData(i, item);
          } else if (args.filterValue.toLowerCase() === 'all') {
            this.filterData[i].count = this.datasource.data.length;
            this.filterData[i].datasource = this.datasource.data;
          }

          // if (args.filterKey === 'antennaState' && args.filterValue === 'badAntenna' &&
          //   (item[args.filterKey] && item[args.filterKey] === '')) {
          //   this.formFilterData(i, item);
          // }
        });
        if ((this.datasource.data.length - 1) === index) {
          this.loadingStatus = false;
        }
      });
    } else if (this.datasource.isFiltered) {
      this.loadingStatus = false;
    }
  }

  getActiveWidget(index, item) {
    if (index === this.activeWidgetObj.activeWidget) {
      this.activeWidgetObj.changeActivatedWidgetStyle = index;
    }
    this.activeWidgetObj.activeWidget = index;
    this.activeWidgetObj.isHovered = null;
    this.selectToFilter(item);
  }

  resetFilterData() {
    this.filterData.filter((args, i) => {
      this.filterData[i].count = null;
      this.filterData[i].datasource = [];
    });
  }

  selectToFilter(args) {
    this.filterButtonLoading = true;
    this.datasource.isFiltered = args;
    if (!this.isloading) {
      this.selectFilter.emit(args);
    }
  }

  formFilterData(i, item) {
    if (this.filterData[i].count === undefined || this.filterData[i].count === null) {
      this.filterData[i].count = 1;
      this.filterData[i].datasource = [item];
    } else if (this.filterData[i].count !== undefined || this.filterData[i].count !== null) {
      this.filterData[i].count += 1;
      this.filterData[i].datasource.push(item);
    }
  }
}
