/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import path from 'ramda/src/path';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { isValidClick } from './clickTypes';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ServiceContext } from '#contexts/ServiceContext';

const EVENT_TYPE = 'click';

const useClickTrackerHandler = (props = {}) => {
  const campaignName = path(['campaignName'], props);
  const componentName = path(['componentName'], props);
  const href = path(['href'], props);
  const format = path(['format'], props);

  const [clicked, setClicked] = useState(false);
  const { pageIdentifier, platform, statsDestination } = useContext(
    EventTrackingContext,
  );
  const { service } = useContext(ServiceContext);

  return useCallback(
    event => {
      if (!clicked) {
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
            event.stopPropagation();
            event.preventDefault();

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
            }).finally(() => {
              if (nextPageUrl) {
                window.location.assign(nextPageUrl);
              }
            });
          }
        }
      }
    },
    [
      campaignName,
      componentName,
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

export default useClickTrackerHandler;
