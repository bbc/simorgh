import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import {
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import handleError from '../../utils/handleError';
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
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import isListWithLink from '../../utils/isListWithLink';
import addIndexToBlockGroups from '../../utils/sharedDataTransformers/addIndexToBlockGroups';

import getArticleInitialData from '../../article/getInitialData';

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
      augmentWithDisclaimer({ toggles, positionFromTimestamp: 1 }),
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

const getDerivedServiceAndPath = (service, pathname) => {
  switch (service) {
    case 'cymrufyw':
      return {
        service: 'newyddion',
        path: pathname.replace('cymrufyw', 'newyddion'),
      };
    default:
      return { service, path: pathname };
  }
};

export default async ({
  path: pathname,
  service,
  variant,
  pageType,
  toggles,
  isCaf,
}) => {
  try {
    const { service: derivedService, path: derivedPath } =
      getDerivedServiceAndPath(service, pathname);

    const {
      status,
      pageData: { secondaryColumn, recommendations, ...article } = {},
    } = await getArticleInitialData({
      path: derivedPath,
      service: derivedService,
      variant,
      pageType: isCaf ? 'article' : 'cpsAsset',
      isCaf,
    });

    if (status !== 200) {
      throw handleError('CPS asset data fetch error', status);
    }

    const { mostWatched } = processMostWatched({
      data: article,
      service: derivedService,
      path: derivedPath,
      toggles,
      page: pageType,
    });

    const { topStories, features } = secondaryColumn;
    const { mostRead } = article;

    const response = {
      status,
      pageData: {
        ...(isCaf ? article : await transformJson(article, pathname, toggles)),
        secondaryColumn: {
          topStories,
          features,
        },
        mostRead,
        mostWatched,
        recommendations,
      },
    };

    return response;
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
