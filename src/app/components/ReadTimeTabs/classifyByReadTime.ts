import { Summary } from '#app/models/types/curationData';

// No existing Simorgh convention for "short"/"long" reads was found, so this
// prototype threshold is defined once here. Units: whole minutes, matching
// article `metadata.stats.readTime`.
export const SHORT_READ_MAX_MINUTES = 4;

export type ReadTimeItem = Summary & { readTime: number };

export type ClassifiedReads = {
  shortReads: ReadTimeItem[];
  longReads: ReadTimeItem[];
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

// Read time must be a positive whole number of minutes. Anything else
// (missing, NaN, zero, negative, fractional, string) is unclassifiable rather
// than guessed at.
export const isValidReadTime = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value > 0;

const isClassifiableItem = (item: unknown): item is ReadTimeItem => {
  if (typeof item !== 'object' || item === null) return false;

  const { id, title, link, readTime } = item as Record<string, unknown>;

  return (
    isNonEmptyString(id) &&
    isNonEmptyString(title) &&
    isNonEmptyString(link) &&
    isValidReadTime(readTime)
  );
};

/**
 * Splits client-fetched items into short and long reads using their own
 * `readTime`. Unclassifiable and duplicate items are dropped, input order is
 * preserved, and non-array input yields empty groups.
 */
const classifyByReadTime = (items: unknown): ClassifiedReads => {
  const result: ClassifiedReads = { shortReads: [], longReads: [] };

  if (!Array.isArray(items)) return result;

  const seenIds = new Set<string>();

  items.forEach(item => {
    if (!isClassifiableItem(item) || seenIds.has(item.id as string)) return;

    seenIds.add(item.id as string);

    if (item.readTime <= SHORT_READ_MAX_MINUTES) {
      result.shortReads.push(item);
    } else {
      result.longReads.push(item);
    }
  });

  return result;
};

export default classifyByReadTime;
