import { use } from 'react';
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { buildReverbEventModel } from '#app/components/ATIAnalytics/atiUrl';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingProps } from '#app/lib/analyticsUtils/types';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { enforceLegacyDestinationForJapanese } from '../..';

export default ({
  eventTrackingData,
  eventType,
}: EventTrackingProps & {
  isStatic?: boolean;
}) => {
  const { pageType } = use(RequestContext);
  const { atiAnalyticsAppName, lang } = use(ServiceContext);
  const atiTrackingParams = extractATITrackingProps({
    eventTrackingData,
    eventType,
  });

  const reverbParams = buildReverbEventModel(atiTrackingParams);
  const additionalParams = {
    atiAnalyticsAppName,
    serviceLanguage: lang,
    pageType,
  };
  const env = getEnvConfig().SIMORGH_APP_ENV;

  const staticATITrackingURL = enforceLegacyDestinationForJapanese(
    reverbUrlHelper.getLiteComponentViewClickTrackingUrl({
      ...reverbParams,
      additionalParams,
      env,
    }),
  );

  return staticATITrackingURL;
};
