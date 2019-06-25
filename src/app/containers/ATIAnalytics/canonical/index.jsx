import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { atiBaseUrl } from '../atiUrl';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';

const CanonicalATIAnalytics = ({ pageviewParams }) => {
  const [atiPageViewUrl] = useState(atiBaseUrl + pageviewParams);

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
  pageviewParams: string.isRequired,
};

export default CanonicalATIAnalytics;
