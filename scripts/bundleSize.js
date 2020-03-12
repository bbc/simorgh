#! /usr/bin/env node

const ora = require('ora');
const fs = require('fs');
const chalk = require('chalk');

// need fake Cypress in global scope to require service configs:
global.Cypress = { env: () => ({}) };
const cypressServiceConfigs = require('../cypress/support/config/services');

const services = Object.keys(cypressServiceConfigs);
const { MIN_SIZE, MAX_SIZE } = require('./bundleSizeConfig');

const jsFiles = fs
  .readdirSync('build/public/static/js')
  .filter(fileName => fileName.endsWith('.js'));

const getFileSize = filePath => fs.statSync(filePath).size;
const getTotalSizeOfFilesBeginningWith = string => {
  const sizeInBytes = jsFiles
    .filter(fileName => fileName.startsWith(string))
    .map(fileName => getFileSize(`build/public/static/js/${fileName}`))
    .reduce((totalKB, fileSizeInKB) => totalKB + fileSizeInKB, 0);
  return Math.round(sizeInBytes / 1000);
};
const getSizesOfFilesThatMatch = regex =>
  jsFiles
    .filter(fileName => fileName.match(regex))
    .map(fileName => ({
      name: fileName.replace(/(?<=\w)-.+$/, ' bundle'),
      size: Math.round(
        getFileSize(`build/public/static/js/${fileName}`) / 1000,
      ),
    }));

const mainBundleSize = getTotalSizeOfFilesBeginningWith('main');
const vendorBundleSize = getTotalSizeOfFilesBeginningWith('vendor');
const pageBundleSizes = getSizesOfFilesThatMatch(/.+Page/);

const getServiceBundleSize = service =>
  mainBundleSize + vendorBundleSize + getTotalSizeOfFilesBeginningWith(service);

const capitaliseFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const createConsoleError = (service, size, adjective) =>
  [
    chalk.red('Bundle size for'),
    chalk.red.bold(capitaliseFirstLetter(service)),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red("Please update thresholds in './scripts/bundleSizeConfig.js'"),
  ].join(' ');

const mapSizeToError = (service, size) => {
  if (size < MIN_SIZE) {
    return createConsoleError(service, size, 'small');
  }
  if (size > MAX_SIZE) {
    return createConsoleError(service, size, 'large');
  }
  return undefined;
};

console.log(''); // eslint-disable-line no-console
const spinner = ora({
  text: 'Analysing bundles...',
  color: 'magenta',
});
spinner.start();

let totalSize = 0;
let smallestBundle;
let largestBundle;

const errors = services
  .map(service => {
    const size = getServiceBundleSize(service);

    totalSize += size;

    if (!smallestBundle || size < smallestBundle.size) {
      smallestBundle = { service, size };
    }

    if (!largestBundle || size > largestBundle.size) {
      largestBundle = { service, size };
    }

    return mapSizeToError(service, size);
  })
  .filter(item => !!item);

if (errors.length) {
  spinner.fail('Issues with service bundles: ');
  errors.forEach(err => console.error(err)); // eslint-disable-line no-console
  throw new Error();
} else {
  spinner.succeed('All bundle sizes are good!');
}

const bundlesToLog = [
  {
    name: 'Main bundle',
    size: mainBundleSize,
  },
  {
    name: 'Vendor bundle',
    size: vendorBundleSize,
  },
  ...pageBundleSizes,
  {
    name: `Smallest service bundle`,
    ...smallestBundle,
  },
  {
    name: `Largest service bundle`,
    ...largestBundle,
  },
  {
    name: 'Average service bundle',
    size: Math.round(totalSize / services.length),
  },
];

const maxSizeDigits = 5;
const formatSize = size =>
  `${' '.repeat(maxSizeDigits - size.toString().length)} ${size} kB  `;

const logBundle = ({ name, size, service }) =>
  // eslint-disable-next-line no-console
  console.log(
    [
      chalk.green(formatSize(size)),
      name,
      service ? `- ${capitaliseFirstLetter(service)}` : '',
    ].join(' '),
  );

console.log('\nBundle size summary:\n'); // eslint-disable-line no-console
bundlesToLog.forEach(bundleData => {
  logBundle(bundleData);
});
