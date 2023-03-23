import React, { useContext } from 'react';
import useToggle from '#hooks/useToggle';
import CanonicalChartbeatBeacon from '#containers/ChartbeatAnalytics/canonical';
import { RequestContext } from '../../RequestContext';

type Props = {
  domain: string;
  sections: string;
  uid: number;
  title: string;
  virtualReferrer: string | null;
  idSync: {
    // eslint-disable-next-line camelcase
    bbc_hid: string;
  };
  type: string;
  useCanonical: boolean;
} | null;

const Chartbeat = ({ config = null }: { config: Props }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { isAmp } = useContext(RequestContext);

  if (!enabled || !config || isAmp) {
    return null;
  }

  return <CanonicalChartbeatBeacon chartbeatConfig={config} />;
};

export default Chartbeat;
