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

type RequiredEventProps = Pick<
  EventTrackingData,
  | 'campaignID'
  | 'componentName'
  | 'pageIdentifier'
  | 'platform'
  | 'producerId'
  | 'producerName'
  | 'service'
  | 'statsDestination'
> & { trackingIsEnabled: boolean; eventSent: boolean };

const shouldDispatchEventBeacon = ({
  campaignID,
  componentName,
  pageIdentifier,
  platform,
  producerId,
  producerName,
  service,
  statsDestination,
  trackingIsEnabled,
  eventSent,
}: RequiredEventProps) => {
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

  return [hasRequiredProps, trackingIsEnabled, !eventSent].every(Boolean);
};

const trackComponentInOptimizely = ({
  optimizely,
  sendOptimizelyEvents,
  experimentVariant,
  componentName,
}: Pick<
  EventTrackingData,
  'sendOptimizelyEvents' | 'experimentVariant' | 'componentName'
>) => {
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
};

const dispatchTrackingRequests = ({
  optimizelyParameters,
  reverbParameters,
  trackingIsEnabled,
  eventSent,
}) => {
  const {
    campaignID,
    componentName,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
  } = reverbParameters;

  const shouldSendEvent = shouldDispatchEventBeacon({
    campaignID,
    componentName,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
    trackingIsEnabled,
    eventSent,
  });

  if (shouldSendEvent) {
    trackComponentInOptimizely(optimizelyParameters);

    sendEventBeacon(reverbParameters);
  }
};

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
  const [componentHasComeIntoView, setcomponentHasComeIntoView] =
    useState(false);
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

      setcomponentHasComeIntoView(someElementsAreInView);
    };

    const options = {
      threshold: [threshold],
    };

    // @ts-expect-error current element won't be null
    observer.current = new IntersectionObserver(callback, options);
  };

  useEffect(() => {
    if (alwaysInView) {
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
        trackingIsEnabled,
        eventSent,
      });
    } else if (componentHasComeIntoView && !timer.current) {
      // @ts-expect-error timer ref won't be null
      timer.current = setTimeout(() => {
        dispatchTrackingRequests({
          optimizelyParameters: {
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
          trackingIsEnabled,
          eventSent,
        });

        if (!alwaysInView) setEventSent(true);

        (observer.current as unknown as IntersectionObserver)?.disconnect();
        observer.current = null;
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
        if (!observer.current) await initObserver(viewThreshold);
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
