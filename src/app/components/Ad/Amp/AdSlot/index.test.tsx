import React from 'react';
import { render } from '../../../react-testing-library-with-providers';
import AdSlot, { getDataSlot, getAssetType } from '.';

describe('getAssetType', () => {
  it('should return an asset type of story given a pageType of STY', () => {
    const actual = getAssetType('STY');
    const expected = 'story';

    expect(actual).toEqual(expected);
  });
});

describe('Amp AdSlot', () => {
  describe('Snapshots', () => {
    it('should correctly render a leaderboard AdSlot', () => {
      const { container } = render(
        <AdSlot service="mundo" slotType="leaderboard" pageType="STY" />,
        { service: 'mundo' },
      );
      expect(container).toMatchSnapshot();
    });
  });
});

describe('getDataSlot', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  describe('Is a World Service Site', () => {
    const service = 'mundo';

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

  describe('Is a Public Service Site', () => {
    const service = 'news';

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
      const expected = '/4817/bbccom.live.site.amp.news';
      expect(actual).toEqual(expected);
    });
  });
});
