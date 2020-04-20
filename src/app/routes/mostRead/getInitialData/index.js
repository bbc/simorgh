import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

export default async ({ service, variant }) => {
  const { json, ...rest } = await fetchPageData(
    getMostReadEndpoint({ service, variant }),
  );

  return {
    ...rest,
    ...(json && {
      pageData: json,
    }),
  };
};
