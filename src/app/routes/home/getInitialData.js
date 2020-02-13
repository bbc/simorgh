import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '#lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';

const processPageData = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
);

export default async path => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(path);
  const processedPageData = processPageData(rawPageData);

  return { pageData: processedPageData, ...rest };
};
