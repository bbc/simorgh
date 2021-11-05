import Url from 'url-parse';
import nodeLogger from '#lib/logger.node';
import { INCLUDE_IFRAME_REQUEST_RECEIVED } from '#lib/logger.const';

const logger = nodeLogger(__filename);

/**
 * Returns an object containing metadata extracted from an Include url
 *
 * @param {string} href The href value from an Include Block.
 */

const ampMetadataExtractor = (href, baseUrl) => {
  const { hostname, pathname, protocol, query } = new Url(href, baseUrl, true);
  const queryString = new Url(href).query;

  const src = `${protocol}//${hostname}${pathname}/amp${queryString}`;

  logger.info(INCLUDE_IFRAME_REQUEST_RECEIVED, {
    url: src,
  });

  return {
    src,
    imageWidth: query['amp-image-width'],
    imageHeight: query['amp-image-height'],
    image: query['amp-image'],
  };
};

export default ampMetadataExtractor;
