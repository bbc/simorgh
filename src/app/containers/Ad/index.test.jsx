import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

import AdContainer from './index';

describe('Ad Container', () => {
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
      shouldMatchSnapshot(
        'should correctly render a leaderboard ad',
        <ServiceContextProvider service="mundo">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp
            pageType="frontPage"
            service="mundo"
            statusCode={200}
            pathname="/mundo"
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="leaderboard" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContextProvider>,
      );

      shouldMatchSnapshot(
        'should correctly render an mpu ad',
        <ServiceContextProvider service="mundo">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp
            pageType="frontPage"
            service="mundo"
            statusCode={200}
            pathname="/mundo"
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <AdContainer slotType="mpu" />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContextProvider>,
      );
    });

    describe('Canonical', () => {
      shouldMatchSnapshot(
        'should correctly render a leaderboard ad',
        <ServiceContextProvider service="mundo">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp={false}
            pageType="frontPage"
            service="mundo"
            statusCode={200}
            pathname="/mundo"
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <BrowserRouter>
                <AdContainer slotType="leaderboard" />
              </BrowserRouter>
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContextProvider>,
      );

      shouldMatchSnapshot(
        'should correctly render an mpu ad',
        <ServiceContextProvider service="mundo">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            id="c0000000000o"
            isAmp={false}
            pageType="frontPage"
            service="mundo"
            statusCode={200}
            pathname="/mundo"
          >
            <ToggleContext.Provider value={toggleContextMock}>
              <BrowserRouter>
                <AdContainer slotType="mpu" />
              </BrowserRouter>
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContextProvider>,
      );
    });
  });
});
