import React from 'react';
import { node, string, shape } from 'prop-types';
import renderer from 'react-test-renderer';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import ChartbeatAnalytics from '.';
import * as testUtils from '../../lib/analyticsUtils/chartbeat';
import * as utils from '../../lib/analyticsUtils';
import * as amp from './amp';
import * as canonical from './canonical';
import { localBaseUrl } from '../../../testHelpers/config';

const defaultToggleState = {
  test: {
    chartbeatAnalytics: {
      enabled: true,
    },
  },
  live: {
    chartbeatAnalytics: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();

const ContextWrap = ({ pageType, platform, origin, children, toggleState }) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    pageType={pageType}
    service="news"
    bbcOrigin={origin}
  >
    <ServiceContextProvider service="news">
      <ToggleContext.Provider
        value={{
          toggleState,
          toggleDispatch: mockToggleDispatch,
        }}
      >
        {children}
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  pageType: string.isRequired,
  origin: string.isRequired,
  platform: string.isRequired,
  toggleState: shape,
};

ContextWrap.defaultProps = {
  toggleState: defaultToggleState,
};

const mockData = {};

describe('Charbeats Analytics Container', () => {
  it('should call CanonicalCharbeatsBeacon when platform is canonical, and toggle enabled for chartbeat for local', () => {
    const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
    const { chartbeatSource } = testUtils;
    utils.getReferrer = jest.fn().mockImplementation(() => '/some-path');
    testUtils.getTitle = jest
      .fn()
      .mockImplementation(() => 'This is an article');
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
          origin={localBaseUrl}
        >
          <ChartbeatAnalytics data={mockData} />
        </ContextWrap>,
      )
      .toJSON();

    const expectedConfig = {
      uid: 50924,
      domain: 'test-domain',
      idSync: {
        bbc_hid: 'cookie',
      },
      sections: 'secction1 section2',
      title: 'This is an article',
      type: 'article',
      useCanonical: true,
      virtualReferrer: '/some-path',
    };

    expect(mockCanonical).toHaveBeenCalledTimes(1);
    expect(mockCanonical).toHaveBeenCalledWith(
      {
        chartbeatConfig: expectedConfig,
        chartbeatSource,
      },
      {},
    );
    expect(testUtils.getDomain).toHaveBeenCalledTimes(1);
    expect(testUtils.getSylphidCookie).toHaveBeenCalledTimes(1);
    expect(testUtils.getType).toHaveBeenCalledTimes(1);
    expect(testUtils.buildSections).toHaveBeenCalledTimes(1);
    expect(testUtils.getTitle).toHaveBeenCalledTimes(1);
    expect(utils.getReferrer).toHaveBeenCalledTimes(1);
    expect(tree).toMatchSnapshot();
  });
  it('should call AmpCharbeatsBeacon when platform is amp and toggle enabled for chartbeat on live', () => {
    const mockAmp = jest.fn().mockReturnValue('amp-return-value');
    amp.default = mockAmp;
    utils.getReferrer = jest.fn().mockImplementation(() => '/some-path');
    testUtils.getTitle = jest
      .fn()
      .mockImplementation(() => 'This is an article');
    testUtils.getDomain = jest
      .fn()
      .mockImplementation(service => `${service}-domain`);

    testUtils.getSylphidCookie = jest.fn().mockImplementation(() => 'cookie');

    testUtils.getType = jest.fn().mockImplementation(() => 'article');
    testUtils.buildSections = jest
      .fn()
      .mockImplementation(() => 'secction1 section2');

    const toggleState = {
      live: {
        chartbeatAnalytics: {
          enabled: true,
        },
      },
    };

    const tree = renderer
      .create(
        <ContextWrap
          platform="amp"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ChartbeatAnalytics data={mockData} />
        </ContextWrap>,
      )
      .toJSON();
    const expectedConfig = {
      uid: 50924,
      idSync: {
        bbc_hid: 'cookie',
      },
      domain: 'news-domain',
      sections: 'secction1 section2',
      contentType: 'article',
      virtualReferrer: '/some-path',
      title: 'This is an article',
    };
    expect(mockAmp).toHaveBeenCalledTimes(1);
    expect(mockAmp).toHaveBeenCalledWith(
      {
        chartbeatConfig: expectedConfig,
      },
      {},
    );
    expect(testUtils.getDomain).toHaveBeenCalledTimes(1);
    expect(testUtils.getSylphidCookie).toHaveBeenCalledTimes(1);
    expect(testUtils.getType).toHaveBeenCalledTimes(1);
    expect(testUtils.buildSections).toHaveBeenCalledTimes(1);
    expect(testUtils.getTitle).toHaveBeenCalledTimes(1);
    expect(utils.getReferrer).toHaveBeenCalledTimes(1);
    expect(tree).toMatchSnapshot();
  });
  it('should return null when toggle is disbaled for live', () => {
    const tree = renderer
      .create(
        <ContextWrap platform="canonical" pageType="article" origin="bbc.com">
          <ChartbeatAnalytics data={mockData} />
        </ContextWrap>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
