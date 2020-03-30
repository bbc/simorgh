import fetchPageData from '../../utils/fetchPageData';
import addIdsToBlocks from './addIdsToBlocks';

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: addIdsToBlocks(json),
    }),
  };
};
