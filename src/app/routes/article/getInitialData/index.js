import pipe from 'ramda/src/pipe';
import isEmpty from 'ramda/src/isEmpty';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import getSecondaryColumnUrl from '#lib/utilities/getUrlHelpers/getSecondaryColumnUrl';
import { DATA_FETCH_ERROR_SECONDARY_COLUMN } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import fetchPageData from '../../utils/fetchPageData';
import handleGroupBlocks from '../handleGroupBlocks';
import handleEmptyParagraphBlocks from '../handleEmptyParagraphBlocks';
import handleBylineBlocks from '../handleBylineBlocks';
import handlePromoData from '../handlePromoData';
import addMpuBlock from './addMpuBlock';
import bffFetch from './bffFetch';

import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
  addNoCookieToEmbeds,
} from '../../utils/sharedDataTransformers';
import isListWithLink from '../../utils/isListWithLink';
import addIndexToBlockGroups from '../../utils/sharedDataTransformers/addIndexToBlockGroups';

import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const logger = nodeLogger(__filename);

const transformJson = pipe(
  handleGroupBlocks,
  handleEmptyParagraphBlocks,
  handlePromoData,
  augmentWithTimestamp,
  addMpuBlock,
  addNoCookieToEmbeds,
  handleBylineBlocks,
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

export default async ({ getAgent, path, pageType, service, variant }) => {
  const BFF_FETCH_ALLOWLIST = [
    'afrique',
    'afaanoromoo',
    'amharic',
    'arabic',
    'azeri',
    'amharic',
    'bengali',
    'burmese',
    'gahuza',
    'gujarati',
    'hausa',
    'hindi',
    'kyrgyz',
    'igbo',
    'indonesia',
    'japanese',
    'korean',
    'marathi',
    'mundo',
    'naidheachdan',
    'nepali',
    'pashto',
    'persian',
    'pidgin',
    'portuguese',
    'punjabi',
    'russian',
    'ukrainian',
    'urdu',
    'uzbek',
    'vietnamese',
    'yoruba',
  ];
  const isBffFetch = BFF_FETCH_ALLOWLIST.includes(service);

  if (isBffFetch) {
    return bffFetch({ getAgent, path, pageType, service, variant });
  }

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
