import fetchPageData from '../../utils/fetchPageData';

export default async path => {
  const { json, ...rest } = await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: json,
    }),
  };
};
