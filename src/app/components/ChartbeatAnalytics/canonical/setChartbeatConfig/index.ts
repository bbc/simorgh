import { CanonicalChartbeatConfig } from '../../types';

// eslint-disable-next-line func-names
const setChartbeatConfig = function (
  chartbeatConfig: CanonicalChartbeatConfig,
) {
  // eslint-disable-next-line no-underscore-dangle, camelcase
  const sfAsyncConfig = window._sf_async_config || {};
  // eslint-disable-next-line no-underscore-dangle, camelcase
  window._sf_async_config = sfAsyncConfig;

  Object.keys(chartbeatConfig).forEach(function setConfigValue(key) {
    sfAsyncConfig[key] = chartbeatConfig[key as keyof CanonicalChartbeatConfig];
  });
};

export default setChartbeatConfig;
