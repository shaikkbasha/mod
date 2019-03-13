// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// var env = require('../src/environments/environment.ts');

const { SpecReporter } = require('jasmine-spec-reporter');
const HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
    // './src/home/home.e2e-spec.ts',
    // './src/admin/airlines/airlines.e2e-spec.ts'
    // './src/tv-performance/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,

  framework: 'jasmine',
  jasmineNodeOpts: {
    
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    /** To generate e2e coverage report **/
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: './e2e/e2e_coverage/',
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'json',
      docTitle: 'e2e coverage',
      docName: 'report.html',
      preserveDirectory: false,
      takeScreenShotsOnlyForFailedSpecs: true,
      takeScreenShots: false

    }).getJasmine2Reporter());
    /** To generate e2e coverage report **/

    browser.driver.get(browser.baseUrl + '/');

    browser.driver.findElement(by.id('okta-signin-username')).sendKeys('e2e.admin@us.thalesgroup.com');
    browser.driver.findElement(by.id('okta-signin-password')).sendKeys(process.env.OKTA_E2E_PASSWORD);
    
    browser.driver.findElement(by.id('okta-signin-submit')).click();

    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // index.html.
    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /home/.test(url);
      });
    }, 20000);
  }
};
