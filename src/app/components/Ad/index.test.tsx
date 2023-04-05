/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToggleContext } from '#contexts/ToggleContext';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../react-testing-library-with-providers';
import Ad from '.';

describe('Ad Container', () => {
  // suppressPropWarnings(['isAmp', 'RequestContextProvider']);
  beforeAll(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

    // @ts-ignore
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterAll(() => {
    delete process.env.SIMORGH_CONFIG_URL;
    // @ts-ignore
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
          <ToggleContext.Provider value={toggleContextMock}>
            <Ad slotType="leaderboard" />
          </ToggleContext.Provider>,
          {
            isAmp: true,
            showAdsBasedOnLocation: true,
          },
        );
        expect(container).toMatchSnapshot();
      });

      it('should correctly render an mpu ad', () => {
        const { container } = render(
          <ToggleContext.Provider value={toggleContextMock}>
            <Ad slotType="mpu" />
          </ToggleContext.Provider>,
          {
            isAmp: true,
            showAdsBasedOnLocation: true,
          },
        );
        expect(container).toMatchSnapshot();
      });

      it('should render a leaderboard ad with placeholder when showAdPlaceholder in service config is true', () => {
        const { container } = render(
          <ToggleContext.Provider value={toggleContextMock}>
            <Ad slotType="leaderboard" />
          </ToggleContext.Provider>,
          {
            isAmp: true,
            service: 'mundo',
            showAdsBasedOnLocation: true,
          },
        );
        expect(container).toMatchSnapshot();
      });

      it('should render a leaderboard ad without a placeholder when showAdPlaceholder in service config is false', () => {
        const { container } = render(
          <ToggleContext.Provider value={toggleContextMock}>
            <Ad slotType="leaderboard" />
          </ToggleContext.Provider>,
          {
            isAmp: true,
            service: 'news',
            showAdsBasedOnLocation: true,
          },
        );
        expect(container).toMatchSnapshot();
      });
    });

    describe('Canonical', () => {
      it('should correctly render a leaderboard ad', () => {
        const { container } = render(
          <ToggleContext.Provider value={toggleContextMock}>
            <BrowserRouter>
              <Ad slotType="leaderboard" />
            </BrowserRouter>
          </ToggleContext.Provider>,
          {
            service: 'mundo',
            showAdsBasedOnLocation: true,
          },
        );
        expect(container).toMatchSnapshot();
      });

      it('should correctly render an mpu ad', () => {
        const { container } = render(
          <ToggleContext.Provider value={toggleContextMock}>
            <BrowserRouter>
              <Ad slotType="mpu" />
            </BrowserRouter>
          </ToggleContext.Provider>,
          {
            service: 'mundo',
            showAdsBasedOnLocation: true,
          },
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
        <ToggleContext.Provider value={toggleContextMock}>
          <Ad slotType="leaderboard" />
        </ToggleContext.Provider>,
        {
          service: 'mundo',
          showAdsBasedOnLocation: true,
        },
      );
      expect(container).toBeEmptyDOMElement();
    });

    describe('should return null for canonical', () => {
      const { container } = render(
        <ToggleContext.Provider value={toggleContextMock}>
          <Ad slotType="leaderboard" />
        </ToggleContext.Provider>,
        {
          service: 'mundo',
          showAdsBasedOnLocation: true,
        },
      );
      expect(container).toBeEmptyDOMElement();
    });
  });
});
