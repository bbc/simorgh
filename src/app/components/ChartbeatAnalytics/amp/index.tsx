/** @jsx jsx */
import { jsx } from '@emotion/react';
import { AmpChartbeatProps, AmpChartbeatConfig } from '../types';

const chartbeatAmpConfigOptions = (options: AmpChartbeatConfig) => ({
  vars: options,
});

const JsonInlinedScript = (data: { vars: AmpChartbeatConfig }) => (
  <script
    type="application/json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpChartbeatBeacon = ({ chartbeatConfig }: AmpChartbeatProps) => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(chartbeatAmpConfigOptions(chartbeatConfig))}
  </amp-analytics>
);

export default AmpChartbeatBeacon;
