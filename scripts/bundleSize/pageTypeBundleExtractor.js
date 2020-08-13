const bundleReport = require('../../reports/webpackBundleReport.json');

const extractBundlesForPageType = pageComponent => {
  console.log(bundleReport.namedChunkGroups);
  const chunkGroup = bundleReport.namedChunkGroups[pageComponent];
  if (chunkGroup) {
    return chunkGroup.assets
      .filter(asset => asset.endsWith('.js'))
      .map(asset => asset.replace(/static\/js\//, ''));
  }
  throw Error(`page type '${pageComponent}' not found`);
};

exports.extractBundlesForPageType = extractBundlesForPageType;
