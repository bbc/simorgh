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

// allowlist of onward journey components that should feed the total oj clicks event
const OJ_COMPONENT_NAMES = [
  'midarticle-mostread',
  'top-stories',
  'features',
  'related-content',
  'most-read',
  // media curation renders as simple-curation-grid tracking events
  'simple-curation-grid',
];

// handle the total oj clicks event to specific onward journey experiments
const OJ_OPTIMIZELY_EXPERIMENTS = ['newswb_ws_tod_article_2'];

const OJ_OPTIMIZELY_CLICK_EVENT = 'oj_clicks';

// only fire the total oj clicks event when the component and experiment are in scope
const shouldTrackOjClick = (componentName, experimentName) =>
  OJ_COMPONENT_NAMES.includes(componentName) &&
  OJ_OPTIMIZELY_EXPERIMENTS.includes(experimentName);

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
    isSignedIn,
    hashedId,
  } = extractATITrackingProps({ eventTrackingData, eventType: CLICK_EVENT });

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clickedIdentifier, setClickedIdentifier] = useState(null);

  const { service } = use(ServiceContext);
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

            // send the extra optimizely event for the total oj clicks metric
            if (shouldTrackOjClick(componentName, experimentName)) {
              optimizely.track(
                OJ_OPTIMIZELY_CLICK_EVENT,
                optimizely.user.id,
                overrideAttributes,
              );
            }
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
      optimizely,
      experimentVariant,
      sendOptimizelyEvents,
      format,
      advertiserID,
      url,
      detailedPlacement,
      groupTracker,
      itemTracker,
      experimentName,
      preventNavigation,
      isSignedIn,
      hashedId,
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
