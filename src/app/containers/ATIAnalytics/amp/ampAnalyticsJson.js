// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */
import Url from 'url-parse';

const ampAnalyticsJson = ({ baseUrl, pageviewParams, ampGeoGroup }) => {
  /**
   * The 's' query param in `pageviewParams` should be set according to a
   * user's geographic location. Currently it is set based on the TLD
   * (.com or .co.uk), which is not an accurate way to determine a user's
   * location. On AMP, we use amp-geo to set this value more accurately.
   *
   * EXAMPLE:
   */
  const url = new Url(`${baseUrl}${pageviewParams}`, true);

  url.set('query', {
    ...url.query,
    s: 'derive this value using `ampGeoGroup` value',
  });

  // With `url` query params modified, they can be then be used instead of
  // `pageviewParams` below.

  return {
    transport: {
      beacon: false,
      xhrpost: false,
      image: true,
    },
    requests: {
      base: baseUrl,
      pageview: '${base}' + pageviewParams,
    },
    triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
  };
};

export default ampAnalyticsJson;
