import React from 'react';
import { render, act } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import CanonicalAdBootstrapJs from './CanonicalAdBootstrapJs';

describe('CanonicalAds Ads', () => {
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

      expect(window.dotcomConfig).toEqual({
        pageAds: true,
        playerAds: false,
      });
    });
  });
});
