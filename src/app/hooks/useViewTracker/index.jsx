import { useEffect, useState, useContext, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
// Polyfill IntersectionObserver, e.g. for IE11
import 'intersection-observer';

import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';

const EVENT_TYPE = 'view';
const VIEWED_DURATION_MS = 1000;

const useViewTracker = ({
  pageData,
  componentName,
  campaignName,
  format = '',
  url = '',
} = {}) => {
  let pageIdentifier;
  let platform;
  let statsDestination;
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { service } = serviceContext;
  const timer = useRef(null);
  const [viewSent, setViewSent] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  try {
    ({ pageIdentifier, platform, statsDestination } = buildATIClickParams(
      pageData,
      requestContext,
      serviceContext,
    ));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `ATI Event Tracking Error: Could not parse tracking values from page data:\n${error.message}`,
    );
  }

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
    viewSent,
    url,
  ]);

  return { trackRef: ref };
};

export default useViewTracker;
