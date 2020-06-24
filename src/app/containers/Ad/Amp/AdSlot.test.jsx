import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import AdSlot from './AdSlot';

describe('Amp AdSlot', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render a leaderboard AdSlot',
      <AdSlot service="pidgin" slotType="leaderboard" />,
    );
    shouldMatchSnapshot(
      'should correctly render a mpu AdSlot',
      <AdSlot service="pidgin" slotType="mpu" />,
    );
  });
});
