import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';
import parseInternalLinks from '../../cpsAsset/getInitialData/convertToOptimoBlocks/blocks/internalLinks';
import addHeadlineBlock from '../../cpsAsset/getInitialData/addHeadlineBlock';
import timestampToMilliseconds from '../../cpsAsset/getInitialData/timestampToMilliseconds';
import addSummaryBlock from '../../cpsAsset/getInitialData/addSummaryBlock';
import cpsOnlyOnwardJourneys from '../../cpsAsset/getInitialData/cpsOnlyOnwardJourneys';
import addBylineBlock from '../../cpsAsset/getInitialData/addBylineBlock';
import addAnalyticsCounterName from '../../cpsAsset/getInitialData/addAnalyticsCounterName';
import convertToOptimoBlocks from '../../cpsAsset/getInitialData/convertToOptimoBlocks';
import processUnavailableMedia from '../../cpsAsset/getInitialData/processUnavailableMedia';
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

export default async (urlPath, includeUrl) => {
  const data = await fetchPageData('/mundo/23268432');

  const { json, ...rest } = data;
  const { content } = json;

  if (content && content.blocks) {
    json.content.blocks.unshift({
      required: false,
      tile: 'Fake Include',
      href: includeUrl,
      platform: 'highweb',
      type: 'include',
    });
  }

  return {
    ...rest,
    ...(json && {
      pageData: await transformJson(json),
    }),
  };
};
