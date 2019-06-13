import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../../models/propTypes/article';
import { atiBaseUrl } from '../atiUrl';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import ArticleAtiParams from '../ArticleAtiParams';

const CanonicalATIAnalytics = ({ articleData }) => {
  const [atiPageViewUrl] = useState(atiBaseUrl + ArticleAtiParams(articleData));

  useEffect(() => {
    sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);

  return (
    <noscript>
      <img height="1px" width="1px" alt="" src={atiPageViewUrl} />
    </noscript>
  );
};

CanonicalATIAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default CanonicalATIAnalytics;
