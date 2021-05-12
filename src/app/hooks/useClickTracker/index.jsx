/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { isValidClick } from './clickTypes';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';

const EVENT_TYPE = 'click';

const useClickTrackingHandler = ({
  campaignName,
  componentName,
  href,
  format = '',
  // url = '',
} = {}) => {
  const [clicked, setClicked] = useState(false);
  const { pageIdentifier, platform, service, statsDestination } = useContext(
    EventTrackingContext,
  );

  const changeUserLocationIfDefined = useCallback(url => {
    if (url) {
      window.location.assign(url);
    }
  }, []);

  return useCallback(
    event => {
      if (!clicked) {
        event.stopPropagation();
        event.preventDefault();

        if (isValidClick(event)) {
          setClicked(true);
          const nextPageUrl = href || event.target.href;

          const shouldSendEvent = [
            campaignName,
            componentName,
            pageIdentifier,
            platform,
            service,
            statsDestination,
          ].every(Boolean);

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
      }
    },
    [
      campaignName,
      componentName,
      changeUserLocationIfDefined,
      clicked,
      format,
      href,
      pageIdentifier,
      platform,
      service,
      statsDestination,
    ],
  );
};

export default useClickTrackingHandler;
