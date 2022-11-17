#! /usr/bin/env node
/* eslint-disable no-console */

const ora = require('ora');
const chalk = require('chalk');
const Table = require('cli-table');
const sortByBundlesTotalAscending = require('./sortByBundlesTotalAscending');
const getAverageBundleSize = require('./getAverageBundleSize');
const createConsoleError = require('./createConsoleError');
const {
  getPageBundleData,
  getServiceConfigBundleData,
  getServiceThemeBundleData,
} = require('./getBundleData');
const { MIN_SIZE, MAX_SIZE } = require('./bundleSizeConfig');

const bundleType = process.env.bundleType || 'modern';
const serviceConfigBundleData = sortByBundlesTotalAscending(
  getServiceConfigBundleData(),
);
const serviceThemeBundleData = sortByBundlesTotalAscending(
  getServiceThemeBundleData(),
);
const serviceConfigBundlesTotals = serviceConfigBundleData.map(
  ({ totalSize }) => totalSize,
);
const serviceThemeBundlesTotals = serviceThemeBundleData.map(
  ({ totalSize }) => totalSize,
);
const smallestServiceConfigBundleSize = Math.min(...serviceConfigBundlesTotals);
const largestServiceConfigBundleSize = Math.max(...serviceConfigBundlesTotals);
const averageServiceConfigBundleSize = getAverageBundleSize(
  serviceConfigBundlesTotals,
);

const smallestServiceThemeBundleSize = Math.min(...serviceThemeBundlesTotals);
const largestServiceThemeBundleSize = Math.max(...serviceThemeBundlesTotals);
const averageServiceThemeBundleSize = getAverageBundleSize(
  serviceThemeBundlesTotals,
);

const pageBundleData = sortByBundlesTotalAscending(getPageBundleData());

const pageBundlesTotals = pageBundleData.map(({ totalSize }) => totalSize);
const smallestPageBundleSize = Math.min(...pageBundlesTotals);
const largestPageBundleSize = Math.max(...pageBundlesTotals);
const averagePageBundleSize = getAverageBundleSize(pageBundlesTotals);

const largestPagePlusServiceBundleSize =
  largestServiceConfigBundleSize +
  largestServiceThemeBundleSize +
  largestPageBundleSize;
const smallestPagePlusServiceBundleSize =
  smallestServiceConfigBundleSize +
  smallestServiceThemeBundleSize +
  smallestPageBundleSize;

const removeBundleTypePrefix = name => name.replace(`${bundleType}.`, '');

const serviceConfigBundlesTable = new Table({
  head: ['Service name', 'bundles', 'Total size (Bytes)', 'Total size (kB)'],
});

const serviceThemeBundlesTable = new Table({
  head: ['Service name', 'bundles', 'Total size (Bytes)', 'Total size (kB)'],
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
    'Total size (Bytes)',
    'Total size (kB)',
  ],
});

pageBundleData.forEach(
  ({
    pageName,
    main,
    framework,
    lib,
    shared,
    commons,
    page,
    totalSizeInBytes,
    totalSize,
  }) => {
    const getFileInfo = ({ name, size }) =>
      `${removeBundleTypePrefix(name).slice(0, 10)}…${name.slice(
        -6,
      )} (${size}kB)`;

    pageBundlesTable.push([
      pageName,
      main.map(getFileInfo).join('\n'),
      framework.map(getFileInfo).join('\n'),
      lib.map(getFileInfo).join('\n'),
      shared.map(getFileInfo).join('\n'),
      commons.map(getFileInfo).join('\n'),
      page.map(getFileInfo).join('\n'),
      totalSizeInBytes,
      totalSize,
    ]);
  },
);

serviceConfigBundleData.forEach(
  ({ serviceName, bundles, totalSizeInBytes, totalSize }) => {
    const getFileInfo = ({ name, size }) =>
      `${removeBundleTypePrefix(name)} (${size}kB)`;

    serviceConfigBundlesTable.push([
      serviceName,
      bundles.map(getFileInfo).join('\n'),
      totalSizeInBytes,
      totalSize,
    ]);
  },
);

serviceThemeBundleData.forEach(
  ({ serviceName, bundles, totalSizeInBytes, totalSize }) => {
    const getFileInfo = ({ name, size }) =>
      `${removeBundleTypePrefix(name)} (${size}kB)`;

    serviceThemeBundlesTable.push([
      serviceName,
      bundles.map(getFileInfo).join('\n'),
      totalSizeInBytes,
      totalSize,
    ]);
  },
);

const pageSummaryTable = new Table();
pageSummaryTable.push(
  { 'Smallest total bundle size (kB)': smallestPageBundleSize },
  { 'Largest total bundle size (kB)': largestPageBundleSize },
  { 'Average total bundle size (kB)': averagePageBundleSize },
);

const serviceSummaryTable = new Table();
serviceSummaryTable.push(
  { 'Smallest total bundle size (kB)': smallestServiceConfigBundleSize },
  { 'Largest total bundle size (kB)': largestServiceConfigBundleSize },
  { 'Average total bundle size (kB)': averageServiceConfigBundleSize },
);
const serviceThemeSummaryTable = new Table();
serviceThemeSummaryTable.push(
  { 'Smallest total bundle size (kB)': smallestServiceThemeBundleSize },
  { 'Largest total bundle size (kB)': largestServiceThemeBundleSize },
  { 'Average total bundle size (kB)': averageServiceThemeBundleSize },
);

const servicePageSummaryTable = new Table();
servicePageSummaryTable.push(
  {
    'Smallest total bundle size (kB) (smallest service + smallest page)':
      smallestPagePlusServiceBundleSize,
  },
  {
    'Largest total bundle size (kB) (largest service + largest page)':
      largestPagePlusServiceBundleSize,
  },
);

const styledBundleTypeTitle = chalk.green(bundleType.toUpperCase());
const spinner = ora({
  text: 'Analysing bundles...',
  color: 'magenta',
});
spinner.start();
console.log(chalk.bold('\n\nResults'));

console.log(
  chalk.bold(`\n${styledBundleTypeTitle} service config bundle sizes\n`),
);
console.log(serviceConfigBundlesTable.toString());
console.log(
  chalk.bold(
    `\n\n${styledBundleTypeTitle} service config bundle sizes summary\n`,
  ),
);
console.log(serviceSummaryTable.toString());

console.log(
  chalk.bold(`\n${styledBundleTypeTitle} service theme bundle sizes\n`),
);
console.log(serviceThemeBundlesTable.toString());
console.log(
  chalk.bold(
    `\n\n${styledBundleTypeTitle} service theme bundle sizes summary\n`,
  ),
);
console.log(serviceThemeSummaryTable.toString());

console.log(
  chalk.bold(`\n\n${styledBundleTypeTitle} page type bundle sizes\n`),
);
console.log(pageBundlesTable.toString());

console.log(
  [
    chalk.bold(`\n\n${styledBundleTypeTitle} page bundle sizes summary`),
    chalk.cyan.bold('(excludes service bundle)\n'),
  ].join(' '),
);
console.log(pageSummaryTable.toString());

console.log(
  chalk.bold(
    `\n\n${styledBundleTypeTitle} service config & theme + page bundle sizes summary\n`,
  ),
);
console.log(servicePageSummaryTable.toString());

const errors = [];

if (smallestPagePlusServiceBundleSize < MIN_SIZE) {
  const service = serviceConfigBundleData[0].serviceName;
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
  const service =
    serviceConfigBundleData[serviceConfigBundleData.length - 1].serviceName;
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
