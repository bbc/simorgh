import { Services } from '#app/models/types/global';

const REITH_BASE_URL = 'https://static.files.bbci.co.uk/fonts/';

const REITH_FONTS_DIR = `${REITH_BASE_URL}reith/r2.512/`;
const REITH_QALAM_FONTS_DIR = `${REITH_BASE_URL}reith-qalam/1.310/`;

const FONTS_BASE_URL = `https://static.files.bbci.co.uk/ws/simorgh-assets/public/fonts/`;

const NOTO_SERIF_SINHALA_FONTS_DIR = `${FONTS_BASE_URL}NotoSerifSinhala/v1.00/`;
const NOTO_SANS_TAMIL_FONTS_DIR = `${FONTS_BASE_URL}NotoSansTamil/v1.00/`;
const NOTO_SANS_TELUGU_FONTS_DIR = `${FONTS_BASE_URL}NotoSansTelugu/v1.00/`;
const NOTO_SANS_GUJARATI_FONTS_DIR = `${FONTS_BASE_URL}NotoSansGujarati/v1.00/`;
const NOTO_SANS_ETHIOPIC_FONTS_DIR = `${FONTS_BASE_URL}NotoSansEthiopic/v1.901/`;
const NOTO_SERIF_BENGALI_FONTS_DIR = `${FONTS_BASE_URL}NotoSerifBengali/v1.00/`;
const PADAUK_FONTS_DIR = `${FONTS_BASE_URL}Padauk/v2.8/`;

const REITH_SERIF_LIGHT = {
  name: 'BBCReithSerif_WNumbers_Lt',
  version: 'r2.512',
  subsets: true,
  fontFamily: 'ReithSerif',
  fontWeight: 300,
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

const REITH_SERIF_MEDIUM = {
  name: 'BBCReithSerif_W_Md',
  version: 'r2.512',
  subsets: false,
  fontFamily: 'ReithSerif',
  fontWeight: 500,
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_REGULAR = {
  name: 'BBCReithSans_W_Rg',
  version: 'r2.512',
  subsets: false,
  fontWeight: 400,
  fontFamily: 'ReithSans',
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_BOLD = {
  name: 'BBCReithSans_W_Bd',
  version: 'r2.512',
  subsets: false,
  fontFamily: 'ReithSans',
  fontWeight: 700,
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

const NOTO_SERIF_SINHALA_REGULAR = {
  name: 'Noto_Serif_Sinhala',
  fontFamily: 'Noto Serif Sinhala',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

const NOTO_SERIF_SINHALA_BOLD = {
  name: 'Noto_Serif_Sinhala_B',
  fontFamily: 'Noto Serif Sinhala',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

const NOTO_SANS_TAMIL_REGULAR = {
  name: 'Noto_Sans_Tamil',
  fontFamily: 'Noto Sans Tamil',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

const NOTO_SANS_TAMIL_BOLD = {
  name: 'Noto_Sans_Tamil_B',
  fontFamily: 'Noto Sans Tamil',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

const NOTO_SANS_TELUGU_REGULAR = {
  name: 'Noto_Sans_Telugu',
  fontFamily: 'Noto Sans Telugu',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TELUGU_FONTS_DIR,
};

const NOTO_SANS_TELUGU_BOLD = {
  name: 'Noto_Sans_Telugu_B',
  fontFamily: 'Noto Sans Telugu',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TELUGU_FONTS_DIR,
};

const NOTO_SANS_GUJARATI_REGULAR = {
  name: 'Noto_Sans_Gujarati',
  fontFamily: 'Noto Sans Gujarati',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_GUJARATI_FONTS_DIR,
};

const NOTO_SANS_GUJARATI_BOLD = {
  name: 'Noto_Sans_Gujarati_B',
  fontFamily: 'Noto Sans Gujarati',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_GUJARATI_FONTS_DIR,
};

const NOTO_SANS_ETHIOPIC_REGULAR = {
  name: 'Noto_Sans_Ethiopic',
  fontFamily: 'Noto Sans Ethiopic',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

const NOTO_SANS_ETHIOPIC_BOLD = {
  name: 'Noto_Sans_Ethiopic_B',
  fontFamily: 'Noto Sans Ethiopic',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

const PADAUK_REGULAR = {
  name: 'Padauk',
  fontFamily: 'Padauk',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${PADAUK_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: PADAUK_FONTS_DIR,
};

const PADAUK_BOLD = {
  name: 'Padauk_B',
  fontFamily: 'Padauk',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${PADAUK_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: PADAUK_FONTS_DIR,
};

const NOTO_SERIF_BENGALI_REGULAR = {
  name: 'notoserifregular',
  fontFamily: 'Noto Serif Bengali',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2`,
  fontDisplay: 'optional',
};

const NOTO_SERIF_BENGALI_BOLD = {
  name: 'notoserifbold',
  fontFamily: 'Noto Serif Bengali',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2`,
  fontDisplay: 'optional',
};

const REITH_QALAM_REGULAR = {
  name: 'qalamNormal',
  fontFamily: 'BBC Reith Qalam',
  fontWeight: 400,
  version: 'v1.310',
  fontStyle: 'normal',
  src: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff2`,
  fontDisplay: 'optional',
};

const REITH_QALAM_BOLD = {
  name: 'qalamBold',
  fontFamily: 'BBC Reith Qalam',
  fontWeight: 700,
  version: 'v1.310',
  fontStyle: 'normal',
  src: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff2`,
  fontDisplay: 'optional',
};

const REITH_FOR_PWA_SERVICES: Services[] = [
  'afaanoromoo',
  'afrique',
  'azeri',
  'gahuza',
  'hausa',
  'igbo',
  'indonesia',
  'kyrgyz',
  'pidgin',
  'serbian',
  'somali',
  'swahili',
  'ukrainian',
  'uzbek',
  'yoruba',
];

export default (service: Services, isPWA: boolean) => {
  if (isPWA && REITH_FOR_PWA_SERVICES.includes(service)) {
    return [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ];
  }

  switch (service) {
    case 'news':
    case 'newsround':
    case 'magyarul':
    case 'mundo':
    case 'polska':
    case 'portuguese':
    case 'russian':
    case 'sport':
    case 'turkce':
    case 'ws':
      return [
        REITH_SANS_BOLD,
        REITH_SANS_REGULAR,
        REITH_SERIF_MEDIUM,
        REITH_SERIF_LIGHT,
      ];
    case 'arabic':
    case 'pashto':
    case 'persian':
    case 'urdu':
      return [REITH_QALAM_REGULAR, REITH_QALAM_BOLD];
    case 'sinhala':
      return [NOTO_SERIF_SINHALA_REGULAR, NOTO_SERIF_SINHALA_BOLD];
    case 'bengali':
      return [NOTO_SERIF_BENGALI_REGULAR, NOTO_SERIF_BENGALI_BOLD];
    case 'tamil':
      return [NOTO_SANS_TAMIL_REGULAR, NOTO_SANS_TAMIL_BOLD];
    case 'telugu':
      return [NOTO_SANS_TELUGU_REGULAR, NOTO_SANS_TELUGU_BOLD];
    case 'gujarati':
      return [NOTO_SANS_GUJARATI_REGULAR, NOTO_SANS_GUJARATI_BOLD];
    case 'amharic':
    case 'tigrinya':
      return [NOTO_SANS_ETHIOPIC_REGULAR, NOTO_SANS_ETHIOPIC_BOLD];
    case 'burmese':
      return [PADAUK_REGULAR, PADAUK_BOLD];
    default:
      return [];
  }
};
