import { Services } from '#app/models/types/global';
import { useTheme } from '@emotion/react';
import { FontFace } from '#app/models/types/theming';

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

type Font = {
  '@font-face': FontFace;
};

// Noto Sans Tamil
export const NOTO_SANS_TAMIL_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Tamil_B',
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TAMIL_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Tamil',
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Telugu
export const NOTO_SANS_TELUGU_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Telugu_B',
    fontFamily: 'Noto Sans Telugu',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff2`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TELUGU_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Telugu',
    fontFamily: 'Noto Sans Telugu',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff2`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Gujarati
export const NOTO_SANS_GUJARATI_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Gujarati_B',
    fontFamily: 'Noto Sans Gujarati',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff2`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_GUJARATI_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Gujarati',
    fontFamily: 'Noto Sans Gujarati',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff2`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Ethiopic
export const NOTO_SANS_ETHIOPIC_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Ethiopic_B',
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff2`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_ETHIOPIC_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Ethiopic',
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff2`,
    fontDisplay: 'swap',
  },
};

// Noto Serif Bengali
export const NOTO_SERIF_BENGALI_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Serif_Bengali_B',
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2`,
    fontDisplay: 'optional',
  },
};

export const NOTO_SERIF_BENGALI_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Serif_Bengali',
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2`,
    fontDisplay: 'optional',
  },
};

// Noto Serif Sinhala
export const NOTO_SERIF_SINHALA_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Serif_Sinhala_B',
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SERIF_SINHALA_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Serif_Sinhala',
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2`,
    fontDisplay: 'swap',
  },
};

// Padauk
export const PADAUK_BOLD: Font = {
  '@font-face': {
    name: 'Padauk_B',
    fontFamily: 'Padauk',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}bold.woff') format('woff'), url('${PADAUK_FONTS_DIR}bold.eot') format('eot'), url('${PADAUK_FONTS_DIR}bold.ttf') format('ttf')`,
    downloadSrc: `${PADAUK_FONTS_DIR}bold.woff2`,
    fontDisplay: 'swap',
  },
};

export const PADAUK_REGULAR: Font = {
  '@font-face': {
    name: 'Padauk',
    fontFamily: 'Padauk',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}normal.woff') format('woff'), url('${PADAUK_FONTS_DIR}normal.eot') format('eot'), url('${PADAUK_FONTS_DIR}normal.ttf') format('ttf')`,
    downloadSrc: `${PADAUK_FONTS_DIR}normal.woff2`,
    fontDisplay: 'swap',
  },
};

// ReithSans
export const REITH_SANS_BOLD: Font = {
  '@font-face': {
    name: 'BBCReithSans_W_Bd',
    version: 'r2.512',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff") format("woff")`,
    downloadSrc: `${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff2`,
    fontFamily: 'ReithSans',
    fontWeight: 700,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_REGULAR: Font = {
  '@font-face': {
    name: 'BBCReithSans_W_Rg',
    version: 'r2.512',
    fontWeight: 400,
    fontFamily: 'ReithSans',
    fontDisplay: 'optional',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff") format("woff")`,
    downloadSrc: `${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff2`,
  },
};

// ReithSerif
export const REITH_SERIF_LIGHT: Font = {
  '@font-face': {
    name: 'BBCReithSerif_WNumbers_Lt',
    version: 'r2.512',
    fontFamily: 'ReithSerif',
    fontWeight: 300,
    fontDisplay: 'optional',
    src: `url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"), url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff")`,
    downloadSrc: `${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff2`,
  },
};

export const REITH_SERIF_MEDIUM: Font = {
  '@font-face': {
    name: 'BBCReithSerif_W_Md',
    version: 'r2.512',
    fontFamily: 'ReithSerif',
    fontWeight: 500,
    fontDisplay: 'optional',
    src: `url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff") format("woff")`,
    downloadSrc: `${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff2`,
  },
};

// Reith Qalam
export const REITH_QALAM_BOLD: Font = {
  '@font-face': {
    name: 'qalamBold',
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 700,
    version: 'v1.310',
    fontStyle: 'normal',
    src: `url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff') format('woff')`,
    downloadSrc: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff2`,
    fontDisplay: 'optional',
  },
};

export const REITH_QALAM_REGULAR: Font = {
  '@font-face': {
    name: 'qalamNormal',
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 400,
    version: 'v1.310',
    fontStyle: 'normal',
    src: `url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff') format('woff')`,
    downloadSrc: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff2`,
    fontDisplay: 'optional',
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

export default ({ service, isPWA }: { service: Services; isPWA: boolean }) => {
  let fontFaces;

  if (isPWA && REITH_FOR_PWA_SERVICES.includes(service)) {
    fontFaces = [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ];
  } else {
    // Font faces as defined in the service theme
    ({ fontFaces } = useTheme());
  }

  // Return the raw font info
  const fonts = fontFaces.map(font => font['@font-face']);

  return fonts;
};
