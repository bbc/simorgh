import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import {
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';
import augmentWithDisclaimer from './augmentWithDisclaimer';
import parseInternalLinks from './convertToOptimoBlocks/blocks/internalLinks';
import addHeadlineBlock from './addHeadlineBlock';
import timestampToMilliseconds from './timestampToMilliseconds';
import addSummaryBlock from './addSummaryBlock';
import cpsOnlyOnwardJourneys from './cpsOnlyOnwardJourneys';
import insertPodcastPromo from './insertPodcastPromo';
import addRecommendationsBlock from './addRecommendationsBlock';
import addBylineBlock from './addBylineBlock';
import addMpuBlock from './addMpuBlock';
import addAnalyticsCounterName from './addAnalyticsCounterName';
import convertToOptimoBlocks from './convertToOptimoBlocks';
import processUnavailableMedia from './processUnavailableMedia';
import processMostWatched from '../../utils/processMostWatched';
import getAdditionalPageData from '../utils/getAdditionalPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import isListWithLink from '../../utils/isListWithLink';
import addIndexToBlockGroups from '../../utils/sharedDataTransformers/addIndexToBlockGroups';

export const only =
  (pageTypes, transformer) =>
  (pageData, ...args) => {
    const isCorrectPageType = pageTypes.includes(
      path(['metadata', 'type'], pageData),
    );
    return isCorrectPageType ? transformer(pageData, ...args) : pageData;
  };

const formatPageData = pipe(
  addAnalyticsCounterName,
  parseInternalLinks,
  timestampToMilliseconds,
  only([STORY_PAGE], insertPodcastPromo),
);

const processOptimoBlocks = toggles =>
  pipe(
    only([MEDIA_ASSET_PAGE], processUnavailableMedia),
    addHeadlineBlock,
    addSummaryBlock,
    augmentWithTimestamp,
    only(
      [MEDIA_ASSET_PAGE, STORY_PAGE, PHOTO_GALLERY_PAGE],
      augmentWithDisclaimer(toggles),
    ),
    addBylineBlock,
    addRecommendationsBlock,
    addMpuBlock,
    applyBlockPositioning,
    addIdsToBlocks,
    cpsOnlyOnwardJourneys,
    addIndexToBlockGroups(isListWithLink, {
      blockGroupType: 'listWithLink',
      pathToBlockGroup: ['model', 'blocks', 0],
    }),
  );

// Here pathname is passed as a prop specifically for CPS includes
// This will most likely change in issue #6784 so it is temporary for now
const transformJson = async (json, pathname, toggles) => {
  try {
    const formattedPageData = formatPageData(json);
    const optimoBlocks = await convertToOptimoBlocks(
      formattedPageData,
      pathname,
    );
    return processOptimoBlocks(toggles)(optimoBlocks);
  } catch (e) {
    // We can arrive here if the CPS asset is a FIX page
    // TODO: consider checking if FIX then don't transform JSON
    return json;
  }
};

export default async ({
  path: pathname,
  service,
  variant,
  pageType,
  toggles,
}) => {
  try {
    const env = pathname.includes('renderer_env=live')
      ? 'live'
      : process.env.SIMORGH_APP_ENV;
    const { json, status } = await fetchPageData({
      path: pathname,
      pageType,
      api: 'asset',
      apiContext: 'primary_data',
    });

    const additionalPageData = await getAdditionalPageData({
      pageData: json,
      service,
      variant,
      env,
    });

    const processedAdditionalData = processMostWatched({
      data: additionalPageData,
      service,
      path: pathname,
      toggles,
      page: pageType,
    });

    return {
      status,
      pageData: {
        ...(await transformJson(json, pathname, toggles)),
        ...processedAdditionalData,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
