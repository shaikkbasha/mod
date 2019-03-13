import { browser, by, element , $} from 'protractor';
import { SingleAirlineUserPage } from './singleairlineuser.po';
describe('Single Airline User', () => {
  // let originalTimeout = 0;
  const singleAirlineUserPage = new SingleAirlineUserPage();

  // beforeEach(function() {
  //   originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  // });

  beforeAll(() => {
    singleAirlineUserPage.navigateTo();
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
  });

  xit('should be logout', () => {
    singleAirlineUserPage.logout().click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  xit('should be login', () => {
    const userName = 'e2e.single-airline@us.thalesgroup.com';
    const password = process.env.OKTA_E2E_SINGLE_AIRLINE_USER_PASSWORD;

    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#okta-signin-username')));

    browser.driver.findElement(by.id('okta-signin-username')).sendKeys(userName);
    browser.driver.findElement(by.id('okta-signin-password')).sendKeys(password);

    browser.driver.findElement(by.id('okta-signin-submit')).click();

    browser.wait(EC.visibilityOf($('#home-welcome-title')));

    expect(browser.getCurrentUrl()).toContain('/home');
  });

  xit('should display overview page', () => {
    singleAirlineUserPage.navigateToOverview();
    expect(browser.getCurrentUrl()).toContain('overview');
  });

  xit('should display access denied page', () => {
    singleAirlineUserPage.navigateToAccessDenied();
    browser.sleep(3000);
    expect(browser.getCurrentUrl()).toContain('access-denied');
  });

  xit('should display not-found page', () => {
    singleAirlineUserPage.navigateToOverviewWithInvalidICAO();
    browser.sleep(3000);
    expect(browser.getCurrentUrl()).toContain('not-found');
  });

});

