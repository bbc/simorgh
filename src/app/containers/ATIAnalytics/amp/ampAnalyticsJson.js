// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */

const ampAnalyticsJson = ({ baseUrl, pageviewParams }) => ({
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
});

export default ampAnalyticsJson;
