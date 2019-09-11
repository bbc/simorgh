import React, { useEffect, useRef } from 'react';
import { string, shape, number, bool, oneOf, oneOfType } from 'prop-types';
import Helmet from 'react-helmet';

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
  chartbeatConfig: shape({
    domain: string.isRequired,
    sections: string.isRequired,
    uid: number.isRequired,
    title: string.isRequired,
    type: string.isRequired,
    useCanonical: bool.isRequired,
    virtualReferrer: oneOfType([string, oneOf([null])]),
    idSync: shape({
      bbc_hid: string,
    }),
  }).isRequired,
};

export default CanonicalChartbeatBeacon;
