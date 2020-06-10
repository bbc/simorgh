import fetchPageData from '../../utils/fetchPageData';
import handleDataProcessingError from '../../utils/handleDataProcessingError';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

export default async ({ service, variant }) => {
  try {
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
  } catch (error) {
    return handleDataProcessingError(error);
  }
};
