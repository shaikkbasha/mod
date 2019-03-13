/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../shared/services/user/user.service';
import { OktaAuthService } from '@okta/okta-angular';
import { HasAnyAuthorityDirective } from '../../../shared/directives/auth/has-any-authority.directive';
import { of } from 'rxjs'; // Add import
import { SectionTitleComponent } from './../../../shared/modules/section-title/section-title.component';
import { Observable } from 'rxjs';
describe('Component : HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let vOktaAuthServiceSpy: jasmine.SpyObj<OktaAuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  const mockUserData = {
    'id': '11uhnknstsvJ',
    'firstName': 'Test User',
    'lastName': 'T',
    'email': 'xxxxxxxxx@xxxx.com',
    'groups': [
      'Everyone',
      'admins'
    ],
    'authorities': [
      'Everyone',
      'admins'
    ],
    'airlines': [
      ''
    ],
    'accessToAllAirlines': true,
    'currentAirline': 'T'
  };
  const mockUserService = {
      identity(force?: boolean): Promise<any> {
        return new Promise<any>(resolve => resolve(mockUserData));
      },
      hasAnyAuthority(): Promise<any> {
        return new Promise<any>(resolve => resolve(['admins']));
      },
      hasAnyAuthorityDirect(): Promise<any> {
        return new Promise<any>(resolve => resolve(['admins']));
      },
      getAuthenticationState(): Observable<any> {
        const authData = {
          '_isScalar': false,
          'observers': [],
          'closed': false,
          'isStopped': false,
          'hasError': false,
          'thrownError': null
        };
        return Observable.of(authData);
      }
  };
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('OktaAuthService', ['getUser']);
    const userServicesSpy = jasmine.createSpyObj('UserService',
     ['identity', 'hasAnyAuthority', 'hasAnyAuthorityDirect', 'getAuthenticationState']
     );
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HasAnyAuthorityDirective, SectionTitleComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        AirlineService,
        HttpClientModule,
        { provide: OktaAuthService, useValue: spy },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    vOktaAuthServiceSpy = TestBed.get(OktaAuthService);
    userServiceSpy = TestBed.get(UserService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    const spy = spyOn(userServiceSpy, 'identity').and.callThrough();
    const getAuthState = spyOn(userServiceSpy, 'getAuthenticationState').and.callThrough();
    userServiceSpy.identity(true).then((results) => {
      expect(results).toEqual(mockUserData);
      expect(spy).toHaveBeenCalled();
    });
    userServiceSpy.getAuthenticationState().subscribe((results) => {
      expect(getAuthState).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  });
});

