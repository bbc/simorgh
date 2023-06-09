import React from 'react';
import { Helmet } from 'react-helmet';
import {
  render,
  act,
  waitFor,
} from '../../../react-testing-library-with-providers';
import CanonicalAdBootstrapJs from '.';

describe('CanonicalAds Ads', () => {
  describe('Snapshots', () => {
    it('should push dotcom bootstrap and configuration to a head script', () => {
      render(<CanonicalAdBootstrapJs />);

      expect(Helmet.peek().scriptTags[0]).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should set window.dotcomConfig with pageAds enabled', async () => {
      await act(async () => {
        render(<CanonicalAdBootstrapJs />);
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
        render(<CanonicalAdBootstrapJs adcampaign="a-campaign" />);
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
