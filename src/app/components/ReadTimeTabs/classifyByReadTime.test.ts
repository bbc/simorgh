import classifyByReadTime, {
  isValidReadTime,
  SHORT_READ_MAX_MINUTES,
} from './classifyByReadTime';
import {
  shortReadItems,
  longReadItems,
  mixedItems,
  unclassifiableItems,
} from './fixtures';

describe('isValidReadTime', () => {
  it('should return true for positive whole numbers', () => {
    expect(isValidReadTime(1)).toBe(true);
    expect(isValidReadTime(4)).toBe(true);
    expect(isValidReadTime(5)).toBe(true);
    expect(isValidReadTime(100)).toBe(true);
  });

  it('should return false for zero', () => {
    expect(isValidReadTime(0)).toBe(false);
  });

  it('should return false for negative numbers', () => {
    expect(isValidReadTime(-1)).toBe(false);
    expect(isValidReadTime(-3)).toBe(false);
  });

  it('should return false for fractional numbers', () => {
    expect(isValidReadTime(1.5)).toBe(false);
    expect(isValidReadTime(4.5)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(isValidReadTime(Number.NaN)).toBe(false);
  });

  it('should return false for strings', () => {
    expect(isValidReadTime('5')).toBe(false);
    expect(isValidReadTime('1')).toBe(false);
  });

  it('should return false for non-numeric types', () => {
    expect(isValidReadTime(null)).toBe(false);
    expect(isValidReadTime(undefined)).toBe(false);
    expect(isValidReadTime({})).toBe(false);
    expect(isValidReadTime([])).toBe(false);
  });
});

describe('classifyByReadTime', () => {
  describe('classification boundary', () => {
    it('should classify items with readTime <= 4 as short reads', () => {
      const { shortReads, longReads } = classifyByReadTime(shortReadItems);

      expect(shortReads).toHaveLength(4);
      expect(longReads).toHaveLength(0);
      expect(shortReads).toEqual(shortReadItems);
    });

    it('should classify items with readTime >= 5 as long reads', () => {
      const { shortReads, longReads } = classifyByReadTime(longReadItems);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(4);
      expect(longReads).toEqual(longReadItems);
    });

    it('should use SHORT_READ_MAX_MINUTES threshold of 4', () => {
      expect(SHORT_READ_MAX_MINUTES).toBe(4);
    });
  });

  describe('mixed items', () => {
    it('should correctly separate mixed items into short and long reads', () => {
      const { shortReads, longReads } = classifyByReadTime(mixedItems);

      expect(shortReads).toHaveLength(4);
      expect(longReads).toHaveLength(4);
      expect(shortReads).toEqual(shortReadItems);
      expect(longReads).toEqual(longReadItems);
    });

    it('should preserve input order within each category', () => {
      const customItems = [
        { id: '1', title: 'Item 1', link: 'https://test.com/1', readTime: 2 },
        { id: '2', title: 'Item 2', link: 'https://test.com/2', readTime: 6 },
        { id: '3', title: 'Item 3', link: 'https://test.com/3', readTime: 1 },
        { id: '4', title: 'Item 4', link: 'https://test.com/4', readTime: 8 },
      ];

      const { shortReads, longReads } = classifyByReadTime(customItems);

      expect(shortReads).toEqual([customItems[0], customItems[2]]);
      expect(longReads).toEqual([customItems[1], customItems[3]]);
    });
  });

  describe('unclassifiable items', () => {
    it('should drop items with invalid readTime values', () => {
      const { shortReads, longReads } = classifyByReadTime(unclassifiableItems);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items missing id', () => {
      const items = [{ title: 'No ID', link: 'https://test.com', readTime: 3 }];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items missing title', () => {
      const items = [{ id: 'test-1', link: 'https://test.com', readTime: 3 }];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items missing link', () => {
      const items = [{ id: 'test-1', title: 'Test', readTime: 3 }];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items with empty string id', () => {
      const items = [
        { id: '', title: 'Test', link: 'https://test.com', readTime: 3 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items with whitespace-only id', () => {
      const items = [
        { id: '   ', title: 'Test', link: 'https://test.com', readTime: 3 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items with empty string title', () => {
      const items = [
        { id: 'test-1', title: '', link: 'https://test.com', readTime: 3 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items with whitespace-only title', () => {
      const items = [
        { id: 'test-1', title: '   ', link: 'https://test.com', readTime: 3 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items with empty string link', () => {
      const items = [{ id: 'test-1', title: 'Test', link: '', readTime: 3 }];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should drop items with whitespace-only link', () => {
      const items = [{ id: 'test-1', title: 'Test', link: '   ', readTime: 3 }];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });
  });

  describe('duplicate items', () => {
    it('should drop duplicate ids, keeping the first occurrence', () => {
      const items = [
        {
          id: 'test-1',
          title: 'First',
          link: 'https://test.com/1',
          readTime: 2,
        },
        {
          id: 'test-2',
          title: 'Second',
          link: 'https://test.com/2',
          readTime: 6,
        },
        {
          id: 'test-1',
          title: 'Duplicate',
          link: 'https://test.com/dup',
          readTime: 3,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(1);
      expect(longReads).toHaveLength(1);
      expect(shortReads[0].title).toBe('First');
      expect(longReads[0].title).toBe('Second');
    });

    it('should handle duplicate ids across categories', () => {
      const items = [
        {
          id: 'test-1',
          title: 'Short',
          link: 'https://test.com/1',
          readTime: 2,
        },
        {
          id: 'test-1',
          title: 'Long',
          link: 'https://test.com/2',
          readTime: 6,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(1);
      expect(longReads).toHaveLength(0);
      expect(shortReads[0].title).toBe('Short');
    });
  });

  describe('non-array input', () => {
    it('should return empty groups for undefined', () => {
      const { shortReads, longReads } = classifyByReadTime(undefined);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should return empty groups for null', () => {
      const { shortReads, longReads } = classifyByReadTime(null);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should return empty groups for plain object', () => {
      const { shortReads, longReads } = classifyByReadTime({});

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should return empty groups for string', () => {
      const { shortReads, longReads } = classifyByReadTime('not an array');

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should return empty groups for number', () => {
      const { shortReads, longReads } = classifyByReadTime(42);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should return empty groups for boolean', () => {
      const { shortReads, longReads } = classifyByReadTime(true);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });
  });

  describe('empty array', () => {
    it('should return empty groups for empty array', () => {
      const { shortReads, longReads } = classifyByReadTime([]);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });
  });

  describe('mixed valid and invalid items', () => {
    it('should keep valid items and drop invalid ones', () => {
      const items = [
        {
          id: 'valid-1',
          title: 'Valid short',
          link: 'https://test.com/1',
          readTime: 2,
        },
        {
          id: 'invalid-1',
          title: 'Missing readTime',
          link: 'https://test.com/2',
        },
        {
          id: 'valid-2',
          title: 'Valid long',
          link: 'https://test.com/3',
          readTime: 7,
        },
        {
          id: 'invalid-2',
          title: 'Zero readTime',
          link: 'https://test.com/4',
          readTime: 0,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(1);
      expect(longReads).toHaveLength(1);
      expect(shortReads[0].id).toBe('valid-1');
      expect(longReads[0].id).toBe('valid-2');
    });
  });
});
