const REITH_FONTS_DIR = 'https://static.files.bbci.co.uk/fonts/reith/r2.512/';

const NOTO_SERIF_SINHALA_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifSinhala/v1.00/';

const NOTO_SANS_TAMIL_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansTamil/v1.00/';

const NOTO_SANS_TELUGU_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansTelugu/v1.00/';

const NOTO_SANS_GUJARATI_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansGujarati/v1.00/';

const NOTO_SANS_ETHIOPIC_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansEthiopic/v1.901/';

const PADAUK_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/Padauk/v2.8/';

const NOTO_SERIF_BENGALI_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifBengali/v1.00/';

const REITH_QALAM_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/ReithQalam/v1.210/';

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
  fontFamily: 'Noto Serif Sinhala',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

const NOTO_SERIF_SINHALA_BOLD = {
  fontFamily: 'Noto Serif Sinhala',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

const NOTO_SANS_TAMIL_REGULAR = {
  fontFamily: 'Noto Sans Tamil',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

const NOTO_SANS_TAMIL_BOLD = {
  fontFamily: 'Noto Sans Tamil',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

const NOTO_SANS_TELUGU_REGULAR = {
  fontFamily: 'Noto Sans Telugu',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TELUGU_FONTS_DIR,
};

const NOTO_SANS_TELUGU_BOLD = {
  fontFamily: 'Noto Sans Telugu',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_TELUGU_FONTS_DIR,
};

const NOTO_SANS_GUJARATI_REGULAR = {
  fontFamily: 'Noto Sans Gujarati',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_GUJARATI_FONTS_DIR,
};

const NOTO_SANS_GUJARATI_BOLD = {
  fontFamily: 'Noto Sans Gujarati',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_GUJARATI_FONTS_DIR,
};

const NOTO_SANS_ETHIOPIC_REGULAR = {
  fontFamily: 'Noto Sans Ethiopic',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

const NOTO_SANS_ETHIOPIC_BOLD = {
  fontFamily: 'Noto Sans Ethiopic',
  fontWeight: 700,
  fontStyle: 'normal',
  src: `${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff2`,
  fontDisplay: 'swap',
  baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

const PADAUK_REGULAR = {
  fontFamily: 'Padauk',
  fontWeight: 400,
  fontStyle: 'normal',
  src: `${PADAUK_FONTS_DIR}normal.woff2`,
  fontDisplay: 'swap',
  baseUrl: PADAUK_FONTS_DIR,
};

const PADAUK_BOLD = {
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
  varsion: 'v1.210',
  fontStyle: 'normal',
  src: `${REITH_QALAM_FONTS_DIR}normal.woff2`,
  fontDisplay: 'optional',
};

const REITH_QALAM_BOLD = {
  name: 'qalamBold',
  fontFamily: 'BBC Reith Qalam',
  fontWeight: 700,
  varsion: 'v1.210',
  fontStyle: 'normal',
  src: `${REITH_QALAM_FONTS_DIR}bold.woff2`,
  fontDisplay: 'optional',
};

export default (service: string) => {
  switch (service) {
    case 'news':
    case 'newsround':
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
