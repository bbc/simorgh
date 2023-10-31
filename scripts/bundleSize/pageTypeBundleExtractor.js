import { readFile } from 'fs/promises';

const modernBundleReport = JSON.parse(
  await readFile(
    new URL('../../reports/modern.webpackBundleReport.json', import.meta.url)
  )
);

const legacyBundleReport = JSON.parse(
  await readFile(
    new URL('../../reports/legacy.webpackBundleReport.json', import.meta.url)
  )
);



const bundleReports = {
  modern: modernBundleReport,
  legacy: legacyBundleReport,
};
const bundleType = process.env.bundleType || 'modern';

export const extractBundlesForPageType = pageComponent => {
  const chunkGroup = bundleReports[bundleType].namedChunkGroups[pageComponent];
  if (chunkGroup) {
    return chunkGroup.assets
      .filter(({ name }) => name.endsWith('.js'))
      .map(({ name }) => name.replace(/static\/js\//, ''));
  }
  throw Error(`page type '${pageComponent}' not found`);
};
