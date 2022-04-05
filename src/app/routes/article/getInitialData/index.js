import pipe from 'ramda/src/pipe';
import isEmpty from 'ramda/src/isEmpty';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import getSecondaryColumnUrl from '#lib/utilities/getUrlHelpers/getSecondaryColumnUrl';
import { DATA_FETCH_ERROR_SECONDARY_COLUMN } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import fetchPageData from '../../utils/fetchPageData';
import handleGroupBlocks from '../handleGroupBlocks';
import handleEmptyParagraphBlocks from '../handleEmptyParagraphBlocks';
import handlePromoData from '../handlePromoData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
} from '../../utils/sharedDataTransformers';
import isListWithLink from '../../utils/isListWithLink';
import addIndexToBlockGroups from '../../utils/sharedDataTransformers/addIndexToBlockGroups';
// import getMostRead from '../../mostRead/getInitialData';

import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import mostRead from '#app/routes/mostRead';

const logger = nodeLogger(__filename);

const transformJson = pipe(
  handleGroupBlocks,
  handleEmptyParagraphBlocks,
  handlePromoData,
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
  addIndexToBlockGroups(isListWithLink, {
    blockGroupType: 'edOjLinks',
  }),
);

const validateResponse = ({ status, json }) => {
  if (status === 200 && !isEmpty(json)) {
    return json;
  }

  return null;
};

const fetchMostRead = async ({ service, variant, pageType }) => {
  try {
    const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];
    console.log('fetchingMostRead', mostReadUrl);
    const { json } = await fetchPageData({
      path: mostReadUrl,
      pageType,
    });
    console.log({ json });
    return json;
  } catch (error) {
    return null;
  }
};

const fetchSecondaryColumn = async ({ service, variant }) => {
  const path = getSecondaryColumnUrl({ service, variant });

  try {
    const response = await fetchPageData({
      path,
      timeout: SECONDARY_DATA_TIMEOUT,
    });
    return validateResponse(response);
  } catch (error) {
    logger.error(DATA_FETCH_ERROR_SECONDARY_COLUMN, {
      service,
      error,
    });
    return null;
  }
};

const fetcher = ({ path, pageType, service, variant }) =>
  Promise.all([
    fetchPageData({ path, pageType }),
    fetchSecondaryColumn({ service, variant }),
    fetchMostRead({ service, variant, pageType }),
  ]);

export default async ({ path, pageType, service, variant }) => {
  try {
    const [{ json, status }, secondaryColumn] = await fetcher({
      path,
      pageType,
      service,
      variant,
    });
    // const { json: hello } = fetchMostRead({ service, varaint, pageType });
    // console.log(bob);
    // console.log({ path });

    return {
      status,
      pageData: {
        ...transformJson(json),
        secondaryColumn,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
