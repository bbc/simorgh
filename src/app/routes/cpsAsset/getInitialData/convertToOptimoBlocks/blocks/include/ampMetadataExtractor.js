import Url from 'url-parse';

/**
 * Set the metadata on VJs on Amp.
 *
 * @param {string} href - The href value from an Include Block.
 */

const ampMetadataExtractor = href => {
  const baseUrl = process.env.SIMORGH_INCLUDES_BASE_AMP_URL;
  const { pathname } = new Url(href);
  const queryString = new Url(href).query;
  // TODO: use url-parse
  const queryParams = new URLSearchParams(href);

  return {
    src: `${baseUrl + pathname}/amp${queryString}`,
    imageWidth: queryParams.get('amp-image-width'),
    imageHeight: queryParams.get('amp-image-height'),
    image: queryParams.get('amp-image'),
  };
};

export default ampMetadataExtractor;
