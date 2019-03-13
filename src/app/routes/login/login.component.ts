// src/app/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
// import * as OktaSignIn from '@okta/okta-signin-widget';
// import * as OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.js';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent implements OnInit {
  signIn;

  // https://www.npmjs.com/package/@okta/okta-angular
  // https://github.com/okta/okta-signin-widget#new-oktasigninconfig
  widget = new OktaSignIn({
    baseUrl: 'https://dev-836625.oktapreview.com',
    logo: '/assets/img/ThalesLogo.png',
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.widget.renderEl(
      { el: '#okta-signin-container'}, res => {
        this.loginValidation(res);
      }
    );
  }

  loginValidation(res) {
    if (res.status === 'SUCCESS') {
      this.signIn.loginRedirect('/home', { sessionToken: res.session.token });
      // Hide the widget
      this.widget.hide();
    }
  }
}
