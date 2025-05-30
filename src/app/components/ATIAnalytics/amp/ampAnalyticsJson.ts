// The pageview request needs to have the ${base} value not interpolated.
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-template */
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { getDestination } from '#app/lib/analyticsUtils';
import { ATIAnalyticsProps } from '../types';

type GeoVariantEvaluationParamters = {
  app_name: string;
  destination: string;
  ampAnalyticsRequestConfiguration: {
    base: string;
    pageview: string;
  }
}

const useGeoVariantDestinationForSupportedServices = ({
  app_name,
  destination,
  ampAnalyticsRequestConfiguration,
}: GeoVariantEvaluationParamters) => {
  if(![
    'news',
    'news-cymrufyw',
    'news-naidheachdan',
    'sport',
  ].includes(app_name)) {
    return ampAnalyticsRequestConfiguration;
  };

  const { pageview } = ampAnalyticsRequestConfiguration;
  const ampDestination = getDestination('amp', destination);

  return {
    ...ampAnalyticsRequestConfiguration,
    pageview: pageview.replace(/s=\d+&/, `s=${ampDestination}&`), // Use destination derived via amp-geo
  }
};

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

  const app_name =
    reverbParams?.params.page.additionalProperties?.app_name ?? '';
  const destination = reverbParams?.params.page.destination ?? '';

  return {
    transport: {
      beacon: false,
      xhrpost: false,
      image: true,
    },
    requests: useGeoVariantDestinationForSupportedServices({
      app_name,
      destination,
      ampAnalyticsRequestConfiguration,
    }),
    triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
  };
};

export default ampAnalyticsJson;
