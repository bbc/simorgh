import React from 'react';
import xssJsonStringify from '#lib/utilities/xssJsonStringify';
import { ampChartbeatPropTypes } from '../../../models/propTypes/chartbeatAnalytics';

const chartbeatAmpConfigOptions = options => ({
  vars: options,
  triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
});

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: xssJsonStringify(data) }}
  />
);

const AmpChartbeatBeacon = ({ chartbeatConfig }) => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(chartbeatAmpConfigOptions(chartbeatConfig))}
  </amp-analytics>
);

AmpChartbeatBeacon.propTypes = {
  chartbeatConfig: ampChartbeatPropTypes.isRequired,
};

export default AmpChartbeatBeacon;
