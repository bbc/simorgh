import React from 'react';
import { node, string, shape } from 'prop-types';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import { UserContext } from '../../contexts/UserContext';
import ChartbeatAnalytics from '.';
import * as testUtils from './utils';
import * as amp from './amp';
import { localBaseUrl } from '../../../testHelpers/config';
import frontPageData from '../../../../data/news/frontpage';

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
const sendCanonicalChartbeatBeacon = jest.fn();

const ContextWrap = ({ pageType, platform, origin, children, toggleState }) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    pageType={pageType}
    service="news"
    bbcOrigin={origin}
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <ToggleContext.Provider
        value={{
          toggleState,
          toggleDispatch: mockToggleDispatch,
        }}
      >
        <UserContext.Provider
          value={{
            sendCanonicalChartbeatBeacon,
          }}
        >
          {children}
        </UserContext.Provider>
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  pageType: string.isRequired,
  origin: string.isRequired,
  platform: string.isRequired,
  toggleState: shape({}),
};

ContextWrap.defaultProps = {
  toggleState: defaultToggleState,
};

describe('Charbeats Analytics Container', () => {
  it('should call AmpCharbeatsBeacon when platform is amp and toggle enabled for chartbeat on live', () => {
    const mockAmp = jest.fn().mockReturnValue('amp-return-value');
    amp.default = mockAmp;
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

    const mockGetConfig = jest.fn().mockReturnValue(expectedConfig);
    testUtils.getConfig = mockGetConfig;

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
          <ChartbeatAnalytics data={frontPageData} />
        </ContextWrap>,
      )
      .toJSON();
    expect(mockAmp).toHaveBeenCalledTimes(1);
    expect(mockAmp).toHaveBeenCalledWith(
      {
        chartbeatConfig: expectedConfig,
      },
      {},
    );
    expect(testUtils.getConfig).toHaveBeenCalledTimes(1);
    expect(tree).toMatchSnapshot();
  });

  it('should return null when toggle is disbaled for live', () => {
    const tree = renderer
      .create(
        <ContextWrap platform="canonical" pageType="article" origin="bbc.com">
          <ChartbeatAnalytics data={frontPageData} />
        </ContextWrap>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call sendCanonicalChartbeatBeacon when platform is canonical, and toggle enabled for chartbeat on local', () => {
    const expectedConfig = {
      uid: 50924,
      domain: 'test-domain',
      idSync: {
        bbc_hid: 'cookie',
      },
      path: '/',
      sections: 'secction1 section2',
      title: 'This is a canonical page article',
      type: 'article',
      useCanonical: true,
      virtualReferrer: '/some-path',
    };

    const mockGetConfig = jest.fn().mockReturnValue(expectedConfig);
    testUtils.getConfig = mockGetConfig;
    mount(
      <ContextWrap
        platform="canonical"
        pageType="article"
        origin={localBaseUrl}
      >
        <ChartbeatAnalytics data={frontPageData} />
      </ContextWrap>,
    );

    expect(sendCanonicalChartbeatBeacon).toHaveBeenCalledTimes(1);
    expect(sendCanonicalChartbeatBeacon).toHaveBeenCalledWith(expectedConfig);
    expect(testUtils.getConfig).toHaveBeenCalledTimes(1);
  });
});
