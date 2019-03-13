import { browser, by, element, $ } from 'protractor';

export class AdminStationsPage {

    navigateTo() {
        browser.get('/admin/stations');
    }

    getCreateStationsButtonText() {
        return element.all(by.className('mat-tab-label-content')).get(0);
    }
    refreshList() {
        return element(by.className('fa-refresh'));
    }

    gotoRepairStations() {
        element(by.css('[id="mat-tab-label-2-1"]')).click();
        return $('.mat-tab-body-content h3');
    }

    gotoProductsModule() {
        return element( by.id('btn-products-link') );
    }
}
