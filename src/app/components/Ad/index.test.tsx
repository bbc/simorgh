import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { Helmet } from 'react-helmet';
import { render } from '../react-testing-library-with-providers';
import latinDiacritics from '../ThemeProvider/fontScripts/latinWithDiacritics';
import {
  ServiceContext,
  ServiceContextProvider,
} from '../../contexts/ServiceContext';
import AdContainer from './index';

const context = {
  service: 'mundo',
  script: latinDiacritics,
  dir: 'ltr',
  translations: {
    ads: {
      advertisementLabel: 'Publicidad',
    },
  },
};

describe('Ad Container', () => {
  const originalConfigUrl = process.env.SIMORGH_CONFIG_URL;

  beforeAll(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

    // @ts-expect-error dotcom is added to the window object by BBC Ads script
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterAll(() => {
    process.env.SIMORGH_CONFIG_URL = originalConfigUrl;
    // @ts-expect-error dotcom is added to the window object by BBC Ads script
    window.dotcom = undefined;
  });

  describe('Snapshots', () => {
    const defaultToggleState = {
      ads: {
        enabled: true,
      },
    };

    const mockToggleDispatch = jest.fn();

    const toggleContextMock = {
      toggleState: defaultToggleState,
      toggleDispatch: mockToggleDispatch,
    };

    describe('AMP', () => {
      it('should correctly render a leaderboard ad', () => {
        const { container } = render(
          <ServiceContext.Provider
            // @ts-expect-error require partial data for testing purposes
            value={{ showAdPlaceholder: false, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              isApp={false}
              pageType={HOME_PAGE}
              service="mundo"
              statusCode={200}
              pathname="/mundo"
              showAdsBasedOnLocation
            >
              <ToggleContext.Provider value={toggleContextMock}>
                <AdContainer slotType="leaderboard" />
              </ToggleContext.Provider>
            </RequestContextProvider>
          </ServiceContext.Provider>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should correctly render an mpu ad', () => {
        const { container } = render(
          <ServiceContext.Provider
            // @ts-expect-error require partial data for testing purposes
            value={{ showAdPlaceholder: false, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              isApp={false}
              pageType={HOME_PAGE}
              service="mundo"
              statusCode={200}
              pathname="/mundo"
              showAdsBasedOnLocation
            >
              <ToggleContext.Provider value={toggleContextMock}>
                <AdContainer slotType="mpu" />
              </ToggleContext.Provider>
            </RequestContextProvider>
          </ServiceContext.Provider>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render a leaderboard ad with placeholder when showAdPlaceholder in service config is true', () => {
        const { container } = render(
          <ServiceContext.Provider
            // @ts-expect-error require partial data for testing purposes
            value={{ showAdPlaceholder: true, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              isApp={false}
              pageType={HOME_PAGE}
              service="mundo"
              statusCode={200}
              pathname="/mundo"
              showAdsBasedOnLocation
            >
              <ToggleContext.Provider value={toggleContextMock}>
                <AdContainer slotType="leaderboard" />
              </ToggleContext.Provider>
            </RequestContextProvider>
          </ServiceContext.Provider>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should render a leaderboard ad without a placeholder when showAdPlaceholder in service config is false', () => {
        const { container } = render(
          <ServiceContext.Provider
            // @ts-expect-error require partial data for testing purposes
            value={{ showAdPlaceholder: false, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              isApp={false}
              pageType={HOME_PAGE}
              service="mundo"
              statusCode={200}
              pathname="/mundo"
              showAdsBasedOnLocation
            >
              <ToggleContext.Provider value={toggleContextMock}>
                <AdContainer slotType="leaderboard" />
              </ToggleContext.Provider>
            </RequestContextProvider>
          </ServiceContext.Provider>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('Canonical', () => {
      it('should correctly render a leaderboard ad', () => {
        const { container } = render(
          <ServiceContextProvider service="mundo">
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp={false}
              isApp={false}
              pageType={HOME_PAGE}
              service="mundo"
              statusCode={200}
              pathname="/mundo"
              showAdsBasedOnLocation
            >
              <ToggleContext.Provider value={toggleContextMock}>
                <BrowserRouter>
                  <AdContainer slotType="leaderboard" />
                </BrowserRouter>
              </ToggleContext.Provider>
            </RequestContextProvider>
          </ServiceContextProvider>,
        );
        expect(container).toMatchSnapshot();
      });

      it('should correctly render an mpu ad', () => {
        const { container } = render(
          <ServiceContextProvider service="mundo">
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp={false}
              isApp={false}
              pageType={HOME_PAGE}
              service="mundo"
              statusCode={200}
              pathname="/mundo"
              showAdsBasedOnLocation
            >
              <ToggleContext.Provider value={toggleContextMock}>
                <BrowserRouter>
                  <AdContainer slotType="mpu" />
                </BrowserRouter>
              </ToggleContext.Provider>
            </RequestContextProvider>
          </ServiceContextProvider>,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('when adsEnabled is false', () => {
    const toggleState = {
      ads: {
        enabled: false,
      },
    };

    const mockToggleDispatch = jest.fn();

    const toggleContextMock = {
      toggleState,
      toggleDispatch: mockToggleDispatch,
    };
    it('should return null for AMP', () => {
      const { container } = render(
        <ServiceContext.Provider
          // @ts-expect-error require partial data for testing purposes
          value={{ showAdPlaceholder: true, ...context }}
        >
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp
            isApp={false}
            pageType={HOME_PAGE}
            service="mundo"
            statusCode={200}
            pathname="/mundo"
            showAdsBasedOnLocation
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="leaderboard" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>,
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('should return null for canonical', () => {
      const { container } = render(
        // @ts-expect-error require partial data for testing purposes
        <ServiceContext.Provider value={context}>
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            isApp={false}
            id="c0000000000o"
            pageType={HOME_PAGE}
            service="mundo"
            statusCode={200}
            pathname="/mundo"
            showAdsBasedOnLocation
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="leaderboard" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('when showAdsBasedOnLocation is false', () => {
    const toggleState = {
      ads: {
        enabled: true,
      },
    };

    const mockToggleDispatch = jest.fn();

    const toggleContextMock = {
      toggleState,
      toggleDispatch: mockToggleDispatch,
    };
    it('should return null for AMP', () => {
      const { container } = render(
        <ServiceContext.Provider
          // @ts-expect-error require partial data for testing purposes
          value={{ showAdPlaceholder: true, ...context }}
        >
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp
            isApp={false}
            pageType={HOME_PAGE}
            service="mundo"
            statusCode={200}
            pathname="/mundo"
            showAdsBasedOnLocation={false}
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="leaderboard" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>,
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('should return null for canonical', () => {
      const { container } = render(
        // @ts-expect-error require partial data for testing purposes
        <ServiceContext.Provider value={context}>
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            isApp={false}
            id="c0000000000o"
            pageType={HOME_PAGE}
            service="mundo"
            statusCode={200}
            pathname="/mundo"
            showAdsBasedOnLocation={false}
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="leaderboard" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Bootstrap script', () => {
    const getBootstrapScript = () =>
      Helmet.peek().scriptTags.find(({ innerHTML }) =>
        innerHTML?.includes('window.dotcom'),
      );

    const toggleState = {
      ads: {
        enabled: true,
      },
    };

    const mockToggleDispatch = jest.fn();

    const toggleContextMock = {
      toggleState,
      toggleDispatch: mockToggleDispatch,
    };
    it('should not be included on AMP', () => {
      render(
        <ServiceContext.Provider
          // @ts-expect-error require partial data for testing purposes
          value={{ showAdPlaceholder: true, ...context }}
        >
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp
            isApp={false}
            pageType={HOME_PAGE}
            service="mundo"
            statusCode={200}
            pathname="/mundo"
            showAdsBasedOnLocation
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="leaderboard" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>,
      );

      expect(getBootstrapScript()).toBeUndefined();
    });

    it('should be included for canonical', () => {
      render(
        // @ts-expect-error require partial data for testing purposes
        <ServiceContext.Provider value={context}>
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            isApp={false}
            id="c0000000000o"
            pageType={HOME_PAGE}
            service="mundo"
            statusCode={200}
            pathname="/mundo"
            showAdsBasedOnLocation
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <BrowserRouter>
                <AdContainer slotType="leaderboard" />
              </BrowserRouter>
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>,
      );

      expect(getBootstrapScript()).toBeTruthy();
    });
  });
});
