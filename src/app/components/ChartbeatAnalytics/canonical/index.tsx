import React from 'react';
import { Helmet } from 'react-helmet';
import { CanonicalChartbeatProps } from '../types';
import { chartbeatSource as defaultChartbeatSource } from '../utils';

const CanonicalChartbeatBeacon = ({
  chartbeatConfig,
  chartbeatSource = defaultChartbeatSource,
}: CanonicalChartbeatProps) => (
  <Helmet>
    <script async type="text/javascript">
      {`
        (function(){
          var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
          var config = ${JSON.stringify(chartbeatConfig)};
          for (var key in config) {
            _sf_async_config[key] = config[key];
          }
        })();
      `}
    </script>
    <script defer type="text/javascript" src={chartbeatSource} />
  </Helmet>
);

export default CanonicalChartbeatBeacon;
