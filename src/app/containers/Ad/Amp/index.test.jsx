import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AmpAd, { AMP_ACCESS_FETCH } from './index';

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
      <AmpAd service="pidgin" />,
    );
  });

  describe('Assertions', () => {
    it('should render two leaderboard ads', () => {
      const { container } = render(<AmpAd service="pidgin" />);
      const ampAd = container.querySelectorAll('amp-ad');

      expect(ampAd.length).toBe(2);
    });

    it('should have the correct personalisation attributes', () => {
      const { container } = render(<AmpAd service="pidgin" />);

      container.querySelectorAll('amp-ad').forEach(ad => {
        expect(ad).toHaveAttribute('data-block-on-consent', 'true');
        expect(ad).toHaveAttribute('data-npa-on-unknown-consent', 'true');
      });
    });

    describe('AMP_ACCESS_FETCH', () => {
      it('should retrieve data from the correct endpoint', () => {
        const ampAccessFetch = jest.fn().mockImplementation(AMP_ACCESS_FETCH);
        const ampAccessData = ampAccessFetch('pidgin');
        const expectedReturn = {
          authorization:
            'https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=pidgin&geoiplookup=true',
          noPingback: true,
        };

        expect(ampAccessFetch).toHaveReturned();
        expect(ampAccessFetch).toHaveBeenCalledWith('pidgin');
        expect(ampAccessData.type).toEqual('script');
        expect(ampAccessData.props.children).toMatch(
          JSON.stringify(expectedReturn),
        );
      });
    });
  });
});
