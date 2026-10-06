import { Helmet } from 'react-helmet';
import addInlineScript from '#app/lib/utilities/addInlineScript';
import { CanonicalChartbeatProps } from '../types';
import { chartbeatSource as defaultChartbeatSource } from '../utils';
import setChartbeatConfig from './setChartbeatConfig';

const CanonicalChartbeatBeacon = ({
  chartbeatConfig,
  nonce = null,
  chartbeatSource = defaultChartbeatSource,
}: CanonicalChartbeatProps) => (
  <Helmet>
    {addInlineScript({
      script: setChartbeatConfig,
      parameters: [chartbeatConfig],
      nonce,
    })}
    <script
      {...(nonce ? { nonce } : {})}
      defer
      type="text/javascript"
      src={chartbeatSource}
    />
  </Helmet>
);

export default CanonicalChartbeatBeacon;
