import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { ProfileComponent } from './profile.component';
import { UserService } from '../../../shared/services/user/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);
  let oktaAuthService: OktaAuthService;

  const OctaService = {
    getUser() {
      return {
        'id': '00S0Q0h7asdr23resd56',
        'firstName': 'Abc',
        'lastName': 'A',
        'email': 'anc@xyz.com',
        'groups': [
          'Group',
          'all'
        ],
        'authorities': [
          'Group',
          'all'
        ],
        'airlines': [
          ''
        ]
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: OktaAuthService, useValue: OctaService },
        { provide: UserService, useValue: spyUserservice }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    oktaAuthService = TestBed.get(OktaAuthService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    oktaAuthService = TestBed.get(OktaAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit()', fakeAsync(() => {
    component.claims = [];
    const oktaSpy = spyOn(oktaAuthService, 'getUser').and.callThrough();
    component.ngOnInit();
    expect(oktaSpy).toHaveBeenCalled();
    expect(component.claims).toBeDefined();
  }));
});
