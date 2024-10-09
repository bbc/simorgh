/* eslint-disable no-console */

const { exec, spawn } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const onlyRunTests = Boolean(argv.onlyRunTests);
const isDev = Boolean(argv.dev);
process.env.DEV_MODE = isDev;

const getJestArgs = () =>
  process.argv
    .slice(2)
    .filter(flag => !flag.startsWith('--pageTypes='))
    .filter(flag => !flag.startsWith('--dev'))
    .filter(flag => !flag.startsWith('--onlyRunTests'))
    .filter(flag => !flag.startsWith('--nextJS'));

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
  const portNumber = argv.nextJS ? 7081 : 7080;
  return new Promise(resolve => {
    const child = exec(
      `yarn ${
        isDev ? 'dev' : 'start'
      } & ./node_modules/.bin/wait-on -t 20000 http://localhost:${portNumber}/status`,
    );

    child.on('exit', resolve);
  });
};

const runExpressTests = () =>
  spawn(
    'jest',
    [filesToTest, '--runInBand', '--colors', '--verbose', ...getJestArgs()],
    {
      stdio: 'inherit',
    },
  );

const runNextJSTests = () =>
  spawn('yarn', ['test:integration', '--verbose', ...getJestArgs()], {
    stdio: 'inherit',
  });

const runTests = () =>
  new Promise((resolve, reject) => {
    const child = argv.nextJS ? runNextJSTests() : runExpressTests();

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
  if (argv.nextJS) {
    const nextAppDir = path.join(path.resolve(), 'ws-nextjs-app');
    process.chdir(nextAppDir);
  }

  stopApp()
    .then(() => {
      if (isDev) return Promise.resolve();

      console.log('Building app...');
      return buildApp();
    })
    .then(() => {
      const text = isDev
        ? 'Starting app in developer mode...'
        : 'Starting app...';

      console.log(text);
      return startApp();
    })
    .then(
      () =>
        new Promise(resolve => {
          console.log('Running tests...');
          setTimeout(() => {
            resolve();
          }, 2000);
        }),
    )
    .then(runTests)
    .then(async () => {
      await stopApp();
      process.exit(0);
    })
    .catch(async () => {
      await stopApp();
      process.exit(1);
    });
}
