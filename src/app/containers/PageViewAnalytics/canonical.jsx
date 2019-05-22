import { useEffect, useContext } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { atiBaseUrl, atiPageViewParams } from './atiUrl';
import deepGet from '../../helpers/json/deepGet';
import onClient from '../../helpers/onClient';
import sendBeacon from '../../lib/analyticsUtils/sendBeacon';
import {
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getHref,
  getReferrer,
  getScreenInfo,
} from '../../lib/analyticsUtils';

const {
  getLanguage,
  getOptimoUrn,
  getPageIdentifier,
  getPromoHeadline,
  getPublishedDatetime,
  getThingAttributes,
} = require('../../lib/analyticsUtils/article');

const CanonicalPageViewAnalytics = ({ articleData }) => {
  const { platform, isUK, env } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  if (onClient()) {
    const optimoId = deepGet(['promo', 'id'], articleData);

    // Only send page beacon when optimoId changes
    useEffect(() => {
      const pageViewBeaconUrl =
        atiBaseUrl +
        atiPageViewParams({
          browserViewport: getBrowserViewPort(),
          contentType: 'article',
          currentTime: getCurrentTime(),
          deviceLanguage: getDeviceLanguage(),
          href: getHref(),
          language: getLanguage(articleData),
          ldpThingIds: getThingAttributes('thingId', articleData),
          ldpThingLabels: getThingAttributes('thingLabel', articleData),
          optimoUrn: getOptimoUrn(articleData),
          pageIdentifier: getPageIdentifier(service, articleData),
          pageTitle: getPromoHeadline(articleData),
          referrer: getReferrer(),
          screenResolution: getScreenInfo(),
          timePublished: getPublishedDatetime('firstPublished', articleData),
          timeUpdated: getPublishedDatetime('lastPublished', articleData),
          env,
          isUK,
          platform,
          service,
        });

      sendBeacon(pageViewBeaconUrl);
    }, [articleData, env, isUK, optimoId, platform, service]);
  }

  return null;
};

CanonicalPageViewAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default CanonicalPageViewAnalytics;
