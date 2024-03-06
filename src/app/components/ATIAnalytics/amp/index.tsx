/** @jsx jsx */
import { jsx } from '@emotion/react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
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
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: getEnvConfig().SIMORGH_ATI_BASE_URL,
          pageviewParams,
        }),
      )}
    </amp-analytics>
  );
};

export default AmpATIAnalytics;
