import { browser, by, element, $ } from 'protractor';

export class PeriodicTuner {

    navigate() {
        browser.get('/airline/AAL/tv-performance/5c3863370fcab6000f59ab74/periodic-tuner-status');
    }

    navigateToAntenna() {
        browser.get('/airline/AAL/tv-performance/5c3863370fcab6000f59ab74/antenna');
    }

    getElementBySelector(selector) {
        return element(by.css(selector));
    }

    getClassListBySelector(selector) {
        return element(by.css(selector)).getAttribute('class');
    }

    getAllElementsBySelector(selector) {
        return element.all(by.css(selector));
    }

}
