import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  dateFormat: any = {};
  toDate: string;
  fromDate: string;

  getDates(fromDateIn, toDateIn) {

    const nowDate = (fromDateIn.getDate().toString().length === 1)
      ? '0' + fromDateIn.getDate() : fromDateIn.getDate();
    const nowToDate = (toDateIn.getDate().toString().length === 1)
      ? '0' + toDateIn.getDate() : toDateIn.getDate();
    const nowMonth = ((fromDateIn.getMonth() + 1).toString().length === 1) ?
      '0' + (fromDateIn.getMonth() + 1) : (fromDateIn.getMonth() + 1);
    const nowToMonth = ((toDateIn.getMonth() + 1).toString().length === 1) ?
      '0' + (toDateIn.getMonth() + 1) : (toDateIn.getMonth() + 1);
    this.fromDate = fromDateIn.getFullYear() + '-' + nowMonth + '-' + nowDate + 'T00:00:00Z';
    this.toDate = toDateIn.getFullYear() + '-' + nowToMonth + '-' + nowToDate + 'T23:59:59Z';
    this.dateFormat['fromDate'] = this.fromDate;
    this.dateFormat['toDate'] = this.toDate;
    return this.dateFormat;
  }

}
