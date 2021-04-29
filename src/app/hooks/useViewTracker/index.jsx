import { useEffect, useState, useContext, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
// Polyfill IntersectionObserver, e.g. for IE11
import 'intersection-observer';

import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import { getComponentInfo } from '#app/lib/analyticsUtils/index';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';

const VIEWED_DURATION_MS = 1000;

const useViewTracker = ({ pageData, componentName, actionLabel } = {}) => {
  let eventTrackingProps;
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const timer = useRef(null);
  const [viewSent, setViewSent] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  try {
    eventTrackingProps = buildATIClickParams(
      pageData,
      requestContext,
      serviceContext,
    );
  } catch (error) {
    eventTrackingProps = null;
  }

  useEffect(() => {
    let componentInfo;

    try {
      componentInfo = getComponentInfo({
        result: window.location.href,
        componentName,
        componentData: {
          actionLabel,
          child: 'link', // TODO ask Jon B what this should be
        },
      });
    } catch (error) {
      componentInfo = null;
    }

    if (inView && !timer.current) {
      timer.current = setTimeout(() => {
        const shouldSendEvent = [
          !viewSent,
          eventTrackingProps,
          componentInfo,
        ].every(Boolean);

        if (shouldSendEvent) {
          sendEventBeacon({
            type: 'view',
            componentName,
            service: serviceContext.service,
            componentInfo,
            ...eventTrackingProps,
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
    inView,
    viewSent,
    componentName,
    eventTrackingProps,
    serviceContext.service,
    actionLabel,
  ]);

  return { trackRef: ref };
};

export default useViewTracker;
