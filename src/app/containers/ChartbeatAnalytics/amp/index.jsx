import React from 'react';
import { shape } from 'prop-types';

const chartbeatAmpConfigOptions = options => ({
  vars: {
    ...options,
  },
  triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
});

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpChartbeatBeacon = ({ chartbeatConfig }) => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(chartbeatAmpConfigOptions(chartbeatConfig))}
  </amp-analytics>
);

AmpChartbeatBeacon.propTypes = {
  chartbeatConfig: shape({}).isRequired,
};

export default AmpChartbeatBeacon;
