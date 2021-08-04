import pipe from 'ramda/src/pipe';
import identity from 'ramda/src/identity';

import isLive from '#lib/utilities/isLive';
import fetchPageData from '../../utils/fetchPageData';
import handleGroupBlocks from '../handleGroupBlocks';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
} from '../../utils/sharedDataTransformers';

import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const transformJson = pipe(
  isLive() ? identity : handleGroupBlocks,
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
);

export default async ({ path, pageType }) => {
  try {
    const { json, status } = await fetchPageData({
      path,
      pageType,
    });

    return {
      status,
      pageData: transformJson(json),
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
