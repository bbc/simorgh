import modernBundleReport from '../../reports/modern.webpackBundleReport.json' assert { type: 'json' };
import legacyBundleReport from '../../reports/legacy.webpackBundleReport.json' assert { type: 'json' };

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

export default extractBundlesForPageType;
