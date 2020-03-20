import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from './filterUnknownContentTypes';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import squashTopStories from './squashTopStories';
import addIdsToItems from './addIdsToItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';

export const transformJson = pipe(
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
