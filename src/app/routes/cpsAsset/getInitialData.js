import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';
import parseInternalLinks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks/blocks/internalLinks';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';
import addHeadlineBlock from '#lib/utilities/preprocessor/rules/cpsAssetPage/addHeadlineBlock';
import timestampToMilliseconds from '#lib/utilities/preprocessor/rules/cpsAssetPage/timestampToMilliseconds';
import addSummaryBlock from '#lib/utilities/preprocessor/rules/cpsAssetPage/addSummaryBlock';
import cpsOnlyOnwardJourneys from '#lib/utilities/preprocessor/rules/cpsAssetPage/cpsOnlyOnwardJourneys';
import addBylineBlock from '#lib/utilities/preprocessor/rules/cpsAssetPage/addBylineBlock';

const formatPageData = pipe(parseInternalLinks, timestampToMilliseconds);
const processOptimoBlocks = pipe(
  addHeadlineBlock,
  addSummaryBlock,
  applyTimestampRules,
  addBylineBlock,
  addIdsToBlocks,
  applyBlockPositioning,
  cpsOnlyOnwardJourneys,
);
const processJson = async json => {
  const formattedPageData = formatPageData(json);
  const optimoBlocks = await convertToOptimoBlocks(formattedPageData);
  return processOptimoBlocks(optimoBlocks);
};

export default async path => {
  const { json, status } = await fetchPageData(path);

  return {
    status,
    ...(json && {
      pageData: await processJson(json),
    }),
  };
};
