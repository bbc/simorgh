import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';

const processPageData = pipe(
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
);

export default async path => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(path);
  const processedPageData = processPageData(rawPageData);

  return { pageData: processedPageData, ...rest };
};
