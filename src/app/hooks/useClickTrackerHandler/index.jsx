/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { isValidClick } from './clickTypes';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useTrackingToggle from '#hooks/useTrackingToggle';

const EVENT_TYPE = 'click';

const useClickTrackerHandler = (props = {}) => {
  const preventNavigation = props?.preventNavigation;
  const componentName = props?.componentName;
  const url = props?.url;
  const advertiserID = props?.advertiserID;
  const format = props?.format;

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);
  const eventTrackingContext = useContext(EventTrackingContext);
  const { pageIdentifier, platform, producerId, statsDestination } =
    eventTrackingContext;
  const campaignID = props?.campaignID || eventTrackingContext?.campaignID;
  const { service } = useContext(ServiceContext);

  return useCallback(
    async event => {
      const shouldRegisterClick = [
        trackingIsEnabled,
        !clicked,
        isValidClick(event),
      ].every(Boolean);

      if (shouldRegisterClick) {
        setClicked(true);

        const shouldSendEvent = [
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          service,
          statsDestination,
        ].every(Boolean);

        if (shouldSendEvent) {
          const nextPageUrl = event?.currentTarget?.href;

          event.stopPropagation();
          event.preventDefault();

          try {
            await sendEventBeacon({
              type: EVENT_TYPE,
              campaignID,
              componentName,
              format,
              pageIdentifier,
              platform,
              producerId,
              service,
              advertiserID,
              statsDestination,
              url,
            });
          } finally {
            if (nextPageUrl && !preventNavigation) {
              window.location.assign(nextPageUrl);
            }
          }
        }
      }
    },
    [
      trackingIsEnabled,
      clicked,
      campaignID,
      componentName,
      pageIdentifier,
      platform,
      preventNavigation,
      producerId,
      service,
      statsDestination,
      url,
      advertiserID,
      format,
    ],
  );
};

export default useClickTrackerHandler;
