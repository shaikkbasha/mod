import { TestBed, ComponentFixture, async, inject, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes/routes';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './routes/login/login.component';
import { ProtectedComponent } from './routes/login/protected.component';
import { LayoutComponent } from './layout/layout.component';
import { InjectionToken, NO_ERRORS_SCHEMA, DebugElement, EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { UserService } from './shared/services/user/user.service';
import { AirlineService } from './shared/services/admin/airline/airline.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES, AutoResume } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import * as Rx from 'rxjs';
import { AccessDeniedComponent } from '../app/routes//error/access-denied/access-denied.component';
import { NotFoundComponent } from '../app/routes/error/not-found/not-found.component';
import { UploadComponent } from './routes/upload/upload.component';
import { NgPipesModule } from 'ngx-pipes';
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let oktaAuthService: jasmine.SpyObj<OktaAuthService>;
  let debugElement: DebugElement;
  let idle: Idle;
  const mockOktaAuthService = {
    isAuthenticated(): Promise<any> {
     return new Promise<any>(resolve => resolve(true));
    }
  };

  const mockIdle = {
    isAuthenticated():  Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    watch: function() {},
    setIdle: function(params) {},
    setTimeout: function() { },
    setInterrupts: function(params) {},
    setAutoResume: function() { },
    onIdleEnd: new EventEmitter<string>(true),
    onTimeout: new EventEmitter<string>(true),
    onIdleStart: new EventEmitter<string>(true),
    onTimeoutWarning: new EventEmitter<string>(true)
  };

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated']);
    const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);
    const idleSpy = jasmine.createSpyObj('Idle', ['setIdle', 'setTimeout', 'setInterrupts', 'setAutoResume', 'onTimeoutWarning']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        OktaCallbackComponent,
        LoginComponent,
        LayoutComponent,
        ProtectedComponent,
        AccessDeniedComponent,
        NotFoundComponent,
        UploadComponent
      ],
      providers: [
        { provide: OktaAuthService, useValue: mockOktaAuthService },
        { provide: UserService, useValue: spyUserservice }, AirlineService,
        { provide: Idle, useValue: mockIdle },
        Keepalive
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterModule,
        RouterTestingModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    oktaAuthService = TestBed.get(OktaAuthService);
    idle = TestBed.get(Idle);
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should be define ngOnInit', async () => {
    const isAuthenticated = spyOn(oktaAuthService, 'isAuthenticated').and.returnValue('');
    setTimeout(() => {
      oktaAuthService.isAuthenticated().then(response => {
        expect(isAuthenticated).toHaveBeenCalled();
      });
    });
    const onIdleEnd = spyOn(idle.onIdleEnd, 'emit').and.returnValue('');
    // idle.onIdleEnd.emit('');
    const onTimeout = spyOn(idle.onTimeout, 'emit').and.returnValue('');
    const onIdleStart =  spyOn(idle.onIdleStart, 'emit').and.returnValue('');
    const onTimeoutWarning = spyOn(idle.onTimeoutWarning, 'emit').and.returnValue('');

    idle.onIdleEnd.subscribe((done) => {
      expect(onIdleEnd).toHaveBeenCalled();
      done();
    });
    idle.onTimeout.subscribe((done) => {
      expect(onTimeout).toHaveBeenCalled();
      done();
    });
    idle.onIdleStart.subscribe((done) => {
      expect(onIdleStart).toHaveBeenCalled();
      done();
    });
    idle.onTimeoutWarning.subscribe((done) => {
      expect(onTimeoutWarning).toHaveBeenCalled();
      done();
    });

    // component.isAuthenticated = await oktaAuthService.isAuthenticated();
    await component.ngOnInit();
    expect(component.ngOnInit).toBeDefined();

  });
});
