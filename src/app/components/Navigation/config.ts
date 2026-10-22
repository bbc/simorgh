import { Services } from '#app/models/types/global';

// The two-tier bar is roughly 88px tall. Requiring at least this much
// viewport height keeps it under about a fifth of the screen, and has the
// side effect of switching the feature off beyond roughly 200% zoom, where a
// fixed bar would cover too much of the content it overlays.
export const STICKY_MIN_VIEWPORT_HEIGHT = 450;

// Once the sticky navigation is showing, the user has to scroll back up this
// much further past its entry point before it disappears again. Without this
// gap, scrolling up just enough to reveal the bar and then moving the mouse
// towards it can hide it out from under the cursor.
export const STICKY_NAV_EXIT_BUFFER_PX = 500;

// How long the bar takes to slide in and out. Shared between the JavaScript
// animation lifecycle and the CSS transition declared on `stickyContainer`,
// so the two can never drift out of step.
export const STICKY_TRANSITION_DURATION_MS = 400;

export const FOCUSABLE_ITEMS_SELECTOR = 'a[href], button:not([disabled])';

export const SERVICES_WITH_STICKY_NAV: Services[] = [
  'mundo',
  'portuguese',
  'russian',
  'indonesia',
  'turkce',
  'urdu',
];

const SERVICES_WITH_NEW_NAV: Services[] = [
  'afaanoromoo',
  'afrique',
  'amharic',
  'arabic',
  'azeri',
  'bengali',
  'burmese',
  'dari',
  'gahuza',
  'gujarati',
  'hausa',
  'hindi',
  'igbo',
  'indonesia',
  'japanese',
  'korean',
  'kyrgyz',
  'magyarul',
  'marathi',
  'mundo',
  'nepali',
  'pashto',
  'persian',
  'pidgin',
  'polska',
  'portuguese',
  'punjabi',
  'romania',
  'russian',
  'serbian',
  'sinhala',
  'somali',
  'swahili',
  'tamil',
  'telugu',
  'thai',
  'tigrinya',
  'turkce',
  'ukchina',
  'ukrainian',
  'urdu',
  'uzbek',
  'vietnamese',
  'yoruba',
  'zhongwen',
] as const;

export default SERVICES_WITH_NEW_NAV;
