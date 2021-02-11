var path = require("path");

module.exports = function(config){
  config.set({

    autoWatch : false,

    frameworks: ["mocha", "chai", "chai-as-promised", "sinon-chai"],

    browsers : ["ChromeHeadless"],

    preprocessors : {
      "src/script/**/*.js": "coverage"
    },

    reporters: ["progress", "junit", "coverage"],

    plugins : [
            "karma-mocha",
            "karma-chai",
            "sinon-chai",
            "karma-junit-reporter",
            "karma-coverage",
            "karma-chai-plugins",
            "karma-chrome-launcher"
            ],

    junitReporter : {
      outputFile: path.join(__dirname, "../../reports/karma-xunit.xml")
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : "cobertura",
      dir : path.join(__dirname, "../../reports/coverage")
    },

    // web server port
    port: 9876,
    logLevel: config.LOG_INFO,

    // enable / disable colors in the output (reporters and logs)
    colors: true

  });
};
