/* eslint-disable no-underscore-dangle */
import { CanonicalChartbeatConfig } from '../../types';
import setChartbeatConfig from '.';

describe('setChartbeatConfig', () => {
  const chartbeatConfig: CanonicalChartbeatConfig = {
    domain: 'test-domain',
    sections: 'section1 section2',
    virtualReferrer: null,
    useCanonical: true,
    title: 'Page A',
    uid: 123,
  };

  afterEach(() => {
    delete window._sf_async_config;
  });

  it('creates window._sf_async_config when it does not already exist', () => {
    setChartbeatConfig(chartbeatConfig);

    expect(window._sf_async_config).toEqual(chartbeatConfig);
  });

  it('merges the config into an existing window._sf_async_config object', () => {
    window._sf_async_config = { existingKey: 'existingValue' };

    setChartbeatConfig(chartbeatConfig);

    expect(window._sf_async_config).toEqual({
      existingKey: 'existingValue',
      ...chartbeatConfig,
    });
  });
});
