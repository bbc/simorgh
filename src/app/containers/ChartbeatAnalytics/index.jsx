import React, { useContext, useEffect } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import { UserContext } from '../../contexts/UserContext';
import { RequestContext } from '../../contexts/RequestContext';
import { pageDataPropType } from '../../models/propTypes/data';
import AmpChartbeatBeacon from './amp';
import { getConfig } from './utils';

const ChartbeatAnalytics = ({ data }) => {
  const { service, brandName } = useContext(ServiceContext);
  const { sendCanonicalChartbeatBeacon } = useContext(UserContext);
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );
  const isAmp = platform === 'amp';

  useEffect(() => {
    sendCanonicalChartbeatBeacon(
      getConfig({
        platform,
        previousPath,
        pageType,
        data,
        brandName,
        env,
        service,
        origin,
      }),
    );
  }, [
    brandName,
    data,
    env,
    origin,
    pageType,
    platform,
    previousPath,
    service,
    sendCanonicalChartbeatBeacon,
  ]);

  return (
    isAmp && (
      <AmpChartbeatBeacon
        chartbeatConfig={getConfig({
          platform,
          previousPath,
          pageType,
          data,
          brandName,
          env,
          service,
          origin,
        })}
      />
    )
  );
};

ChartbeatAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ChartbeatAnalytics;
