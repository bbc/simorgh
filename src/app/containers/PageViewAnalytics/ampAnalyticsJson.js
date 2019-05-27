// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */

const ampAnalyticsJson = ({ pageviewParams }) => ({
  transport: {
    beacon: false,
    xhrpost: false,
    image: true,
  },
  requests: {
    base: 'https://a1.api.bbc.co.uk/hit.xiti?',
    pageview: '${base}' + pageviewParams,
  },
  triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
});

export default ampAnalyticsJson;
