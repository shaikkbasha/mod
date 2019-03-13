import {
    RouterModule,
    Routes, Router
} from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OktaAuthModule } from '@okta/okta-angular';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './login/protected.component';
import { AuthGuard } from '../shared/okta/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { AccessDeniedComponent } from './error/access-denied/access-denied.component';
import { routes, onAuthRequired, onAuthorizationRequired } from '../routes/routes';

describe('Router', () => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                OktaAuthModule
            ],
            declarations: [
                routes,
                LayoutComponent,
                LoginComponent,
                ProtectedComponent,
                NotFoundComponent,
                AccessDeniedComponent
            ],
            providers: [
                { provide : Router, useValue: spyRouter }
            ]
        });
    });

    it('onAuthRequired should be defined', () => {
        const oktaAuth: any = {};
        const router: any  = spyRouter;
        const obj = {
            oktaAuth,
            router
        };
        onAuthRequired(obj);
        expect(spyRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('onAuthorizationRequired should be defined', () => {
        const oktaAuth: any = {};
        const router: any  = spyRouter;
        const obj = {
            oktaAuth,
            router
        };
        onAuthorizationRequired(obj);
        expect(spyRouter.navigate).toHaveBeenCalledWith(['/access-denied']);
    });
});

