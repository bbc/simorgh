import { useContext, useEffect, useState, useRef } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';

import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import { EventTrackingContext } from '../../contexts/EventTrackingContext';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '../../lib/config/optimizely';
import { ServiceContext } from '../../contexts/ServiceContext';

const EVENT_TYPE = 'view';
const VIEWED_DURATION_MS = 1000;
const MIN_VIEWED_PERCENT = 0.5;

const useViewTracker = (props = {}) => {
  const componentName = path(['componentName'], props);
  const format = path(['format'], props);
  const advertiserID = path(['advertiserID'], props);
  const url = path(['url'], props);
  const optimizely = path(['optimizely'], props);
  const detailedPlacement = props?.detailedPlacement;

  const observer = useRef();
  const timer = useRef(null);
  const [isInView, setIsInView] = useState();
  const [eventSent, setEventSent] = useState(false);
  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const eventTrackingContext = useContext(EventTrackingContext);
  const { pageIdentifier, platform, producerId, statsDestination } =
    eventTrackingContext;
  const campaignID = pathOr(
    path(['campaignID'], eventTrackingContext),
    ['campaignID'],
    props,
  );
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
        console.log('VIEW TRACK');
        console.log('campaignID', campaignID);
        console.log('componentName', componentName);
        console.log('format', format);
        console.log('isInView', isInView);
        console.log('pageIdentifier', pageIdentifier);
        console.log('platform', platform);
        console.log('producerId', producerId);
        console.log('service', service);
        console.log('statsDestination', statsDestination);
        console.log('trackingIsEnabled', trackingIsEnabled);
        console.log('eventSent', eventSent);
        console.log('advertiserID', advertiserID);
        console.log('url', url);
        console.log('optimizely', optimizely);
        console.log('detailedPlacement', detailedPlacement);

        const shouldSendEvent = [
          hasRequiredProps,
          trackingIsEnabled,
          !eventSent,
        ].every(Boolean);

        if (shouldSendEvent) {
          if (optimizely) {
            const overrideAttributes = {
              ...optimizely.user.attributes,
              [`viewed_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
            };

            optimizely.track(
              'component_views',
              optimizely.user.id,
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
            service,
            statsDestination,
            type: EVENT_TYPE,
            advertiserID,
            url,
            detailedPlacement,
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
    advertiserID,
    url,
    optimizely,
    detailedPlacement,
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
