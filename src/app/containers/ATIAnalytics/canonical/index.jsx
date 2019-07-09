/* eslint react/no-danger: 0 */
import React, { useContext, useEffect, useState } from 'react';
import { string } from 'prop-types';
import { atiBaseUrl } from '../atiUrl';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { RequestContext } from '../../../contexts/RequestContext';

const CanonicalATIAnalytics = ({ pageviewParams }) => {
  const { env } = useContext(RequestContext);
  const [atiPageViewUrl] = useState(atiBaseUrl(env) + pageviewParams);

  useEffect(() => {
    sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);

  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1px" width="1px" alt="" src="${atiPageViewUrl}" />`,
      }}
    />
  );
};

CanonicalATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default CanonicalATIAnalytics;
