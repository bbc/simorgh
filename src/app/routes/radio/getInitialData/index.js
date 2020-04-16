import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import addIdsToBlocks from './addIdsToBlocks';

export default async ({ path }) => {
  const { json, ...rest } = await fetchPageData(overrideRendererOnTest(path));

  return {
    ...rest,
    ...(json && {
      pageData: addIdsToBlocks(json),
    }),
  };
};
