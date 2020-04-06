import fetchPageData from '../../utils/fetchPageData';

export default async (path) => {
  const { json, ...rest } = await fetchPageData('/pidgin/mostread');

  return {
    ...rest,
    ...(json && {
      pageData: json,
    }),
  };
};
