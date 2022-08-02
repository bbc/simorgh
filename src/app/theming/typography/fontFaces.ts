const REITH_FONTS_DIR = 'https://gel.files.bbci.co.uk/r2.512/';

const NOTO_SERIF_SINHALA_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifSinhala/v1.00/';

const NOTO_SANS_TAMIL_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansTamil/v1.00/';

const MALLANA_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/Mallanna/v1.0.4/';

const NOTO_SANS_ETHIOPIC_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansEthiopic/v1.901/';

const PADAUK_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/Padauk/v2.8/';

const NOTO_SERIF_BENGALI_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifBengali/v1.00/';

const REITH_QALAM_FONTS_DIR =
  'https://ws-downloads.files.bbci.co.uk/fonts/ReithQalam/v1.210/';

export const REITH_SERIF_REGULAR = `
  @font-face {
    font-family: "ReithSerif";
    src: url("${REITH_FONTS_DIR}BBCReithSerif_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Rg.woff") format("woff");
    font-display: optional;
  }`;

export const REITH_SERIF_BOLD = `
  @font-face {
    font-family: "ReithSerif";
    src: url("${REITH_FONTS_DIR}BBCReithSerif_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Bd.woff") format("woff");
    font-weight: 700;
    font-display: optional;
  }`;

export const REITH_SERIF_LIGHT = `
  @font-face {
    font-family: "ReithSerif";
    src: url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"), url("${REITH_FONTS_DIR}subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff");
    font-weight: 300;
    font-display: optional;
  }`;

export const REITH_SERIF_MEDIUM = `
  @font-face {
    font-family: "ReithSerif";
    src: url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_Md.woff") format("woff");
    font-weight: 500;
    font-display: optional;
  }`;

export const REITH_SERIF_EXTRA_BOLD = `
  @font-face {
    font-family: "ReithSerif";
    src: url("${REITH_FONTS_DIR}BBCReithSerif_W_ExBd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSerif_W_ExBd.woff") format("woff");
    font-weight: 800;
    font-display: optional;
  }`;

export const REITH_SANS_REGULAR = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Rg.woff") format("woff");
    font-display: optional;
  }`;

export const REITH_SANS_BOLD = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff") format("woff");
    font-weight: 700;
    font-display: optional;
  }`;

export const REITH_SANS_LIGHT = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_Lt.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Lt.woff") format("woff");
    font-weight: 300;
    font-display: optional;
  }`;

export const REITH_SANS_LIGHT_ITALIC = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_LtIt.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_LtIt.woff") format("woff");
    font-weight: 300;
    font-style: italic;
    font-display: optional;
  }`;

export const REITH_SANS_MEDIUM = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_Md.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_Md.woff") format("woff");
    font-weight: 500;
    font-display: optional;
  }`;

export const REITH_SANS_EXTRA_BOLD = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_ExBd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_ExBd.woff") format("woff");
    font-weight: 800;
    font-display: optional;
  }`;

export const REITH_SANS_EXTRA_BOLD_ITALIC = `
  @font-face {
    font-family: "ReithSans";
    src: url("${REITH_FONTS_DIR}BBCReithSans_W_ExBdIt.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSans_W_ExBdIt.woff") format("woff");
    font-weight: 800;
    font-style: italic;
    font-display: optional;
  }`;

export const REITH_SANS_CONDENSED_REGULAR = `
  @font-face {
      font-family: "ReithSansCondensed";
      src: url("${REITH_FONTS_DIR}BBCReithSansCd_W_Rg.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSansCd_W_Rg.woff") format("woff");
      font-display: optional;
  }`;

export const REITH_SANS_CONDENSED_BOLD = `
  @font-face {
      font-family: "ReithSansCondensed";
      font-weight: 700;
      src: url("${REITH_FONTS_DIR}BBCReithSansCd_W_Bd.woff2") format("woff2"), url("${REITH_FONTS_DIR}BBCReithSansCd_W_Bd.woff") format("woff");
      font-display: optional;
  }`;

export const NOTO_SERIF_SINHALA_REGULAR = `
  @font-face {
    font-family: "Noto Serif Sinhala";
    font-weight: 400;
    font-style: normal;
    src: url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.ttf') format('ttf'_FONTS_DIR);
    font-display: swap;
  }`;

export const NOTO_SERIF_SINHALA_BOLD = `
  @font-face {
    font-family: "Noto Serif Sinhala";
    font-weight: 700;
    font-style: normal;
    src: url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.ttf') format('ttf'_FONTS_DIR);
    font-display: swap;
  }
`;

export const NOTO_SANS_TAMIL_REGULAR = `
  @font-face {
    font-family: "Noto Sans Tamil";
    font-weight: 400;
    font-style: normal;
    src: url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.ttf') format('ttf');
    font-display: swap;
  }`;

export const NOTO_SANS_TAMIL_BOLD = `
  @font-face {
    font-family: "Noto Sans Tamil";
    font-weight: 700;
    font-style: normal;
    src: url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

export const MALLANNA_REGULAR = `
  @font-face {
    font-family: "Mallanna";
    font-weight: 400;
    font-style: normal;
    src: url('${MALLANA_FONTS_DIR}normal.woff') format('woff'), url('${MALLANA_FONTS_DIR}normal.eot') format('eot'), url('${MALLANA_FONTS_DIR}normal.ttf') format('ttf');
    font-display: swap;
  }
`;

export const NOTO_SANS_ETHIOPIC_REGULAR = `
  @font-face {
    font-family: "Noto Sans Ethiopic";
    font-weight: 400;
    font-style: normal;
    src: url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.ttf') format('ttf');
    font-display: swap;
  }
  `;

export const NOTO_SANS_ETHIOPIC_BOLD = `
  @font-face {
    font-family: "Noto Sans Ethiopic";
    font-weight: 700;
    font-style: normal;
    src: url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

export const PADAUK_REGULAR = `
  @font-face {
    font-family: "Padauk";
    font-weight: 400;
    font-style: normal;
    src: url('${PADAUK_FONTS_DIR}normal.woff') format('woff'), url('${PADAUK_FONTS_DIR}normal.eot') format('eot'), url('${PADAUK_FONTS_DIR}normal.ttf') format('ttf');
    font-display: swap;
  }`;

export const PADAUK_BOLD = `
  @font-face {
    font-family: "Padauk";
    font-weight: 700;
    font-style: normal;
    src: url('${PADAUK_FONTS_DIR}bold.woff') format('woff'), url('${PADAUK_FONTS_DIR}bold.eot') format('eot'), url('${PADAUK_FONTS_DIR}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

export const NOTO_SERIF_BENGALI_REGULAR = `
  @font-face {
    font-family: "Noto Serif Bengali";
    font-weight: 400;
    font-style: normal;
    src: url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.ttf') format('ttf');
    font-display: optional;
  }`;

export const NOTO_SERIF_BENGALI_BOLD = `
  @font-face {
    font-family: "Noto Serif Bengali";
    font-weight: 700;
    font-style: normal;
    src: url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_BENGALI_FONTS_DIR}bold.ttf') format('ttf');
    font-display: optional;
  }
`;

export const REITH_QALAM_REGULAR = `
  @font-face {
    font-family: "BBC Reith Qalam";
    font-weight: 400;
    font-style: normal;
    src: url('${REITH_QALAM_FONTS_DIR}normal.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}normal.woff') format('woff');
    font-display: optional;
  }
`;

export const REITH_QALAM_BOLD = `
  @font-face {
    font-family: "BBC Reith Qalam";
    font-weight: 700;
    font-style: normal;
    src: url('${REITH_QALAM_FONTS_DIR}bold.woff2') format('woff2'), url('${REITH_QALAM_FONTS_DIR}bold.woff') format('woff');
    font-display: optional;
  }
`;
