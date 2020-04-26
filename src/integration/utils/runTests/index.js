/* eslint-disable no-console */

const { exec, spawn } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));
const ora = require('ora');
const writeTestFiles = require('./writeTestFiles/writeTestFiles');
const { SERVICES_TESTS_DIR } = require('./constants');

const isCI = argv.ci;
const isDev = Boolean(argv.dev);
process.env.DEV_MODE = isDev;

const getJestArgs = () =>
  process.argv
    .slice(2)
    .filter(flag => !flag.startsWith('--services='))
    .filter(flag => !flag.startsWith('--dev'));

const getFilesToTest = services => {
  if (services) {
    const servicesRegexp = services.replace(/,/g, '|');
    return `./src/integration/${SERVICES_TESTS_DIR}/(${servicesRegexp})/.+?`;
  }
  return `./src/integration/${SERVICES_TESTS_DIR}/.+?`;
};

const filesToTest = getFilesToTest(argv.services);

const stopApp = () =>
  new Promise(resolve => {
    const child = exec('npm run stop');

    child.on('exit', resolve);
  });

const buildApp = () =>
  new Promise(resolve => {
    const child = exec('npm run build:local');

    child.on('exit', resolve);
  });

const startApp = () => {
  return new Promise(resolve => {
    const child = exec(
      `npm run ${
        isDev ? 'dev' : 'start'
      } & ./node_modules/.bin/wait-on -t 20000 http://localhost:7080/status`,
    );

    child.on('exit', resolve);
  });
};

const runTests = () =>
  new Promise(resolve => {
    const child = spawn(
      'jest',
      [filesToTest, '--runInBand', '--colors', ...getJestArgs()],
      { stdio: 'inherit' },
    );

    child.on('exit', resolve);
  });

const spinner = ora('Creating test files').start();
writeTestFiles();

if (isCI) {
  runTests();
} else {
  stopApp()
    .then(() => {
      if (isDev) return Promise.resolve();

      spinner.text = 'Building app';
      return buildApp();
    })
    .then(() => {
      spinner.text = isDev ? 'Starting app in developer mode' : 'Starting app';
      return startApp();
    })
    .then(
      () =>
        new Promise(resolve => {
          spinner.text = 'Running tests';
          setTimeout(() => {
            spinner.stop();
            resolve();
          }, 2000);
        }),
    )
    .then(runTests)
    .then(stopApp);
}
