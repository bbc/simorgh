#! /usr/bin/env node
/* eslint-disable no-console */

const ora = require('ora');
const fs = require('fs');
const chalk = require('chalk');
const Table = require('cli-table');
const sortByBundlesTotalAscending = require('./sortByBundlesTotalAscending');
const getAverageBundleSize = require('./getAverageBundleSize');
const createConsoleError = require('./createConsoleError');
const { getPageBundleData, getServiceBundleData } = require('./getBundleData');
const { MIN_SIZE, MAX_SIZE } = require('./bundleSizeConfig');

const jsFiles = fs
  .readdirSync('build/public/static/js')
  .filter(fileName => fileName.endsWith('.js'));
const serviceBundleData = getServiceBundleData(jsFiles);
const serviceBundlesTotals = serviceBundleData.map(
  pageBundles => pageBundles[2],
);
const smallestServiceBundleSize = Math.min(...serviceBundlesTotals);
const largestServiceBundleSize = Math.max(...serviceBundlesTotals);
const averageServiceBundleSize = getAverageBundleSize(serviceBundlesTotals);

const pageBundleData = getPageBundleData(jsFiles);
const pageBundlesTotals = pageBundleData.map(pageBundles => pageBundles[4]);
const smallestPageBundleSize = Math.min(...pageBundlesTotals);
const largestPageBundleSize = Math.max(...pageBundlesTotals);
const averagePageBundleSize = getAverageBundleSize(pageBundlesTotals);

const largestPagePlusServiceBundleSize =
  largestServiceBundleSize + largestPageBundleSize;
const smallestPagePlusServiceBundleSize =
  smallestServiceBundleSize + smallestPageBundleSize;

const serviceBundlesTable = new Table({
  head: [
    'Service name',
    'Service bundle sizes (kB)',
    'Total service bundle sizes (kB)',
  ],
});

const pageBundlesTable = new Table({
  head: [
    'Page type',
    'main bundles (kB)',
    'vendor bundles (kB)',
    'common bundles (kB)',
    'Total bundles size (kB)',
  ],
});

sortByBundlesTotalAscending(serviceBundleData).forEach(bundle =>
  serviceBundlesTable.push(bundle),
);
sortByBundlesTotalAscending(pageBundleData).forEach(bundle =>
  pageBundlesTable.push(bundle),
);

const pageSummaryTable = new Table();
pageSummaryTable.push(
  { 'Smallest total bundle size (kB)': smallestPageBundleSize },
  { 'Largest total bundle size (kB)': largestPageBundleSize },
  { 'Average total bundle size (kB)': averagePageBundleSize },
);

const serviceSummaryTable = new Table();
serviceSummaryTable.push(
  { 'Smallest total bundle size (kB)': smallestServiceBundleSize },
  { 'Largest total bundle size (kB)': largestServiceBundleSize },
  { 'Average total bundle size (kB)': averageServiceBundleSize },
);

const servicePageSummaryTable = new Table();
servicePageSummaryTable.push(
  {
    'Smallest total bundle size (kB) (smallest service + smallest page)': smallestPagePlusServiceBundleSize,
  },
  {
    'Largest total bundle size (kB) (largest service + largest page)': largestPagePlusServiceBundleSize,
  },
);

const spinner = ora({
  text: 'Analysing bundles...',
  color: 'magenta',
});
spinner.start();
console.log(chalk.bold('\n\nResults'));

console.log(chalk.bold('\nService bundles\n'));
console.log(serviceBundlesTable.toString());

console.log(chalk.bold('\n\nService bundles summary\n'));
console.log(serviceSummaryTable.toString());

console.log(chalk.bold('\n\nPage type bundles\n'));
console.log(pageBundlesTable.toString());

console.log(
  [
    chalk.bold('\n\nPage bundles summary'),
    chalk.cyan.bold('(excludes service bundle)\n'),
  ].join(' '),
);
console.log(pageSummaryTable.toString());

console.log(chalk.bold('\n\nService + Page bundles summary\n'));
console.log(servicePageSummaryTable.toString());

const errors = [];

if (smallestPagePlusServiceBundleSize < MIN_SIZE) {
  const service = serviceBundleData[0][0];
  const pageType = pageBundleData[0][0];
  errors.push(
    createConsoleError({
      service,
      pageType,
      size: smallestPagePlusServiceBundleSize,
      adjective: 'small',
    }),
  );
}

if (largestPagePlusServiceBundleSize > MAX_SIZE) {
  const service = serviceBundleData[serviceBundleData.length - 1][0];
  const pageType = pageBundleData[pageBundleData.length - 1][0];
  errors.push(
    createConsoleError({
      service,
      pageType,
      size: largestPagePlusServiceBundleSize,
      adjective: 'large',
    }),
  );
}

if (errors.length) {
  spinner.fail('Issues with service bundles: ');
  errors.forEach(err => console.error(err));
  throw new Error();
} else {
  spinner.succeed('All bundle sizes are good!');
}
