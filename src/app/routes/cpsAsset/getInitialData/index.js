import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';
import parseInternalLinks from './convertToOptimoBlocks/blocks/internalLinks';
import addHeadlineBlock from './addHeadlineBlock';
import timestampToMilliseconds from './timestampToMilliseconds';
import addSummaryBlock from './addSummaryBlock';
import cpsOnlyOnwardJourneys from './cpsOnlyOnwardJourneys';
import addRecommendationsBlock from './addRecommendationsBlock';
import addBylineBlock from './addBylineBlock';
import addAnalyticsCounterName from './addAnalyticsCounterName';
import convertToOptimoBlocks from './convertToOptimoBlocks';
import processUnavailableMedia from './processUnavailableMedia';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

const formatPageData = pipe(
  addAnalyticsCounterName,
  parseInternalLinks,
  timestampToMilliseconds,
);

export const only = (pageType, transformer) => (pageData, ...args) => {
  const isCorrectPageType = path(['metadata', 'type'], pageData) === pageType;
  return isCorrectPageType ? transformer(pageData, ...args) : pageData;
};

const processOptimoBlocks = pipe(
  only(MEDIA_ASSET_PAGE, processUnavailableMedia),
  addHeadlineBlock,
  addSummaryBlock,
  augmentWithTimestamp,
  addBylineBlock,
  addIdsToBlocks,
  applyBlockPositioning,
  cpsOnlyOnwardJourneys,
  addRecommendationsBlock,
);
const transformJson = async json => {
  try {
    const formattedPageData = formatPageData(json);
    const optimoBlocks = await convertToOptimoBlocks(formattedPageData);
    return processOptimoBlocks(optimoBlocks);
  } catch (e) {
    // We can arrive here if the CPS asset is a FIX page
    // TODO: consider checking if FIX then don't transform JSON
    return json;
  }
};

export default async ({ path: pathname }) => {
  const { json, ...rest } = await fetchPageData(pathname);

  return {
    ...rest,
    ...(json && {
      pageData: await transformJson(json),
    }),
  };
};
