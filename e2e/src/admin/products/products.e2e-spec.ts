import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { AdminProductsPage } from './products.po';

describe('Admin Products Page', () => {

    const productsPage = new AdminProductsPage();

    beforeEach(() => {
        const origFn = browser.driver.controlFlow().execute;
        productsPage.navigateToAirlines();
    });

    it('should display products Tab', () => {
        expect(browser.getCurrentUrl()).toContain('/admin/products');
    });

    it('filter tree node', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#filter')));
        productsPage.treeFilter().sendKeys('SVDU');
        expect(productsPage.treeFilter().getAttribute('value')).toEqual('SVDU');
    });
});
