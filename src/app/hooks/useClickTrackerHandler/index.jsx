/* eslint-disable no-console */
import { use, useCallback, useState } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import {
  CLICK_EVENT,
  STATIC_REVERB_CLICK_TRACKING,
} from '#app/lib/analyticsUtils/analytics.const';
import { RequestContext } from '#app/contexts/RequestContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import constructReverbUrl from '#app/lib/analyticsUtils/staticATITracking/constructReverbUrl';
import useTrackingToggle from '../useTrackingToggle';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const useClickTrackerHandler = (eventTrackingData = {}, spaLink = false) => {
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
    experimentName,
    experimentVariant,
    groupTracker,
    itemTracker,
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clickedIdentifier, setClickedIdentifier] = useState(null);

  const { service, useReverb } = use(ServiceContext);
  const { optimizely } = use(OptimizelyContext);

  return useCallback(
    async event => {
      const nextPageUrl = event?.currentTarget?.href;
      const trackingIdentifier = nextPageUrl || componentName;
      const wasClicked = clickedIdentifier === trackingIdentifier;

      const shouldRegisterClick = [
        trackingIsEnabled,
        !wasClicked,
        isValidClick(event),
      ].every(Boolean);

      if (shouldRegisterClick) {
        setClickedIdentifier(trackingIdentifier);

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
          if (!spaLink) {
            event.stopPropagation();
            event.preventDefault();
          }

          if (
            optimizely &&
            experimentVariant &&
            experimentVariant !== 'off' &&
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
              ...(experimentVariant &&
                experimentVariant !== 'off' && {
                  experimentName,
                  experimentVariant,
                }),
            });
          } finally {
            if (nextPageUrl && !preventNavigation) {
              if (optimizely) {
                optimizely.close();
              }
              if (!spaLink) {
                window.location.assign(nextPageUrl);
              }
            }
          }
        }
      }
    },
    [
      componentName,
      clickedIdentifier,
      trackingIsEnabled,
      campaignID,
      pageIdentifier,
      platform,
      producerId,
      producerName,
      service,
      statsDestination,
      spaLink,
      optimizely,
      experimentVariant,
      sendOptimizelyEvents,
      format,
      advertiserID,
      url,
      detailedPlacement,
      useReverb,
      groupTracker,
      itemTracker,
      experimentName,
      preventNavigation,
    ],
  );
};

export default (eventTrackingData = {}, spaLink = false) => {
  const { isAmp } = use(RequestContext);
  const isHydrated = useHydrationDetection();

  const clickTracker = useClickTrackerHandler(eventTrackingData, spaLink);

  const enableStaticTracking = !isHydrated && !isAmp;
  const reverbStaticUrl = constructReverbUrl({
    eventTrackingData,
    eventType: CLICK_EVENT,
  });

  return {
    ...(enableStaticTracking && {
      [STATIC_REVERB_CLICK_TRACKING]: reverbStaticUrl,
    }),
    ...(isHydrated && { onClick: clickTracker }),
  };
};
