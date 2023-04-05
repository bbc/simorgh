import { Services } from '#app/models/types/global';
import React from 'react';
import Ad, { AMP_ACCESS_FETCH } from '.';
import { render } from '../../react-testing-library-with-providers';
import { SlotType } from '../types';

const adJsonAttributes = (slotType: SlotType) => ({
  targeting: {
    slot: slotType,
    asset_type: 'index',
    channel: 'afrique',
  },
});

interface RenderParams {
  service: Services;
  showAdsBasedOnLocation: boolean;
}

const renderOptions: RenderParams = {
  service: 'afrique',
  showAdsBasedOnLocation: true,
};

describe('AMP Ads', () => {
  beforeAll(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-toggles-endpoint.bbc.co.uk';
  });

  afterAll(() => {
    delete process.env.SIMORGH_CONFIG_URL;
  });

  describe('Snapshots', () => {
    it('should correctly render an AMP leaderboard ad', () => {
      const { container } = render(<Ad slotType="leaderboard" />);
      expect(container).toMatchSnapshot();
    });

    it('should correctly render an AMP mpu ad', () => {
      const { container } = render(<Ad slotType="mpu" />, { ...renderOptions });
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should not render ad placeholder in UK when showAdPlaceholder in service config is false', () => {
      const { getByLabelText } = render(
        <div className="amp-geo-group-eea amp-geo-group-gbOrUnknown">
          <Ad slotType="leaderboard" />
        </div>,
        { ...renderOptions, service: 'news' },
      );

      expect(getByLabelText('Publicités')).not.toBeVisible();
    });

    it('should render ad placeholder in UK when showAdPlaceholder in service config is true', () => {
      const { getByLabelText } = render(
        <div className="amp-geo-group-eea amp-geo-group-gbOrUnknown">
          <Ad slotType="leaderboard" />
        </div>,
        { ...renderOptions },
      );

      expect(getByLabelText('Publicités')).toBeVisible();
    });

    it.each`
      location           | className
      ${'europe'}        | ${'amp-geo-group-eea'}
      ${'rest of world'} | ${''}
    `(
      'should render ad placeholder outside of the UK - $location',
      ({ className }) => {
        const { getByLabelText } = render(
          <div className={className}>
            <Ad slotType="leaderboard" />
          </div>,
          { ...renderOptions },
        );

        expect(getByLabelText('Publicités')).toBeVisible();
      },
    );

    it('should render two leaderboard ads', () => {
      const { container } = render(<Ad slotType="leaderboard" />, {
        ...renderOptions,
      });
      const ampAd = container.querySelectorAll('amp-ad');

      expect(ampAd.length).toBe(2);
    });

    it('should display leaderboard ad with values for all of the needed attributes', () => {
      const { container } = render(<Ad slotType="leaderboard" />, {
        ...renderOptions,
      });

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
      const { container } = render(<Ad slotType="mpu" />, {
        ...renderOptions,
      });
      const ampAd = container.querySelectorAll('amp-ad');

      expect(ampAd.length).toBe(1);
    });

    it('should display mpu ad with values for all of the needed attributes', () => {
      const { container } = render(<Ad slotType="mpu" />, {
        ...renderOptions,
      });

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
      const { container } = render(<Ad slotType="leaderboard" />, {
        ...renderOptions,
      });
      const links = container.querySelectorAll('a');
      const advertisementLabel = links && links[0];
      expect(advertisementLabel.textContent).toEqual('Publicités');
      expect(advertisementLabel).toHaveAttribute('tabIndex', '-1');
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
