import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { Antenna } from './antenna.po';

describe('Antenna Page', () => {
    let antenna: Antenna;
    const EC = browser.ExpectedConditions;
    beforeEach(() => {
        browser.sleep(1000);
        antenna = new Antenna();
        browser.waitForAngularEnabled(false);
        antenna.navigateTo();
        browser.wait(EC.visibilityOf($('app-antenna')));
        browser.sleep(2000);
    });

    it('antenna tab should be highlighted', () => {
        const classList = antenna.getAntennaClassList();
        expect(classList).toContain('active');
    });

    it('chart display chart', () => {
        const chart = antenna.getChart();
        const chartName = antenna.getChartTitle();
        expect(chart.isPresent()).toBeTruthy();
        expect(chartName).toBe('RSSI');
    });

    it('should display flight details', () => {
        const flightDetails = antenna.getFlightDetails();
        expect(flightDetails.isPresent()).toBeTruthy();
    });

    it('should display highest and low rssi', () => {
        const highestlbl = antenna.getHighestRssiLabel();
        const highestRssi = antenna.getHighestRssiValue();
        const lowestlbl = antenna.getLowestRssiLabel();
        const lowestRssi = antenna.getLowestRssiValue();
        expect(highestlbl).toBe('HIGHEST RSSI');
        expect(lowestlbl).toBe('LOWEST RSSI');
        expect(highestRssi).toBeDefined();
        expect(lowestRssi).toBeDefined();
    });

    it('should display filter buttons', () => {
        const filterButtons = antenna.getAntennaFilters();
        expect(filterButtons.count()).toBe(5);
    });

    it('should display data table', () => {
        const dataTable = antenna.getDataTable();
        expect(dataTable.isPresent()).toBeTruthy();
    });

    it('should filter data with bad rssi', () => {
        browser.wait(EC.visibilityOf($('#tbl-antenna-data tbody tr')));
        antenna.getResultCount().then(count => {
            const fltrbtn = antenna.getFilterButton();
            fltrbtn.click();
            browser.sleep(3000);
            const noOfRows = antenna.getTableRows();
            console.log('****', noOfRows, Number(count));
            expect(noOfRows).toBe(Number(count));
        });
    });

    it('should display all data in table', () => {
        browser.wait(EC.visibilityOf($('#tbl-antenna-data tbody tr')));
        antenna.getAllResultCount().then(count => {
            const noOfRows = antenna.getTableRows();
            console.log('****', noOfRows, Number(count));
            expect(noOfRows).toBe(Number(count));
        });
    });

    it('should filter antenna table', () => {
        browser.wait(EC.visibilityOf($('#tbl-antenna-data tbody tr')));
        antenna.getElementBySelector('.tool-bar-search').click();
        antenna.getElementBySelector('.action-toolbar-search').sendKeys('Pre');
        const filteredData = antenna.getAllElementsBySelector('table tbody tr');
        browser.sleep(1000);
        filteredData.count().then(function(count) {
            expect(Number(count)).toBeGreaterThanOrEqual(1);
        });
    });
});
