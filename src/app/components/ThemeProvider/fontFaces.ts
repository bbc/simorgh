import { Services } from '#app/models/types/global';

/**
 * Font Directories
 */

const REITH_BASE_URL = 'https://static.files.bbci.co.uk/fonts/';

export const REITH_FONTS_DIR = `${REITH_BASE_URL}reith/r2.512/`;
const REITH_QALAM_FONTS_DIR = `${REITH_BASE_URL}reith-qalam/1.310/`;

const FONTS_BASE_URL = `https://static.files.bbci.co.uk/ws/simorgh-assets/public/fonts/`;

const NOTO_SANS_ETHIOPIC_FONTS_DIR = `${FONTS_BASE_URL}NotoSansEthiopic/v1.901/`;
const NOTO_SANS_GUJARATI_FONTS_DIR = `${FONTS_BASE_URL}NotoSansGujarati/v1.00/`;
const NOTO_SANS_TAMIL_FONTS_DIR = `${FONTS_BASE_URL}NotoSansTamil/v1.00/`;
const NOTO_SANS_TELUGU_FONTS_DIR = `${FONTS_BASE_URL}NotoSansTelugu/v1.00/`;

const NOTO_SERIF_BENGALI_FONTS_DIR = `${FONTS_BASE_URL}NotoSerifBengali/v1.00/`;
const NOTO_SERIF_SINHALA_FONTS_DIR = `${FONTS_BASE_URL}NotoSerifSinhala/v1.00/`;

const PADAUK_FONTS_DIR = `${FONTS_BASE_URL}Padauk/v2.8/`;

/**
 * Font Definitions
 */

// Noto Sans Tamil
const notoSansTamilBold = {
  name: 'Noto_Sans_Tamil_B',
  fontFamily: 'Noto Sans Tamil',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

export const NOTO_SANS_TAMIL_BOLD = {
  '@font-face': {
    ...notoSansTamilBold,
  },
};

const notoSansTamilRegular = {
  name: 'Noto_Sans_Tamil',
  fontFamily: 'Noto Sans Tamil',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

export const NOTO_SANS_TAMIL_REGULAR = {
  '@font-face': {
    ...notoSansTamilRegular,
  },
};

// Noto Sans Telugu
const notoSansTeluguBold = {
  name: 'Noto_Sans_Telugu_B',
  fontFamily: 'Noto Sans Telugu',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TELUGU_FONTS_DIR,
};

export const NOTO_SANS_TELUGU_BOLD = {
  '@font-face': {
    ...notoSansTeluguBold,
  },
};

const notoSansTeluguRegular = {
  name: 'Noto_Sans_Telugu',
  fontFamily: 'Noto Sans Telugu',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TELUGU_FONTS_DIR,
};

export const NOTO_SANS_TELUGU_REGULAR = {
  '@font-face': {
    ...notoSansTeluguRegular,
  },
};

// Noto Sans Gujarati
const notoSansGujaratiBold = {
  name: 'Noto_Sans_Gujarati_B',
  fontFamily: 'Noto Sans Gujarati',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_GUJARATI_FONTS_DIR,
};

export const NOTO_SANS_GUJARATI_BOLD = {
  '@font-face': {
    ...notoSansGujaratiBold,
  },
};

const notoSansGujaratiRegular = {
  name: 'Noto_Sans_Gujarati',
  fontFamily: 'Noto Sans Gujarati',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_GUJARATI_FONTS_DIR,
};

export const NOTO_SANS_GUJARATI_REGULAR = {
  '@font-face': {
    ...notoSansGujaratiRegular,
  },
};

// Noto Sans Ethiopic
const notoSansEthiopicBold = {
  name: 'Noto_Sans_Ethiopic_B',
  fontFamily: 'Noto Sans Ethiopic',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

export const NOTO_SANS_ETHIOPIC_BOLD = {
  '@font-face': {
    ...notoSansEthiopicBold,
  },
};

const notoSansEthiopicRegular = {
  name: 'Noto_Sans_Ethiopic',
  fontFamily: 'Noto Sans Ethiopic',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

export const NOTO_SANS_ETHIOPIC_REGULAR = {
  '@font-face': {
    ...notoSansEthiopicRegular,
  },
};

// Noto Serif Bengali
const notoSerifBengaliBold = {
  name: 'notoserifbold',
  fontFamily: 'Noto Serif Bengali',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2`,
  fontDisplay: 'optional',
};

export const NOTO_SERIF_BENGALI_BOLD = {
  '@font-face': {
    ...notoSerifBengaliBold,
  },
};

const notoSerifBengaliRegular = {
  name: 'notoserifregular',
  fontFamily: 'Noto Serif Bengali',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2`,
  fontDisplay: 'optional',
};

export const NOTO_SERIF_BENGALI_REGULAR = {
  '@font-face': {
    ...notoSerifBengaliRegular,
  },
};

// Noto Serif Sinhala
const notoSerifSinhalaBold = {
  name: 'Noto_Serif_Sinhala_B',
  fontFamily: 'Noto Serif Sinhala',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

export const NOTO_SERIF_SINHALA_BOLD = {
  '@font-face': {
    ...notoSerifSinhalaBold,
  },
};

const notoSerifSinhalaRegular = {
  name: 'Noto_Serif_Sinhala',
  fontFamily: 'Noto Serif Sinhala',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

export const NOTO_SERIF_SINHALA_REGULAR = {
  '@font-face': {
    ...notoSerifSinhalaRegular,
  },
};

// Padauk
const padaukBold = {
  name: 'Padauk_B',
  fontFamily: 'Padauk',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${PADAUK_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: PADAUK_FONTS_DIR,
};

export const PADAUK_BOLD = {
  '@font-face': {
    ...padaukBold,
  },
};

const padaukRegular = {
  name: 'Padauk',
  fontFamily: 'Padauk',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${PADAUK_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: PADAUK_FONTS_DIR,
};

export const PADAUK_REGULAR = {
  '@font-face': {
    ...padaukRegular,
  },
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

// ReithSans
const reithSansBold = {
  name: 'BBCReithSans_W_Bd',
  version: 'r2.512',
  subsets: false,
  fontFamily: 'ReithSans',
  fontWeight: 700,
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

export const REITH_SANS_BOLD = {
  '@font-face': {
    ...reithSansBold,
  },
};

const reithSansRegular = {
  name: 'BBCReithSans_W_Rg',
  version: 'r2.512',
  subsets: false,
  fontWeight: 400,
  fontFamily: 'ReithSans',
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

export const REITH_SANS_REGULAR = {
  '@font-face': {
    ...reithSansRegular,
  },
};

// ReithSerif
const reithSerifLight = {
  name: 'BBCReithSerif_WNumbers_Lt',
  version: 'r2.512',
  subsets: true,
  fontFamily: 'ReithSerif',
  fontWeight: 300,
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

export const REITH_SERIF_LIGHT = {
  '@font-face': {
    ...reithSerifLight,
  },
};

const reithSerifMedium = {
  name: 'BBCReithSerif_W_Md',
  version: 'r2.512',
  subsets: false,
  fontFamily: 'ReithSerif',
  fontWeight: 500,
  fontDisplay: 'optional',
  baseUrl: REITH_FONTS_DIR,
};

export const REITH_SERIF_MEDIUM = {
  '@font-face': {
    ...reithSerifMedium,
  },
};

// Reith Qalam
const reithQalamBold = {
  name: 'qalamBold',
  fontFamily: 'BBC Reith Qalam',
  fontWeight: 700,
  version: 'v1.310',
  fontStyle: 'normal',
  src: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff2`,
  fontDisplay: 'optional',
};

export const REITH_QALAM_BOLD = {
  '@font-face': {
    ...reithQalamBold,
  },
};

const reithQalamRegular = {
  name: 'qalamNormal',
  fontFamily: 'BBC Reith Qalam',
  fontWeight: 400,
  version: 'v1.310',
  fontStyle: 'normal',
  src: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff2`,
  fontDisplay: 'optional',
};

export const REITH_QALAM_REGULAR = {
  '@font-face': {
    ...reithQalamRegular,
  },
};

export default (service: Services, isPWA: boolean) => {
  if (isPWA && REITH_FOR_PWA_SERVICES.includes(service)) {
    return [reithSansBold, reithSansRegular, reithSerifMedium, reithSerifLight];
  }

  switch (service) {
    case 'arabic':
    case 'pashto':
    case 'persian':
    case 'urdu':
      return [reithQalamRegular, reithQalamBold];
    case 'sinhala':
      return [notoSerifSinhalaRegular, notoSerifSinhalaBold];
    case 'bengali':
      return [notoSerifBengaliRegular, notoSerifBengaliBold];
    case 'tamil':
      return [notoSansTamilRegular, notoSansTamilBold];
    case 'telugu':
      return [notoSansTeluguRegular, notoSansTeluguBold];
    case 'gujarati':
      return [notoSansGujaratiRegular, notoSansGujaratiBold];
    case 'amharic':
    case 'tigrinya':
      return [notoSansEthiopicRegular, notoSansEthiopicBold];
    case 'burmese':
      return [padaukRegular, padaukBold];
    default:
      return [
        reithSansBold,
        reithSansRegular,
        reithSerifMedium,
        reithSerifLight,
      ];
  }
};
