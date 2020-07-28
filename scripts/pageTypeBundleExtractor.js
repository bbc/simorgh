const bundleReport = require('../reports/webpackBundleReport.json');

const extractBundlesForPageType = pageComponent => {
  const chunkGroup = bundleReport.namedChunkGroups[pageComponent];
  if (chunkGroup) {
    return chunkGroup.chunks;
  }
  throw Error(`page type '${pageComponent}' not found`);
};

exports.extractBundlesForPageType = extractBundlesForPageType;
