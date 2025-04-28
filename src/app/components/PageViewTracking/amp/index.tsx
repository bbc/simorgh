/** @jsx jsx */
import { jsx } from '@emotion/react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import getAmpAnalyticsJson from './ampAnalyticsJson';
import { PageViewTrackingParams, AMPAnalyticsData } from '../types';

const JsonInlinedScript = (data: AMPAnalyticsData) => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default ({ pageViewParams }: PageViewTrackingParams) => {
  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: getEnvConfig().SIMORGH_ATI_BASE_URL,
          pageViewParams,
        }),
      )}
    </amp-analytics>
  );
};
