import pipe from 'ramda/src/pipe';
import fetchPageData from '../../../lib/utilities/fetchPageData';
import applyTimestampRules from './applyTimestampRules';
import applyBlockPositioning from './applyBlockPositioning';
import addIdsToBlocks from './addIdsToBlocks';

const processPageData = pipe(
  applyBlockPositioning,
  addIdsToBlocks,
  applyTimestampRules,
);

export default async (...args) => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(...args);

  const processedPageData = processPageData(rawPageData);

  console.log(JSON.stringify(processedPageData));

  return { pageData: processedPageData, ...rest };
};
