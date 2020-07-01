import Url from 'url-parse';

/**
 * Returns an object containing metadata extracted from an Include url
 *
 * @param {string} href The href value from an Include Block.
 */

const ampMetadataExtractor = (href, baseUrl) => {
  const { hostname, pathname, protocol, query } = new Url(href, baseUrl, true);
  const queryString = new Url(href).query;

  return {
    src: `${protocol}//${hostname}${pathname}/amp${queryString}`,
    imageWidth: query['amp-image-width'],
    imageHeight: query['amp-image-height'],
    image: query['amp-image'],
  };
};

export default ampMetadataExtractor;
