import pipe from 'ramda/src/pipe';
import fetchPageData from '../utils/fetchPageData';
import {
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  squashTopStories,
  addIdsToItems,
  filterGroupsWithoutStraplines,
} from './transformers';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
    }),
  };
};
