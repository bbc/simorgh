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
    .filter(flag => !flag.startsWith('--onlyRunTests'));

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
  const statusCommand = `sleep 20 && curl http://localhost:${7081}`;
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
    const child = runNextJSTests();

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
  const nextAppDir = join(path.resolve(), 'ws-nextjs-app');
  process.chdir(nextAppDir);

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
