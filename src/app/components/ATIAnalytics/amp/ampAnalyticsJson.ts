// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { ATIAnalyticsProps } from '../types';

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

  return {
    transport: {
      beacon: false,
      xhrpost: false,
      image: true,
    },
    requests: ampAnalyticsRequestConfiguration,
    triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
  };
};

export default ampAnalyticsJson;
