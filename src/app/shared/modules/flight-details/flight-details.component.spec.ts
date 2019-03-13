import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsComponent } from './flight-details.component';
import { SectionTitleComponent } from './../section-title/section-title.component';
import { LabelValueComponent } from './../label-value/label-value.component';

describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlightDetailsComponent,
        SectionTitleComponent,
        LabelValueComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
