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
  const path = variant
    ? `/${service}/${variant}/sty-secondary-column`
    : `/${service}/sty-secondary-column`;

  return fetchPageData({ path, timeout: SECONDARY_DATA_TIMEOUT })
    .then(validateResponse)
    .catch(() => {});
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
