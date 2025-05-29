// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { ATIAnalyticsProps } from '../types';
import { getDestination } from '#app/lib/analyticsUtils';

const ampAnalyticsJson = ({
  baseUrl,
  pageviewParams,
  reverbParams,
}: ATIAnalyticsProps) => {
  const ampAnalyticsRequestConfiguration = reverbParams
    ? reverbUrlHelper.getAmpAnalyticsPageViewUrl(reverbParams)
    : {
        base: baseUrl,
        pageview: '${base}' + pageviewParams,
      };

  const {
    params: { page: destination } = {},
  } = reverbParams ?? {};
  const ampDestination = getDestination('amp', destination);
  const { base, pageview } = ampAnalyticsRequestConfiguration;

  // Use destination derived via amp-geo
  pageview.replace(/s=\d+&/, `s=${ampDestination}&`);

  return {
    transport: {
      beacon: false,
      xhrpost: false,
      image: true,
    },
    requests: { base, pageview },
    triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
  };
};

export default ampAnalyticsJson;
