import { browser, by, element, $ } from 'protractor';

export class SingleAirlineUserPage {
    navigateTo() {
        browser.get('/home');
    }

    logout() {
        return element( by.id('logout'));
    }

    navigateToOverview() {
        browser.get('/airline/AAL/overview').then(function() {
        });
    }
    navigateToAccessDenied() {
        browser.get('/airline/JBU/overview').then(function() {
        });
    }
    navigateToOverviewWithInvalidICAO() {
        browser.get('/airline/12345/overview').then(function() {
        });
    }


}

