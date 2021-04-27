import { useEffect, useState, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
// Polyfill IntersectionObsesrver, e.g. for IE11
import 'intersection-observer';

import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import { getComponentInfo } from '#app/lib/analyticsUtils/index';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';

const VIEWED_DURATION_MS = 1000;

const useImpression = ({ pageData, componentName, actionLabel }) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const [viewSent, setViewSent] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const eventTrackingProps = buildATIClickParams(
    pageData,
    requestContext,
    serviceContext,
  );

  useEffect(() => {
    let timeout;
    const componentInfo = getComponentInfo({
      result: window.location.href,
      componentName,
      componentData: {
        actionLabel,
        child: 'link', // TODO ask Jon B what this should be
      },
    });

    if (inView) {
      timeout = setTimeout(() => {
        if (!viewSent) {
          setViewSent(true);
          sendEventBeacon({
            type: 'view',
            componentName,
            service: serviceContext.service,
            componentInfo,
            ...eventTrackingProps,
          });
        }
      }, VIEWED_DURATION_MS);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
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

export default useImpression;
