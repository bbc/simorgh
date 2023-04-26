/* eslint-disable no-console */

const { exec, spawn } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));
const ora = require('ora');

const onlyRunTests = Boolean(argv.onlyRunTests);
const isDev = Boolean(argv.dev);
process.env.DEV_MODE = isDev;

const getJestArgs = () =>
  process.argv
    .slice(2)
    .filter(flag => !flag.startsWith('--pageTypes='))
    .filter(flag => !flag.startsWith('--dev'))
    .filter(flag => !flag.startsWith('--onlyRunTests'));

const getFilesToTest = pageTypes => {
  if (pageTypes) {
    const pageTypesRegexp = pageTypes.replace(/,/g, '|');
    return `./src/integration/pages/(${pageTypesRegexp})/.+?`;
  }
  return `./src/integration/pages/.+?`;
};

const filesToTest = getFilesToTest(argv.pageTypes);

const stopApp = () =>
  new Promise(resolve => {
    const child = exec('yarn stop');

    child.on('exit', resolve);
  });

const buildApp = () =>
  new Promise(resolve => {
    const child = exec('yarn build:local');

    child.on('exit', resolve);
  });

const startApp = () => {
  return new Promise(resolve => {
    const child = exec(
      `yarn ${
        isDev ? 'dev' : 'start'
      } & ./node_modules/.bin/wait-on -t 20000 http://localhost:7080/status`,
    );

    child.on('exit', resolve);
  });
};

const runTests = () =>
  new Promise((resolve, reject) => {
    const child = spawn(
      'jest',
      [filesToTest, '--runInBand', '--colors', ...getJestArgs()],
      { stdio: 'inherit' },
    );
    child.on('exit', code => {
      if (code === 1) {
        reject();
      } else {
        resolve();
      }
    });
  });

if (onlyRunTests) {
  runTests().catch(() => {
    process.exit(1);
  });
} else {
  const spinner = ora().start();

  stopApp()
    .then(() => {
      if (isDev) return Promise.resolve();

      spinner.text = 'Building app...';
      return buildApp();
    })
    .then(() => {
      spinner.text = isDev
        ? 'Starting app in developer mode...'
        : 'Starting app...';
      return startApp();
    })
    .then(
      () =>
        new Promise(resolve => {
          spinner.text = 'Running tests...';
          setTimeout(() => {
            spinner.stop();
            resolve();
          }, 2000);
        }),
    )
    .then(runTests)
    .then(stopApp)
    .catch(async () => {
      await stopApp();
      process.exit(1);
    });
}
