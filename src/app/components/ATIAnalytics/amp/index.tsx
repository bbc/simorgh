import React from 'react';
import getAmpAnalyticsJson from './ampAnalyticsJson';
import { ATIAnalyticsProps, AMPAnalyticsData } from '../types';

const JsonInlinedScript = (data: AMPAnalyticsData) => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = ({ pageviewParams }: ATIAnalyticsProps) => {
  return (
    // @ts-expect-error amp attributes not yet supported in TS
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: process.env.SIMORGH_ATI_BASE_URL,
          pageviewParams,
        }),
      )}
      {/* @ts-expect-error amp attributes not yet supported in TS */}
    </amp-analytics>
  );
};

export default AmpATIAnalytics;
