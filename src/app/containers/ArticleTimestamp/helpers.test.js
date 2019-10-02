import {
  isValidDateTime,
  isFirstRelative,
  isLastRelative,
  isSameDay,
  isToday,
  formatType,
} from './helpers';

import { timestampGenerator } from './testHelpers';

describe('ArticleTimestamp helper functions', () => {
  describe('isValidDateTime', () => {
    it('should return true if timestamp is valid', () => {
      const timestamp = 1539969006000; // 19 October 2018

      expect(isValidDateTime(timestamp)).toEqual(true);
      expect(isValidDateTime(0)).toEqual(true);
      expect(isValidDateTime(-30000000)).toEqual(true);
    });

    it('should return false if timestamp is invalid or missing', () => {
      expect(isValidDateTime('foo')).toEqual(false);
      expect(isValidDateTime(null)).toEqual(false);
      expect(isValidDateTime(undefined)).toEqual(false);
      expect(isValidDateTime()).toEqual(false);
    });
  });

  describe('isFirstRelative', () => {
    it(`should return true when lastPublished === firstPublished and firstPublished < 10 hours ago`, () => {
      const oneHourAgo = timestampGenerator({ hours: 1 });
      const firstPublished = oneHourAgo;
      const lastPublished = oneHourAgo;

      expect(isFirstRelative(lastPublished, firstPublished)).toEqual(true);
    });

    it(`should return false when lastPublished === firstPublished and firstPublished > 10 hours ago`, () => {
      const fiveDaysAgo = timestampGenerator({ days: 5 });
      const firstPublished = fiveDaysAgo;
      const lastPublished = fiveDaysAgo;

      expect(isFirstRelative(lastPublished, firstPublished)).toEqual(false);
    });

    it(`should return false when lastPublished !== firstPublished and firstPublished < 10 hours ago`, () => {
      const firstPublished = timestampGenerator({ hours: 2 });
      const lastPublished = timestampGenerator({ days: 3 });

      expect(isFirstRelative(lastPublished, firstPublished)).toEqual(false);
    });
  });

  describe('isLastRelative', () => {
    it('should return true when lastPublished < 10 hours ago', () => {
      const lastPublished = timestampGenerator({ hours: 8 });
      expect(isLastRelative(lastPublished)).toEqual(true);
    });

    it('should return false when lastPublished > 10 hours ago', () => {
      const lastPublished = timestampGenerator({ days: 1 });
      expect(isLastRelative(lastPublished)).toEqual(false);
    });
  });

  describe('isSameDay', () => {
    it('should return true if both timestamps are within 24 hours of each other', () => {
      const fortyHoursAgo = timestampGenerator({ hours: 40 });
      const thirtySixHoursAgo = timestampGenerator({ hours: 36 });
      expect(isSameDay(fortyHoursAgo, thirtySixHoursAgo)).toEqual(true);
    });

    it('should return false if both timestamps are not within 24 hours of each other', () => {
      const fourHoursAgo = timestampGenerator({ hours: 4 });
      const thirtySixHoursAgo = timestampGenerator({ hours: 36 });
      expect(isSameDay(fourHoursAgo, thirtySixHoursAgo)).toEqual(false);
    });
  });

  describe('isToday', () => {
    it('should return true if timestamp is today (9 hours ago)', () => {
      const timestamp = timestampGenerator({ hours: 8 });
      expect(isToday(timestamp)).toEqual(true);
    });

    it('should return false if timestamp is not today (32 hours ago)', () => {
      const timestamp = timestampGenerator({ hours: 32 });
      expect(isToday(timestamp)).toEqual(false);
    });
  });

  describe('formatType', () => {
    const dateFormats = {
      date: 'D MMMM YYYY',
      dateTimeTimezone: 'D MMMM YYYY, HH:mm z',
    };
    it(`should return default date format when firstPublished is > 10 hours ago`, () => {
      const firstPublished = timestampGenerator({ days: 5 });
      expect(formatType({ firstPublished })).toEqual(dateFormats.date);
    });

    it(`should return dateTimeTimezone format when firstPublished and lastPublished are < 10 hours ago`, () => {
      const firstPublished = timestampGenerator({ hours: 8 });
      const lastPublished = timestampGenerator({ hours: 2 });
      expect(formatType({ firstPublished, lastPublished })).toEqual(
        dateFormats.dateTimeTimezone,
      );
    });

    it(`should return date format when firstPublished and lastPublished are > 10 hours ago`, () => {
      const firstPublished = timestampGenerator({ hours: 50 });
      const lastPublished = timestampGenerator({ hours: 20 });
      expect(formatType({ firstPublished, lastPublished })).toEqual(
        dateFormats.date,
      );
    });
  });
});
