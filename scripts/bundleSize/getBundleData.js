const fs = require('fs');
const { extractBundlesForPageType } = require('./pageTypeBundleExtractor');

// need fake Cypress in global scope to require service configs:
global.Cypress = { env: () => ({}) };
const cypressServiceConfigs = require('../../cypress/support/config/services');
const { pages } = require('./pages');

const services = Object.keys(cypressServiceConfigs);

const getFileSize = filePath => fs.statSync(filePath).size;

const jsFiles = fs
  .readdirSync('build/public/static/js')
  .filter(fileName => fileName.endsWith('.js'));

const getBundlesData = bundles => {
  return bundles.map(name => {
    const sizeInBytes = getFileSize(`build/public/static/js/${name}`);
    const size = Math.round(sizeInBytes / 1024);

    return {
      name,
      size,
    };
  });
};

const getPageBundleData = () => {
  const main = getBundlesData(
    jsFiles.filter(fileName => fileName.startsWith('main-')),
  );
  const framework = getBundlesData(
    jsFiles.filter(fileName => fileName.startsWith('framework-')),
  );
  const mainTotalSize = main.reduce((acc, { size }) => acc + size, 0);
  const frameworkTotalSize = framework.reduce((acc, { size }) => acc + size, 0);

  return pages.map(pageName => {
    const bundles = extractBundlesForPageType(pageName);
    const bundlesData = getBundlesData(bundles);

    return bundlesData.reduce(
      ({ lib, shared, page, commons, totalSize, ...rest }, { name, size }) => {
        const bundleData = { name, size };
        const isShared = name.startsWith('shared-');
        const isLib = name.includes('-lib-');
        const isCommons = name.includes('commons-');

        if (isLib) {
          lib.push(bundleData);
        } else if (isShared) {
          shared.push(bundleData);
        } else if (isCommons) {
          commons.push(bundleData);
        } else {
          page.push(bundleData);
        }
        return {
          ...rest,
          lib,
          shared,
          commons,
          page,
          totalSize: totalSize + size,
        };
      },
      {
        pageName,
        main,
        framework,
        lib: [],
        shared: [],
        commons: [],
        page: [],
        totalSize: mainTotalSize + frameworkTotalSize,
      },
    );
  });
};

const getServiceBundleData = () =>
  services
    .map(service => {
      const bundlesData = getBundlesData(
        jsFiles.filter(file => file.startsWith(service)),
      );

      return { serviceName: service, bundles: bundlesData };
    })
    .filter(({ bundles }) => bundles.length)
    .map(({ serviceName, bundles }) => ({
      serviceName,
      bundles,
      totalSize: bundles.reduce((acc, { size }) => acc + size, 0),
    }));

exports.getPageBundleData = getPageBundleData;
exports.getServiceBundleData = getServiceBundleData;
