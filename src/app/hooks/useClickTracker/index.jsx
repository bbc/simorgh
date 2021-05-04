import { useEffect, useRef, useContext, useCallback } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { getComponentInfo } from '#app/lib/analyticsUtils/index';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import { isValidClick } from './helpers';

const useClickTracker = ({ pageData, componentName } = {}) => {
  let eventTrackingProps;

  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { service } = serviceContext;
  const clickRef = useRef(null);

  try {
    eventTrackingProps = buildATIClickParams(
      pageData,
      requestContext,
      serviceContext,
    );
  } catch (e) {
    eventTrackingProps = null;
  }

  const handleClick = useCallback(
    event => {
      let componentInfo;
      event.stopPropagation();

      if (isValidClick(event)) {
        clickRef.current?.removeEventListener('click', handleClick);

        try {
          componentInfo = getComponentInfo({
            result: event.target.href || window.location.href,
            componentName,
            componentData: {
              actionLabel: 'click',
              child: event.target.tagName,
            },
          });
        } catch (e) {
          componentInfo = null;
        }

        if (eventTrackingProps && componentInfo) {
          sendEventBeacon({
            type: 'click',
            componentName,
            service,
            componentInfo,
            ...eventTrackingProps,
          });
        }
      }
    },
    [componentName, eventTrackingProps, service],
  );

  useEffect(() => {
    const trackedComponent = clickRef.current;
    trackedComponent?.addEventListener('click', handleClick);

    return () => trackedComponent?.removeEventListener('click', handleClick);
  }, [handleClick]);

  return clickRef;
};

export default useClickTracker;
