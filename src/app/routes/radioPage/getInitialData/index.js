import pipe from 'ramda/src/pipe';
import fetchPageData from '../../../lib/utilities/fetchPageData';
import applyTimestampRules from './applyTimestampRules';
import applyBlockPositioning from './applyBlockPositioning';
import addIdsToBlocks from './addIdsToBlocks';

const processPageData = pipe(
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
);

export default async (...args) => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(...args);

  const processedPageData = processPageData(rawPageData);

  return { pageData: processedPageData, ...rest };
};
