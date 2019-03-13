import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { PeriodicTuner } from './periodic-tuner-status.po';

describe('PeriodicTuner Page', () => {
    let periodicTuner: PeriodicTuner;
    const EC = browser.ExpectedConditions;
    beforeEach(() => {
        browser.sleep(1000);
        periodicTuner = new PeriodicTuner();
        browser.waitForAngularEnabled(false);
        periodicTuner.navigate();
        browser.wait(EC.visibilityOf($('app-periodic-tuner-status')));
        browser.sleep(2000);
    });

    it('should navigate to periodic-tuner-status', () => {
        const periodicTunerId = '#btn-periodic-tuner-status';
        periodicTuner.navigateToAntenna();
        browser.wait(EC.visibilityOf($('app-antenna')));
        const mapBtn = periodicTuner.getElementBySelector(periodicTunerId);
        mapBtn.click();
        browser.wait(EC.visibilityOf($('app-periodic-tuner-status')));
        browser.sleep(1000);
        const classList = periodicTuner.getClassListBySelector(periodicTunerId);
        expect(classList).toContain('active');
    });


    it('should display flight details', () => {
        const flightDetails = periodicTuner.getElementBySelector('art-flight-details');
        expect(flightDetails.isPresent()).toBeTruthy();
    });

    it('should display section titles', () => {
        const sectionTitle = periodicTuner.getAllElementsBySelector('art-section-title');
        expect(sectionTitle.count()).toBe(2);
    });

    it('should display data table', () => {
        browser.wait(EC.visibilityOf($('#periodic-tuner-status-table')));
        const dataTable = periodicTuner.getElementBySelector('#periodic-tuner-status-table');
        expect(dataTable.isPresent()).toBeTruthy();
    });

    it('should diplay action toolbar', () => {
        const actionToolbar = periodicTuner.getElementBySelector('art-action-toolbar');
        expect(actionToolbar.isPresent()).toBeTruthy();
    });

    it('should display tooltip in board tuner component', () => {
        browser.wait(EC.visibilityOf($('#periodic-tuner-status-table')));
        const tunerBoard = periodicTuner.getElementBySelector('#board-1-tuner-1');
        tunerBoard.click();
        browser.sleep(3000);
        const actionToolbar = periodicTuner.getElementBySelector('ngb-tooltip-window');
        expect(actionToolbar.isPresent()).toBeTruthy();
        const toolbarPropCount = periodicTuner.getAllElementsBySelector('#periodic-tuner-tooltip strong').count();
        expect(toolbarPropCount).toBe(8);
    });

});
