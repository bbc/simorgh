import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import AdSlot, { getDataSlot } from './AdSlot';

describe('Amp AdSlot', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render a leaderboard AdSlot',
      <AdSlot service="mundo" slotType="leaderboard" />,
    );
    shouldMatchSnapshot(
      'should correctly render a mpu AdSlot',
      <AdSlot service="mundo" slotType="mpu" />,
    );
  });
});

describe('getDataSlot', () => {
  const service = 'mundo';

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should generate the right data-slot on local', () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const actual = getDataSlot(service);
    const expected = '/4817/bbccom.test.site.amp.news';
    expect(actual).toEqual(expected);
  });

  it('should generate the right data-slot on test', () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const actual = getDataSlot(service);
    const expected = '/4817/bbccom.test.site.amp.news';
    expect(actual).toEqual(expected);
  });

  it('should generate the right data-slot on live', () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const actual = getDataSlot(service);
    const expected = '/4817/bbcworldservice.live.site.mundo';
    expect(actual).toEqual(expected);
  });
});
