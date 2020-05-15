import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import AdSlot from './AdSlot';

describe('CanonicalAds Ads', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an AdSlot with leaderboard id',
      <BrowserRouter>
        <AdSlot type="leaderboard" />
      </BrowserRouter>,
    );
  });
});
