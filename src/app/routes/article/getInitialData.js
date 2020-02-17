import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import memoizeProcessor from '../memoizeProcessor';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';

const processJson = pipe(
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
);

const pathToId = ['metadata', 'id'];
const pathToLastUpdated = ['metadata', 'lastUpdated'];

const memoizedProcessor = memoizeProcessor(
  pathToId,
  pathToLastUpdated,
  processJson,
);

export default async pathname => {
  const { json, ...rest } = await fetchPageData(pathname);

  return {
    ...rest,
    ...(json && {
      pageData: memoizedProcessor(json),
    }),
  };
};
