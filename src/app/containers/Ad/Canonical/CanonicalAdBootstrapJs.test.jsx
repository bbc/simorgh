import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import CanonicalAdBootstrapJs from './CanonicalAdBootstrapJs';

describe('CanonicalAds Ads', () => {
  beforeEach(() => {
    document.querySelectorAll('head script').forEach(script => {
      script.parentNode.removeChild(script);
    });
    delete window.dotcomConfig;
    delete window.dotcom;
  });
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should push dotcom bootstrap and configuration to a head script',
      <CanonicalAdBootstrapJs />,
    );
  });

  describe('Assertions', () => {
    it('should set window.dotcomConfig with pageAds enabled', async () => {
      await act(async () => {
        render(<CanonicalAdBootstrapJs />);
      });

      await waitFor(() => {
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
        expect(window.dotcomConfig).toEqual({
          adcampaign: 'a-campaign',
          pageAds: true,
          playerAds: false,
        });
      });
    });
  });
});
