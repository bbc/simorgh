import { useContext, useEffect, useState, useRef } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { useInView } from 'react-intersection-observer';
// Polyfill IntersectionObserver, e.g. for IE11
import 'intersection-observer';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';

const EVENT_TYPE = 'view';
const VIEWED_DURATION_MS = 1000;

const useViewTracker = (props = {}) => {
  const campaignName = path(['campaignName'], props);
  const componentName = path(['componentName'], props);
  const format = pathOr('', ['format'], props);
  const url = path(['url'], props);
  const timer = useRef(null);
  const [viewSent, setViewSent] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const { pageIdentifier, platform, service, statsDestination } = useContext(
    EventTrackingContext,
  );

  useEffect(() => {
    if (inView && !timer.current) {
      timer.current = setTimeout(() => {
        const shouldSendEvent = [
          !viewSent,
          campaignName,
          componentName,
          pageIdentifier,
          platform,
          service,
          statsDestination,
        ].every(Boolean);

        if (shouldSendEvent) {
          sendEventBeacon({
            campaignName,
            componentName,
            format,
            pageIdentifier,
            platform,
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
    campaignName,
    componentName,
    format,
    inView,
    pageIdentifier,
    platform,
    service,
    statsDestination,
    url,
    viewSent,
  ]);

  return ref;
};

export default useViewTracker;
