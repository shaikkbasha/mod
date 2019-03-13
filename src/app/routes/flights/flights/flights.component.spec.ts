import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConnectivityService } from '../../../shared/services/airline-flights/connectivity/connectivity.service';

import { FlightsComponent } from './flights.component';
import { Observable } from 'rxjs';

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let connectivityService: ConnectivityService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        ConnectivityService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    connectivityService = TestBed.get(ConnectivityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isActive should be defined', () => {
    component.isActive([]);
    expect(component.isActive).toBeDefined();
  });

  it('isDropdownItemActive should be defined', () => {
    component.isDropdownItemActive([['/flights']]);
    expect(component.isDropdownItemActive).toBeDefined();
  });
});
