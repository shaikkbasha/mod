import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { OktaConfig } from '../../../../node_modules/@okta/okta-angular/dist/okta/models/okta.config';
import { UserClaims } from '../../../../node_modules/@okta/okta-angular/dist/okta/models/user-claims';
import { ToastrService } from 'ngx-toastr';
import { BootstrapModule } from '../../shared/bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HasAnyAuthorityDirective } from '../../shared/directives/auth/has-any-authority.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouterModule,
  Routes, Router
} from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let userService: UserService;
  let fixture: ComponentFixture<HeaderComponent>;
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated', 'logout', 'loginRedirect']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity', 'hasAnyAuthority']);
  const mockUserservice = {
    hasAnyAuthority():  Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    getAuthenticationState(): Observable<any> {
      return Observable.of([]);
    },
    setCurrentAirline: function(icao) {},
    isAuthenticated: function() { return true; }
  };
  const spyOktaAuthService = {
    isAuthenticated: function() {
    },
    loginRedirect: function() {},
    logout():  Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    }
  };
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: function(url) {}
  };
  let oktaAuthService: jasmine.SpyObj<OktaAuthService>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, HasAnyAuthorityDirective],
      imports: [
        RouterTestingModule,
        BootstrapModule,
        BrowserAnimationsModule,
        RouterModule,
        NgbModule,
        ToastrModule.forRoot() // ToastrModule added
      ],
      providers: [
        ToastrService,
        // { provide: Router, useValue: mockRouter },
        { provide: OktaAuthService, useValue: spyOktaAuthService },
        { provide: UserService, useValue: mockUserservice }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    oktaAuthService = TestBed.get(OktaAuthService);
    userService = TestBed.get(UserService);
  });
  it('should create', async() => {
    const hasAnyAuthority = spyOn(userService, 'hasAnyAuthority');
    // userService.hasAnyAuthority('').then(response => {
    //   expect(response).toBeTruthy();
    // });
    const getAuthenticationState = spyOn(userService, 'getAuthenticationState');
    // userService.getAuthenticationState().subscribe(response => {
    //   expect(response).toEqual([]);
    // });
    expect(component).toBeTruthy();
  });

  it('displayCustomToast should be defined', () => {
    component.displayCustomToast();
    expect(component.displayCustomToast).toBeDefined();
  });

  it('selectAirline should be defined', () => {
    const setCurrentAirline = spyOn(userService, 'setCurrentAirline');
    userService.setCurrentAirline('');
    component.selectAirline('');
    expect(component.selectAirline).toBeDefined();
  });

  it('login should be defined', () => {
    component.login();
    expect(component.login).toBeDefined();
  });

  it('logout should be defined', () => {
    component.logout();
    expect(component.logout).toBeDefined();
  });

  it('isAuthenticated should be defined', () => {
    component.isAuthenticated();
    expect(component.isAuthenticated).toBeDefined();
  });
});
