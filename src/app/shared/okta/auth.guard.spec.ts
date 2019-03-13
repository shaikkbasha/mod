import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from '../okta/auth.guard';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { UserService } from '../../shared/services/user/user.service';

describe('AuthGuard', () => {

 let oktaAuthService: jasmine.SpyObj<OktaAuthService>;
 let userService: jasmine.SpyObj<UserService>;
 const mockoktaAuthService = {
  isAuthenticated(): Promise<any> {
    return new Promise<any>(resolve => resolve(true));
  },
  getOktaConfig: function() {
    const obj = {
      onAuthRequired: function() {}
    };
    return obj;
  },
  getUser: function() {
    return new Promise<any>(resolve => resolve({}));
  },
  setFromUri: function() {}
 };
 const mockUserService = {
  hasAnyAuthority(): Promise<any> {
    return new Promise<any>(resolve => resolve(true));
  }
 };
 const mockRouter = {
  data: {
    authorities: true,
    onAuthorizationRequired: function() {}
  },
  navigate: function() {}
 };
 beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: OktaAuthService, useValue: mockoktaAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
     ],
      imports: [RouterTestingModule]
    });
    oktaAuthService = TestBed.get(OktaAuthService);
    userService = TestBed.get(UserService);

 }));

//  beforeEach(async () => {
//   fixture = TestBed.createComponent(AuthGuard);
//   authGuard = fixture.componentInstance;
//   fixture.detectChanges();
//  });

  it('checks if a user is valid',

    // inject your guard service AND Router
    async(inject([AuthGuard, Router], (auth, router) => {

      const isAuthenticated = spyOn(oktaAuthService, 'isAuthenticated');
      const hasAnyAuthority = spyOn(userService, 'hasAnyAuthority');
      isAuthenticated.and.returnValue(false);
      hasAnyAuthority.and.returnValue(false);
      // add a spy
      spyOn(router, 'navigate');

      expect(auth).toBeTruthy();
      // expect(router.navigate).toHaveBeenCalled();
      auth.canActivate({data: {authorities: true}}, {url : '/admin/airlines'});
      expect(auth.canActivate).toBeDefined();


      isAuthenticated.and.returnValue(true);
      hasAnyAuthority.and.returnValue(true);
      // expect(router.navigate).toHaveBeenCalled();
      auth.canActivate({data: {authorities: true}}, {url : '/admin/airlines'});

      isAuthenticated.and.returnValue(true);
      hasAnyAuthority.and.returnValue(false);
      // expect(router.navigate).toHaveBeenCalled();
      auth.canActivate({data: {authorities: true}}, {url : '/admin/airlines'});
      expect(oktaAuthService.isAuthenticated).toHaveBeenCalled();
    })
  ));
});
