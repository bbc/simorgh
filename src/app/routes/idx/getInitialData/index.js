import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from '../../utils/filterUnknownContentTypes';
import filterEmptyGroupItems from '../../utils/filterEmptyGroupItems';
import squashTopStories from '../../utils/squashTopStories';
import addIdsToItems from '../../utils/addIdsToItems';
import filterGroupsWithoutStraplines from '../../utils/filterGroupsWithoutStraplines';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export default async ({ path }) => {
  const pageDataPromise = fetchPageData(path);

  const { json, ...rest } = await pageDataPromise;

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
    }),
  };
};
