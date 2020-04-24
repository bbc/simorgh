/* eslint-disable no-console */

const { exec } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));
const ora = require('ora');
const writeTestFiles = require('./writeTestFiles');
const removeTestFiles = require('./removeTestFiles');
const { FULL_SERVICE_INTEGRATION_TEST_DIR } = require('./constants');

const getServicesArg = () => {
  const { services: _services = '' } = argv;

  return _services.split(',').filter(Boolean);
};

const getFlags = () =>
  process.argv
    .slice(2)
    .filter(flag => !flag.startsWith('--services='))
    .join(' ');

const getFilesToTest = services => {
  if (services.length) {
    return services
      .map(
        service =>
          `./src/integration/${FULL_SERVICE_INTEGRATION_TEST_DIR}/${service}/**/*`,
      )
      .join(',');
  }
  return `./src/integration/${FULL_SERVICE_INTEGRATION_TEST_DIR}/**/*`;
};

const startApp = () => {
  return new Promise(resolve => {
    const child = exec(
      'npm run stop && npm run build:local && (npm run start & ./node_modules/.bin/wait-on -t 20000 http://localhost:7080/status)',
    );

    child.on('exit', resolve);
  });
};

const filesToTest = getFilesToTest(getServicesArg());
const flags = getFlags();

const runTests = () =>
  new Promise(resolve => {
    const child = exec(
      `./node_modules/.bin/jest --runInBand --colors ${filesToTest} ${flags}`,
    );

    child.stdout.on('data', data => {
      console.log(data.toString());
    });

    child.stderr.on('data', data => {
      console.log(data.toString());
    });

    child.on('exit', resolve);
  });

const stopApp = () =>
  new Promise(resolve => {
    const child = exec('npm run stop');

    child.on('exit', resolve);
  });

const spinner = ora('Creating test files').start();

writeTestFiles();

spinner.text = 'Starting app';

startApp()
  .then(() => spinner.stop())
  .then(runTests)
  .then(removeTestFiles) // maybe leave the test files in?
  .then(stopApp);
