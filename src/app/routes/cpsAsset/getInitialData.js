import pipe from 'ramda/src/pipe';
import fetchPageData from '../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../utils/sharedTransformers';
import parseInternalLinks from './transformers/convertToOptimoBlocks/blocks/internalLinks';
import {
  addHeadlineBlock,
  timestampToMilliseconds,
  addSummaryBlock,
  cpsOnlyOnwardJourneys,
  addBylineBlock,
  addAnalyticsCounterName,
  convertToOptimoBlocks,
} from './transformers';

const formatPageData = pipe(
  addAnalyticsCounterName,
  parseInternalLinks,
  timestampToMilliseconds,
);
const processOptimoBlocks = pipe(
  addHeadlineBlock,
  addSummaryBlock,
  augmentWithTimestamp,
  addBylineBlock,
  addIdsToBlocks,
  applyBlockPositioning,
  cpsOnlyOnwardJourneys,
);
const transformJson = async json => {
  const formattedPageData = formatPageData(json);
  const optimoBlocks = await convertToOptimoBlocks(formattedPageData);
  return processOptimoBlocks(optimoBlocks);
};

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: await transformJson(json),
    }),
  };
};
