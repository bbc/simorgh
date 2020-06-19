import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import AdSlot from './AdSlot';

describe('Amp AdSlot', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render a mobile leaderboard AdSlot',
      <AdSlot viewportType="mobile" service="pidgin" slotType="leaderboard" />,
    );

    shouldMatchSnapshot(
      'should correctly render a desktop leaderboard AdSlot',
      <AdSlot viewportType="desktop" service="pidgin" slotType="leaderboard" />,
    );

    shouldMatchSnapshot(
      'should correctly render a mobile mpu AdSlot',
      <AdSlot viewportType="mobile" service="pidgin" slotType="mpu" />,
    );
  });
});
