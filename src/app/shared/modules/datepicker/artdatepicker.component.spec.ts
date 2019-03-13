import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import { ArtdatepickerComponent } from './artdatepicker.component';

describe('ArtdatepickerComponent', () => {
  let component: ArtdatepickerComponent;
  let fixture: ComponentFixture<ArtdatepickerComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule
      ],
      declarations: [ ArtdatepickerComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ArtdatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should', () => {
    expect(component).toBeTruthy();
  });
  it('isRange should', () => {
    const date = new NgbDate(new Date().getFullYear(), (new Date().getMonth() + 1), new Date().getDate());
    expect(component.isRange(date)).toBeDefined();
  });
  it('onDateSelection from and to date is null', () => {
    component.fromDate = null;
    component.toDate = null;
    const date = new NgbDate(new Date().getFullYear() + 1, (new Date().getMonth() + 1), new Date().getDate());
    component.onDateSelection(date, 1);
    expect(component.fromDate).toBeDefined();
  });
  it('onDateSelection when todate is null', () => {
    component.toDate = null;
    const date = new NgbDate(new Date().getFullYear() + 1, (new Date().getMonth() + 1), new Date().getDate());
    component.fromDate = date;
    component.onDateSelection(date, 1);
    expect(component.fromDate).toBeDefined();
  });
  it('onDateSelection should defined', () => {
    component.fromDate = new NgbDate(new Date().getFullYear(), (new Date().getMonth() + 1), new Date().getDate());
    const date = new NgbDate(new Date().getFullYear() + 1, (new Date().getMonth() + 1), new Date().getDate());
    component.onDateSelection(date, 1);
    expect(component.toDate).toBeNull();
  });
  it('should define isInside event', () => {
    const date: any = {'year': 2019, 'month': 1, 'day': 1, after: function() {}, before: function() {}};
    component.isInside(date);
  });
  it('should define isHovered event', () => {
    const date: any = {'year': 2019, 'month': 1, 'day': 1, after: function() {}, before: function() {}};
    component.isHovered(date);
  });
  it('should define ngAfterViewInit', () => {
    const date = new NgbDate(new Date().getFullYear() + 1, (new Date().getMonth() + 1), new Date().getDate());
    component.fromdate = date;
    component.todate = date;
    component.ngAfterViewInit();
    expect(component.ngAfterViewInit).toBeDefined();
  });
  it('should define ngOnInit', () => {
    const date = new NgbDate(new Date().getFullYear() + 1, (new Date().getMonth() + 1), new Date().getDate());
    component.fromdate = date;
    component.todate = date;
    component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();
  });
});
