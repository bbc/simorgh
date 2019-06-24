import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { atiBaseUrl } from '../atiUrl';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';

const CanonicalATIAnalytics = ({ pageviewParams }) => {
  const [atiPageViewUrl] = useState(atiBaseUrl + pageviewParams);

  useEffect(() => {
    sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);

  /* eslint-disable react/no-danger */
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1px" width="1px" alt="" src="${atiPageViewUrl}" />`,
      }}
    />
  );
  /* eslint-enable react/no-danger */
};

CanonicalATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default CanonicalATIAnalytics;
