/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState, useRef } from 'react';
import prop from 'ramda/src/prop';

import { RequestContext } from '#app/contexts/RequestContext';
import {
  LITE_ATI_VIEW_TRACKING,
  VIEW_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import constructLiteSiteATIEventTrackUrl from '#src/server/utilities/liteATITracking/constructATIUrl';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '../../lib/config/optimizely';
import { ServiceContext } from '../../contexts/ServiceContext';

const VIEWED_DURATION_MS = 1000;
const MIN_VIEWED_PERCENT = 0.5;

const getViewRef = (props = {}) => {
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
    optimizely,
    optimizelyMetricNameOverride,
  } = extractATITrackingProps({ props, eventType: VIEW_EVENT });

  const observer = useRef();
  const timer = useRef(null);
  const [isInView, setIsInView] = useState();
  const [eventSent, setEventSent] = useState(false);
  const { trackingIsEnabled } = useTrackingToggle(componentName);

  const { service, useReverb } = useContext(ServiceContext);

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
          if (optimizely) {
            const eventName = OPTIMIZELY_CONFIG.viewClickAttributeId;

            const overrideAttributes = {
              ...optimizely.user.attributes,
              [`viewed_${eventName}`]: true,
            };

            optimizely.track(
              optimizelyMetricNameOverride
                ? `${optimizelyMetricNameOverride}_views`
                : 'component_views',
              optimizely.user.id,
              overrideAttributes,
            );
          }

          const optimizelyVariation =
            optimizely?.getVariation(OPTIMIZELY_CONFIG.ruleKey) || null;

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
            ...(optimizelyVariation &&
              optimizelyVariation !== 'off' && {
                experimentVariant: optimizelyVariation,
              }),
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
    producerName,
    service,
    statsDestination,
    trackingIsEnabled,
    eventSent,
    advertiserID,
    url,
    optimizely,
    optimizelyMetricNameOverride,
    detailedPlacement,
    useReverb,
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

export default (props = {}) => {
  const { isLite } = useContext(RequestContext);
  const viewRef = getViewRef(props);
  const liteATIUrl = constructLiteSiteATIEventTrackUrl({
    props,
    eventType: VIEW_EVENT,
  });

  return isLite
    ? { [LITE_ATI_VIEW_TRACKING]: liteATIUrl }
    : {
        ref: viewRef,
      };
};
