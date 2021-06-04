/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import path from 'ramda/src/path';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { isValidClick } from './clickTypes';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useTrackingToggle from '#hooks/useTrackingToggle';

const EVENT_TYPE = 'click';

const useClickTrackerHandler = (props = {}) => {
  const componentName = path(['componentName'], props);
  const href = path(['href'], props);
  const format = path(['format'], props);

  const { trackingIsEnabled } = useTrackingToggle(componentName);

  const [clicked, setClicked] = useState(false);
  const {
    campaignID,
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
  } = useContext(EventTrackingContext);
  const { service } = useContext(ServiceContext);

  return useCallback(
    event => {
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
          const nextPageUrl = href || event.target.href;

          event.stopPropagation();
          event.preventDefault();

          try {
            sendEventBeacon({
              type: EVENT_TYPE,
              campaignID,
              componentName,
              format,
              pageIdentifier,
              platform,
              producerId,
              service,
              statsDestination,
            });
          } finally {
            if (nextPageUrl) {
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
      producerId,
      service,
      statsDestination,
      href,
      format,
    ],
  );
};

export default useClickTrackerHandler;
