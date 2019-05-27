import { useEffect, useContext } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { atiBaseUrl, atiPageViewParams } from './atiUrl';
import onClient from '../../helpers/onClient';
import sendBeacon from '../../lib/analyticsUtils/sendBeacon';
import { getHref } from '../../lib/analyticsUtils';

const {
  getLanguage,
  getOptimoUrn,
  getPageIdentifier,
  getPromoHeadline,
  getPublishedDatetime,
  getThingAttributes,
} = require('../../lib/analyticsUtils/article');

const CanonicalPageViewAnalytics = ({ articleData }) => {
  const { platform, isUK } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  if (onClient()) {
    const href = getHref('canonical');

    // Only send page beacon when page href changes
    // This is since when moving to front page
    // will need to call need to call atiPageViewParams with front page values
    // TODO: need to move use of hook outside of conditional statement.
    // eslint-disable-next-line  react-hooks/rules-of-hooks
    useEffect(() => {
      const pageViewBeaconUrl =
        atiBaseUrl +
        atiPageViewParams({
          contentType: 'article',
          language: getLanguage(articleData),
          ldpThingIds: getThingAttributes('thingId', articleData),
          ldpThingLabels: getThingAttributes('thingLabel', articleData),
          optimoUrn: getOptimoUrn(articleData),
          pageIdentifier: getPageIdentifier(service, articleData),
          pageTitle: getPromoHeadline(articleData),
          timePublished: getPublishedDatetime('firstPublished', articleData),
          timeUpdated: getPublishedDatetime('lastPublished', articleData),
          isUK,
          platform,
          service,
        });

      sendBeacon(pageViewBeaconUrl);
    }, [articleData, href, isUK, platform, service]);
  }

  return null;
};

CanonicalPageViewAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default CanonicalPageViewAnalytics;
