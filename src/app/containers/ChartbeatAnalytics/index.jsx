import useToggle from '../Toggle/useToggle';

const ChartbeatAnalyticsBeacon = () => {
  const { enabled } = useToggle('chartbeat');

  return enabled ? 'chartbeat' : null;
};

export default ChartbeatAnalyticsBeacon;
