import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '#lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';
import memoizeProcessor from '../memoizeProcessor';

const processJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
);

const pathToId = ['metadata', 'id'];
const pathToLastUpdated = ['metadata', 'lastUpdated'];

const memoizedProcessor = memoizeProcessor(
  pathToId,
  pathToLastUpdated,
  processJson,
);

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: memoizedProcessor(json),
    }),
  };
};
