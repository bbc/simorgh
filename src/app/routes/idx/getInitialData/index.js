import fetchPageData from '../../utils/fetchPageData';

export default async (path) => {
  const { json, ...rest } = await fetchPageData('/persian/afghanistan');

  return {
    ...rest,
    ...(json && {
      pageData: json,
    }),
  };
};
