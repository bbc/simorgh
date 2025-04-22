/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import constructLiteSiteATIEventTrackUrl from '#src/server/utilities/liteATITracking/constructATIUrl';
import {
  CLICK_EVENT,
  LITE_ATI_CLICK_TRACKING,
} from '#app/lib/analyticsUtils/analytics.const';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '../../lib/config/optimizely';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const useClickTrackerHandler = (eventTrackingData = {}) => {
  const {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    componentName,
    campaignID,
    format,
    advertiserID,
    url,
    detailedPlacement,
    producerName,
    preventNavigation,
    optimizely,
    optimizelyMetricNameOverride,
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);

  const { service, useReverb } = useContext(ServiceContext);

  return useCallback(
    async event => {
      const shouldRegisterClick = [
        trackingIsEnabled,
        !clicked,
        isValidClick(event),
      ].every(Boolean);
      if (shouldRegisterClick) {
        setClicked(true);

        const shouldSendEvent = [
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          producerName,
          service,
          statsDestination,
        ].every(Boolean);
        if (shouldSendEvent) {
          const nextPageUrl = event?.currentTarget?.href;

          event.stopPropagation();
          event.preventDefault();

          if (optimizely) {
            const eventName = OPTIMIZELY_CONFIG.viewClickAttributeId;

            const overrideAttributes = {
              ...optimizely.user.attributes,
              [`clicked_${eventName}`]: true,
            };

            optimizely.track(
              optimizelyMetricNameOverride
                ? `${optimizelyMetricNameOverride}_clicks`
                : 'component_clicks',
              optimizely.user.id,
              overrideAttributes,
            );
          }

          const optimizelyVariation =
            optimizely?.getVariation(OPTIMIZELY_CONFIG.ruleKey) || null;

          try {
            await sendEventBeacon({
              type: CLICK_EVENT,
              campaignID,
              componentName,
              format,
              pageIdentifier,
              platform,
              producerId,
              producerName,
              service,
              advertiserID,
              statsDestination,
              url,
              detailedPlacement,
              useReverb,
              ...(optimizelyVariation &&
                optimizelyVariation !== 'off' && {
                  experimentVariant: optimizelyVariation,
                }),
            });
          } finally {
            if (nextPageUrl && !preventNavigation) {
              if (optimizely) {
                optimizely.close();
              }
              window.location.assign(nextPageUrl);
            }
          }
        }
      }
    },
    [
      trackingIsEnabled,
      clicked,
      campaignID,
      componentName,
      pageIdentifier,
      platform,
      preventNavigation,
      producerId,
      producerName,
      service,
      statsDestination,
      url,
      advertiserID,
      format,
      optimizely,
      optimizelyMetricNameOverride,
      detailedPlacement,
      useReverb,
    ],
  );
};

export default (eventTrackingData = {}) => {
  const { isLite } = useContext(RequestContext);
  const clickTracker = useClickTrackerHandler(eventTrackingData);
  const liteATIUrl = constructLiteSiteATIEventTrackUrl({
    eventTrackingData,
    eventType: CLICK_EVENT,
  });

  return isLite
    ? { [LITE_ATI_CLICK_TRACKING]: liteATIUrl }
    : { onClick: clickTracker };
};
