import React from 'react';
import { node, string } from 'prop-types';
import renderer from 'react-test-renderer';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ChartBeatAnalytics from '.';
import * as testUtils from '../../lib/analyticsUtils/chartbeat';
import * as amp from './amp';
import * as canonical from './canonical';

const ContextWrap = ({ pageType, platform, env, children }) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    pageType={pageType}
    service="news"
    env={env}
  >
    <ServiceContextProvider service="news">{children}</ServiceContextProvider>
  </RequestContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  pageType: string.isRequired,
  env: string.isRequired,
  platform: string.isRequired,
};

describe('Charbeats Analytics Contaiiner', () => {
  it('should call CanonicalCharbeatsBeacon when platform is canonical and env is local', () => {
    const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
    canonical.default = mockCanonical;
    testUtils.getDomain = jest
      .fn()
      .mockImplementation(service => `${service}-domain`);

    testUtils.getSylphidCookie = jest.fn().mockImplementation(() => 'cookie');

    testUtils.getType = jest.fn().mockImplementation(() => 'article');
    testUtils.buildSections = jest
      .fn()
      .mockImplementation(() => 'secction1 section2');

    renderer.create(
      <ContextWrap platform="canonical" pageType="article" env="local">
        <ChartBeatAnalytics />
      </ContextWrap>,
    );
    expect(mockCanonical).toHaveBeenCalledTimes(1);
    expect(mockCanonical).toHaveBeenCalledWith(
      {
        chartbeatUID: 50924,
        cookie: 'cookie',
        domain: 'test-domain',
        sections: 'secction1 section2',
        type: 'article',
        useCanonical: true,
      },
      {},
    );
    expect(testUtils.getDomain).toHaveBeenCalledTimes(1);
    expect(testUtils.getSylphidCookie).toHaveBeenCalledTimes(1);
    expect(testUtils.getType).toHaveBeenCalledTimes(1);
    expect(testUtils.buildSections).toHaveBeenCalledTimes(1);
  });
  it('should call AmpCharbeatsBeacon when platform is amp and env is live', () => {
    const mockAmp = jest.fn().mockReturnValue('amp-return-value');
    amp.default = mockAmp;
    testUtils.getDomain = jest
      .fn()
      .mockImplementation(service => `${service}-domain`);

    testUtils.getSylphidCookie = jest.fn().mockImplementation(() => 'cookie');

    testUtils.getType = jest.fn().mockImplementation(() => 'article');
    testUtils.buildSections = jest
      .fn()
      .mockImplementation(() => 'secction1 section2');

    renderer.create(
      <ContextWrap platform="amp" pageType="article" env="live">
        <ChartBeatAnalytics />
      </ContextWrap>,
    );
    expect(mockAmp).toHaveBeenCalledTimes(1);
    expect(mockAmp).toHaveBeenCalledWith(
      {
        chartbeatUID: 50924,
        cookie: 'cookie',
        domain: 'test-domain',
        sections: 'secction1 section2',
        type: 'article',
      },
      {},
    );
    expect(testUtils.getDomain).toHaveBeenCalledTimes(1);
    expect(testUtils.getSylphidCookie).toHaveBeenCalledTimes(1);
    expect(testUtils.getType).toHaveBeenCalledTimes(1);
    expect(testUtils.buildSections).toHaveBeenCalledTimes(1);
  });
});
