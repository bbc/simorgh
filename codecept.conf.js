const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './e2e_tests/*_test.js',
  output: './e2e_tests_output',
  helpers: {
    Nightmare: {
      url: 'http://localhost:7080',
      show: false,
      restart: false,
    },
    NighmareHelper: {
      require: './e2e_test_helpers/nightmare',
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'simorgh',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: false,
    },
    customLocator: {
      enabled: true,
      prefix: '=',
      attribute: 'data-e2e',
    },
  },
};
