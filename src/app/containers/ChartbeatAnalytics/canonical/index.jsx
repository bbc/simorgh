import React, { useEffect } from 'react';
import { string, bool, number } from 'prop-types';
import Helmet from 'react-helmet';

const CanonicalChartbeatBeacon = ({
  domain,
  type,
  sections,
  cookie,
  chartbeatUID,
  useCanonical,
  chartbeatSource,
  title,
  referrer,
}) => {
  const chartbeatConfig = {
    uid: chartbeatUID,
    domain,
    useCanonical,
    useCanonicalDomain: useCanonical,
    title,
    type,
    sections,
    ...(!!referrer && { virtualReferrer: referrer }),
    ...(!!cookie && { idSync: { bbc_hid: cookie } }),
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.pSUPERFLY) {
      window.pSUPERFLY.virtualPage(chartbeatConfig);
    }
  });
  return (
    <Helmet>
      <script async type="text/javascript">
        {`
        (function(){
          var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
          _sf_async_config = Object.assign(_sf_async_config, ${JSON.stringify(
            chartbeatConfig,
          )});
        })();
      `}
      </script>
      <script async type="text/javascript" src={chartbeatSource} />
    </Helmet>
  );
};

CanonicalChartbeatBeacon.propTypes = {
  domain: string.isRequired,
  type: string.isRequired,
  sections: string.isRequired,
  cookie: string,
  chartbeatUID: number.isRequired,
  useCanonical: bool.isRequired,
  chartbeatSource: string.isRequired,
  title: string.isRequired,
  referrer: string,
};

CanonicalChartbeatBeacon.defaultProps = {
  cookie: null,
  referrer: null,
};

export default CanonicalChartbeatBeacon;
