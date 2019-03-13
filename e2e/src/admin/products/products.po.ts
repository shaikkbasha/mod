import { browser, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class AdminProductsPage {

    navigateToAirlines() {
        browser.get('/admin/products');
    }

    treeFilter() {
        return $('#filter');
    }
}
