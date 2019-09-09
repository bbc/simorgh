import React, { useEffect } from 'react';
import { string, shape, number, bool, oneOf, oneOfType } from 'prop-types';
import Helmet from 'react-helmet';
import { trackPage } from '../../../lib/analyticsUtils/chartbeat';

const CanonicalChartbeatBeacon = ({ chartbeatConfig, chartbeatSource }) => {
  const { path, title, virtualReferrer } = chartbeatConfig;
  console.log('chartbeatConfig', chartbeatConfig);

  useEffect(() => {
    trackPage({
      title,
      path,
      virtualReferrer,
    });
  }, [title, path, virtualReferrer]);

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
    path: string.isRequired,
    type: string.isRequired,
    useCanonical: bool.isRequired,
    virtualReferrer: oneOfType([string, oneOf([null])]),
    idSync: shape({
      bbc_hid: string,
    }),
  }).isRequired,
  chartbeatSource: string.isRequired,
};

export default CanonicalChartbeatBeacon;
