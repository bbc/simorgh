import React, { PropsWithChildren, useMemo } from 'react';
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import { UserContext } from '../../contexts/UserContext';
import ChartbeatAnalytics from '.';
import * as testUtils from './utils';
import * as amp from './amp';
import { localBaseUrl } from '../../../testHelpers/config';
import { PageTypes, Platforms } from '../../models/types/global';

const defaultToggleState = {
  chartbeatAnalytics: {
    enabled: false,
  },
};

const mockToggleDispatch = jest.fn();
const sendCanonicalChartbeatBeacon = jest.fn();

interface Props {
  pageType: PageTypes;
  platform: Platforms;
  origin: string;
  isLite?: boolean;
  toggleState?: {
    chartbeatAnalytics: {
      enabled: boolean;
      value?: string;
    };
  };
}

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  isLite = false,
  toggleState = defaultToggleState,
}: PropsWithChildren<Props>) => {
  const memoizedToggleContextValue = useMemo(
    () => ({ toggleState, toggleDispatch: mockToggleDispatch }),
    [toggleState],
  );

  const memoizedUserContextValue = useMemo(
    () => ({ sendCanonicalChartbeatBeacon }),
    [],
  );
  return (
    <RequestContextProvider
      isLite={isLite}
      isAmp={platform === 'amp'}
      isApp={false}
      pageType={pageType}
      service="news"
      statusCode={200}
      bbcOrigin={origin}
      pathname="/pathname"
    >
      <ServiceContextProvider service="news">
        <ToggleContext.Provider value={memoizedToggleContextValue}>
          <UserContext.Provider
            // @ts-expect-error requires mocking for testing purposes
            value={memoizedUserContextValue}
          >
            {children}
          </UserContext.Provider>
        </ToggleContext.Provider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
};

describe('Charbeats Analytics Container', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should call AmpCharbeatsBeacon when platform is amp and toggle enabled for chartbeat on live', () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const mockAmp = jest.fn().mockReturnValue('amp-return-value');
    // @ts-expect-error requires mocking for testing purposes
    amp.default = mockAmp;
    const expectedConfig = {
      uid: 50924,
      idSync: {
        bbc_hid: 'cookie',
      },
      domain: 'news-domain',
      sections: 'secction1 section2',
      contentType: 'article',
      title: 'This is an article',
    };

    const mockGetConfig = jest.fn().mockReturnValue(expectedConfig);
    // @ts-expect-error requires mocking for testing purposes
    testUtils.getConfig = mockGetConfig;

    const toggleState = {
      chartbeatAnalytics: {
        enabled: true,
      },
    };

    const { container } = render(
      <ContextWrap
        platform="amp"
        pageType={ARTICLE_PAGE}
        origin="bbc.com"
        toggleState={toggleState}
      >
        <ChartbeatAnalytics title="Home" sectionName="Home" />
      </ContextWrap>,
    );
    expect(mockAmp).toHaveBeenCalledTimes(1);
    expect(mockAmp).toHaveBeenCalledWith(
      {
        chartbeatConfig: expectedConfig,
      },
      undefined,
    );
    expect(testUtils.getConfig).toHaveBeenCalledTimes(1);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild?.textContent).toEqual('amp-return-value');
  });

  it('should return null when toggle is disabled for live', () => {
    const toggleState = {
      chartbeatAnalytics: {
        enabled: false,
      },
    };
    const { container } = render(
      <ContextWrap
        platform="canonical"
        pageType={ARTICLE_PAGE}
        origin="bbc.com"
        toggleState={toggleState}
      >
        <ChartbeatAnalytics title="Home" sectionName="Home" />
      </ContextWrap>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should return null when toggle is disbaled for localhost', () => {
    process.env.SIMORGH_APP_ENV = 'local';
    const { container } = render(
      <ContextWrap
        platform="canonical"
        pageType={ARTICLE_PAGE}
        origin={localBaseUrl}
      >
        <ChartbeatAnalytics title="Home" sectionName="Home" />
      </ContextWrap>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should add Chartbeat Helmet script with correct config when platform is canonical, toggle enabled and on test in Lite mode', () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const expectedConfig = {
      uid: 50924,
      domain: 'test-domain',
      idSync: {
        bbc_hid: 'cookie',
      },
      path: '/pidgin/articles/c00000000o.lite',
      sections: 'section1 section2',
      title: 'This is a canonical page article',
      type: 'article',
      useCanonical: true,
    };

    const toggleState = {
      chartbeatAnalytics: {
        enabled: true,
      },
    };

    const mockGetConfig = jest.fn().mockReturnValue(expectedConfig);
    // @ts-expect-error requires mocking for testing purposes
    testUtils.getConfig = mockGetConfig;
    render(
      <ContextWrap
        isLite
        platform="canonical"
        pageType={ARTICLE_PAGE}
        origin="test.bbc.com"
        toggleState={toggleState}
      >
        <ChartbeatAnalytics title="Home" sectionName="Home" />
      </ContextWrap>,
    );

    const [inlineScript] = Helmet.peek().scriptTags;
    const scriptHtml = inlineScript.innerHTML;

    expect(testUtils.getConfig).toHaveBeenCalledTimes(1);
    expect(scriptHtml).toContain(JSON.stringify(expectedConfig));

    expect(sendCanonicalChartbeatBeacon).not.toHaveBeenCalled();
  });
});
