// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */

import { PageViewTrackingParams } from '../types';

const ampAnalyticsJson = ({
  baseUrl,
  pageViewParams,
}: PageViewTrackingParams) => ({
  transport: {
    beacon: false,
    xhrpost: false,
    image: true,
  },
  requests: {
    base: baseUrl,
    pageview: '${base}' + pageViewParams,
  },
  triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
});

export default ampAnalyticsJson;
