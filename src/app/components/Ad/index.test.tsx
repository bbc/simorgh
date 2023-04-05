/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Services } from '#app/models/types/global';
import { render } from '../react-testing-library-with-providers';
import Ad from '.';
import { AdProps } from './types';

const AdWithRouter = ({ slotType }: AdProps) => (
  <BrowserRouter>
    <Ad slotType={slotType} />
  </BrowserRouter>
);

describe('Ad', () => {
  const originalConfigUrl = process.env.SIMORGH_CONFIG_URL;

  beforeAll(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

    // @ts-ignore
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterAll(() => {
    process.env.SIMORGH_CONFIG_URL = originalConfigUrl;
    // @ts-ignore
    window.dotcom = undefined;
  });

  interface RenderParams {
    isAmp?: boolean;
    service?: Services;
    showAdsBasedOnLocation?: boolean;
    toggles?: {
      [key: string]: {
        enabled: boolean;
      };
    };
  }

  const renderOptions: RenderParams = {
    isAmp: false,
    service: 'mundo',
    showAdsBasedOnLocation: true,
    toggles: {
      ads: {
        enabled: true,
      },
    },
  };

  describe('Snapshots', () => {
    describe('AMP', () => {
      it('should correctly render a leaderboard ad', () => {
        const { container } = render(<AdWithRouter slotType="leaderboard" />, {
          isAmp: true,
          ...renderOptions,
        });
        expect(container).toMatchSnapshot();
      });

      it('should correctly render an mpu ad', () => {
        const { container } = render(<AdWithRouter slotType="mpu" />, {
          isAmp: true,
          ...renderOptions,
        });
        expect(container).toMatchSnapshot();
      });

      it('should render a leaderboard ad with placeholder when showAdPlaceholder in service config is true', () => {
        const { container } = render(<AdWithRouter slotType="leaderboard" />, {
          isAmp: true,
          ...renderOptions,
        });
        expect(container).toMatchSnapshot();
      });

      it('should render a leaderboard ad without a placeholder when showAdPlaceholder in service config is false', () => {
        const { container } = render(<AdWithRouter slotType="leaderboard" />, {
          isAmp: true,
          ...renderOptions,
        });
        expect(container).toMatchSnapshot();
      });
    });

    describe('Canonical', () => {
      it('should correctly render a leaderboard ad', () => {
        const { container } = render(<AdWithRouter slotType="leaderboard" />, {
          ...renderOptions,
        });
        expect(container).toMatchSnapshot();
      });

      it('should correctly render an mpu ad', () => {
        const { container } = render(<AdWithRouter slotType="mpu" />, {
          ...renderOptions,
        });
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('when adsEnabled is false ', () => {
    const adsDisabled = {
      ads: {
        enabled: false,
      },
    };

    describe('should return null for AMP', () => {
      const { container } = render(<AdWithRouter slotType="leaderboard" />, {
        ...renderOptions,
        toggles: adsDisabled,
      });
      expect(container).toBeEmptyDOMElement();
    });

    describe('should return null for canonical', () => {
      const { container } = render(<AdWithRouter slotType="leaderboard" />, {
        ...renderOptions,
        toggles: adsDisabled,
      });
      expect(container).toBeEmptyDOMElement();
    });
  });
});
