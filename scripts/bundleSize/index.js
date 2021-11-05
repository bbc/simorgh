#! /usr/bin/env node
/* eslint-disable no-console */

const ora = require('ora');
const chalk = require('chalk');
const Table = require('cli-table');
const sortByBundlesTotalAscending = require('./sortByBundlesTotalAscending');
const getAverageBundleSize = require('./getAverageBundleSize');
const createConsoleError = require('./createConsoleError');
const { getPageBundleData, getServiceBundleData } = require('./getBundleData');
const { MIN_SIZE, MAX_SIZE } = require('./bundleSizeConfig');

const serviceBundleData = sortByBundlesTotalAscending(getServiceBundleData());
const serviceBundlesTotals = serviceBundleData.map(
  ({ totalSize }) => totalSize,
);

const smallestServiceBundleSize = Math.min(...serviceBundlesTotals);
const largestServiceBundleSize = Math.max(...serviceBundlesTotals);
const averageServiceBundleSize = getAverageBundleSize(serviceBundlesTotals);

const pageBundleData = sortByBundlesTotalAscending(getPageBundleData());

const pageBundlesTotals = pageBundleData.map(({ totalSize }) => totalSize);
const smallestPageBundleSize = Math.min(...pageBundlesTotals);
const largestPageBundleSize = Math.max(...pageBundlesTotals);
const averagePageBundleSize = getAverageBundleSize(pageBundlesTotals);

const largestPagePlusServiceBundleSize =
  largestServiceBundleSize + largestPageBundleSize;
const smallestPagePlusServiceBundleSize =
  smallestServiceBundleSize + smallestPageBundleSize;

const serviceBundlesTable = new Table({
  head: ['Service name', 'bundles', 'Total size (kB)'],
});

const pageBundlesTable = new Table({
  head: [
    'Page type',
    'main',
    'framework',
    'lib',
    'shared',
    'commons',
    'page',
    'Total size (kB)',
  ],
});

pageBundleData.forEach(
  ({ pageName, main, framework, lib, shared, commons, page, totalSize }) => {
    const getFileInfo = ({ name, size }) =>
      `${name.slice(0, 10)}…${name.slice(-6)} (${size}kB)`;

    pageBundlesTable.push([
      pageName,
      main.map(getFileInfo).join('\n'),
      framework.map(getFileInfo).join('\n'),
      lib.map(getFileInfo).join('\n'),
      shared.map(getFileInfo).join('\n'),
      commons.map(getFileInfo).join('\n'),
      page.map(getFileInfo).join('\n'),
      totalSize,
    ]);
  },
);

serviceBundleData.forEach(({ serviceName, bundles, totalSize }) => {
  const getFileInfo = ({ name, size }) => `${name} (${size}kB)`;

  serviceBundlesTable.push([
    serviceName,
    bundles.map(getFileInfo).join('\n'),
    totalSize,
  ]);
});

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
  const service = serviceBundleData[0].serviceName;
  const pageType = pageBundleData[0].pageName;
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
  const service = serviceBundleData[serviceBundleData.length - 1].serviceName;
  const pageType = pageBundleData[pageBundleData.length - 1].pageName;
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
