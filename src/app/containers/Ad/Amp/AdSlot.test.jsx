import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import AdSlot, { getDataSlot } from './AdSlot';

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

describe('getDataSlot', () => {
  const service = 'pidgin';

  it('should generate the right data-slot on local', () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const actual = getDataSlot(service);
    const expected = '/4817/bbcworldservice.test.site.pidgin';
    expect(actual).toEqual(expected);
  });

  it('should generate the right data-slot on test', () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const actual = getDataSlot(service);
    const expected = '/4817/bbcworldservice.test.site.pidgin';
    expect(actual).toEqual(expected);
  });

  it('should generate the right data-slot on live', () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const actual = getDataSlot(service);
    const expected = '/4817/bbcworldservice.live.site.pidgin';
    expect(actual).toEqual(expected);
  });
});
