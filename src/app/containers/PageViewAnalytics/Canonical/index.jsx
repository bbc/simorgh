import { useEffect, useContext } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../../models/propTypes/article';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import getPageViewBeaconUrl from './getPageViewBeaconUrl';
import deepGet from '../../../helpers/json/deepGet';
import onClient from '../../../helpers/onClient';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';

const CanonicalPageViewAnalytics = ({ articleData }) => {
  const { platform, isUK, env } = useContext(RequestContext);

  if (onClient()) {
    const { service } = useContext(ServiceContext);
    const optimoId = deepGet(['promo', 'id'], articleData);

    // Only send page beacon when optimoId changes
    useEffect(() => {
      const pageViewBeaconUrl = getPageViewBeaconUrl({
        articleData,
        service,
        platform,
        isUK,
        env,
      });

      sendBeacon(pageViewBeaconUrl);
    }, [optimoId]);
  }

  return null;
};

CanonicalPageViewAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default CanonicalPageViewAnalytics;
