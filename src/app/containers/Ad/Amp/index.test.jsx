import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AmpAd, {
  AMP_ACCESS_FETCH,
  ampAdPropsMobile,
  ampAdPropsDesktop,
} from './index';
import useMediaQuery from '#lib/utilities/useMediaQuery';

const mobileAdAttributes = {
  'data-block-on-consent': true,
  'data-npa-on-unknown-consent': true,
  media: '(max-width: 599px)',
  type: 'doubleclick',
  width: '320',
  height: '50',
  'data-multi-size': '320x50,300x50',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: {
    targeting: {
      slot: 'leaderboard',
      asset_type: 'index',
      channel: 'pidgin',
    },
  },
};
const desktopAdAttributes = {
  'data-block-on-consent': true,
  'data-npa-on-unknown-consent': true,
  media: '(min-width: 600px)',
  type: 'doubleclick',
  width: '970',
  height: '250',
  'data-multi-size': '970x250,728x90',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: {
    targeting: {
      slot: 'leaderboard',
      asset_type: 'index',
      channel: 'pidgin',
    },
  },
};

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

    it('should display ad with the correct attributes on mobile widths', () => {
      const { container } = render(<AmpAd service="pidgin" />);

      const mobileAd = container.querySelectorAll('amp-ad')[0];
      const desktopAd = container.querySelectorAll('amp-ad')[1];
      expect(mobileAd).toHaveAttribute(mobileAdAttributes);
      expect(desktopAd).toHaveClass('i-amphtml-hidden-by-media-query');
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
