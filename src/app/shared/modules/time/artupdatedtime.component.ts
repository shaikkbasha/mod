import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'art-updated-time',
  template: `<i [ngClass]="{'refresh-icon-rotate': isLoading=='true'}" class="fa fa-refresh refresh-icon mt-1 cursor-pointer float-left"
  cursor-pointer aria-hidden="true" (click)="refresh()"></i>
    <span class="ml-2">Updated at <span>{{ time }}</span></span>`
})
export class ArtupdatedtimeComponent implements OnChanges {
  @Input() time;
  @Input() isLoading;
  @Output() refreshClick = new EventEmitter<any>();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.time && changes['time']) {
      this.updatedTime();
    }
  }

  updatedTime () {
    /*** Convert to 24 hrs format and add local time zone ***/
    const usersTimezoneName = moment.tz.guess();
    const timezoneAbbr = moment().tz(usersTimezoneName).format('HH:mm  z'); // get time and timezone
    const res = timezoneAbbr.split(':');
    const localTimeZone = ('0' + res[0]).slice(-2) + ':' + res[1];
    this.time = localTimeZone;
  }
  refresh() {
    this.refreshClick.emit();
  }

}

