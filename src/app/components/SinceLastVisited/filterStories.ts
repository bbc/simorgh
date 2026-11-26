import { Curation, Summary } from '#app/models/types/curationData';
import { CLOCK_SKEW_TOLERANCE_MS, MAX_VISIBLE_ITEMS } from './constants';

const TOP_STORIES_POSITION = 0;
const URN_PATTERN = /^urn:bbc:[a-z0-9-]+:[a-z0-9-]+:[A-Za-z0-9_-]+$/;

export const isValidUrn = (value: unknown): value is string =>
  typeof value === 'string' && URN_PATTERN.test(value);

/**
 * The BFF home contract is that the curation at position 0 is Top Stories
 * (Simorgh's HomePage relies on the same assumption). Keep it in one place.
 */
export const getTopStoriesCuration = (curations: Curation[] | undefined) => {
  const curation = curations?.find(
    ({ position }) => position === TOP_STORIES_POSITION,
  );
  if (!curation || !isValidUrn(curation.curationId)) return null;
  return curation;
};

// The BFF emits ISO 8601 UTC strings, or '' when the date is missing
export const getPublishedTimestamp = (value: unknown) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : null;
  }
  if (typeof value !== 'string' || value.trim() === '') return null;

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : timestamp;
};

const getPathname = (link: string) => {
  try {
    return new URL(link).pathname.replace(/\/$/, '');
  } catch {
    return null;
  }
};

const isValidLink = (link: unknown): link is string =>
  typeof link === 'string' && getPathname(link) !== null;

type Options = {
  cutoff: number;
  now: number;
  currentPathname?: string;
  maxItems?: number;
};

/** Deduplicates by id, then filters to stories first published strictly after the cutoff, newest first. */
export const filterSummaries = (
  summaries: Summary[],
  { cutoff, now, currentPathname, maxItems = MAX_VISIBLE_ITEMS }: Options,
) => {
  const seen = new Set<string>();
  const current = currentPathname?.replace(/\/$/, '');

  return summaries
    .filter(summary => {
      const { id, title, link, firstPublished } = summary;
      if (!id || seen.has(id)) return false;
      seen.add(id);

      if (!title || typeof title !== 'string' || !title.trim()) return false;
      if (!isValidLink(link)) return false;
      if (current && getPathname(link) === current) return false;

      const published = getPublishedTimestamp(firstPublished);
      if (published === null) return false;

      return published > cutoff && published <= now + CLOCK_SKEW_TOLERANCE_MS;
    })
    .sort(
      (a, b) =>
        (getPublishedTimestamp(b.firstPublished) as number) -
        (getPublishedTimestamp(a.firstPublished) as number),
    )
    .slice(0, maxItems);
};

/** True when every dated story on the page is at or before the cutoff. */
export const pageIsEntirelyOlderThan = (
  summaries: Summary[],
  cutoff: number,
) => {
  const dated = summaries
    .map(({ firstPublished }) => getPublishedTimestamp(firstPublished))
    .filter((value): value is number => value !== null);

  return dated.length > 0 && dated.every(value => value <= cutoff);
};
