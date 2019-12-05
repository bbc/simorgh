import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import sendBeacon from '#lib/analyticsUtils/sendBeacon';

const CanonicalATIAnalytics = ({ pageviewParams }) => {
  const [atiPageViewUrl] = useState(
    process.env.SIMORGH_ATI_BASE_URL + pageviewParams,
  );

  useEffect(() => {
    sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);

  return (
    <noscript>
      <img
        height="1px"
        width="1px"
        alt=""
        // This should probably have been a styled component. But the author is
        // lazy and didn't want to write a fuzzy matcher for the unit AND e2e
        // tests (you can't predict the class names chosen by styled-components)
        style={{ position: 'absolute' }}
        src={atiPageViewUrl.replace('x8=[simorgh]', 'x8=[simorgh-nojs]')}
      />
    </noscript>
  );
};

CanonicalATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default CanonicalATIAnalytics;
