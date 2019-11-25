import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { canonicalChartbeatPropTypes } from '../../../models/propTypes/chartbeatAnalytics';

const chartbeatSource = '//static.chartbeat.com/js/chartbeat.js';

const CanonicalChartbeatBeacon = ({ chartbeatConfig }) => {
  const chartbeatConfigRef = useRef(chartbeatConfig);

  useEffect(() => {
    if (chartbeatConfigRef.current !== chartbeatConfig) {
      // eslint-disable-next-line no-unused-expressions
      window.pSUPERFLY && window.pSUPERFLY.virtualPage(chartbeatConfig);
    }
  }, [chartbeatConfig, chartbeatConfigRef]);

  return (
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
      <script async type="text/javascript" src={chartbeatSource} />
    </Helmet>
  );
};

CanonicalChartbeatBeacon.propTypes = {
  chartbeatConfig: canonicalChartbeatPropTypes.isRequired,
};

export default CanonicalChartbeatBeacon;
