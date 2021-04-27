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

// const {trackRef} = useImpression(data)

const useImpression = ({ pageData, componentName }) => {
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
  const componentInfo = getComponentInfo({
    result: 'https://www.bbc.com/mundo/something',
    componentName: 'mostRead',
    componentData: {
      actionLabel: 'most-read-navigate',
      child: 'link',
    },
  });

  useEffect(() => {
    let timeout;

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
    componentInfo,
    eventTrackingProps,
    serviceContext.service,
  ]);

  return { trackRef: ref };
};

export default useImpression;
