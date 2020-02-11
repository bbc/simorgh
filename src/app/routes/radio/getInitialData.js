import fetchPageData from '../fetchPageData';
import radioPageAddIdsToBlocks from '#lib/utilities/preprocessor/rules/radioPage/addIdsToBlocks';

export default async path => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(path);
  const processedPageData = radioPageAddIdsToBlocks(rawPageData);

  return { pageData: processedPageData, ...rest };
};
