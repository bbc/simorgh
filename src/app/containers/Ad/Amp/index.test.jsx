import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AmpAd, { AMP_ACCESS_FETCH } from './index';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const adJsonAttributes = {
  targeting: {
    slot: 'leaderboard',
    asset_type: 'index',
    channel: 'pidgin',
  },
};

const adWithContext = (service = 'pidgin') => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp
    pageType="frontPage"
    service={service}
    pathname="/"
  >
    <ServiceContextProvider service={service}>
      <AmpAd />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('AMP Ads', () => {
  beforeAll(() => {
    process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';
  });

  afterAll(() => {
    delete process.env.SIMORGH_TOGGLES_URL;
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an AMP leaderboard ad',
      adWithContext(),
    );
  });

  describe('Assertions', () => {
    it('should render two leaderboard ads', () => {
      const { container } = render(adWithContext());
      const ampAd = container.querySelectorAll('amp-ad');

      expect(ampAd.length).toBe(2);
    });

    it('should display ad with values for all of the needed attributes', () => {
      const { container } = render(adWithContext());

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
        expect(ad).toHaveAttribute('json', JSON.stringify(adJsonAttributes));
      });
    });

    it('should render an `advertisement` label', () => {
      const { container } = render(adWithContext());
      const p = container.querySelectorAll('p');

      expect(p.length).toBeGreaterThanOrEqual(1);
      expect(p[0].textContent).toEqual('Tori we dem pay for');
    });

    describe('AMP_ACCESS_FETCH', () => {
      it('should retrieve data from the correct endpoint', () => {
        const ampAccessFetch = jest.fn().mockImplementation(AMP_ACCESS_FETCH);
        const ampAccessData = ampAccessFetch('pidgin');
        const expectedReturn =
          'https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=pidgin&geoiplookup=true';

        expect(ampAccessFetch).toHaveReturned();
        expect(ampAccessFetch).toHaveBeenCalledWith('pidgin');
        expect(ampAccessData.type).toEqual('script');
        expect(JSON.parse(ampAccessData.props.children).authorization).toEqual(
          expectedReturn,
        );
      });
    });
  });
});
