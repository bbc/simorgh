import { use, useCallback, useEffect, useRef, useState } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import dispatchTrackingRequests from '#app/lib/analyticsUtils/dispatchTrackingRequests';
import useTrackingToggle from '../useTrackingToggle';

const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;

type ScrollDepthThreshold = (typeof SCROLL_DEPTH_THRESHOLDS)[number];

// A function that receives the tracked element and returns the vertical range
// (in page coordinates) over which scroll depth should be measured.
export type GetTrackingBounds = (element: HTMLElement) => {
  startY: number;
  endY: number;
};

// Article pages: start below the hero image (if present), end at the bottom of
// the article element.
export const getArticleBounds: GetTrackingBounds = element => {
  const heroFigure = element.querySelector('figure');
  const startY = heroFigure
    ? heroFigure.getBoundingClientRect().bottom + window.scrollY
    : element.getBoundingClientRect().top + window.scrollY;
  const endY =
    element.getBoundingClientRect().top + window.scrollY + element.offsetHeight;
  return { startY, endY };
};

// Home pages: start below the page header, end at the top of the page footer.
// Falls back to the full document height if either landmark is not found.
export const getHomePageBounds: GetTrackingBounds = () => {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const startY = header
    ? header.getBoundingClientRect().bottom + window.scrollY
    : 0;
  const endY = footer
    ? footer.getBoundingClientRect().top + window.scrollY
    : document.documentElement.scrollHeight;
  return { startY, endY };
};

// uses whichever bounds it is given to calculate scroll depth, so it can be used on both article and home pages (or any other page with appropriate bounds functions)
const getScrollDepthPercent = (
  element: HTMLElement,
  getBounds: GetTrackingBounds,
) => {
  const { startY: trackingStartY, endY: trackingEndY } = getBounds(element);
  const trackingHeight = trackingEndY - trackingStartY;

  if (trackingHeight <= 0) return 0;

  const viewportBottom = window.scrollY + window.innerHeight;
  const scrolledPast = viewportBottom - trackingStartY;
  return Math.min(100, Math.max(0, (scrolledPast / trackingHeight) * 100));
};

const useScrollDepthTracker = (
  componentName: string,
  enabled = true,
  getBounds: GetTrackingBounds = getArticleBounds,
) => {
  const { isAmp, isLite } = use(RequestContext);
  const { service } = use(ServiceContext);
  const { trackingIsEnabled } = useTrackingToggle(componentName); // this is in the togglrd config to enable/disable trackong across the site

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
  const tickingRef = useRef(false);
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);

  const shouldTrack = enabled && trackingIsEnabled && !isAmp && !isLite;

  useEffect(() => {
    sentThresholds.current.clear();
  }, [mainElement]); // clears thresholds when the main element changes, such as when navigating to a new page

  useEffect(() => {
    if (!mainElement || !shouldTrack) return undefined;

    tickingRef.current = false;

    const checkDepth = () => {
      if (sentThresholds.current.size === SCROLL_DEPTH_THRESHOLDS.length)
        return; // if all scroll depth events have been sent, no need to calculate further

      const depth = getScrollDepthPercent(mainElement, getBounds);

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
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(checkDepth);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    campaignID,
    componentName,
    getBounds,
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