import fetchPageData from '../fetchPageData';
import radioPageAddIdsToBlocks from '#lib/utilities/preprocessor/rules/radioPage/addIdsToBlocks';

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: radioPageAddIdsToBlocks(json),
    }),
  };
};
