import { useTheme } from '@emotion/react';
import { Font, FontFace, FontName } from '#app/models/types/theming';

/**
 * Font Directories
 */

const REITH_BASE_URL = 'https://static.files.bbci.co.uk/fonts/';
export const REITH_FONTS_DIR = `${REITH_BASE_URL}reith/r2.512/`;

const FONTS_BASE_URL = `https://static.files.bbci.co.uk/ws/simorgh-assets/public/fonts/`;
const NOTO_SERIF_SINHALA_FONTS_DIR = `${FONTS_BASE_URL}NotoSerifSinhala/v1.00/`;
const NOTO_SANS_TAMIL_FONTS_DIR = `${FONTS_BASE_URL}NotoSansTamil/v1.00/`;
const NOTO_SANS_TELUGU_FONTS_DIR = `${FONTS_BASE_URL}NotoSansTelugu/v1.00/`;
const NOTO_SANS_GUJARATI_FONTS_DIR = `${FONTS_BASE_URL}NotoSansGujarati/v1.00/`;
const NOTO_SANS_ETHIOPIC_FONTS_DIR = `${FONTS_BASE_URL}NotoSansEthiopic/v1.901/`;
const PADAUK_FONTS_DIR = `${FONTS_BASE_URL}Padauk/v2.8/`;
const NOTO_SERIF_BENGALI_FONTS_DIR = `${FONTS_BASE_URL}NotoSerifBengali/v1.00/`;
const REITH_QALAM_FONTS_DIR = `${REITH_BASE_URL}reith-qalam/1.310/`;

/**
 * Font Definitions
 */

// ReithSans
export const REITH_SANS_REGULAR: Font = {
  '@font-face': {
    name: 'BBCReithSans_W_Rg',
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff") format("woff")`,
    fontWeight: 400,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_BOLD: Font = {
  '@font-face': {
    name: 'BBCReithSans_W_Bd',
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'optional',
  },
};

// ReithSerif
export const REITH_SERIF_LIGHT: Font = {
  '@font-face': {
    name: 'BBCReithSerif_WNumbers_Lt',
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"), url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'optional',
  },
};

export const REITH_SERIF_MEDIUM: Font = {
  '@font-face': {
    name: 'BBCReithSerif_W_Md',
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'optional',
  },
};

// Noto Serif Sinhala
export const NOTO_SERIF_SINHALA_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Serif_Sinhala',
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SERIF_SINHALA_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Serif_Sinhala_Bold',
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Tamil
export const NOTO_SANS_TAMIL_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Tamil',
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TAMIL_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Tamil_Bold',
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Telugu
export const NOTO_SANS_TELUGU_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Telugu',
    fontFamily: 'Noto Sans Telugu',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TELUGU_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Telugu_Bold',
    fontFamily: 'Noto Sans Telugu',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff2') format('woff2'),  url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Gujarati
export const NOTO_SANS_GUJARATI_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Gujarati',
    fontFamily: 'Noto Sans Gujarati',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_GUJARATI_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Gujarati_Bold',
    fontFamily: 'Noto Sans Gujarati',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

// Noto Sans Ethiopic
export const NOTO_SANS_ETHIOPIC_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Sans_Ethiopic',
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_ETHIOPIC_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Sans_Ethiopic_Bold',
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

// Padauk
export const PADAUK_REGULAR: Font = {
  '@font-face': {
    name: 'Padauk',
    fontFamily: 'Padauk',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}normal.woff2') format('woff2'), url('${PADAUK_FONTS_DIR}normal.woff') format('woff'), url('${PADAUK_FONTS_DIR}normal.eot') format('eot'), url('${PADAUK_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const PADAUK_BOLD: Font = {
  '@font-face': {
    name: 'Padauk_Bold',
    fontFamily: 'Padauk',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}bold.woff2') format('woff2'), url('${PADAUK_FONTS_DIR}bold.woff') format('woff'), url('${PADAUK_FONTS_DIR}bold.eot') format('eot'), url('${PADAUK_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

// Noto Serif Bengali
export const NOTO_SERIF_BENGALI_REGULAR: Font = {
  '@font-face': {
    name: 'Noto_Serif_Bengali',
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'optional',
  },
};

export const NOTO_SERIF_BENGALI_BOLD: Font = {
  '@font-face': {
    name: 'Noto_Serif_Bengali_Bold',
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'optional',
  },
};

// Reith Qalam
export const REITH_QALAM_REGULAR: Font = {
  '@font-face': {
    name: 'BBCReithQalam_W_Rg',
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff') format('woff')`,
    fontDisplay: 'optional',
  },
};

export const REITH_QALAM_BOLD: Font = {
  '@font-face': {
    name: 'BBCReithQalam_W_Bd',
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff') format('woff')`,
    fontDisplay: 'optional',
  },
};

export type FontInfo = FontFace & {
  downloadSrc: string;
  version?: string;
};

export const fontInfo: Record<FontName, FontInfo> = {
  BBCReithSans_W_Bd: {
    ...REITH_SANS_BOLD['@font-face'],
    downloadSrc: `${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff2`,
    version: 'r2.512',
  },
  BBCReithSans_W_Rg: {
    ...REITH_SANS_REGULAR['@font-face'],
    downloadSrc: `${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff2`,
    version: 'r2.512',
  },
  BBCReithSerif_WNumbers_Lt: {
    ...REITH_SERIF_LIGHT['@font-face'],
    downloadSrc: `${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff2`,
    version: 'r2.512',
  },
  BBCReithSerif_W_Md: {
    ...REITH_SERIF_MEDIUM['@font-face'],
    downloadSrc: `${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff2`,
    version: 'r2.512',
  },
  BBCReithQalam_W_Bd: {
    ...REITH_QALAM_BOLD['@font-face'],
    downloadSrc: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Bd.woff2`,
    version: 'v1.310',
  },
  BBCReithQalam_W_Rg: {
    ...REITH_QALAM_REGULAR['@font-face'],
    downloadSrc: `${REITH_QALAM_FONTS_DIR}BBCReithQalam_W_Rg.woff2`,
    version: 'v1.310',
  },
  Noto_Sans_Ethiopic: {
    ...NOTO_SANS_ETHIOPIC_REGULAR['@font-face'],
    downloadSrc: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff2`,
  },
  Noto_Sans_Ethiopic_Bold: {
    ...NOTO_SANS_ETHIOPIC_BOLD['@font-face'],
    downloadSrc: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff2`,
  },
  Noto_Sans_Gujarati: {
    ...NOTO_SANS_GUJARATI_REGULAR['@font-face'],
    downloadSrc: `${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff2`,
  },
  Noto_Sans_Gujarati_Bold: {
    ...NOTO_SANS_GUJARATI_BOLD['@font-face'],
    downloadSrc: `${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff2`,
  },
  Noto_Sans_Tamil: {
    ...NOTO_SANS_TAMIL_REGULAR['@font-face'],
    downloadSrc: `${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2`,
  },
  Noto_Sans_Tamil_Bold: {
    ...NOTO_SANS_TAMIL_BOLD['@font-face'],
    downloadSrc: `${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2`,
  },
  Noto_Sans_Telugu: {
    ...NOTO_SANS_TELUGU_REGULAR['@font-face'],
    downloadSrc: `${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff2`,
  },
  Noto_Sans_Telugu_Bold: {
    ...NOTO_SANS_TELUGU_BOLD['@font-face'],
    downloadSrc: `${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff2`,
  },
  Noto_Serif_Bengali: {
    ...NOTO_SERIF_BENGALI_REGULAR['@font-face'],
    downloadSrc: `${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2`,
  },
  Noto_Serif_Bengali_Bold: {
    ...NOTO_SERIF_BENGALI_BOLD['@font-face'],
    downloadSrc: `${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2`,
  },
  Noto_Serif_Sinhala: {
    ...NOTO_SERIF_SINHALA_REGULAR['@font-face'],
    downloadSrc: `${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2`,
  },
  Noto_Serif_Sinhala_Bold: {
    ...NOTO_SERIF_SINHALA_BOLD['@font-face'],
    downloadSrc: `${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2`,
  },
  Padauk: {
    ...PADAUK_REGULAR['@font-face'],
    downloadSrc: `${PADAUK_FONTS_DIR}normal.woff2`,
  },
  Padauk_Bold: {
    ...PADAUK_BOLD['@font-face'],
    downloadSrc: `${PADAUK_FONTS_DIR}bold.woff2`,
  },
};

export default () => {
  const { fontFaces } = useTheme();

  const fontNames = fontFaces
    .map(font => font['@font-face']?.name)
    .sort() as FontName[];

  return fontNames.map(fontName => fontInfo[fontName]);
};
