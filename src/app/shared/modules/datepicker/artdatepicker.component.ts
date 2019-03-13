import {Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'art-date-picker',
  templateUrl: './artdatepicker.component.html'
})
export class ArtdatepickerComponent implements OnInit, AfterViewInit {

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  selectedFromDate: any = new Date();
  selectedToDate: any = new Date();
  enableCalender = false;
  calenderConfig: any;
  @Input() fromdate;
  @Input() todate;
  @Output() selectedDates = new EventEmitter<any>();
  @ViewChild('d') dateRangePicker;
  constructor(calendar: NgbCalendar, private _eref: ElementRef) {
    this.calenderConfig = calendar;
  }
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event']) handleOutsideClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      // this.enableCalender = false;
      this.dateRangePicker.close();
    }
  }
  ngOnInit() {
    const calendar = this.calenderConfig;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 7);
    if (this.fromdate) {
      const fromDate = new Date(this.fromdate);
      this.selectedFromDate = fromDate;
      this.fromDate = new NgbDate(fromDate.getFullYear(), (fromDate.getMonth() + 1), fromDate.getDate());
    }
    if (this.todate) {
      const toDate = new Date(this.todate);
      this.selectedToDate = toDate;
      this.toDate = new NgbDate(toDate.getFullYear(), (toDate.getMonth() + 1), toDate.getDate());
    }
  }
  ngAfterViewInit() {
    if (this.fromdate) {
      console.log(this.fromDate, this.toDate);
      const fromDate = new Date(this.fromdate);
      this.fromDate = new NgbDate(fromDate.getFullYear(), (fromDate.getMonth() + 1), fromDate.getDate());
    }
    if (this.todate) {
      const toDate = new Date(this.todate);
      this.toDate = new NgbDate(toDate.getFullYear(), (toDate.getMonth() + 1), toDate.getDate());
    }
  }
  onDateSelection(date: NgbDate, id) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      this.enableCalender = false;
      const getSelectedDates: any  = {
        fromDate: new Date(this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year) ,
        toDate: new Date(this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year)
      };
      this.selectedFromDate = getSelectedDates.fromDate;
      this.selectedToDate = getSelectedDates.toDate;
      this.selectedDates.emit(getSelectedDates);
      this.dateRangePicker.close();
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    if (this.toDate && this.toDate.month && this.toDate.day && this.toDate.year) {
      this.selectedToDate = new Date(this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year);
    }
    if (this.fromDate && this.fromDate.month && this.fromDate.day && this.fromDate.year) {
      this.selectedFromDate = new Date(this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year);
    }
    // this.selectedToDate = new Date(this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year);
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
