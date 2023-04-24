import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import latinDiacritics from '../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import {
  ServiceContext,
  ServiceContextProvider,
} from '../../../contexts/ServiceContext';

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
  suppressPropWarnings(['isAmp', 'RequestContextProvider']);
  beforeAll(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterAll(() => {
    delete process.env.SIMORGH_CONFIG_URL;
    window.dotcom = undefined;
  });

  describe('Snapshots', () => {
    const defaultToggleState = {
      ads: {
        enabled: true,
      },
      ampAds: {
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
            value={{ showAdPlaceholder: false, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              pageType={FRONT_PAGE}
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
            value={{ showAdPlaceholder: false, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              pageType={FRONT_PAGE}
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
            value={{ showAdPlaceholder: true, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              pageType={FRONT_PAGE}
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
            value={{ showAdPlaceholder: false, ...context }}
          >
            <RequestContextProvider
              bbcOrigin="https://www.test.bbc.co.uk"
              id="c0000000000o"
              isAmp
              pageType={FRONT_PAGE}
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
              pageType={FRONT_PAGE}
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
              pageType={FRONT_PAGE}
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

  describe('when adsEnabled is false ', () => {
    const toggleState = {
      ampAds: {
        enabled: false,
      },
      ads: {
        enabled: false,
      },
    };

    const mockToggleDispatch = jest.fn();

    const toggleContextMock = {
      toggleState,
      toggleDispatch: mockToggleDispatch,
    };
    describe('should return null for AMP', () => {
      const { container } = render(
        <ServiceContext.Provider
          value={{ showAdPlaceholder: true, ...context }}
        >
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp
            pageType={FRONT_PAGE}
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

    describe('should return null for canonical', () => {
      const { container } = render(
        <ServiceContext.Provider value={context}>
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            pageType={FRONT_PAGE}
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
});
