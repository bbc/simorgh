import React, { useContext } from 'react';
import { string, shape, number, bool, oneOf, oneOfType } from 'prop-types';
import useToggle from '../../../containers/Toggle/useToggle';
import CanonicalChartbeatBeacon from '../../../containers/ChartbeatAnalytics/canonical';
import { RequestContext } from '../../RequestContext';

const Chartbeat = ({ config }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { platform } = useContext(RequestContext);
  const isAmp = platform === 'amp';

  if (!enabled || !config || isAmp) {
    return null;
  }

  return <CanonicalChartbeatBeacon chartbeatConfig={config} />;
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
