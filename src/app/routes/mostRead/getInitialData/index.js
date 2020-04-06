import fetchPageData from '../../utils/fetchPageData';

export default async ({ path, service }) => {
  const { json, ...rest } = await fetchPageData(`/${service}/mostread`);

  return {
    ...rest,
    ...(json && {
      pageData: json,
    }),
  };
};
