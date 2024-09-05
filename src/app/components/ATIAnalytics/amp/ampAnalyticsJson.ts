// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */

import { ATIAnalyticsProps } from '../types';

const ampAnalyticsJson = ({ baseUrl, pageviewParams }: ATIAnalyticsProps) => ({
  requests: {
    base: baseUrl,
    pageview: '${base}' + pageviewParams,
    elementview: baseUrl,
  },
  triggers: {
    trackPageview: { on: 'visible', request: 'pageview' },
    trackTopStories: {
      on: 'visible',
      request: 'elementview',
      visibilitySpec: {
        selector: `[class*='experimentTopStoriesAndFeaturesSection']`,
        visiblePercentageMin: 20,
        totalTimeMin: 500,
        continuousTimeMin: 200,
      },
      vars: {
        eventId: 'topStoriesPosition',
      },
    },
  },
});

export default ampAnalyticsJson;
