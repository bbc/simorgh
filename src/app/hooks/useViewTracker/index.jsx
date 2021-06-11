import { useContext, useEffect, useState, useRef } from 'react';
import path from 'ramda/src/path';
import prop from 'ramda/src/prop';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useTrackingToggle from '#hooks/useTrackingToggle';

const EVENT_TYPE = 'view';
const VIEWED_DURATION_MS = 1000;
const MIN_VIEWED_PERCENT = 0.5;

const useViewTracker = (props = {}) => {
  const componentName = path(['componentName'], props);
  const format = path(['format'], props);
  const url = path(['url'], props);

  const observer = useRef();
  const timer = useRef(null);
  const [isInView, setIsInView] = useState();
  const [eventSent, setEventSent] = useState(false);
  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const {
    campaignID,
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
  } = useContext(EventTrackingContext);
  const { service } = useContext(ServiceContext);
  const initObserver = async () => {
    if (typeof window.IntersectionObserver === 'undefined') {
      // Polyfill IntersectionObserver, e.g. for IE11
      await import('intersection-observer');
    }
    const callback = changes => {
      const someElementsAreInView = changes.some(prop('isIntersecting'));

      setIsInView(someElementsAreInView);
    };
    const options = {
      threshold: [MIN_VIEWED_PERCENT],
    };

    observer.current = new IntersectionObserver(callback, options);
  };

  useEffect(() => {
    if (isInView && !timer.current) {
      timer.current = setTimeout(() => {
        const hasRequiredProps = [
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          service,
          statsDestination,
        ].every(Boolean);

        const shouldSendEvent = [
          hasRequiredProps,
          trackingIsEnabled,
          !eventSent,
        ].every(Boolean);

        if (shouldSendEvent) {
          sendEventBeacon({
            campaignID,
            componentName,
            format,
            pageIdentifier,
            platform,
            producerId,
            service,
            statsDestination,
            type: EVENT_TYPE,
            url,
          });
          setEventSent(true);
          observer.current.disconnect();
          observer.current = null;
          timer.current = null;
        }
      }, VIEWED_DURATION_MS);
    } else {
      clearTimeout(timer.current);
      timer.current = null;
    }

    return () => {
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
    service,
    statsDestination,
    trackingIsEnabled,
    eventSent,
    url,
  ]);

  return async element => {
    if (!element || !trackingIsEnabled || eventSent) {
      return;
    }
    if (!observer.current) {
      await initObserver();
    }

    observer.current.observe(element);
  };
};

export default useViewTracker;
