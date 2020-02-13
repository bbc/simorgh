import fetchPageData from '../fetchPageData';
import radioPageAddIdsToBlocks from '#lib/utilities/preprocessor/rules/radioPage/addIdsToBlocks';

export default async path => {
  const { json, status } = await fetchPageData(path);

  return {
    status,
    ...(json && {
      pageData: radioPageAddIdsToBlocks(json),
    }),
  };
};
