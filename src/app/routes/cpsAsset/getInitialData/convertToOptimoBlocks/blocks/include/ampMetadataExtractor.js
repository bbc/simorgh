import Url from 'url-parse';

const ampMetadataExtractor = href => {
  const ampSrcPrefix =
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN === 'http://localhost:7080'
      ? 'https://news.test.files.bbci.co.uk'
      : process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN;
  const includePathname = new Url(href, true).pathname;
  const includeQueryString = new Url(href, false).query;
  const queryParams = new URLSearchParams(href);

  return {
    ampSrc: `${ampSrcPrefix + includePathname}/amp${includeQueryString}`,
    ampImageWidth: queryParams.get('amp-image-width'),
    ampImageHeight: queryParams.get('amp-image-height'),
    ampImage: queryParams.get('amp-image'),
  };
};

export default ampMetadataExtractor;
