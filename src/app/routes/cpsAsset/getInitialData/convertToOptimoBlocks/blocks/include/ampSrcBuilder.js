import Url from 'url-parse';

const ampSrcBuilder = href => {
  const ampSrcPrefix = process.env.SIMORGH_INCLUDES_BASE_AMP_URL;
  const includePathname = new Url(href, true).pathname;
  const includeQueryString = new Url(href, false).query;

  return `${ampSrcPrefix + includePathname}/amp${includeQueryString}`;
};

export default ampSrcBuilder;
