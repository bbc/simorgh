import pipe from 'ramda/src/pipe';
import isEmpty from 'ramda/src/isEmpty';

import fetchPageData from '../../utils/fetchPageData';
import handleGroupBlocks from '../handleGroupBlocks';
import handleEmptyParagraphBlocks from '../handleEmptyParagraphBlocks';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
} from '../../utils/sharedDataTransformers';

import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import getSecondaryColumnUrl from '#lib/utilities/getUrlHelpers/getSecondaryColumnUrl';

import { DATA_FETCH_ERROR_SECONDARY_COLUMN } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const transformJson = pipe(
  handleGroupBlocks,
  handleEmptyParagraphBlocks,
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
);

const validateResponse = ({ status, json }) => {
  if (status === 200 && !isEmpty(json)) {
    return json;
  }

  return null;
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
  ]);

export default async ({ path, pageType, service, variant }) => {
  try {
    const [{ json, status }, secondaryColumn] = await fetcher({
      path,
      pageType,
      service,
      variant,
    });

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
