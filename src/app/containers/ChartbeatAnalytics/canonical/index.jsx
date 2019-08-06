import React, { useEffect } from 'react';
import { string, shape, number, bool } from 'prop-types';
import Helmet from 'react-helmet';

const CanonicalChartbeatBeacon = ({ chartbeatConfig, chartbeatSource }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.pSUPERFLY) {
      /*
        This function is always called to update config values on page changes 
        https://chartbeat.zendesk.com/hc/en-us/articles/210271287-Handling-virtual-page-changes
      */
      window.pSUPERFLY.virtualPage(chartbeatConfig);
    }
  }, [chartbeatConfig]);

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
    virtualReferrer: string,
    idSync: shape({
      bbc_hid: string,
    }),
  }).isRequired,
  chartbeatSource: string.isRequired,
};

export default CanonicalChartbeatBeacon;
