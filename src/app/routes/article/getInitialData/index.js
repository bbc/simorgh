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

export default async (path) => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
    }),
  };
};
