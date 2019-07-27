#! /usr/bin/env node

const ora = require('ora');
const fs = require('fs');
const chalk = require('chalk');

// Size limit for all bundles used by each service (K)
// Keep these +/- 5K and update frequently!
const MIN = 564;
const MAX = 582;

const jsFiles = fs
  .readdirSync('build/public/static/js')
  .filter(fileName => fileName.endsWith('.js'));

const services = jsFiles
  .filter(
    fileName => !(fileName.startsWith('main') || fileName.startsWith('vendor')),
  )
  .map(fileName => {
    const matches = fileName.match(/([a-z]+)-\w+.\w+.js/);
    if (Array.isArray(matches) && matches.length >= 2) {
      return matches[1];
    }
    throw new Error(
      `Unexpectedly formatted filename in "build/public/static/js": ${fileName}`,
    );
  });

const getFileSize = filePath => fs.statSync(filePath).size;
const getTotalSizeOfFilesBeginningWith = string => {
  const sizeInBytes = jsFiles
    .filter(fileName => fileName.startsWith(string))
    .map(fileName => getFileSize(`build/public/static/js/${fileName}`))
    .reduce((totalKB, fileSizeInKB) => totalKB + fileSizeInKB, 0);
  return Math.round(sizeInBytes / 1000);
};

const mainBundleSize = getTotalSizeOfFilesBeginningWith('main');
const vendorBundleSize = getTotalSizeOfFilesBeginningWith('vendor');

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
    chalk.red("Please update thresholds in './scripts/bundleSize.js'"),
  ].join(' ');

const mapSizeToError = (service, size) => {
  if (size < MIN) {
    return createConsoleError(service, size, 'small');
  }
  if (size > MAX) {
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
  {
    name: `Smallest bundle`,
    ...smallestBundle,
  },
  {
    name: `Largest bundle`,
    ...largestBundle,
  },
  { name: 'Average bundle', size: Math.round(totalSize / services.length) },
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
