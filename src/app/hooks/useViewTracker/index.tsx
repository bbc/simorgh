/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
import { use, useEffect, useState, useRef, useCallback } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { OptimizelyContext } from '@optimizely/react-sdk';
import {
  STATIC_REVERB_VIEW_TRACKING,
  VIEW_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import constructReverbUrl from '#app/lib/analyticsUtils/staticATITracking/constructReverbUrl';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import dispatchTrackingRequests from '../../lib/analyticsUtils/dispatchTrackingRequests';
import getIntersectionObserver from './getIntersectionObserver';

const VIEWED_DURATION_MS = 1000;

const getComponentViewTracker = (eventTrackingData?: EventTrackingData) => {
  const {
    componentName,
    format,
    advertiserID,
    url,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    statsDestination,
    campaignID,
    detailedPlacement,
    sendOptimizelyEvents,
    experimentName,
    experimentVariant,
    groupTracker,
    itemTracker,
    viewThreshold,
    alwaysInView = false,
  } = extractATITrackingProps({
    eventTrackingData,
    eventType: VIEW_EVENT,
  });

  const { optimizely } = use(OptimizelyContext);

  const observer = useRef(null);
  const timer = useRef(null);
  const [componentHasComeIntoView, setComponentHasComeIntoView] =
    useState(alwaysInView);
  const [eventSent, setEventSent] = useState(false);
  const { trackingIsEnabled } = useTrackingToggle(componentName);

  const { service, useReverb } = use(ServiceContext);

  useEffect(() => {
    if (componentHasComeIntoView && !timer.current) {
      // @ts-expect-error timer ref won't be null
      timer.current = setTimeout(() => {
        dispatchTrackingRequests({
          optimizelyParameters: {
            optimizely,
            sendOptimizelyEvents,
            experimentVariant,
            componentName,
          },
          reverbParameters: {
            campaignID,
            componentName,
            format,
            pageIdentifier,
            platform,
            producerId,
            producerName,
            service,
            statsDestination,
            type: VIEW_EVENT,
            advertiserID,
            url,
            detailedPlacement,
            useReverb,
            ...(groupTracker && { groupTracker }),
            ...(itemTracker && { itemTracker }),
            ...(experimentVariant &&
              experimentVariant !== 'off' && {
                experimentName,
                experimentVariant,
              }),
          },
          trackingFlags: {
            trackingIsEnabled,
            eventSent,
            alwaysInView,
          },
        });

        if (!alwaysInView) {
          setEventSent(true);

          (observer.current as unknown as IntersectionObserver)?.disconnect();
          observer.current = null;
        }

        timer.current = null;
      }, VIEWED_DURATION_MS);
    } else {
      // @ts-expect-error current timer will not be null
      clearTimeout(timer.current);
      timer.current = null;
    }

    return () => {
      // @ts-expect-error current timer will not be null
      clearTimeout(timer.current);
    };
  }, [
    campaignID,
    componentName,
    format,
    componentHasComeIntoView,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
    trackingIsEnabled,
    eventSent,
    advertiserID,
    url,
    sendOptimizelyEvents,
    optimizely,
    experimentName,
    experimentVariant,
    detailedPlacement,
    useReverb,
    itemTracker,
    groupTracker,
    alwaysInView,
  ]);

  const viewTracker = useCallback(
    async (element: HTMLElement) => {
      const shouldSetupIntersectionObserver = alwaysInView
        ? false
        : !(!element || !trackingIsEnabled || eventSent);

      if (shouldSetupIntersectionObserver) {
        if (!observer.current) {
          // @ts-expect-error current element won't be null
          observer.current = await getIntersectionObserver({
            threshold: viewThreshold,
            componentViewStateSetter: setComponentHasComeIntoView,
          });
        }
        (observer.current as unknown as IntersectionObserver)?.observe(element);
      }
    },
    [trackingIsEnabled, eventSent, viewThreshold, alwaysInView],
  );

  return viewTracker;
};

export default (eventTrackingData?: EventTrackingData): any => {
  const { isLite } = use(RequestContext);

  const viewTracker = getComponentViewTracker(eventTrackingData);

  const reverbStaticUrl = constructReverbUrl({
    eventTrackingData,
    eventType: VIEW_EVENT,
  });

  return isLite
    ? {
        [STATIC_REVERB_VIEW_TRACKING]: reverbStaticUrl,
      }
    : {
        ref: viewTracker,
      };
};
