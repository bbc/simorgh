import React from 'react';
import { string } from 'prop-types';

import getAmpAnalyticsJson from './ampAnalyticsJson';

const AmpATIAnalytics = ({ pageviewParams }) => (
  <amp-analytics>
    <script
      type="application/json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          getAmpAnalyticsJson({
            baseUrl: process.env.SIMORGH_ATI_BASE_URL,
            pageviewParams,
            ampGeoGroup: 'capture amp-geo state here and pass it through?',
          }),
        ),
      }}
    />
  </amp-analytics>
);

AmpATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default AmpATIAnalytics;
