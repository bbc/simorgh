import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '#lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';

const processJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
);

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: processJson(json),
    }),
  };
};
