import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import handleDataProcessingError from '../../utils/handleDataProcessingError';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';

const transformJson = pipe(
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
);

export default async ({ path }) => {
  try {
    const { json, status, error } = await fetchPageData(path);

    if (error) {
      return { error, status };
    }

    return {
      status,
      pageData: transformJson(json),
    };
  } catch (error) {
    return handleDataProcessingError(error);
  }
};
