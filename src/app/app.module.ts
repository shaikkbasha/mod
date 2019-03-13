import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import {
  MatButtonModule,
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

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { BootstrapModule } from './shared/bootstrap.module';
import { ArtefactModule } from './shared/artefact.module';

import { OktaAuthModule } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/okta/auth.interceptor';
import { ProtectedComponent } from './routes/login/protected.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthGuard } from './shared/okta/auth.guard';
import { UserService } from './shared/services/user/user.service';
import { AirlineService } from './shared/services/admin/airline/airline.service';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { IdleModalComponent } from './common/idle-modal/idle-modal.component';
// this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NotFoundComponent } from './routes/error/not-found/not-found.component';
import { TreeModule } from 'angular-tree-component';
import { UploadComponent } from './routes/upload/upload.component';
import { FileUploadModule } from 'ng2-file-upload';
const OKTA_REDIRECT_URI = `${environment.OKTA_REDIRECT_URI}`;
const OKTA_CLIENT_ID = `${environment.OKTA_CLIENT_ID}`;

// Okta configuration
const oktaConfig = {
  issuer: 'https://dev-836625.oktapreview.com/oauth2/default',
  redirectUri: OKTA_REDIRECT_URI,
  clientId: OKTA_CLIENT_ID,
  scope: 'openid profile email'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    IdleModalComponent,
    NotFoundComponent,
    UploadComponent
  ],
  imports: [
    SharedModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgPipesModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    OktaAuthModule.initAuth(oktaConfig),
    LayoutModule,
    RoutesModule,
    NoopAnimationsModule,
    MaterialModule,
    BootstrapModule,
    ArtefactModule,
    FileUploadModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }), // ToastrModule added
    NgIdleKeepaliveModule.forRoot(),
    TreeModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    UserService,
    AirlineService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    IdleModalComponent
  ],
  exports: [
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgPipesModule,
    FileUploadModule
]
})
export class AppModule { }
