import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'art-kpi-card',
  templateUrl: './art-kpi-card.component.html',
  styleUrls: ['./art-kpi-card.component.css']
})
export class ArtKpiCardComponent implements OnInit {

  updatedTime: any;
  @Input() showTime: boolean;
  @Input() cardTitle: string;

  constructor() { }

  ngOnInit() {
    if (this.showTime) {
      const usersTimezoneName = moment.tz.guess();
      const timezoneAbbr = moment().tz(usersTimezoneName).format('hh:mm A');
      const res = timezoneAbbr.split(':');
      const localTimeZone = ('0' + res[0]).slice(-2) + ':' + res[1];
      this.updatedTime = localTimeZone;
    }
  }

}
