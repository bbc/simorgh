import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import CanonicalAd from '.';

describe('CanonicalAds Ads', () => {
  beforeEach(() => {
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterEach(() => {
    window.dotcom = undefined;
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an Canonical leaderboard ad with dotcom-bootstrap script',
      <BrowserRouter>
        <CanonicalAd slotType="leaderboard" />
      </BrowserRouter>,
    );

    shouldMatchSnapshot(
      'should correctly render an Canonical mpu ad with dotcom-bootstrap script',
      <BrowserRouter>
        <CanonicalAd slotType="leaderboard" />
      </BrowserRouter>,
    );
  });
});
