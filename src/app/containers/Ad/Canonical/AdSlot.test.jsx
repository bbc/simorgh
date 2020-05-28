import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import AdSlot from './AdSlot';

describe('CanonicalAds Ads', () => {
  const push = jest.fn();

  beforeEach(() => {
    push.mockClear();
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push },
    };
  });

  afterEach(() => {
    window.dotcom = undefined;
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an AdSlot with leaderboard id',
      <AdSlot uniqueId="leaderboard" />,
    );
  });
});
