import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { AirlinesPage } from './airlines.po';

describe('Airlines Page', () => {
    const airlinesPage = new AirlinesPage();
    beforeEach(() => {
        browser.sleep(1000);
        const origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        airlinesPage.navigateToAirlines();
        browser.wait(EC.visibilityOf($('#btn-airline-link')));
    });

    it('should display airlines Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-airline-link')));

        const airlineTab = element(by.id('btn-airline-link'));
        expect(airlineTab.getText()).toContain('Airlines');
    });


    it('should filter airline table', () => {
        airlinesPage.tableFilter().click();
        airlinesPage.enableSearchText().sendKeys('Air');
        browser.sleep(1000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            expect(items.length).toBeGreaterThanOrEqual(1);
        });
    });

    // it('should create airline', () => {
    //     airlinesPage.createAirline().click();
    //     element(by.id('inp-admin-airline-name')).sendKeys('10');
    //     element(by.id('inp-admin-airline-acronym')).sendKeys('acr');
    //     element(by.id('inp-admin-airline-icao')).sendKeys('ic');
    //     element(by.id('inp-admin-airline-iata')).sendKeys('at');
    //     element(by.id('btn-airline-save')).click();
    //     browser.sleep(2000);
    //     element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
    //         const myElement = element(by.id('error'));
    //         expect(myElement.isPresent()).toBeTruthy();
    //     });
    // });

    // it('Airlines page should be defined', () => {
    //     airlinesPage.gotoairlineModule();
    //     browser.waitForAngularEnabled(false);
    //     const EC = browser.ExpectedConditions;
    //     browser.wait(EC.visibilityOf($('#btn-airline-link')));
    //     expect(airlinesPage.getAirlineText().getAttribute('class')).toContain('active');
    // });

    it('go to stations module', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-stations-link')));
        airlinesPage.gotostationModule();
        expect(browser.getCurrentUrl()).toContain('/admin/stations');
    });

});
