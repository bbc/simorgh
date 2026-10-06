import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import onClient from '#app/lib/utilities/onClient';

export const isMobile = () => {
  if (!onClient()) return false;

  const matchMedia = window.matchMedia(
    `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
  );

  if (matchMedia.matches) return true;

  return false;
};

export const REFERRER_CATEGORIES = {
  DIRECT: ['bbc.com'],
  SEARCH: ['google', 'bing', 'msn', 'yahoo', 'duckduckgo', 'yandex', 'ecosia'],
  SOCIAL: ['facebook', 'instagram', 't.co', 'youtube', 'threads', 'linkin'],
  AT_PARAM_VALUES: ['social', 'social_flow', 'ws_whatsapp'],
};

export const getReferrer = () => {
  if (!onClient()) return null;

  const referrer = document?.referrer?.toLowerCase();

  const urlParams = new URLSearchParams(window.location.search);

  const atParam = urlParams.get('at_campaign') || urlParams.get('at_medium');

  if (REFERRER_CATEGORIES.SEARCH.some(domain => referrer.includes(domain)))
    return 'search';

  if (REFERRER_CATEGORIES.SOCIAL.some(domain => referrer.includes(domain)))
    return 'social';

  if (
    atParam &&
    REFERRER_CATEGORIES.AT_PARAM_VALUES.includes(atParam.toLowerCase())
  )
    return 'social';

  if (REFERRER_CATEGORIES.DIRECT.some(domain => referrer.includes(domain)))
    return 'direct';

  return 'direct';
};

export const getClientTimeOfDay = () => {
  if (!onClient()) return null;

  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17) return 'evening';

  return 'night'; // return if hour is between 0 and 5
};
