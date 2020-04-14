import {
  isValidDateTime,
  isFirstRelative,
  isLastRelative,
  isSameDay,
  isToday,
  formatType,
} from './helpers';

import { timestampGenerator } from './testHelpers';

const timeLimits = [
  {
    title: '1 hour(s) ago',
    time: timestampGenerator({ hours: 1 }),
    expectedValue: true,
  },
  {
    title: '9 hour(s) ago',
    time: timestampGenerator({ hours: 9 }),
    expectedValue: true,
  },
  {
    title: '10 hour(s) ago',
    time: timestampGenerator({ hours: 10 }),
    expectedValue: false,
  },
];

describe('ArticleTimestamp helper functions', () => {
  describe('isValidDateTime', () => {
    it('should return true if timestamp is valid', () => {
      const timestamp = 1539969006000; // 19 October 2018

      expect(isValidDateTime(timestamp)).toBe(true);
      expect(isValidDateTime(0)).toBe(true);
      expect(isValidDateTime(-30000000)).toBe(true);
    });

    it('should return false if timestamp is invalid or missing', () => {
      expect(isValidDateTime('foo')).toBe(false);
      expect(isValidDateTime(null)).toBe(false);
      expect(isValidDateTime(undefined)).toBe(false);
      expect(isValidDateTime()).toBe(false);
      expect(isValidDateTime(NaN)).toBe(false);
    });
  });

  describe('isFirstRelative', () => {
    describe(`when lastPublished === firstPublished`, () => {
      timeLimits.forEach(({ expectedValue, time, title }) => {
        it(`should return ${expectedValue} for ${title}`, () => {
          const firstPublished = time;
          const lastPublished = time;
          expect(isFirstRelative(lastPublished, firstPublished)).toBe(
            expectedValue,
          );
        });
      });
    });

    it(`should return false when lastPublished !== firstPublished`, () => {
      const firstPublished = timestampGenerator({ hours: 2 });
      const lastPublished = timestampGenerator({ days: 3 });
      expect(isFirstRelative(lastPublished, firstPublished)).toBe(false);
    });
  });

  describe('isLastRelative', () => {
    timeLimits.forEach(({ expectedValue, time, title }) => {
      it(`should return ${expectedValue} when lastPublished is ${title}`, () => {
        const lastPublished = time;
        expect(isLastRelative(lastPublished)).toBe(expectedValue);
      });
    });
  });

  describe('isSameDay', () => {
    it('should return true if both timestamps are on the same day', () => {
      const firstPublished = 1569962265000;
      const lastPublished = 1569962145008;
      expect(isSameDay(firstPublished, lastPublished)).toBe(true);
    });

    it('should return false if both timestamps are not on the same day', () => {
      const fourHoursAgo = timestampGenerator({ hours: 4 });
      const thirtySixHoursAgo = timestampGenerator({ hours: 36 });
      expect(isSameDay(fourHoursAgo, thirtySixHoursAgo)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('should return true if timestamp is today (3 minutes ago)', () => {
      const timestamp = timestampGenerator({ minutes: 3 });
      expect(isToday(timestamp)).toBe(true);
    });

    it('should return false if timestamp is not today (32 hours ago)', () => {
      const timestamp = timestampGenerator({ hours: 32 });
      expect(isToday(timestamp)).toBe(false);
    });
  });

  describe('formatType', () => {
    const realDateNow = Date.now.bind(global.Date);
    beforeEach(() => {
      const dateNowStub = jest.fn(() => 1574165447078); // 19 November 2019, 10:47.07
      global.Date.now = dateNowStub;
    });
    afterEach(() => {
      global.Date.now = realDateNow;
    });
    const dateFormats = {
      date: 'LL',
      dateTimeTimezone: 'LLL',
    };
    it(`should return date format when firstPublished is not today`, () => {
      const firstPublished = timestampGenerator({ days: 5 });
      expect(formatType({ firstPublished })).toBe(dateFormats.date);
    });

    it(`should return date and time with timezone format when firstPublished is today`, () => {
      const firstPublished = timestampGenerator({ hours: 4 });
      expect(formatType({ firstPublished })).toBe(dateFormats.dateTimeTimezone);
    });

    it(`should return date format when lastPublished and firstPublished are not on the same day`, () => {
      const firstPublished = timestampGenerator({ days: 4 });
      const lastPublished = timestampGenerator({ days: 2 });
      expect(formatType({ firstPublished, lastPublished })).toBe(
        dateFormats.date,
      );
    });

    it(`should return date and time with timezone format when firstPublished and lastPublished are on the same day and today`, () => {
      const firstPublished = timestampGenerator({ hours: 4 });
      const lastPublished = timestampGenerator({ hours: 2 });
      expect(formatType({ firstPublished, lastPublished })).toBe(
        dateFormats.dateTimeTimezone,
      );
    });

    it(`should return date format when firstPublished is null`, () => {
      const firstPublished = null;
      expect(formatType({ firstPublished })).toBe(dateFormats.date);
    });
  });
});
