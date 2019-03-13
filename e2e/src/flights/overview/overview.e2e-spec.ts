import { browser, by, element , $} from 'protractor';
import { OverviewPage } from './overview.po';
describe('Display Flight Overview page', () => {
  let originalTimeout = 0;
  const overviewPage = new OverviewPage();
  const EC = browser.ExpectedConditions;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(() => {
    overviewPage.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#lbl-flight-overview-tail')));
  });

  it('should display same path', () => {
    browser.waitForAngularEnabled(false);
    expect(browser.getCurrentUrl()).toContain('/overview');
  });

  it('should display all flight detail labels', () => {
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#lbl-flight-overview-tail')));
    // check the label
    const tailLabel = overviewPage.getIdElement('lbl-flight-overview-tail');
    expect(tailLabel.getText()).toEqual('TAIL');

    const flightIdLabel = overviewPage.getIdElement('lbl-flight-overview-flight');
    expect(flightIdLabel.getText()).toEqual('FLIGHT #');

    const originLabel = overviewPage.getIdElement('lbl-flight-overview-origin');
    expect(originLabel.getText()).toEqual('ORIGIN');

    const destinationLabel = overviewPage.getIdElement('lbl-flight-overview-destination');
    expect(destinationLabel.getText()).toEqual('DESTINATION');

    const flightStartTimeLabel = overviewPage.getIdElement('lbl-flight-overview-departure-time');
    expect(flightStartTimeLabel.getText()).toEqual('FLIGHT LEG START TIME (UTC)');

    const flightEndTimeLabel = overviewPage.getIdElement('lbl-flight-overview-arrival-time');
    expect(flightEndTimeLabel.getText()).toEqual('FLIGHT LEG END TIME (UTC)');

  });

});
