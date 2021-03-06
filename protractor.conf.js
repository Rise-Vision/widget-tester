var seleniumAddress = (process.env.NODE_ENV === 'prod') ? 'http://localhost:4444/wd/hub' : undefined;
if(process.env.SELENIUM_ADDRESS) {
  seleniumAddress = process.env.SELENIUM_ADDRESS;
}
process.env.LOG_XUNIT = true;
process.env.XUNIT_FILE = (typeof process.env.XUNIT_FILE === 'undefined'  || process.env.XUNIT_FILE === '') ? 'reports/angular-xunit.xml': process.env.XUNIT_FILE;
process.env.PROSHOT_DIR = (typeof process.env.PROSHOT_DIR === 'undefined'  || process.env.PROSHOT_DIR === '') ? 'reports/screenshots': process.env.PROSHOT_DIR;
// process.env.multi = 'spec-xunit-file=- mocha-proshot=-';
process.env.CHROME_INSTANCES = process.env.CHROME_INSTANCES || 1;
// process.env.MOCHA_REPORTER_FILE = 'reports/anglar.json';
// process.env.MOCHA_REPORTER = 'JSON';

exports.config = {
  directConnect: true,
  allScriptsTimeout: 30000,

  // specs: [
  //   './test/e2e/angular/*.js'
  // ],


  // -----------------------------------------------------------------
  // Browser and Capabilities: Chrome
  // -----------------------------------------------------------------

  // seleniumServerJar: "../node_modules/protractor/selenium/selenium-server-standalone-2.9.248307.jar",
  seleniumAddress: seleniumAddress,
  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY',
    shardTestFiles: true,
    maxInstances: process.env.CHROME_INSTANCES,
    download: {
      prompt_for_download: false
    },
    chromeOptions: {
      // args: ['--disable-web-security'],
      prefs: {
        'download.default_directory': process.cwd() + '/tmp'
      }
    }
  },

  framework: 'mocha',

  mochaOpts: {
    // reporter: 'require("xunit-file")',
    // reporter: 'mocha-multi',
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'spec-xunit-file, mocha-proshot',
    },
    enableTimeouts: false,
    slow: 3000
  },
  onPrepare: function() {
    var ignoreScript = "var callback = arguments[arguments.length - 1];" +
        "callback()";
    var script = "var callback = arguments[arguments.length - 1];" +
        "angular.element(document.querySelector(\"body\")).injector()"+
        ".get(\"$browser\").notifyWhenNoOutstandingRequests(callback)";

    browser.waitForAngular = function() {
      if (browser.ignoreSynchronization) {
        return browser.executeAsyncScript(ignoreScript);
      }

      return browser.wait(function () {
        return browser.executeScript('return !!window.angular && !!angular.element(document.querySelector(\"body\")).injector()');
      }, 10000)
        .then(function() {
          return browser.executeAsyncScript(script);
        }); // 10000 is the timeout in millis
    };

    var getUrl = "var callback = arguments[arguments.length - 1];" +
        "callback(window.location.href)";

    browser.getCurrentUrl = function() {
      return browser.executeAsyncScript(getUrl);
    };


  }
};
