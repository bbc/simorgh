/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useOptimizelyMvtVariation from '#app/hooks/useOptimizelyMvtVariation';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import constructStaticATIUrl from '#app/lib/analyticsUtils/staticATITracking/constructATIUrl';
import {
  CLICK_EVENT,
  STATIC_ATI_CLICK_TRACKING,
} from '#app/lib/analyticsUtils/analytics.const';
import { RequestContext } from '#app/contexts/RequestContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '../../lib/config/optimizely';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const useClickTrackerHandler = (
  eventTrackingData = {},
  experimentFlagKey = '',
  isClientSide = false,
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
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);

  const { service, useReverb } = useContext(ServiceContext);

  const { optimizely } = useContext(OptimizelyContext);

  // const optimizelyVariation = useOptimizelyMvtVariation(
  //   // Updated
  //   OPTIMIZELY_CONFIG.flagKeys[experimentFlagKey],
  // );
  let optimizelyVariation;

  if (experimentFlagKey) {
    if (isClientSide) {
      // TODO - better approach
      // eslint-disable-next-line react-hooks/rules-of-hooks
      optimizelyVariation = useOptimizelyVariation(
        // @ts-expect-error - TODO - I think it's because config is not typed
        experimentFlagKey,
      );
      console.log(
        'optimizelyVariation in clickTracker, experiment, clientside',
        optimizelyVariation,
      );
    }
    // TODO - better approach
    // eslint-disable-next-line react-hooks/rules-of-hooks
    optimizelyVariation = useOptimizelyMvtVariation(
      // @ts-expect-error - TODO - I think it's because config is not typed
      OPTIMIZELY_CONFIG.flagKeys[experimentFlagKey].flagKey,
    );
  }

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

          // optimizely has loaded
          if (optimizely && sendOptimizelyEvents && optimizelyVariation) {
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
              ...(optimizelyVariation &&
                optimizelyVariation !== 'off' && {
                  // this has value
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
    ],
  );
};

export default (
  eventTrackingData = {},
  experimentFlagKey = '',
  isClientSide = false,
) => {
  const { isAmp } = useContext(RequestContext);
  const isHydrated = useHydrationDetection();

  const clickTracker = useClickTrackerHandler(
    eventTrackingData,
    experimentFlagKey,
    isClientSide,
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
