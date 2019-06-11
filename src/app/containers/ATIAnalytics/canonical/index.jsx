import React, { useEffect } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../../models/propTypes/article';
import { atiBaseUrl } from '../atiUrl';
import onClient from '../../../helpers/onClient';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { getHref } from '../../../lib/analyticsUtils';
import ArticleAtiParams from '../ArticleAtiParams';

const CanonicalATIAnalytics = ({ articleData }) => {
  const href = getHref('canonical');
  const pageViewBeaconUrl = atiBaseUrl + ArticleAtiParams(articleData);

  if (onClient()) {
    // Only send page beacon when page href changes
    // This is since when moving to front page
    // will need to call need to call atiPageViewParams with front page values
    // TODO: need to move use of hook outside of conditional statement.
    // eslint-disable-next-line  react-hooks/rules-of-hooks
    useEffect(() => {
      sendBeacon(pageViewBeaconUrl);
    }, [href, pageViewBeaconUrl]);
  }

  return (
    <noscript>
      <img height="1px" width="1px" alt="" src={pageViewBeaconUrl} />
    </noscript>
  );
};

CanonicalATIAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default CanonicalATIAnalytics;
