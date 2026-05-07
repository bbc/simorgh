import { use, useCallback, useEffect, useRef, useState } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import dispatchTrackingRequests from '#app/lib/analyticsUtils/dispatchTrackingRequests';
import useTrackingToggle from '../useTrackingToggle';

const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;

type ScrollDepthThreshold = (typeof SCROLL_DEPTH_THRESHOLDS)[number];

const getScrollDepthPercent = (element: HTMLElement) => {
  const firstFigure = element.querySelector('figure');
  const trackingStartY = firstFigure
    ? firstFigure.getBoundingClientRect().bottom + window.scrollY
    : element.getBoundingClientRect().top + window.scrollY;
  const trackingEndY =
    element.getBoundingClientRect().top + window.scrollY + element.offsetHeight;
  const trackingHeight = trackingEndY - trackingStartY;

  if (trackingHeight <= 0) return 0;

  const viewportBottom = window.scrollY + window.innerHeight;
  const scrolledPast = viewportBottom - trackingStartY;
  return Math.min(100, Math.max(0, (scrolledPast / trackingHeight) * 100));
};

const useScrollDepthTracker = (componentName: string, enabled = true) => {
  const { isAmp, isLite } = use(RequestContext);
  const { service } = use(ServiceContext);
  const { trackingIsEnabled } = useTrackingToggle(componentName);

  const {
    campaignID,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    statsDestination,
  } = extractATITrackingProps({
    eventTrackingData: { componentName },
    eventType: VIEW_EVENT,
  });

  const sentThresholds = useRef(new Set<ScrollDepthThreshold>());
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);

  const shouldTrack = enabled && trackingIsEnabled && !isAmp && !isLite;

  useEffect(() => {
    if (!mainElement || !shouldTrack) return undefined;

    sentThresholds.current.clear();

    const handleScroll = () => {
      const depth = getScrollDepthPercent(mainElement);

      SCROLL_DEPTH_THRESHOLDS.forEach(threshold => {
        if (depth >= threshold && !sentThresholds.current.has(threshold)) {
          sentThresholds.current.add(threshold);
          dispatchTrackingRequests({
            reverbParameters: {
              campaignID,
              componentName: `${componentName}-${threshold}`,
              pageIdentifier,
              platform,
              producerId,
              producerName,
              service,
              statsDestination,
              type: VIEW_EVENT,
            },
            trackingFlags: {
              trackingIsEnabled,
              eventSent: false,
              alwaysInView: false,
            },
          });
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    campaignID,
    componentName,
    mainElement,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    shouldTrack,
    statsDestination,
    trackingIsEnabled,
  ]);

  return useCallback((element: HTMLElement | null) => {
    setMainElement(element);
  }, []);
};

export default useScrollDepthTracker;
