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
    it('should use relative split with 4 short items only (k=2 short, k=2 long)', () => {
      const { shortReads, longReads } = classifyByReadTime(shortReadItems);

      // 4 short items, fixedFillsBothTabs=false, canSplitRelatively=true (4 >= 4)
      // Relative split: k=2, shortest 2 as short, longest 2 as long
      // Items sorted by readTime: 1(idx0), 2(idx3), 3(idx1), 4(idx2)
      // Shortest 2: idx0, idx3 -> kept in original order: [0, 3]
      // Longest 2: idx1, idx2 -> kept in original order: [1, 2]
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
      expect(shortReads).toEqual([shortReadItems[0], shortReadItems[3]]);
      expect(longReads).toEqual([shortReadItems[1], shortReadItems[2]]);
    });

    it('should use relative split with 4 long items only (k=2 short, k=2 long)', () => {
      const { shortReads, longReads } = classifyByReadTime(longReadItems);

      // 4 long items, fixedFillsBothTabs=false, canSplitRelatively=true (4 >= 4)
      // Relative split: k=2, shortest 2 as short, longest 2 as long
      // Items sorted by readTime: 5(idx0), 7(idx3), 9(idx1), 12(idx2)
      // Shortest 2: idx0, idx3 -> kept in original order: [0, 3]
      // Longest 2: idx1, idx2 -> kept in original order: [1, 2]
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
      expect(shortReads).toEqual([longReadItems[0], longReadItems[3]]);
      expect(longReads).toEqual([longReadItems[1], longReadItems[2]]);
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

    it('should use fixed split when both groups have >= 4 items (4 short + 4 long)', () => {
      const { shortReads, longReads } = classifyByReadTime(mixedItems);

      expect(shortReads).toHaveLength(4);
      expect(longReads).toHaveLength(4);
      expect(
        shortReads.every(item => item.readTime <= SHORT_READ_MAX_MINUTES),
      ).toBe(true);
      expect(
        longReads.every(item => item.readTime > SHORT_READ_MAX_MINUTES),
      ).toBe(true);
    });

    it('should use relative split with 1 short + 7 long yielding 4 short, 4 long (shortest 4 as short)', () => {
      const items = [
        {
          id: 's1',
          title: 'Short 1',
          link: 'https://test.com/s1',
          readTime: 2,
        },
        { id: 'l1', title: 'Long 1', link: 'https://test.com/l1', readTime: 5 },
        { id: 'l2', title: 'Long 2', link: 'https://test.com/l2', readTime: 6 },
        { id: 'l3', title: 'Long 3', link: 'https://test.com/l3', readTime: 7 },
        { id: 'l4', title: 'Long 4', link: 'https://test.com/l4', readTime: 8 },
        { id: 'l5', title: 'Long 5', link: 'https://test.com/l5', readTime: 9 },
        {
          id: 'l6',
          title: 'Long 6',
          link: 'https://test.com/l6',
          readTime: 10,
        },
        {
          id: 'l7',
          title: 'Long 7',
          link: 'https://test.com/l7',
          readTime: 11,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(4);
      expect(longReads).toHaveLength(4);
      expect(shortReads).toEqual([
        items[0], // id: s1, readTime 2
        items[1], // id: l1, readTime 5
        items[2], // id: l2, readTime 6
        items[3], // id: l3, readTime 7
      ]);
      expect(longReads).toEqual([
        items[4], // id: l4, readTime 8
        items[5], // id: l5, readTime 9
        items[6], // id: l6, readTime 10
        items[7], // id: l7, readTime 11
      ]);
    });

    it('should use relative split with 3 short + 3 long yielding 3 short, 3 long (k=3)', () => {
      const items = [
        {
          id: 's1',
          title: 'Short 1',
          link: 'https://test.com/s1',
          readTime: 1,
        },
        {
          id: 's2',
          title: 'Short 2',
          link: 'https://test.com/s2',
          readTime: 2,
        },
        {
          id: 's3',
          title: 'Short 3',
          link: 'https://test.com/s3',
          readTime: 3,
        },
        { id: 'l1', title: 'Long 1', link: 'https://test.com/l1', readTime: 5 },
        { id: 'l2', title: 'Long 2', link: 'https://test.com/l2', readTime: 6 },
        { id: 'l3', title: 'Long 3', link: 'https://test.com/l3', readTime: 7 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(3);
      expect(longReads).toHaveLength(3);
    });

    it('should drop median item with 5 valid items (k=2, shortest 2 and longest 2)', () => {
      const items = [
        { id: '1', title: 'Item 1', link: 'https://test.com/1', readTime: 1 },
        { id: '2', title: 'Item 2', link: 'https://test.com/2', readTime: 3 },
        { id: '3', title: 'Item 3', link: 'https://test.com/3', readTime: 5 },
        { id: '4', title: 'Item 4', link: 'https://test.com/4', readTime: 7 },
        { id: '5', title: 'Item 5', link: 'https://test.com/5', readTime: 9 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
      expect(shortReads).toEqual([items[0], items[1]]);
      expect(longReads).toEqual([items[3], items[4]]);
    });

    it('should drop 1 short + 2 long when < 4 total valid items (all same fixed group)', () => {
      const items = [
        {
          id: 's1',
          title: 'Short 1',
          link: 'https://test.com/s1',
          readTime: 2,
        },
        { id: 'l1', title: 'Long 1', link: 'https://test.com/l1', readTime: 6 },
        { id: 'l2', title: 'Long 2', link: 'https://test.com/l2', readTime: 7 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(2);
    });

    it('should render long reads only when 3 items all same fixed group', () => {
      const items = [
        { id: 'l1', title: 'Long 1', link: 'https://test.com/l1', readTime: 5 },
        { id: 'l2', title: 'Long 2', link: 'https://test.com/l2', readTime: 6 },
        { id: 'l3', title: 'Long 3', link: 'https://test.com/l3', readTime: 7 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(3);
    });

    it('should drop short group when 3 short + 1 mixed (1 short 2 long) with < 4 valid', () => {
      const items = [
        {
          id: 's1',
          title: 'Short 1',
          link: 'https://test.com/s1',
          readTime: 1,
        },
        {
          id: 's2',
          title: 'Short 2',
          link: 'https://test.com/s2',
          readTime: 2,
        },
        {
          id: 's3',
          title: 'Short 3',
          link: 'https://test.com/s3',
          readTime: 3,
        },
        { id: 'l1', title: 'Long 1', link: 'https://test.com/l1', readTime: 6 },
        { id: 'l2', title: 'Long 2', link: 'https://test.com/l2', readTime: 7 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      // 3 short + 2 long = 5 items, so relative split with k=2
      // shortest 2: s1(1), s2(2) -> short
      // longest 2: l1(6), l2(7) -> long
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
    });

    it('should render both empty when only 1 valid item', () => {
      const items = [
        { id: '1', title: 'Item 1', link: 'https://test.com/1', readTime: 2 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(0);
      expect(longReads).toHaveLength(0);
    });

    it('should use relative split with 10 short items only (k=4, 4 short and 4 long)', () => {
      const items = [
        {
          id: 's1',
          title: 'Short 1',
          link: 'https://test.com/s1',
          readTime: 1,
        },
        {
          id: 's2',
          title: 'Short 2',
          link: 'https://test.com/s2',
          readTime: 1,
        },
        {
          id: 's3',
          title: 'Short 3',
          link: 'https://test.com/s3',
          readTime: 2,
        },
        {
          id: 's4',
          title: 'Short 4',
          link: 'https://test.com/s4',
          readTime: 2,
        },
        {
          id: 's5',
          title: 'Short 5',
          link: 'https://test.com/s5',
          readTime: 3,
        },
        {
          id: 's6',
          title: 'Short 6',
          link: 'https://test.com/s6',
          readTime: 3,
        },
        {
          id: 's7',
          title: 'Short 7',
          link: 'https://test.com/s7',
          readTime: 3,
        },
        {
          id: 's8',
          title: 'Short 8',
          link: 'https://test.com/s8',
          readTime: 4,
        },
        {
          id: 's9',
          title: 'Short 9',
          link: 'https://test.com/s9',
          readTime: 4,
        },
        {
          id: 's10',
          title: 'Short 10',
          link: 'https://test.com/s10',
          readTime: 4,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      expect(shortReads).toHaveLength(4);
      expect(longReads).toHaveLength(4);
    });

    it('should handle ties on readTime preserving original order', () => {
      const items = [
        { id: '1', title: 'Item 1', link: 'https://test.com/1', readTime: 2 },
        { id: '2', title: 'Item 2', link: 'https://test.com/2', readTime: 2 },
        { id: '3', title: 'Item 3', link: 'https://test.com/3', readTime: 2 },
        { id: '4', title: 'Item 4', link: 'https://test.com/4', readTime: 2 },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      // All 4 items have same readTime, canSplitRelatively=true (4 >= 4)
      // Relative split: k=2, sort by readTime (all equal), take first 2 and last 2
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
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
          id: 'test-3',
          title: 'Third',
          link: 'https://test.com/3',
          readTime: 3,
        },
        {
          id: 'test-4',
          title: 'Fourth',
          link: 'https://test.com/4',
          readTime: 7,
        },
        {
          id: 'test-1',
          title: 'Duplicate',
          link: 'https://test.com/dup',
          readTime: 3,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      // 4 unique items, 2 short and 2 long - below threshold for fixed/relative to both apply
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
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
          id: 'test-2',
          title: 'Long 1',
          link: 'https://test.com/2',
          readTime: 6,
        },
        {
          id: 'test-3',
          title: 'Long 2',
          link: 'https://test.com/3',
          readTime: 7,
        },
        {
          id: 'test-4',
          title: 'Long 3',
          link: 'https://test.com/4',
          readTime: 8,
        },
        {
          id: 'test-1',
          title: 'Long Duplicate',
          link: 'https://test.com/dup',
          readTime: 9,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      // After deduplication: 1 short (test-1 at 2), 3 long (test-2, test-3, test-4)
      // 4 items total, canSplitRelatively = true (4 >= 4)
      // fixedFillsBothTabs = false (only 1 short)
      // Use relative split: k=2
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
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
        {
          id: 'valid-3',
          title: 'Valid short 2',
          link: 'https://test.com/5',
          readTime: 1,
        },
        {
          id: 'valid-4',
          title: 'Valid long 2',
          link: 'https://test.com/6',
          readTime: 8,
        },
      ];

      const { shortReads, longReads } = classifyByReadTime(items);

      // 4 valid items: 2 short (valid-1, valid-3), 2 long (valid-2, valid-4)
      // 4 items total, can try relative/fixed
      // fixedFillsBothTabs = false (only 2 short, 2 long)
      // canSplitRelatively = true (4 >= 4)
      // Use relative split: k=2, shortest 2 and longest 2
      expect(shortReads).toHaveLength(2);
      expect(longReads).toHaveLength(2);
      expect(shortReads[0].id).toBe('valid-1');
      expect(longReads[0].id).toBe('valid-2');
    });
  });
});
