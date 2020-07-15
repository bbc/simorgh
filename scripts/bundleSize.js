#! /usr/bin/env node
/* eslint-disable no-console */

const ora = require('ora');
const fs = require('fs');
const chalk = require('chalk');
const Table = require('cli-table');

// need fake Cypress in global scope to require service configs:
global.Cypress = { env: () => ({}) };
const cypressServiceConfigs = require('../cypress/support/config/services');

const services = Object.keys(cypressServiceConfigs);
const { MIN_SIZE, MAX_SIZE } = require('./bundleSizeConfig');

const jsFiles = fs
  .readdirSync('build/public/static/js')
  .filter(fileName => fileName.endsWith('.js'));

const getFileSize = filePath => fs.statSync(filePath).size;

const getBundleData = _fileName => {
  const filenames = jsFiles.filter(fileName => fileName.match(_fileName));

  const bundleNames = filenames.map(fileName =>
    fileName.replace(/(?<=\w)-.+$/, ''),
  );

  const groupedBundlesNames = [...new Set(bundleNames)];

  return groupedBundlesNames.map(bundleName => {
    const sizesInBytes = jsFiles
      .filter(fileName => fileName.includes(bundleName))
      .map(fileName => getFileSize(`build/public/static/js/${fileName}`))
      .map(sizeInBytes => Math.round(sizeInBytes / 1000));

    const totalBundleSizes = sizesInBytes.reduce(
      (totalKB, fileSizeInKB) => totalKB + fileSizeInKB,
      0,
    );

    return [bundleName, sizesInBytes.join(', '), totalBundleSizes];
  });
};

const mainBundleData = getBundleData(/^main/);
const vendorBundleData = getBundleData(/^vendor/);
const pageBundleData = getBundleData(/.+Page/);
const serviceBundleData = services
  .map(service => getBundleData(new RegExp(`^${service}`)))
  .filter(service => service.length)
  .map(([[serviceBundleName, serviceBundlesSizes, totalServiceBundleSize]]) => [
    serviceBundleName,
    serviceBundlesSizes,
    totalServiceBundleSize,
    mainBundleData[0][2],
    vendorBundleData[0][2],
    totalServiceBundleSize + mainBundleData[0][2] + vendorBundleData[0][2],
  ]);

const serviceBundlesTotals = serviceBundleData.map(service => service[5]);
const averageBundleSize = serviceBundlesTotals.reduce(
  (acc, currentValue, currentIndex, array) => {
    const isLastItem = currentIndex === array.length - 1;
    const total = acc + currentValue;
    if (isLastItem) {
      return Math.round(total / array.length);
    }
    return total;
  },
  0,
);
const smallestBundleSize = Math.min(...serviceBundlesTotals);
const largestBundleSize = Math.max(...serviceBundlesTotals);

const createConsoleError = (service, size, adjective) =>
  [
    chalk.red('Bundle size for'),
    chalk.red.bold(service),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red("Please update thresholds in './scripts/bundleSizeConfig.js'"),
  ].join(' ');

console.log('');
const spinner = ora({
  text: 'Analysing bundles...',
  color: 'magenta',
});
spinner.start();

const serviceBundlesTable = new Table({
  head: [
    'Service name',
    'Service bundle sizes',
    'Total service bundle sizes',
    'Main bundle size',
    'Vendor bundle size',
    'Total bundles size for service',
  ],
});

const tableHead = ['Bundle name', 'Bundle sizes', 'Total bundles size'];

const mainBundlesTable = new Table({
  head: tableHead,
});

const vendorBundlesTable = new Table({
  head: tableHead,
});

const pageBundlesTable = new Table({
  head: tableHead,
});

const overviewTable = new Table({
  head: [
    'Average total bundle size',
    'Smallest total bundle size',
    'Largest total bundle size',
  ],
});

serviceBundleData.forEach(bundle => serviceBundlesTable.push(bundle));
mainBundleData.forEach(bundle => mainBundlesTable.push(bundle));
vendorBundleData.forEach(bundle => vendorBundlesTable.push(bundle));
pageBundleData.forEach(bundle => pageBundlesTable.push(bundle));
overviewTable.push([averageBundleSize, smallestBundleSize, largestBundleSize]);

const errors = serviceBundlesTotals
  .map((size, index) => {
    if (size < MIN_SIZE) {
      return createConsoleError(serviceBundleData[index][0], size, 'small');
    }

    if (size > MAX_SIZE) {
      return createConsoleError(serviceBundleData[index][0], size, 'large');
    }
    return undefined;
  })
  .filter(Boolean);

console.log('\n\nResults');
console.log(serviceBundlesTable.toString());
console.log(mainBundlesTable.toString());
console.log(vendorBundlesTable.toString());
console.log(pageBundlesTable.toString());
console.log(overviewTable.toString());

if (errors.length) {
  spinner.fail('Issues with service bundles: ');
  errors.forEach(err => console.error(err));
  throw new Error();
} else {
  spinner.succeed('All bundle sizes are good!');
}
