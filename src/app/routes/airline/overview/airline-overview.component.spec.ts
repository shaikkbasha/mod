/* tslint:disable:no-unused-variable */
import { AirlineOverviewComponent } from './airline-overview.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../shared/services/user/user.service';
import { OktaAuthService } from '@okta/okta-angular';
import { InjectionToken, NO_ERRORS_SCHEMA, DebugElement, EventEmitter } from '@angular/core';

describe('AirlineOverviewComponent', () => {
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);

  let component: AirlineOverviewComponent;
  let fixture: ComponentFixture<AirlineOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineOverviewComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        OktaAuthService,
        { provide: UserService, useValue: spyUserservice },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
