import React from 'react';
import { Helmet } from 'react-helmet';
import {
  render,
  act,
  waitFor,
} from '#components/react-testing-library-with-providers';
import AdBootstrapJs from '.';

describe('AdBootstrapJs', () => {
  describe('Snapshots', () => {
    it('should push dotcom bootstrap and configuration to a head script', () => {
      render(<AdBootstrapJs />);

      expect(Helmet.peek().scriptTags[0]).toMatchSnapshot();
    });

    it('should push dotcom bootstrap and configuration to a head script with adcampaign', () => {
      render(<AdBootstrapJs adcampaign="test-ad-campaign" />);

      expect(Helmet.peek().scriptTags[0]).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should set window.dotcomConfig with pageAds enabled', async () => {
      await act(async () => {
        render(<AdBootstrapJs />);
      });

      await waitFor(() => {
        // @ts-expect-error dotcomConfig is added to the window object by BBC Ads script
        expect(window.dotcomConfig).toEqual({
          pageAds: true,
          playerAds: false,
        });
      });
    });

    it('should set window.dotcomConfig with adCampaign value provided', async () => {
      await act(async () => {
        render(<AdBootstrapJs adcampaign="a-campaign" />);
      });

      await waitFor(() => {
        // @ts-expect-error dotcomConfig is added to the window object by BBC Ads script
        expect(window.dotcomConfig).toEqual({
          adcampaign: 'a-campaign',
          pageAds: true,
          playerAds: false,
        });
      });
    });
  });
});
