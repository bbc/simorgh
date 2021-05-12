/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { isValidClick } from './clickTypes';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';

const EVENT_TYPE = 'click';

const useClickTrackingHandler = (props = {}) => {
  const campaignName = path(['campaignName'], props);
  const componentName = path(['componentName'], props);
  const href = path(['href'], props);
  const format = pathOr('', ['format'], props);

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
            }).finally(() => {
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
