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
    alwaysInView,
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
    // console.log('$$$$$$$$$$$$$$$$$$$');
    // console.log('initObserver INVOKED for');
    // console.log('COMPONENT NAME', componentName);
    // console.log('$$$$$$$$$$$$$$$$$$$');
  
    if (typeof window.IntersectionObserver === 'undefined') {
      // Polyfill IntersectionObserver, e.g. for IE11
      await import('intersection-observer');
    }

    const callback = (elements: IntersectionObserverEntry[]) => {
      const someElementsAreInView = elements.some(
        element => element.isIntersecting,
      );

      setIsInView(someElementsAreInView);

      // console.log('###################');
      // console.log('setIsInView - DONE');
      // console.log('someElementsAreInView', someElementsAreInView);
      // console.log('COMPONENT NAME', componentName);
      // console.log('###################');
    };

    const options = {
      threshold: [threshold],
    };

    // @ts-expect-error current element won't be null
    observer.current = new IntersectionObserver(callback, options);
  };

  useEffect(() => {
    console.log('&&&&&&&&&&&&&&&&&&');
    console.log('useEffect INVOKED for COMPONENT NAME', componentName);
    console.log('isInView', isInView);
    console.log('^^^^^^^^^^^^^^^^^^^^');
    console.log('campaignID', campaignID);
    console.log('componentName', componentName);
    console.log('format', format);
    console.log('isInView', isInView);
    console.log('pageIdentifier', pageIdentifier);
    console.log('platform', platform);
    console.log('producerId', producerId);
    console.log('producerName', producerName);
    console.log('service', service);
    console.log('statsDestination', statsDestination);
    console.log('trackingIsEnabled', trackingIsEnabled);
    console.log('eventSent', eventSent);
    console.log('advertiserID', advertiserID);
    console.log('url', url);
    console.log('sendOptimizelyEvents', sendOptimizelyEvents);
    console.log('optimizely', optimizely);
    console.log('experimentName', experimentName);
    console.log('experimentVariant', experimentVariant);
    console.log('detailedPlacement', detailedPlacement);
    console.log('useReverb', useReverb);
    console.log('itemTracker', itemTracker);
    console.log('groupTracker', groupTracker);
    console.log('alwaysInView', alwaysInView);
    console.log('&&&&&&&&&&&&&&&&&&');

    if (alwaysInView || (isInView && !timer.current)) {
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

          if (!alwaysInView) setEventSent(true);

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
    alwaysInView,
  ]);

  const viewTracker = useCallback(
    async (element: HTMLElement) => {
      if (alwaysInView) return;
      if (!element || !trackingIsEnabled || eventSent) return;
      if (!observer.current) await initObserver(viewThreshold);
      (observer.current as unknown as IntersectionObserver)?.observe(element);
    },
    [trackingIsEnabled, eventSent, viewThreshold, alwaysInView],
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
