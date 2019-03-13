// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { Observable } from 'rxjs';
// import { HttpClientModule } from '@angular/common/http';
// import { UserService } from './user.service';
// import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/observable/throw';
// import { OktaAuthService } from '@okta/okta-angular';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// describe('UserService', () => {
//   let httpClient: HttpClient;
//   let userService: UserService;
//   const spy = jasmine.createSpyObj('OktaAuthService', ['authenticate']);
//   const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);
//   let oktaAuthService: jasmine.SpyObj<OktaAuthService>;
//   beforeEach(async(() => TestBed.configureTestingModule({
//     imports: [HttpClientModule],
//     providers: [
//         HttpClientModule,
//         UserService,
//         { provide: OktaAuthService, useValue: spy },
//         { provide: UserService, useValue: spyUserservice }
//     ],
//     schemas: [NO_ERRORS_SCHEMA]
//   }
//   )));
//   beforeEach(() => {
//     httpClient = TestBed.get(HttpClient);
//     userService = TestBed.get(UserService);
//     oktaAuthService = TestBed.get(OktaAuthService);
//   });
// //   it('should be created', () => {
// //     // const service: UserService = TestBed.get(UserService);
// //     expect(userService).toBeTruthy();
// //   });

// //   it('should be define authenticate', () => {
// //     userService.authenticate('');
// //     expect(userService.authenticate).toBeFalsy();
// //   });
// });
