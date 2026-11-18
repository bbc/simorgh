/* eslint-disable no-console */
import { use, useCallback, useState } from 'react';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import {
  CLICK_EVENT,
  STATIC_REVERB_CLICK_TRACKING,
} from '#app/lib/analyticsUtils/analytics.const';
import { RequestContext } from '#app/contexts/RequestContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import constructReverbUrl from '#app/lib/analyticsUtils/staticATITracking/constructReverbUrl';
import dispatchViewabilityEvent from '#app/components/ATIAnalytics/resonance/dispatchResonanceEvent';
import buildResonanceEventConfig from '#app/components/ATIAnalytics/resonance/buildResonanceEventConfig';
import useTrackingToggle from '../useTrackingToggle';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const useClickTrackerHandler = (eventTrackingData = {}) => {
  const { isDismissal } = eventTrackingData;
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
    experimentName,
    experimentVariant,
    groupTracker,
    itemTracker,
    isSignedIn,
    hashedId,
    isPersonalisationOn,
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clickedIdentifier, setClickedIdentifier] = useState(null);

  const { service, resonanceEnabled } = use(ServiceContext);

  return useCallback(
    async event => {
      const nextPageUrl = event?.currentTarget?.href;
      const trackingIdentifier = nextPageUrl || componentName;
      const wasClicked = clickedIdentifier === trackingIdentifier;

      const shouldRegisterClick = [
        trackingIsEnabled,
        !wasClicked,
        isDismissal || isValidClick(event),
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
          if (!isDismissal) {
            event.stopPropagation();
            event.preventDefault();
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
              ...(groupTracker && { groupTracker }),
              ...(itemTracker && { itemTracker }),
              isSignedIn,
              hashedId,
              isPersonalisationOn,
              ...(experimentVariant &&
                experimentVariant !== 'off' && {
                  experimentName,
                  experimentVariant,
                }),
            });
            if (resonanceEnabled) {
              dispatchViewabilityEvent(
                buildResonanceEventConfig({
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
                  ...(groupTracker && { groupTracker }),
                  ...(itemTracker && { itemTracker }),
                  isSignedIn,
                  hashedId,
                  ...(experimentVariant &&
                    experimentVariant !== 'off' && {
                      experimentName,
                      experimentVariant,
                    }),
                }),
              );
            }
          } finally {
            if (nextPageUrl && !preventNavigation) {
              window.location.assign(nextPageUrl);
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
      experimentVariant,
      experimentName,
      format,
      advertiserID,
      url,
      detailedPlacement,
      groupTracker,
      itemTracker,
      isDismissal,
      isSignedIn,
      hashedId,
      isPersonalisationOn,
      resonanceEnabled,
      preventNavigation,
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
