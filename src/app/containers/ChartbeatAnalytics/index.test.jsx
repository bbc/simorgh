import React from 'react';
import { node, string } from 'prop-types';
import renderer from 'react-test-renderer';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import ChartBeatAnalytics from '.';
import * as testUtils from '../../lib/analyticsUtils/chartbeat';
import * as amp from './amp';
import * as canonical from './canonical';

const ContextWrap = ({ pageType, platform, origin, children }) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    pageType={pageType}
    service="news"
    bbcOrigin={origin}
  >
    <ServiceContextProvider service="news">
      <ToggleContextProvider>{children}</ToggleContextProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  pageType: string.isRequired,
  origin: string.isRequired,
  platform: string.isRequired,
};

describe('Charbeats Analytics Container', () => {
  it('should call CanonicalCharbeatsBeacon when platform is canonical, and toggle enabled for chartbeat for local', () => {
    const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
    const { chartbeatSource } = testUtils;
    canonical.default = mockCanonical;
    testUtils.getDomain = jest
      .fn()
      .mockImplementation(service => `${service}-domain`);

    testUtils.getSylphidCookie = jest.fn().mockImplementation(() => 'cookie');

    testUtils.getType = jest.fn().mockImplementation(() => 'article');
    testUtils.buildSections = jest
      .fn()
      .mockImplementation(() => 'secction1 section2');

    const tree = renderer
      .create(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="localhost.bbc.com"
        >
          <ChartBeatAnalytics />
        </ContextWrap>,
      )
      .toJSON();

    expect(mockCanonical).toHaveBeenCalledTimes(1);
    expect(mockCanonical).toHaveBeenCalledWith(
      {
        chartbeatUID: 50924,
        cookie: 'cookie',
        domain: 'test-domain',
        sections: 'secction1 section2',
        type: 'article',
        useCanonical: true,
        chartbeatSource,
      },
      {},
    );
    expect(testUtils.getDomain).toHaveBeenCalledTimes(1);
    expect(testUtils.getSylphidCookie).toHaveBeenCalledTimes(1);
    expect(testUtils.getType).toHaveBeenCalledTimes(1);
    expect(testUtils.buildSections).toHaveBeenCalledTimes(1);
    expect(tree).toMatchSnapshot();
  });
  it('should call AmpCharbeatsBeacon when platform is amp and toggle enabled for chartbeat on test', () => {
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

    const tree = renderer
      .create(
        <ContextWrap platform="amp" pageType="article" origin="test.bbc.com">
          <ChartBeatAnalytics />
        </ContextWrap>,
      )
      .toJSON();
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
    expect(tree).toMatchSnapshot();
  });
  it('should return null when toggle is disbaled for live', () => {
    const tree = renderer
      .create(
        <ContextWrap platform="canonical" pageType="article" origin="bbc.com">
          <ChartBeatAnalytics />
        </ContextWrap>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
