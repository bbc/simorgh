import { useEffect, useRef, useContext, useCallback } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { getComponentInfo } from '#app/lib/analyticsUtils/index';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import { isValidClick } from './clickTypes';

const useClickTracker = ({ pageData, componentName, href } = {}) => {
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
    console.error('Failed to build ATI tracking params.');
    eventTrackingProps = null;
  }

  const handleClick = useCallback(
    event => {
      let componentInfo;
      event.stopPropagation();
      event.preventDefault();

      if (isValidClick(event)) {
        clickRef.current?.removeEventListener('click', handleClick);

        try {
          componentInfo = getComponentInfo({
            result: href || event.target.href || window.location.href,
            componentName,
            componentData: {
              actionLabel: 'click',
              child: event.target.tagName,
            },
          });
        } catch (e) {
          console.error('Error getting component info for .');
          componentInfo = null;
        }

        if (eventTrackingProps && componentInfo) {
          sendEventBeacon({
            type: 'click',
            componentName,
            service,
            componentInfo,
            ...eventTrackingProps,
          })
            .then(() => {
              if (href || event.target.href) {
                window.location.href = href || event.target.href;
              }
            })
            .catch(e => {
              // eslint-disable-next-line no-console
              console.error(`Error sending ATI click tracking request: ${e}`);
              if (href || event.target.href) {
                window.location.href = href || event.target.href;
              }
            });
        }
      }
    },
    [componentName, eventTrackingProps, href, service],
  );

  useEffect(() => {
    const trackedComponent = clickRef.current;
    trackedComponent?.addEventListener('click', handleClick);

    return () => trackedComponent?.removeEventListener('click', handleClick);
  }, [handleClick]);

  return clickRef;
};

export default useClickTracker;
