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
