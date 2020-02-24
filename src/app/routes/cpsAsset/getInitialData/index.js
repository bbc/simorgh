import pipe from 'ramda/src/pipe';
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
import addBylineBlock from './addBylineBlock';
import addAnalyticsCounterName from './addAnalyticsCounterName';
import convertToOptimoBlocks from './convertToOptimoBlocks';

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
