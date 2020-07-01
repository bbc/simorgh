import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
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
    const { json, status } = await fetchPageData(path);

    return {
      status,
      pageData: transformJson(json),
    };
  } catch ({ message, status }) {
    return { error: message, status };
  }
};
