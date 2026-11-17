import { Summary } from '#app/models/types/curationData';

// No existing Simorgh convention for "short"/"long" reads was found, so this
// prototype threshold is defined once here. Units: whole minutes, matching
// article `metadata.stats.readTime`.
export const SHORT_READ_MAX_MINUTES = 4;

export const MIN_ITEMS_PER_TAB = 2;
export const MAX_ITEMS_PER_TAB = 4;

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

const takeValidUniqueItems = (items: unknown): ReadTimeItem[] => {
  if (!Array.isArray(items)) return [];

  const seenIds = new Set<string>();

  return items.filter((item): item is ReadTimeItem => {
    if (!isClassifiableItem(item) || seenIds.has(item.id as string)) {
      return false;
    }

    seenIds.add(item.id as string);
    return true;
  });
};

const keepInOriginalOrder = (all: ReadTimeItem[], chosen: ReadTimeItem[]) =>
  all.filter(item => chosen.includes(item));

const relativeSplit = (
  valid: ReadTimeItem[],
): [ReadTimeItem[], ReadTimeItem[]] => {
  const perTab = Math.min(MAX_ITEMS_PER_TAB, Math.floor(valid.length / 2));
  const byReadTime = [...valid].sort((a, b) => a.readTime - b.readTime);

  return [
    keepInOriginalOrder(valid, byReadTime.slice(0, perTab)),
    keepInOriginalOrder(valid, byReadTime.slice(-perTab)),
  ];
};

/**
 * Splits client-fetched items into short and long reads using their own
 * `readTime`.
 *
 * Each tab shows between MIN_ITEMS_PER_TAB and MAX_ITEMS_PER_TAB items. When the
 * fixed threshold cannot fill both tabs to the maximum, the split becomes
 * relative: the shortest items are "short" and the longest are "long", so the
 * labels stay comparative rather than absolute. A group below the minimum is
 * dropped. Unclassifiable and duplicate items are dropped, display order is
 * preserved, and non-array input yields empty groups.
 */
const classifyByReadTime = (items: unknown): ClassifiedReads => {
  const valid = takeValidUniqueItems(items);

  const fixedShort = valid.filter(
    item => item.readTime <= SHORT_READ_MAX_MINUTES,
  );
  const fixedLong = valid.filter(
    item => item.readTime > SHORT_READ_MAX_MINUTES,
  );

  const fixedFillsBothTabs =
    fixedShort.length >= MAX_ITEMS_PER_TAB &&
    fixedLong.length >= MAX_ITEMS_PER_TAB;
  const canSplitRelatively = valid.length >= MIN_ITEMS_PER_TAB * 2;

  const [shortCandidates, longCandidates] =
    !fixedFillsBothTabs && canSplitRelatively
      ? relativeSplit(valid)
      : [fixedShort, fixedLong];

  const finalise = (group: ReadTimeItem[]) =>
    group.length >= MIN_ITEMS_PER_TAB ? group.slice(0, MAX_ITEMS_PER_TAB) : [];

  return {
    shortReads: finalise(shortCandidates),
    longReads: finalise(longCandidates),
  };
};

export default classifyByReadTime;
