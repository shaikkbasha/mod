import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AirlineComponent } from './airline.component';
import { RouterModule, ActivatedRoute, Routes } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';
import { OktaAuthService } from '@okta/okta-angular';
import { AirlineService } from 'src/app/shared/services/admin/airline/airline.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessDeniedComponent } from '../../error/access-denied/access-denied.component';

class MockUserService {
  hasAirlineAccess(icao) {
    return true;
  }
}

class MockAirlineService {

}
const routes: Routes = [
  {
      path: 'access-denied',
      component: AccessDeniedComponent
  }
];
describe('AirlineComponent', () => {
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated']);
  let component: AirlineComponent;
  let userService: MockUserService;
  let airlineService: MockAirlineService;
  let fixture: ComponentFixture<AirlineComponent>;
  let router: Router;
  // const mockUserService = {
  //   hasAirlineAccess(): {
  //   }
  // };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineComponent, AccessDeniedComponent ],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ],
      providers: [
        UserService,
        { provide: OktaAuthService, useValue: {} },
        AirlineService,
        {
            provide: ActivatedRoute, useValue: {
            params: Observable.of({ id: 'test' }),
            snapshot: {
              paramMap: {
                get: function(icao) { return 'test'; }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router);
    userService = TestBed.get(UserService);
    airlineService = TestBed.get(AirlineService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // const getFlightList = spyOn(userService, 'hasAirlineAccess').and.callThrough();
    component.currentAirlineId = 'test';
    userService.hasAirlineAccess('test');
  });
  it('should be define ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.navigationSubscription).toBeDefined();
  });
  it('should be define isActive', () => {
    component.isActive([]);
    expect(component.isActive).toBeDefined();
  });
  it('should be define isDropdownItemActive', () => {
    component.isDropdownItemActive([['/airline']]);
    expect(component.isDropdownItemActive).toBeDefined();
  });

  it('should load data', () => {
    component.currentAirlineId = 'aal';
    component.loadData();
  });
});
