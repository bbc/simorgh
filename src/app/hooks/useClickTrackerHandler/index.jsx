/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import constructStaticATIUrl from '#app/lib/analyticsUtils/staticATITracking/constructATIUrl';
import {
  CLICK_EVENT,
  STATIC_ATI_CLICK_TRACKING,
} from '#app/lib/analyticsUtils/analytics.const';
import { RequestContext } from '#app/contexts/RequestContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useTrackingToggle from '../useTrackingToggle';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const useClickTrackerHandler = (
  eventTrackingData = {},
  optimizelyVariation = '',
) => {
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
    sendOptimizelyEvents,
    groupTracker,
    itemTracker,
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);

  const { service, useReverb } = useContext(ServiceContext);

  const { optimizely } = useContext(OptimizelyContext);

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

          if (
            optimizely &&
            (optimizelyVariation || optimizelyVariation !== 'off') &&
            sendOptimizelyEvents
          ) {
            const overrideAttributes = optimizely?.user.attributes;

            optimizely.track(
              `${componentName}-clicks`,
              optimizely.user.id,
              overrideAttributes,
            );
          }

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
              url: url || nextPageUrl,
              detailedPlacement,
              useReverb,
              ...(groupTracker && { groupTracker }),
              ...(itemTracker && { itemTracker }),
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
      sendOptimizelyEvents,
      optimizely,
      optimizelyVariation,
      detailedPlacement,
      useReverb,
      itemTracker,
      groupTracker,
    ],
  );
};

export default (eventTrackingData = {}, optimizelyVariation = '') => {
  const { isAmp } = useContext(RequestContext);
  const isHydrated = useHydrationDetection();

  const clickTracker = useClickTrackerHandler(
    eventTrackingData,
    optimizelyVariation,
  );
  // Don't think we need experiment here?
  const staticAtiUrl = constructStaticATIUrl({
    eventTrackingData,
    eventType: CLICK_EVENT,
    isStatic: !isHydrated,
  });

  const enableStaticTracking = !isHydrated && !isAmp;

  return {
    ...(enableStaticTracking && {
      [STATIC_ATI_CLICK_TRACKING]: staticAtiUrl,
    }),

    ...(isHydrated && { onClick: clickTracker }),
  };
};
