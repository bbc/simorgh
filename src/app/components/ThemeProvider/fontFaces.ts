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

export const REITH_SERIF_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}BBCReithSerif_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Rg.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

export const REITH_SERIF_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}BBCReithSerif_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'optional',
  },
};

export const REITH_SERIF_LIGHT = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"), url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'optional',
  },
};

export const REITH_SERIF_MEDIUM = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'optional',
  },
};

export const REITH_SERIF_EXTRA_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("${REITH_FONTS_DIR}BBCReithSerif_W_ExBd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_ExBd.woff") format("woff")`,
    fontWeight: 800,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_LIGHT = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Lt.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_LIGHT_ITALIC = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_LtIt.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_LtIt.woff") format("woff")`,
    fontWeight: 300,
    fontStyle: 'italic',
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_MEDIUM = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_Md.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_EXTRA_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_ExBd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_ExBd.woff") format("woff")`,
    fontWeight: 800,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_EXTRA_BOLD_ITALIC = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("${REITH_FONTS_DIR}BBCReithSans_W_ExBdIt.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_ExBdIt.woff") format("woff")`,
    fontWeight: 800,
    fontStyle: 'italic',
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_CONDENSED_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSansCondensed',
    src: `url("${REITH_FONTS_DIR}BBCReithSansCd_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSansCd_W_Rg.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

export const REITH_SANS_CONDENSED_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSansCondensed',
    fontWeight: 700,
    src: `url("${REITH_FONTS_DIR}BBCReithSansCd_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSansCd_W_Bd.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

export const NOTO_SERIF_SINHALA_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SERIF_SINHALA_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TAMIL_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TAMIL_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TELUGU_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Telugu',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TELUGU_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_TELUGU_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Telugu',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_TELUGU_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_GUJARATI_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Gujarati',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_GUJARATI_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Gujarati',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_GUJARATI_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_ETHIOPIC_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SANS_ETHIOPIC_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const PADAUK_REGULAR = {
  '@font-face': {
    fontFamily: 'Padauk',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}normal.woff') format('woff'), url('${PADAUK_FONTS_DIR}normal.eot') format('eot'), url('${PADAUK_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const PADAUK_BOLD = {
  '@font-face': {
    fontFamily: 'Padauk',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}bold.woff') format('woff'), url('${PADAUK_FONTS_DIR}bold.eot') format('eot'), url('${PADAUK_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

export const NOTO_SERIF_BENGALI_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'optional',
  },
};

export const NOTO_SERIF_BENGALI_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'optional',
  },
};

export const REITH_QALAM_REGULAR = {
  '@font-face': {
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${REITH_QALAM_FONTS_DIR}normal.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}normal.woff') format('woff')`,
    fontDisplay: 'optional',
  },
};

export const REITH_QALAM_BOLD = {
  '@font-face': {
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${REITH_QALAM_FONTS_DIR}bold.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}bold.woff') format('woff')`,
    fontDisplay: 'optional',
  },
};
