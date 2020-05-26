import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from '../../home/getInitialData/filterUnknownContentTypes';
import filterEmptyGroupItems from '../../home/getInitialData/filterEmptyGroupItems';
import squashTopStories from '../../home/getInitialData/squashTopStories';
import addIdsToItems from '../../home/getInitialData/addIdsToItems';
import filterGroupsWithoutStraplines from '../../home/getInitialData/filterGroupsWithoutStraplines';

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
