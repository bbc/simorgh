import { Services } from '#app/models/types/global';

// The two-tier bar is roughly 88px tall. Requiring at least this much
// viewport height keeps it under about a fifth of the screen, and has the
// side effect of switching the feature off beyond roughly 200% zoom, where a
// fixed bar would cover too much of the content it overlays.
export const STICKY_MIN_VIEWPORT_HEIGHT = 450;

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
