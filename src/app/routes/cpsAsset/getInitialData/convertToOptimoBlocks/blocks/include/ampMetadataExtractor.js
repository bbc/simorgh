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
  const queryParams = new Url(href, {}, true).query;

  return {
    src: `${baseUrl + pathname}/amp${queryString}`,
    imageWidth: queryParams['amp-image-width'],
    imageHeight: queryParams['amp-image-height'],
    image: queryParams['amp-image'],
  };
};

export default ampMetadataExtractor;
