/* eslint-disable no-console */
import { useCallback, useState } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { isValidClick } from './clickTypes';

const EVENT_TYPE = 'click';

const useClickTrackingHandler = ({
  service,
  componentName,
  campaignName,
  format = '',
  href,
  pageIdentifier,
  platform,
  statsDestination,
} = {}) => {
  const [clicked, setClicked] = useState(false);

  const changeUserLocationIfDefined = useCallback(url => {
    if (url) {
      window.location.assign(url);
    }
  }, []);

  return event => {
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
  };
};

export default useClickTrackingHandler;
