import Url from 'url-parse';

const ampSrcBuilder = href => {
  const ampSrcPrefix = 'https://news.files.bbci.co.uk';
  const includePathname = new Url(href, true).pathname; // https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app
  const includeQueryString = new Url(href, false).query;

  return `${ampSrcPrefix + includePathname}/amp${includeQueryString}`;
};

export default ampSrcBuilder;
