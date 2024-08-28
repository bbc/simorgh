/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import { EventTrackingContext } from '#contexts/EventTrackingContext';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '#contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const EVENT_TYPE = 'click';

const useClickTrackerHandler = (props = {}) => {
  const preventNavigation = path(['preventNavigation'], props);
  const componentName = path(['componentName'], props);
  const url = path(['url'], props);
  const advertiserID = path(['advertiserID'], props);
  const format = path(['format'], props);
  const optimizely = path(['optimizely'], props);
  const detailedPlacement = props?.detailedPlacement;

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);
  const eventTrackingContext = useContext(EventTrackingContext);
  const { pageIdentifier, platform, producerId, statsDestination } =
    eventTrackingContext;
  const campaignID = pathOr(
    path(['campaignID'], eventTrackingContext),
    ['campaignID'],
    props,
  );
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
          const nextPageUrl = path(['currentTarget', 'href'], event);

          event.stopPropagation();
          event.preventDefault();

          if (optimizely) {
            const overrideAttributes = {
              ...optimizely.user.attributes,
              [`clicked_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
            };

            optimizely.track(
              'component_clicks',
              optimizely.user.id,
              overrideAttributes,
            );
          }

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
              detailedPlacement,
            });
          } finally {
            if (nextPageUrl && !preventNavigation) {
              if (optimizely) {
                optimizely.close();
              }
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
      optimizely,
      detailedPlacement,
    ],
  );
};

export default useClickTrackerHandler;
