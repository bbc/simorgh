/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';
import { buildATIEventTrackUrl } from '#app/components/ATIAnalytics/atiUrl';
import { RequestContext } from '#app/contexts/RequestContext';
import { EventTrackingContext } from '../../contexts/EventTrackingContext';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '../../lib/config/optimizely';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const CLICK_EVENT = 'click';
export const LITE_ATI_TRACKING = 'data-lite-ati-tracking';

const extractTrackingProps = (props = {}, eventType = null) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const eventTrackingContext = useContext(EventTrackingContext);

  const { componentName, url, advertiserID, format, detailedPlacement } = props;
  const {
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
    producerName,
  } = eventTrackingContext;

  const campaignID = props?.campaignID || eventTrackingContext?.campaignID;

  return {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    componentName,
    campaignID,
    format,
    type: eventType,
    advertiserID,
    url,
    detailedPlacement,
    producerName,
  };
};

const useClickTrackerHandler = (props = {}) => {
  const {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    componentName,
    campaignID,
    format,
    advertiserID,
    url,
    detailedPlacement,
    producerName,
  } = extractTrackingProps(props);

  const preventNavigation = props?.preventNavigation;
  const optimizely = props?.optimizely;
  const optimizelyMetricNameOverride = props?.optimizelyMetricNameOverride;

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);

  const { service, useReverb } = useContext(ServiceContext);

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
          producerName,
          service,
          statsDestination,
        ].every(Boolean);
        if (shouldSendEvent) {
          const nextPageUrl = event?.currentTarget?.href;

          event.stopPropagation();
          event.preventDefault();

          if (optimizely) {
            const eventName = OPTIMIZELY_CONFIG.viewClickAttributeId;

            const overrideAttributes = {
              ...optimizely.user.attributes,
              [`clicked_${eventName}`]: true,
            };

            optimizely.track(
              optimizelyMetricNameOverride
                ? `${optimizelyMetricNameOverride}_clicks`
                : 'component_clicks',
              optimizely.user.id,
              overrideAttributes,
            );
          }

          const optimizelyVariation =
            optimizely?.getVariation(OPTIMIZELY_CONFIG.ruleKey) || null;

          try {
            await sendEventBeacon({
              type: CLICK_EVENT,
              campaignID,
              componentName,
              format,
              pageIdentifier,
              platform,
              producerId,
              producerName,
              service,
              advertiserID,
              statsDestination,
              url,
              detailedPlacement,
              useReverb,
              ...(optimizelyVariation &&
                optimizelyVariation !== 'off' && {
                  experimentVariant: optimizelyVariation,
                }),
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
      producerName,
      service,
      statsDestination,
      url,
      advertiserID,
      format,
      optimizely,
      optimizelyMetricNameOverride,
      detailedPlacement,
      useReverb,
    ],
  );
};

export const useConstructLiteSiteATIEventTrackUrl = ({
  props = {},
  eventType = null,
}) => {
  const atiTrackingParams = extractTrackingProps(props, eventType);
  return buildATIEventTrackUrl(atiTrackingParams);
};

export const useATIClickTrackerHandler = (props = {}) => {
  const { isLite } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(props);
  const liteHandler = useConstructLiteSiteATIEventTrackUrl({
    props,
    eventType: CLICK_EVENT,
  });

  return isLite
    ? { [LITE_ATI_TRACKING]: liteHandler }
    : { onClick: clickTrackerHandler };
};

export default useClickTrackerHandler;
