import { browser, by, element , $} from 'protractor';
import { HomePage } from './home.po';
describe('Display home page', () => {
  let originalTimeout = 0;
  const homePage = new HomePage();

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(() => {
    homePage.navigateTo();
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
  });

  beforeEach(() => {
    // airlinesPage.navigateToAirlines();
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
  });
  it('should display welcome title', () => {
    const welcomeTitle = element(by.id('home-welcome-title'));
    expect(welcomeTitle.getText()).toContain('Welcome');
  });

  it('should display profile link', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    //  check the label
    const profileLabel = element(by.id('lbl-profile'));
    expect(profileLabel.getText()).toEqual('PROFILE');
    // check the link
    const profileLink = element(by.id('lnk-home-profile'));
    expect(profileLink.getAttribute('href')).toContain('/profile');
    // check the profie icons
    const profileIcon = element(by.id('spn-home-profile'));
    expect(profileIcon.getAttribute('class')).toContain('home-icon');

  });

  it('should display admin link', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    // check the label
    const adminLabel = element(by.id('lbl-admin'));
    expect(adminLabel.getText()).toEqual('ADMIN');
    // check the link
    const adminLink = element(by.id('lnk-home-admin'));
    expect(adminLink.getAttribute('href')).toContain('/admin');
    // check the profie icons
    const adminIcon = element(by.id('spn-home-admin'));
    expect(adminIcon.getAttribute('class')).toContain('home-icon');
  });

  it('should display upload link', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    // check the label
    const payloadsLabel = element(by.id('lbl-upload'));
    expect(payloadsLabel.getText()).toEqual('UPLOAD');
    // check the link
    const payloadsLink = element(by.id('lnk-home-upload'));
    expect(payloadsLink.getAttribute('href')).toContain('/upload');
    // check the profie icons
    const payloadsIcon = element(by.id('spn-home-upload'));
    expect(payloadsIcon.getAttribute('class')).toContain('home-icon');

  });

});

