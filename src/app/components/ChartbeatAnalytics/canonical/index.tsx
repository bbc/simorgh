import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CanonicalChartbeatProps } from '../types';
import { chartbeatSource as defaultChartbeatSource } from '../utils';

const CanonicalChartbeatBeacon = ({
  chartbeatConfig,
  chartbeatSource = defaultChartbeatSource,
}: CanonicalChartbeatProps) => {
  const [firstLoadConfig] = useState(chartbeatConfig);

  const hasMounted = useRef(false);

  useEffect(() => {
    // @ts-expect-error chartbeat requires pSUPERFLY object on global window
    if (hasMounted.current && window.pSUPERFLY) {
      // @ts-expect-error chartbeat requires pSUPERFLY object on global window
      window.pSUPERFLY.virtualPage(chartbeatConfig);
    }
    hasMounted.current = true;
  }, [chartbeatConfig]);

  return (
    <Helmet>
      <script async type="text/javascript">
        {`
        (function(){
          var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
          var config = ${JSON.stringify(firstLoadConfig)};
          for (var key in config) {
            _sf_async_config[key] = config[key];
          }
        })();
      `}
      </script>
      <script defer type="text/javascript" src={chartbeatSource} />
    </Helmet>
  );
};

export default CanonicalChartbeatBeacon;
