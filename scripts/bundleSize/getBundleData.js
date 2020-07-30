const fs = require('fs');
const { extractBundlesForPageType } = require('./pageTypeBundleExtractor');

// need fake Cypress in global scope to require service configs:
global.Cypress = { env: () => ({}) };
const cypressServiceConfigs = require('../../cypress/support/config/services');

const services = Object.keys(cypressServiceConfigs);

const pages = [
  'ArticlePage',
  'MediaAssetPage',
  'PhotoGalleryPage',
  'StoryPage',
  'FrontPage',
  'MostReadPage',
  'LiveRadioPage',
  'OnDemandRadioPage',
  'OnDemandTvPage',
];

const getFileSize = filePath => fs.statSync(filePath).size;

const getBundleData = ({ regex, jsFiles }) => {
  const filenames = jsFiles.filter(fileName => fileName.match(regex));

  const bundleSizes = filenames
    .map(fileName => getFileSize(`build/public/static/js/${fileName}`))
    .map(sizeInBytes => Math.round(sizeInBytes / 1024));

  return bundleSizes;
};

const getTotalBundleSizes = sizes =>
  sizes.reduce((totalKB, fileSizeInKB) => totalKB + fileSizeInKB, 0);

const getPageBundleData = jsFiles => {
  return pages.map(pageName => {
    const pageBundleRegex = extractBundlesForPageType(pageName).reduce(
      (acc, file) => {
        return acc ? `${file}|${acc}` : file;
      },
    );
    const mainBundleData = getBundleData({
      regex: `^main`,
      jsFiles,
    });
    const vendorBundleData = getBundleData({
      regex: `^vendor`,
      jsFiles,
    });
    const pageBundleData = getBundleData({
      regex: pageBundleRegex,
      jsFiles,
    });

    const totalBundleSizes = getTotalBundleSizes([
      ...mainBundleData,
      ...vendorBundleData,
      ...pageBundleData,
    ]);

    return [
      pageName,
      mainBundleData.join(', '),
      vendorBundleData.join(', '),
      pageBundleData.join(', '),
      totalBundleSizes,
    ];
  });
};

const getServiceBundleData = jsFiles =>
  services
    .map(service => {
      const serviceBundleData = getBundleData({
        jsFiles,
        regex: new RegExp(`^${service}`),
      });

      return { service, serviceBundleData };
    })
    .filter(({ serviceBundleData }) => serviceBundleData.length)
    .map(({ service, serviceBundleData }) => {
      const totalBundleSizes = getTotalBundleSizes(serviceBundleData);

      return [service, serviceBundleData.join(', '), totalBundleSizes];
    });

exports.getPageBundleData = getPageBundleData;
exports.getServiceBundleData = getServiceBundleData;
