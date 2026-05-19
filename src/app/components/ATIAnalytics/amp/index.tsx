import getAmpAnalyticsJson from './ampAnalyticsJson';
import type { ATIAnalyticsProps, AMPAnalyticsData } from '../types';

const JsonInlinedScript = (data: AMPAnalyticsData) => (
  <script
    type="application/json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: we want this
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = ({ reverbParams }: ATIAnalyticsProps) => (
    <amp-analytics data-e2e="ati-amp-analytics">
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          reverbParams,
        }),
      )}
    </amp-analytics>
  );

export default AmpATIAnalytics;
