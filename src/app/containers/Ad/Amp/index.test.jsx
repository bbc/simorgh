import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import AmpAd, { AMP_ACCESS_FETCH } from './index';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

const adJsonAttributes = slotType => ({
  targeting: {
    slot: slotType,
    asset_type: 'index',
    channel: 'afrique',
  },
});

const adWithContext = (slotType, toggleContext) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp
    pageType="frontPage"
    service="afrique"
    pathname="/"
  >
    <ServiceContextProvider service="afrique">
      <ToggleContext.Provider value={toggleContext}>
        <AmpAd slotType={slotType} />
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('AMP Ads', () => {
  beforeAll(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-toggles-endpoint.bbc.co.uk';
  });

  afterAll(() => {
    delete process.env.SIMORGH_CONFIG_URL;
  });

  describe('Snapshots', () => {
    const toggleState = {
      ampAds: {
        enabled: true,
      },
    };

    const mockToggleDispatch = jest.fn();

    const toggleContextMock = {
      toggleState,
      toggleDispatch: mockToggleDispatch,
    };

    shouldMatchSnapshot(
      'should correctly render an AMP leaderboard ad',
      adWithContext('leaderboard', toggleContextMock),
    );

    shouldMatchSnapshot(
      'should correctly render an AMP mpu ad',
      adWithContext('mpu', toggleContextMock),
    );
  });

  describe('Assertions', () => {
    describe('When ampAds is toggled on', () => {
      const toggleState = {
        ampAds: {
          enabled: true,
        },
      };

      const mockToggleDispatch = jest.fn();

      const toggleContextMock = {
        toggleState,
        toggleDispatch: mockToggleDispatch,
      };

      it('should render two leaderboard ads', () => {
        const { container } = render(
          adWithContext('leaderboard', toggleContextMock),
        );
        const ampAd = container.querySelectorAll('amp-ad');

        expect(ampAd.length).toBe(2);
      });

      it('should display leaderboard ad with values for all of the needed attributes', () => {
        const { container } = render(
          adWithContext('leaderboard', toggleContextMock),
        );

        const ampAd = container.querySelectorAll('amp-ad');
        ampAd.forEach(ad => {
          expect(ad).toHaveAttribute('data-block-on-consent', 'default');
          expect(ad).toHaveAttribute('data-npa-on-unknown-consent', 'true');
          expect(ad).toHaveAttribute('media');
          expect(ad).toHaveAttribute('type');
          expect(ad).toHaveAttribute('width');
          expect(ad).toHaveAttribute('height');
          expect(ad).toHaveAttribute('data-multi-size');
          expect(ad).toHaveAttribute('data-slot');
          expect(ad).toHaveAttribute('data-amp-slot-index');
          expect(ad).toHaveAttribute('data-a4a-upgrade-type');
          expect(ad).toHaveAttribute(
            'json',
            JSON.stringify(adJsonAttributes('leaderboard')),
          );
        });
      });

      it('should render one mpu ad', () => {
        const { container } = render(adWithContext('mpu', toggleContextMock));
        const ampAd = container.querySelectorAll('amp-ad');

        expect(ampAd.length).toBe(1);
      });

      it('should display mpu ad with values for all of the needed attributes', () => {
        const { container } = render(adWithContext('mpu', toggleContextMock));

        const ampAd = container.querySelectorAll('amp-ad');
        ampAd.forEach(ad => {
          expect(ad).toHaveAttribute('data-block-on-consent', 'default');
          expect(ad).toHaveAttribute('data-npa-on-unknown-consent', 'true');
          expect(ad).toHaveAttribute('type');
          expect(ad).toHaveAttribute('width');
          expect(ad).toHaveAttribute('height');
          expect(ad).toHaveAttribute('data-multi-size');
          expect(ad).toHaveAttribute('data-slot');
          expect(ad).toHaveAttribute('data-amp-slot-index');
          expect(ad).toHaveAttribute('data-a4a-upgrade-type');
          expect(ad).toHaveAttribute(
            'json',
            JSON.stringify(adJsonAttributes('mpu')),
          );
        });
      });

      it('should render an `advertisement` label', () => {
        const { container } = render(
          adWithContext('leaderboard', toggleContextMock),
        );
        const links = container.querySelectorAll('a');
        const advertisementLabel = links && links[0];
        expect(advertisementLabel.textContent).toEqual('Publicités');
        expect(advertisementLabel).toHaveAttribute('tabIndex', '-1');
      });
    });

    describe('When ampAds is toggled off', () => {
      const toggleState = {
        ampAds: {
          enabled: false,
        },
      };

      const mockToggleDispatch = jest.fn();

      const toggleContextMock = {
        toggleState,
        toggleDispatch: mockToggleDispatch,
      };

      it('should not render mpu ads on AMP when ampAds toggle is set to false', () => {
        const { container } = render(adWithContext('mpu', toggleContextMock));

        expect(container.firstChild).toBeNull();
      });

      it('should not render leaderboard ads on AMP when ampAds toggle is set to false', () => {
        const { container } = render(
          adWithContext('leaderboard', toggleContextMock),
        );

        expect(container.firstChild).toBeNull();
      });
    });

    describe('AMP_ACCESS_FETCH', () => {
      it('should retrieve data from the correct endpoint', () => {
        const ampAccessFetch = jest.fn().mockImplementation(AMP_ACCESS_FETCH);
        const ampAccessData = ampAccessFetch('afrique');
        const expectedReturn =
          'https://mock-toggles-endpoint.bbc.co.uk?application=simorgh&service=afrique';

        expect(ampAccessFetch).toHaveReturned();
        expect(ampAccessFetch).toHaveBeenCalledWith('afrique');
        expect(ampAccessData.type).toEqual('script');
        expect(JSON.parse(ampAccessData.props.children).authorization).toEqual(
          expectedReturn,
        );
      });
    });
  });
});
