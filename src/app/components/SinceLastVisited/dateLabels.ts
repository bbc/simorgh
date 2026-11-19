import { getPublishedTimestamp } from './filterStories';

const formatDay = (timestamp: number, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(
    timestamp,
  );

// Calendar day in the reader's timezone, used to group promos by day
export const getDayKey = (value: unknown) => {
  const timestamp = getPublishedTimestamp(value);
  if (timestamp === null) return null;
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

/** "19 nov" for one day, "18 nov – 19 nov" when the promos span several. */
export const getDateRangeLabel = (
  firstValue: unknown,
  lastValue: unknown,
  locale: string,
) => {
  const first = getPublishedTimestamp(firstValue);
  const last = getPublishedTimestamp(lastValue);
  if (first === null || last === null) return '';

  const start = formatDay(first, locale);
  if (getDayKey(first) === getDayKey(last)) return start;
  return `${start} – ${formatDay(last, locale)}`;
};
