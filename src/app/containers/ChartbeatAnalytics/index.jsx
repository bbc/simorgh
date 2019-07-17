import React from 'react';
import { bool } from 'prop-types';
import AmpChartbeatsBeacon from './amp';
import CanonicalChartbeatsBeacon from './canonical';

const ChartbeatAnalyticsBeacon = ({ isAmp }) => {
  const beacon = isAmp ? (
    <AmpChartbeatsBeacon />
  ) : (
    <CanonicalChartbeatsBeacon />
  );
  return beacon;
};

ChartbeatAnalyticsBeacon.propTypes = {
  isAmp: bool.isRequired,
};

export default ChartbeatAnalyticsBeacon;
