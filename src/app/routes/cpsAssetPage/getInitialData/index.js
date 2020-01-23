import pipe from 'ramda/src/pipe';
import fetchPageData from '../../../lib/utilities/fetchPageData';
import applyTimestampRules from './applyTimestampRules';
import applyBlockPositioning from './applyBlockPositioning';
import addIdsToBlocks from './addIdsToBlocks';
import parseInternalLinks from '../../../lib/convertToOptimoBlocks/blocks/internalLinks';
import timestampToMilliseconds from './timestampToMilliseconds';
import convertToOptimoBlocks from '../../../lib/convertToOptimoBlocks';
import addHeadlineBlock from './addHeadlineBlock';
import addSummaryBlock from './addSummaryBlock';

const processPageData = pipe(
  parseInternalLinks,
  timestampToMilliseconds,
  convertToOptimoBlocks,
  addHeadlineBlock,
  addSummaryBlock,
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
);

export default async (...args) => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(...args);

  const a = pipe(parseInternalLinks, timestampToMilliseconds)(rawPageData);

  const b = await convertToOptimoBlocks(a);

  const processedPageData = pipe(
    addHeadlineBlock,
    addSummaryBlock,
    applyTimestampRules,
    addIdsToBlocks,
    applyBlockPositioning,
  )(b);

  console.log('processedPageData', rawPageData);

  return {
    pageData: processedPageData,
    ...rest,
  };
};
