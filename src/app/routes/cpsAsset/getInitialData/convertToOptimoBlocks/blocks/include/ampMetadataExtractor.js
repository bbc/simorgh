import Url from 'url-parse';

const ampMetadataExtractor = href => {
  const ampSrcPrefix = process.env.SIMORGH_INCLUDES_BASE_AMP_URL;
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
