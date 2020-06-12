import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

export default async ({ service, variant }) => {
  const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];
  const { json, status, error } = await fetchPageData(mostReadUrl);

  if (error) {
    return { error, status };
  }

  const pageTypeMeta = { metadata: { type: 'mostRead' } };

  return {
    status,
    pageData: { ...json, ...pageTypeMeta },
  };
};
