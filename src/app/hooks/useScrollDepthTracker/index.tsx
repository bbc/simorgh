import { use, useCallback, useEffect, useRef, useState } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import dispatchTrackingRequests from '#app/lib/analyticsUtils/dispatchTrackingRequests';
import useTrackingToggle from '../useTrackingToggle';

const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;

type ScrollDepthThreshold = (typeof SCROLL_DEPTH_THRESHOLDS)[number];

// Describes the vertical range of a page that counts as readable content,
// expressed as Y positions in page coordinates (pixels from the top of the
// document, not the top of the screen). The tracked element is passed in so
// the function can query its size and position if needed.
export type GetTrackingBounds = (element: HTMLElement) => {
  startY: number;
  endY: number;
};

// For article pages. Tracking starts from the bottom of the hero image so that
// scrolling through the image does not count as reading. If there is no hero
// image the full article element is measured instead.
export const getArticleBounds: GetTrackingBounds = element => {
  const heroFigure = element.querySelector('figure');
  const startY = heroFigure
    ? heroFigure.getBoundingClientRect().bottom + window.scrollY
    : element.getBoundingClientRect().top + window.scrollY;
  const endY =
    element.getBoundingClientRect().top + window.scrollY + element.offsetHeight;
  return { startY, endY };
};

// For home pages. Tracking starts where the page header ends and stops where
// the footer begins, so only the curated content area is measured. Falls back
// to the full document if either landmark element is not found.
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

// Returns what percentage of the trackable range (startY to endY) the user
// has scrolled through. Uses the bottom edge of the viewport as the reading
// position — a threshold is reached when the bottom of the screen passes it.
const getScrollDepthPercent = (startY: number, endY: number) => {
  const trackingHeight = endY - startY;

  if (trackingHeight <= 0) return 0;

  // The Y position of the bottom edge of what is currently visible on screen
  const viewportBottom = window.scrollY + window.innerHeight;

  // How many pixels of the trackable range have passed the bottom of the screen
  const scrolledPast = viewportBottom - startY;
  return Math.min(100, Math.max(0, (scrolledPast / trackingHeight) * 100));
};

const useScrollDepthTracker = (
  componentName: string,
  enabled = true,
  getBounds: GetTrackingBounds = getArticleBounds,
) => {
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
  const tickingRef = useRef(false);
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);

  const shouldTrack = enabled && trackingIsEnabled && !isAmp && !isLite;

  useEffect(() => {
    sentThresholds.current.clear();
    // Reset when the tracked element changes so a new article or page navigation
    // starts fresh from 0% rather than inheriting the previous element's state.
  }, [mainElement]);

  useEffect(() => {
    if (!mainElement || !shouldTrack) return undefined;

    tickingRef.current = false;

    // Measure the trackable boundaries once when tracking begins. Page landmarks
    // (header, footer, hero image) don't move while the user scrolls, so there
    // is no need to re-measure on every animation frame.
    const { startY, endY } = getBounds(mainElement);

    const checkDepth = () => {
      // All four thresholds have already fired so there is nothing left to track
      if (sentThresholds.current.size === SCROLL_DEPTH_THRESHOLDS.length)
        return;

      const depth = getScrollDepthPercent(startY, endY);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getBounds is intentionally omitted: it is called once at effect setup to cache the bounds, not on every scroll frame
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
