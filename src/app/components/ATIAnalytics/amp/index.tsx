import getAmpAnalyticsJson from './ampAnalyticsJson';
import { ATIAnalyticsProps, AMPAnalyticsData } from '../types';

const JsonInlinedScript = (data: AMPAnalyticsData) => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = ({ reverbParams }: ATIAnalyticsProps) => {
  return (
    <amp-analytics data-e2e="ati-amp-analytics">
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          reverbParams,
        }),
      )}
    </amp-analytics>
  );
};

export default AmpATIAnalytics;
