import React, { useContext } from 'react';
import { string, shape, number, bool, oneOf, oneOfType } from 'prop-types';
import useToggle from '../../../containers/Toggle/useToggle';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { RequestContext } from '../../RequestContext';

const Chartbeat = ({ config }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { platform } = useContext(RequestContext);

  if (!enabled || !config) {
    return null;
  }

  const isAmp = platform === 'amp';

  return isAmp ? (
    <AmpChartbeatBeacon chartbeatConfig={config} />
  ) : (
    <CanonicalChartbeatBeacon chartbeatConfig={config} />
  );
};

Chartbeat.propTypes = {
  config: shape({
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
  }),
};

Chartbeat.defaultProps = {
  config: null,
};

export default Chartbeat;
