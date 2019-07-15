import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';

const CanonicalATIAnalytics = ({ pageviewParams }) => {
  const [atiPageViewUrl] = useState(
    process.env.SIMORGH_ATI_BASE_URL + pageviewParams,
  );

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
