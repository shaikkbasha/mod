import { browser, protractor, by, $, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { AdminStationsPage } from './stations.po';

describe('Stations Page', () => {

    const staionsPage = new AdminStationsPage();

    beforeEach(() => {
        staionsPage.navigateTo();
    });

    // it('Maintenance Station Module is Defined', () => {
    //     expect(staionsPage.getCreateStationsButtonText().getText()).toContain('Maintenance Stations');
    // });

    // it('Refresh Stations List', () => {
    //     expect(staionsPage.refreshList().click()).toBeDefined();
    // });

    // it('Go to repair stations', () => {
    //     browser.waitForAngularEnabled(false);
    //     const EC = browser.ExpectedConditions;
    //     browser.wait(EC.visibilityOf($('#mat-tab-label-3-1')));
    //     expect(staionsPage.gotoRepairStations().getText()).toBeDefined();
    // });

    // it('Go to products tab', () => {
    //     expect(staionsPage.gotoProductsModule().click()).toBeDefined();
    // });


});
