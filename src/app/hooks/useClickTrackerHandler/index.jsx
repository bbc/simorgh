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
    sendOptimizelyEvents,
    experimentName,
    experimentVariant,
    groupTracker,
    itemTracker,
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);

  const { service, useReverb } = use(ServiceContext);

  const { optimizely } = use(OptimizelyContext);

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
      experimentName,
      experimentVariant,
      detailedPlacement,
      useReverb,
      itemTracker,
      groupTracker,
    ],
  );
};

export default (eventTrackingData = {}) => {
  const { isAmp } = use(RequestContext);
  const isHydrated = useHydrationDetection();

  const clickTracker = useClickTrackerHandler(eventTrackingData);

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
