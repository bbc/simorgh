import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AmpAd from './index';

describe('AMP Navigation', () => {
  process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

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
  });
});
