import pipe from 'ramda/src/pipe';
import fetchPageData from '../../../lib/utilities/fetchPageData';
import convertToOptimoBlocks from '../../../lib/convertToOptimoBlocks';
import parseInternalLinks from '../../../lib/convertToOptimoBlocks/blocks/internalLinks';
import applyTimestampRules from './applyTimestampRules';
import applyBlockPositioning from './applyBlockPositioning';
import addIdsToBlocks from './addIdsToBlocks';
import timestampToMilliseconds from './timestampToMilliseconds';
import addHeadlineBlock from './addHeadlineBlock';
import addSummaryBlock from './addSummaryBlock';

const normalisePageData = pipe(parseInternalLinks, timestampToMilliseconds);

const processPageData = pipe(
  addHeadlineBlock,
  addSummaryBlock,
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
);

export default async (...args) => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(...args);

  const optimoBlocks = await convertToOptimoBlocks(
    normalisePageData(rawPageData),
  );

  const processedPageData = processPageData(optimoBlocks);

  return {
    pageData: processedPageData,
    ...rest,
  };
};
