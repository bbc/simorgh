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
    const bundleSizes = jsFiles
      .filter(fileName => fileName.includes(bundleName))
      .map(fileName => getFileSize(`build/public/static/js/${fileName}`))
      .map(sizeInBytes => Math.round(sizeInBytes / 1000));

    const totalBundleSizes = bundleSizes.reduce(
      (totalKB, fileSizeInKB) => totalKB + fileSizeInKB,
      0,
    );

    return [bundleName, bundleSizes.join(', '), totalBundleSizes];
  });
};

const createConsoleError = (service, size, adjective) =>
  [
    chalk.red('Bundle size for'),
    chalk.red.bold(service),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red("Please update thresholds in './scripts/bundleSizeConfig.js'"),
  ].join(' ');

const mainBundleData = getBundleData(/^main/);
const vendorBundleData = getBundleData(/^vendor/);
const pageBundleData = getBundleData(/.+Page/);
const commonBundlesData = getBundleData(/^common/);
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

console.log('');
const spinner = ora({
  text: 'Analysing bundles...',
  color: 'magenta',
});
spinner.start();

const serviceBundlesTable = new Table({
  head: [
    'Service name',
    'Service bundle sizes (kB)',
    'Total service bundle sizes (kB)',
    'Main bundle size (kB)',
    'Vendor bundle size (kB)',
    'Total bundles size for service (kB)',
  ],
});

const tableHead = [
  'Bundle name',
  'Bundle sizes (kB)',
  'Total bundles size (kB)',
];

const mainBundlesTable = new Table({
  head: tableHead,
});

const vendorBundlesTable = new Table({
  head: tableHead,
});

const pageBundlesTable = new Table({
  head: tableHead,
});

const commonBundlesTable = new Table({
  head: tableHead,
});

const summaryTable = new Table({
  head: [
    'Average total bundle size (kB)',
    'Smallest total bundle size (kB)',
    'Largest total bundle size (kB)',
  ],
});

const sortByTotalAscending = bundlesData =>
  bundlesData.sort((a, b) => {
    const total1 = a[a.length - 1];
    const total2 = b[b.length - 1];

    return total1 - total2;
  });

sortByTotalAscending(serviceBundleData).forEach(bundle =>
  serviceBundlesTable.push(bundle),
);
mainBundleData.forEach(bundle => mainBundlesTable.push(bundle));
vendorBundleData.forEach(bundle => vendorBundlesTable.push(bundle));
sortByTotalAscending(pageBundleData).forEach(bundle =>
  pageBundlesTable.push(bundle),
);
commonBundlesData.forEach(bundle => commonBundlesTable.push(bundle));

summaryTable.push([averageBundleSize, smallestBundleSize, largestBundleSize]);

console.log('\n\nResults');
console.log(serviceBundlesTable.toString());
console.log(mainBundlesTable.toString());
console.log(vendorBundlesTable.toString());
console.log(pageBundlesTable.toString());
console.log(commonBundlesTable.toString());
console.log(summaryTable.toString());

const errors = serviceBundlesTotals
  .map((size, index) => {
    const serviceName = serviceBundleData[index][0];
    if (size < MIN_SIZE) {
      return createConsoleError(serviceName, size, 'small');
    }

    if (size > MAX_SIZE) {
      return createConsoleError(serviceName, size, 'large');
    }
    return undefined;
  })
  .filter(Boolean);

if (errors.length) {
  spinner.fail('Issues with service bundles: ');
  errors.forEach(err => console.error(err));
  throw new Error();
} else {
  spinner.succeed('All bundle sizes are good!');
}
