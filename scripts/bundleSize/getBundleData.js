import { statSync, readdirSync } from 'fs';
import { extractBundlesForPageType } from './pageTypeBundleExtractor.js';

// need fake Cypress in global scope to require service configs:
global.Cypress = { env: () => ({}) };
const bundleType = process.env.bundleType || 'modern';
import cypressServiceConfigs from '../../cypress/support/config/services.js';
import { pages } from './pages.js';

const services = Object.keys(cypressServiceConfigs);

const getFileSize = filePath => statSync(filePath).size;

const jsFiles = readdirSync('build/public/static/js').filter(fileName =>
  fileName.endsWith('.js'),
);

const getBundlesData = bundles =>
  bundles.map(name => {
    const sizeInBytes = getFileSize(`build/public/static/js/${name}`);
    const size = Math.round(sizeInBytes / 1024);

    return {
      name,
      size,
      sizeInBytes,
    };
  });

const getPageBundleData = () => {
  const main = getBundlesData(
    jsFiles.filter(fileName => fileName.startsWith(`${bundleType}.main-`)),
  );
  const framework = getBundlesData(
    jsFiles.filter(fileName => fileName.startsWith(`${bundleType}.framework`)),
  );
  const mainTotalSize = main.reduce((acc, { size }) => acc + size, 0);
  const frameworkTotalSize = framework.reduce((acc, { size }) => acc + size, 0);

  const mainTotalSizeInBytes = main.reduce(
    (acc, { sizeInBytes }) => acc + sizeInBytes,
    0,
  );
  const frameworkTotalSizeInBytes = framework.reduce(
    (acc, { sizeInBytes }) => acc + sizeInBytes,
    0,
  );

  return pages.map(pageName => {
    const bundles = extractBundlesForPageType(pageName);
    const bundlesData = getBundlesData(bundles);

    return bundlesData.reduce(
      (
        { lib, shared, page, commons, totalSize, totalSizeInBytes, ...rest },
        { name, size, sizeInBytes },
      ) => {
        const bundleData = { name, size, sizeInBytes };
        const isShared = new RegExp(`^${bundleType}\\.shared-`).test(name);
        const isLib = new RegExp(`^${bundleType}\\..+?-lib`).test(name);
        const isCommons = new RegExp(`^${bundleType}\\.commons-`).test(name);

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
          totalSizeInBytes: totalSizeInBytes + sizeInBytes,
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
        totalSizeInBytes: mainTotalSizeInBytes + frameworkTotalSizeInBytes,
        totalSize: mainTotalSize + frameworkTotalSize,
      },
    );
  });
};

const getServiceConfigBundleData = () =>
  services
    .map(service => {
      const bundlesData = getBundlesData(
        jsFiles.filter(file => file.startsWith(`${bundleType}.${service}`)),
      );

      return { serviceName: service, bundles: bundlesData };
    })
    .filter(({ bundles }) => bundles.length)
    .map(({ serviceName, bundles }) => ({
      serviceName,
      bundles,
      totalSize: bundles.reduce((acc, { size }) => acc + size, 0),
      totalSizeInBytes: bundles.reduce(
        (acc, { sizeInBytes }) => acc + sizeInBytes,
        0,
      ),
    }));

const getServiceThemeBundleData = () =>
  services
    .map(service => {
      const bundlesData = getBundlesData(
        jsFiles.filter(file =>
          file.startsWith(`${bundleType}.themes-${service}`),
        ),
      );

      return { serviceName: service, bundles: bundlesData };
    })
    .filter(({ bundles }) => bundles.length)
    .map(({ serviceName, bundles }) => ({
      serviceName,
      bundles,
      totalSize: bundles.reduce((acc, { size }) => acc + size, 0),
      totalSizeInBytes: bundles.reduce(
        (acc, { sizeInBytes }) => acc + sizeInBytes,
        0,
      ),
    }));

const _getPageBundleData = getPageBundleData;
export { _getPageBundleData as getPageBundleData };
const _getServiceConfigBundleData = getServiceConfigBundleData;
export { _getServiceConfigBundleData as getServiceConfigBundleData };
const _getServiceThemeBundleData = getServiceThemeBundleData;
export { _getServiceThemeBundleData as getServiceThemeBundleData };
