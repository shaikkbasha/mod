import { browser, by, element, $ } from 'protractor';

export class Map {

    navigateTo() {
        browser.get('/airline/AAL/tv-performance/5c3863370fcab6000f59ab74/map');
    }

    navigateToAntenna() {
        browser.get('/airline/AAL/tv-performance/5c3863370fcab6000f59ab74/antenna');
    }

    getMapButton() {
        return element(by.css('#btn-map'));
    }

    getMapClassList() {
        return element(by.css('#btn-map')).getAttribute('class');
    }

    getFlightDetails() {
        return element(by.css('art-flight-details'));
    }

    getSectionTitle() {
        return element.all(by.css('art-section-title'));
    }

    getMapContainer() {
        return element(by.css('#map'));
    }

    getMapCanvas() {
        return element(by.css('canvas'));
    }

    getArtActionToolbar() {
        return element(by.css('art-action-toolbar'));
    }
}
