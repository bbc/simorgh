const modernBundleReport = require('../../reports/modern.webpackBundleReport.json');
const legacyBundleReport = require('../../reports/legacy.webpackBundleReport.json');

const bundleReports = {
  modern: modernBundleReport,
  legacy: legacyBundleReport,
};
const bundleType = process.env.bundleType || 'modern';

const extractBundlesForPageType = pageComponent => {
  const chunkGroup = bundleReports[bundleType].namedChunkGroups[pageComponent];
  if (chunkGroup) {
    return chunkGroup.assets
      .filter(({ name }) => name.endsWith('.js'))
      .map(({ name }) => name.replace(/static\/js\//, ''));
  }
  throw Error(`page type '${pageComponent}' not found`);
};

exports.extractBundlesForPageType = extractBundlesForPageType;
