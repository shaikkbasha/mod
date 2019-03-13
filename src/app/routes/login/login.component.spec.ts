import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { OktaAuthService, OktaCallbackComponent } from '@okta/okta-angular';
import { UserService } from '../../shared/services/user/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationStart} from '@angular/router';
import {Location} from '@angular/common';
import {routes} from './../routes';
import { LayoutComponent } from '../../layout/layout.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { ProtectedComponent } from '../login/protected.component';
import { AuthGuard } from '../../shared/okta/auth.guard';
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { AccessDeniedComponent } from '../error/access-denied/access-denied.component';

import {
  OktaAuthModule
} from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';

describe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: OktaAuthService;
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated', 'loginRedirect']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);
  const oktaSignIn = new OktaSignIn({
    baseUrl: 'https://dev-836625.oktapreview.com',
    logo: '/assets/img/ThalesLogo.png',
  });
  const url: any = [
    {
      url: '/login'
    },
    {
      url: '/protected'
    },
    {
      url: ''
    }
  ];
  const router = {
    navigate: jasmine.createSpy('navigate'),
    events: url // new NavigationStart(0, url, null)
  };
  let location: Location;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'login',
          component: LoginComponent
        }
      ]), OktaAuthModule],
      declarations: [
         LoginComponent
      ],
      providers: [
        { provide: OktaAuthService, useValue: spy },
        { provide: UserService, useValue: spyUserservice },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    location = TestBed.get(Location);
    // router = TestBed.get(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    service = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should validate login', fakeAsync(() => {
    component.loginValidation({status: 'SUCCESS', session: {token: '2011-20'}});
    expect(spy.loginRedirect).toHaveBeenCalledWith('/home', { sessionToken: '2011-20' });
  }));
});
