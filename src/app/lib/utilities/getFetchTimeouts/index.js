// Timeouts for Simorgh making fetches to upstreams

/**
 * This timeout is for fetching 'page critical data` where
 * the data required for the fetch is fundamental to serving
 * a meaningful response to the user. The only example of this
 * in Simorgh is the fetch of page data from Ares for each page type.
 * It intentionally matches the mozart timeout for pages requested
 * via the Mozart 'Simorgh' payload; ensuring the Simorgh process
 * is free'ed up to handle subsequent requests when mozart itself will
 * be no longer waiting for Simorgh to respond.
 */
export const PRIMARY_DATA_TIMEOUT = 4500;

/**
 * This timeout is for fetching 'secondary' data that is not
 * so fundamental to delivering a meaningful response to the user.
 * If a timeout occurs retrieving this data, a page can still be
 * constructed without the data being retrieved and returned to
 * be served via Mozart.
 */
export const SECONDARY_DATA_TIMEOUT = 2000;
