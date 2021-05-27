import { useContext, useEffect, useState, useRef } from 'react';
import path from 'ramda/src/path';
import { observe } from 'react-intersection-observer';
// Polyfill IntersectionObserver, e.g. for IE11
import 'intersection-observer';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../useToggle';

const EVENT_TYPE = 'view';
const VIEWED_DURATION_MS = 1000;

const useViewTracker = (props = {}) => {
  const componentName = path(['componentName'], props);
  const format = path(['format'], props);
  const url = path(['url'], props);
  const timer = useRef(null);
  const [inView, setInView] = useState(false);
  const [viewSent, setViewSent] = useState(false);
  const { enabled: eventTrackingIsEnabled } = useToggle('eventTracking');
  const {
    campaignID,
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
  } = useContext(EventTrackingContext);
  const { service } = useContext(ServiceContext);

  useEffect(() => {
    if (eventTrackingIsEnabled && inView && !timer.current) {
      timer.current = setTimeout(() => {
        const shouldSendEvent = [
          !viewSent,
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          service,
          statsDestination,
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
          setViewSent(true);
        }
      }, VIEWED_DURATION_MS);
    } else {
      clearTimeout(timer.current);
      timer.current = null;
    }

    return () => clearTimeout(timer.current);
  }, [
    campaignID,
    componentName,
    eventTrackingIsEnabled,
    format,
    inView,
    pageIdentifier,
    platform,
    producerId,
    service,
    statsDestination,
    url,
    viewSent,
  ]);

  return node => {
    if (eventTrackingIsEnabled && !viewSent) {
      const destroy = observe(
        node,
        isIntersecting => {
          if (isIntersecting) {
            setInView(true);
            destroy();
          }
        },
        {
          threshold: 0.5,
        },
      );
    }
  };
};

export default useViewTracker;
