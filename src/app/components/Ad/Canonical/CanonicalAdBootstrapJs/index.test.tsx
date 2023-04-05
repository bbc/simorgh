/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  render,
  act,
  waitFor,
} from '../../../react-testing-library-with-providers';
import CanonicalAdBootstrapJs from '.';

describe('Canonical Ad BootstrapJs', () => {
  beforeEach(() => {
    document.querySelectorAll('head script').forEach(script => {
      script.parentNode?.removeChild(script);
    });
    // @ts-ignore
    delete window.dotcomConfig;
    // @ts-ignore
    delete window.dotcom;
  });
  describe('Snapshots', () => {
    it('should push dotcom bootstrap and configuration to a head script', () => {
      render(<CanonicalAdBootstrapJs />);
      expect(Helmet.peek()).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should set window.dotcomConfig with pageAds enabled', async () => {
      await act(async () => {
        render(<CanonicalAdBootstrapJs />);
      });

      await waitFor(() => {
        // @ts-ignore
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
        // @ts-ignore
        expect(window.dotcomConfig).toEqual({
          adcampaign: 'a-campaign',
          pageAds: true,
          playerAds: false,
        });
      });
    });
  });
});
