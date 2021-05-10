/* eslint-disable no-console */
import { useEffect, useRef, useContext, useCallback } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import { isValidClick } from './clickTypes';

const EVENT_TYPE = 'click';

const useClickTracker = ({
  pageData,
  componentName,
  campaignName,
  format = '',
  href,
} = {}) => {
  let pageIdentifier;
  let platform;
  let statsDestination;

  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { service } = serviceContext;

  const clickRef = useRef(null);

  const changeUserLocationIfDefined = useCallback(url => {
    if (url) {
      window.location.assign(url);
    }
  }, []);

  try {
    ({ pageIdentifier, platform, statsDestination } = buildATIClickParams(
      pageData,
      requestContext,
      serviceContext,
    ));
  } catch (error) {
    console.error(
      `ATI Event Tracking Error: Could not parse tracking values from page data:\n${error.message}`,
    );
  }

  const handleClick = useCallback(
    event => {
      event.stopPropagation();
      event.preventDefault();

      if (isValidClick(event)) {
        const nextPageUrl = href || event.target.href;
        clickRef.current?.removeEventListener('click', handleClick);

        const shouldSendEvent = [
          campaignName,
          componentName,
          format,
          pageIdentifier,
          platform,
          service,
          statsDestination,
        ].every(Boolean);

        console.log(`SHOULD SEND EVENT: ${shouldSendEvent}`);

        if (shouldSendEvent) {
          sendEventBeacon({
            type: EVENT_TYPE,
            campaignName,
            componentName,
            format,
            pageIdentifier,
            platform,
            service,
            statsDestination,
            url: window.location.href,
          })
            .catch(error => {
              console.error(
                `Error sending ATI click tracking request: ${error.message}`,
              );
            })
            .finally(() => {
              changeUserLocationIfDefined(nextPageUrl);
            });
        } else {
          changeUserLocationIfDefined(nextPageUrl);
        }
      }
    },
    [
      campaignName,
      changeUserLocationIfDefined,
      componentName,
      format,
      href,
      pageIdentifier,
      platform,
      service,
      statsDestination,
    ],
  );

  useEffect(() => {
    const trackedComponent = clickRef.current;
    trackedComponent?.addEventListener('click', handleClick);

    return () => trackedComponent?.removeEventListener('click', handleClick);
  }, [handleClick]);

  return clickRef;
};

export default useClickTracker;
