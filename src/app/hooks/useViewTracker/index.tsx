/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
import { use, useEffect, useState, useRef, useCallback } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { OptimizelyContext } from '@optimizely/react-sdk';
import {
  STATIC_ATI_VIEW_TRACKING,
  VIEW_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import constructStaticATIUrl from '#app/lib/analyticsUtils/staticATITracking/constructATIUrl';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import useTrackingToggle from '../useTrackingToggle';
import { ServiceContext } from '../../contexts/ServiceContext';

const VIEWED_DURATION_MS = 1000;
const MIN_VIEWED_PERCENT = 0.5;

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
  } = extractATITrackingProps({
    eventTrackingData,
    eventType: VIEW_EVENT,
  });

  const { optimizely } = use(OptimizelyContext);

  const observer = useRef(null);
  const timer = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [eventSent, setEventSent] = useState(false);
  const { trackingIsEnabled } = useTrackingToggle(componentName);

  const { service, useReverb } = use(ServiceContext);

  const initObserver = async (threshold = MIN_VIEWED_PERCENT) => {
    if (typeof window.IntersectionObserver === 'undefined') {
      // Polyfill IntersectionObserver, e.g. for IE11
      await import('intersection-observer');
    }

    const callback = (elements: IntersectionObserverEntry[]) => {
      const someElementsAreInView = elements.some(
        element => element.isIntersecting,
      );

      setIsInView(someElementsAreInView);
    };

    const options = {
      threshold: [threshold],
    };

    // @ts-expect-error current element won't be null
    observer.current = new IntersectionObserver(callback, options);
  };

  useEffect(() => {
    if (isInView && !timer.current) {
      // @ts-expect-error timer ref won't be null
      timer.current = setTimeout(() => {
        const hasRequiredProps = [
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          producerName,
          service,
          statsDestination,
        ].every(Boolean);

        const shouldSendEvent = [
          hasRequiredProps,
          trackingIsEnabled,
          !eventSent,
        ].every(Boolean);

        if (shouldSendEvent) {
          if (
            optimizely &&
            sendOptimizelyEvents &&
            experimentVariant &&
            experimentVariant !== 'off'
          ) {
            const overrideAttributes = optimizely?.user.attributes;

            optimizely.track(
              `${componentName}-views`,
              optimizely.user.id as string,
              overrideAttributes,
            );
          }

          sendEventBeacon({
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
          });
          setEventSent(true);
          (observer.current as unknown as IntersectionObserver)?.disconnect();
          observer.current = null;
          timer.current = null;
        }
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
    isInView,
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
  ]);

  const viewTracker = useCallback(
    async (element: HTMLElement) => {
      if (!element || !trackingIsEnabled || eventSent) return;
      if (!observer.current) await initObserver(viewThreshold);
      (observer.current as unknown as IntersectionObserver)?.observe(element);
    },
    [trackingIsEnabled, eventSent, viewThreshold],
  );

  return viewTracker;
};

export default (eventTrackingData?: EventTrackingData): any => {
  const { isLite } = use(RequestContext);

  const viewTracker = getComponentViewTracker(eventTrackingData);

  const staticATIUrl = constructStaticATIUrl({
    eventTrackingData,
    eventType: VIEW_EVENT,
  });

  return isLite
    ? { [STATIC_ATI_VIEW_TRACKING]: staticATIUrl }
    : {
        ref: viewTracker,
      };
};
