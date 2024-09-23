import pipe from 'ramda/src/pipe';
import { FEATURE_INDEX_PAGE } from '#app/routes/utils/pageTypes';
import handleError from '../../utils/handleError';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';
import addHeadlineBlock from './addHeadlineBlock';
import timestampToMilliseconds from './timestampToMilliseconds';
import addAnalyticsCounterName from './addAnalyticsCounterName';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import isListWithLink from '../../utils/isListWithLink';
import addIndexToBlockGroups from '../../utils/sharedDataTransformers/addIndexToBlockGroups';

import getArticleInitialData from '../../article/getInitialData';

const formatPageData = pipe(addAnalyticsCounterName, timestampToMilliseconds);

const processOptimoBlocks = pipe(
  addHeadlineBlock,
  augmentWithTimestamp,
  applyBlockPositioning,
  addIdsToBlocks,
  addIndexToBlockGroups(isListWithLink, {
    blockGroupType: 'listWithLink',
    pathToBlockGroup: ['model', 'blocks', 0],
  }),
);

// Here pathname is passed as a prop specifically for CPS includes
// This will most likely change in issue #6784 so it is temporary for now
const transformJson = async json => {
  try {
    const formattedPageData = formatPageData(json);
    return processOptimoBlocks(formattedPageData);
  } catch (e) {
    // We can arrive here if the CPS asset is a FIX page
    // TODO: consider checking if FIX then don't transform JSON
    return json;
  }
};

export default async ({ path: pathname, service, variant, toggles, isAmp }) => {
  try {
    const {
      status,
      pageData: { secondaryColumn, recommendations, ...article } = {},
    } = await getArticleInitialData({
      path: pathname,
      service,
      variant,
      pageType: 'article',
      isAmp,
      toggles,
    });

    if (status !== 200) {
      throw handleError('CPS asset data fetch error', status);
    }

    const { topStories, features } = secondaryColumn;
    const { mostRead } = article;

    // Skip transforming JSON when the pageType is not FIX
    const skipTransformJson = article?.metadata?.type !== FEATURE_INDEX_PAGE;

    const response = {
      status,
      pageData: {
        ...(skipTransformJson ? article : await transformJson(article)),
        secondaryColumn: {
          topStories,
          features,
        },
        mostRead,
        recommendations,
      },
    };

    return response;
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
