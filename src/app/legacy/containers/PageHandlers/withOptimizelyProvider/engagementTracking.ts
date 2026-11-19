import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import { getStorage } from './visitTracking';

export const CONTENT_PAGES_EVENT_NAME = 'content-pages-2-plus';
export const RETURN_VISIT_EVENT_NAME = 'return-visit-within-7-days';

const ACTIVATION_TIMESTAMP_KEY = 'optimizely_activation_ts';
const RETURN_SENT_KEY = 'optimizely_return_event_sent';
const PAGE_COUNT_KEY = 'per_visit_page_count';
const LAST_COUNTED_URL_KEY = 'per_visit_last_counted_url';

// 7 day return visit window
const RETURN_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const CONTENT_PAGE_THRESHOLD = 2;

const CONTENT_PAGE_TYPES: string[] = [
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ARTICLE_PAGE,
  LIVE_PAGE,
];

const readFromStorage = (key: string) => {
  try {
    return getStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
};

const writeToStorage = (key: string, value: string) => {
  try {
    getStorage()?.setItem(key, value);
  } catch {
    // swallow storage errors to avoid breaking tracking
  }
};

const readNumber = (key: string) => {
  const value = Number(readFromStorage(key));
  return Number.isFinite(value) && value > 0 ? value : null;
};

const isReturnWithinWindow = (activation: number | null, now: number) =>
  Boolean(activation) &&
  now - (activation as number) <= RETURN_WINDOW_MS &&
  !readFromStorage(RETURN_SENT_KEY);

type Props = {
  newVisit: boolean;
  pageType?: string;
  url: string;
  now: number;
};

const getEngagementEvents = ({ newVisit, pageType, url, now }: Props) => {
  const events: string[] = [];
  const activation = readNumber(ACTIVATION_TIMESTAMP_KEY);

  if (!activation) {
    writeToStorage(ACTIVATION_TIMESTAMP_KEY, String(now));
  }

  if (newVisit) {
    writeToStorage(PAGE_COUNT_KEY, '0');
    writeToStorage(LAST_COUNTED_URL_KEY, '');

    if (isReturnWithinWindow(activation, now)) {
      writeToStorage(RETURN_SENT_KEY, 'true');
      events.push(RETURN_VISIT_EVENT_NAME);
    }
  }

  const isNewContentPageView =
    CONTENT_PAGE_TYPES.includes(pageType ?? '') &&
    readFromStorage(LAST_COUNTED_URL_KEY) !== url;

  if (isNewContentPageView) {
    const count = (readNumber(PAGE_COUNT_KEY) ?? 0) + 1;
    writeToStorage(PAGE_COUNT_KEY, String(count));
    writeToStorage(LAST_COUNTED_URL_KEY, url);

    // Only send event once when the content page threshold is reached
    if (count === CONTENT_PAGE_THRESHOLD) {
      events.push(CONTENT_PAGES_EVENT_NAME);
    }
  }

  return events;
};

export default getEngagementEvents;
