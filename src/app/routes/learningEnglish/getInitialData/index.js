import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';

export default async path => {
  console.log('hello');
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    pageData: json,
  };
};
