// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */

import { ATIAnalyticsProps } from '../types';

const ampAnalyticsJson = ({
  baseUrl,
  pageviewParams,
  eventsParams,
}: ATIAnalyticsProps) => ({
  transport: {
    beacon: false,
    xhrpost: false,
    image: true,
  },
  requests: {
    base: baseUrl,
    pageview: '${base}' + pageviewParams,
    ...eventsParams?.requests,
  },
  triggers: {
    trackPageview: { on: 'visible', request: 'pageview' },
    ...eventsParams?.triggers,
  },
});

export default ampAnalyticsJson;
