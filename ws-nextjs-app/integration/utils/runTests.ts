/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// @ts-nocheck
import { exec, spawn } from 'child_process';
import path, { join } from 'path';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

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
  const pathname = argv.nextJS ? '' : '/status';

  const statusCommand = `sleep 20 && curl http://localhost:${portNumber}${pathname}`;
  const initialCommand = `yarn ${isDev ? 'dev' : 'start'}`;
  let errorMsg = '';

  return new Promise((resolve, reject) => {
    exec(initialCommand, error => {
      if (error) {
        errorMsg = error;
      }
    });

    exec(statusCommand, error => {
      if (error) {
        reject(new Error(errorMsg));
      }
      resolve();
    });
  });
};

const runExpressTests = () =>
  spawn(
    'jest',
    [
      filesToTest,
      '--runInBand',
      '--colors',
      '--detectOpenHandles',
      '--forceExit',
      '--passWithNoTests', // Allows the test suite to pass now all page types are migrated to NextJS
      ...getJestArgs(),
    ],
    {
      stdio: 'inherit',
    },
  );

const runNextJSTests = () =>
  spawn(
    'yarn',
    [
      'test:integration',
      '--detectOpenHandles',
      '--forceExit',
      ...getJestArgs(),
    ],
    {
      stdio: 'inherit',
    },
  );

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
    const nextAppDir = join(path.resolve(), 'ws-nextjs-app');
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
    .catch(async error => {
      console.log(
        'Running /integration/utils/runTests/index.ts returned an error => \n',
        error,
      );
      await stopApp();
      process.exit(1);
    });
}
