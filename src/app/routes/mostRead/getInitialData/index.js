import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

export default async ({ service, variant }) => {
  const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];
  const { json, ...rest } = await fetchPageData(mostReadUrl);
  const pageTypeMeta = { metadata: { type: 'mostRead' } };

  return {
    ...rest,
    ...(json && {
      pageData: { ...json, ...pageTypeMeta },
    }),
  };
};
