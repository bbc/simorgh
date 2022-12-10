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

const REITH_SERIF_REGULAR = {
	name: "BBCReithSerif_W_Rg",
	version: "r2.512",
	subsets: false,
    fontWeight: 400,
    fontFamily: 'ReithSerif',
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SERIF_BOLD = {
    name: "BBCReithSerif_W_Bd",
	version: "r2.512",
    fontFamily: 'ReithSerif',
    fontWeight: 700,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SERIF_LIGHT = {
    name: "BBCReithSerif_WNumbers_Lt",
	version: "r2.512",
	subsets: true,
    fontFamily: 'ReithSerif',
    fontWeight: 300,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SERIF_MEDIUM = {
    name: "BBCReithSerif_W_Md",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSerif',
    fontWeight: 500,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SERIF_EXTRA_BOLD = {
    name: "BBCReithSerif_W_ExBd",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSerif',
    fontWeight: 800,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_REGULAR = {
    name: "BBCReithSans_W_Rg",
	version: "r2.512",
	subsets: false,
    fontWeight: 400,
    fontFamily: 'ReithSans',
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_BOLD = {
    name: "BBCReithSans_W_Bd",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSans',
    fontWeight: 700,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_LIGHT = {
    name: "BBCReithSans_W_Lt",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSans',
    fontWeight: 300,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_LIGHT_ITALIC = {
    name: "BBCReithSans_W_LtIt",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSans',
    fontWeight: 300,
    fontStyle: 'italic',
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_MEDIUM = {
    name: "BBCReithSans_W_Md",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSans',
    fontWeight: 500,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_EXTRA_BOLD = {
    name: "BBCReithSans_W_ExBd",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSans',
    fontWeight: 800,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_EXTRA_BOLD_ITALIC = {
    name: "BBCReithSans_W_ExBd",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSans',
    fontWeight: 800,
    fontStyle: 'italic',
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_CONDENSED_REGULAR = {
    name: "BBCReithSansCd_W_Rg",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSansCondensed',
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const REITH_SANS_CONDENSED_BOLD = {
    name: "BBCReithSansCd_W_Bd",
	version: "r2.512",
	subsets: false,
    fontFamily: 'ReithSansCondensed',
    fontWeight: 700,
    fontDisplay: 'optional',
    baseUrl: REITH_FONTS_DIR,
};

const NOTO_SERIF_SINHALA_REGULAR = {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

const NOTO_SERIF_SINHALA_BOLD = {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SERIF_SINHALA_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: NOTO_SERIF_SINHALA_FONTS_DIR,
};

const NOTO_SANS_TAMIL_REGULAR = {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

const NOTO_SANS_TAMIL_BOLD = {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff2') format('woff2'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_TAMIL_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_TAMIL_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: NOTO_SANS_TAMIL_FONTS_DIR,
};

const MALLANNA_REGULAR = {
    fontFamily: 'Mallanna',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${MALLANA_FONTS_DIR}normal.woff') format('woff'), url('${MALLANA_FONTS_DIR}normal.eot') format('eot'), url('${MALLANA_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: MALLANA_FONTS_DIR,
};

const NOTO_SANS_ETHIOPIC_REGULAR = {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

const NOTO_SANS_ETHIOPIC_BOLD = {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.woff') format('woff'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.eot') format('eot'), url('${NOTO_SANS_ETHIOPIC_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: NOTO_SANS_ETHIOPIC_FONTS_DIR,
};

const PADAUK_REGULAR = {
    fontFamily: 'Padauk',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}normal.woff') format('woff'), url('${PADAUK_FONTS_DIR}normal.eot') format('eot'), url('${PADAUK_FONTS_DIR}normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: PADAUK_FONTS_DIR,
};

const PADAUK_BOLD = {
    fontFamily: 'Padauk',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('${PADAUK_FONTS_DIR}bold.woff') format('woff'), url('${PADAUK_FONTS_DIR}bold.eot') format('eot'), url('${PADAUK_FONTS_DIR}bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
    baseUrl: PADAUK_FONTS_DIR,
};

const NOTO_SERIF_BENGALI_REGULAR = {
	name: "notoserifregular",
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `${NOTO_SERIF_BENGALI_FONTS_DIR}normal.woff2`,
    fontDisplay: 'optional',
};

const NOTO_SERIF_BENGALI_BOLD = {
	name: "notoserifbold",
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `${NOTO_SERIF_BENGALI_FONTS_DIR}bold.woff2`,
    fontDisplay: 'optional',
};

const REITH_QALAM_REGULAR = {
	name: "qalamNormal",
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 400,
    varsion: "v1.210",
    fontStyle: 'normal',
    src: `${REITH_QALAM_FONTS_DIR}normal.woff2`,
    fontDisplay: 'optional',
};

const REITH_QALAM_BOLD = {
	name: "qalamBold",
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 700,
    varsion: "v1.210",
    fontStyle: 'normal',
    src: `${REITH_QALAM_FONTS_DIR}bold.woff2`,
    fontDisplay: 'optional',
};

export const getFontFromService  = (service) => {
	switch(service){
		case 'news':
		case 'mundo':
		case 'portuguese':
		case 'sport':
			return [
				REITH_SERIF_REGULAR,
				REITH_SERIF_BOLD,
				REITH_SERIF_LIGHT,
				REITH_SERIF_MEDIUM,
			];
		case 'arabic':
		case 'pashto':
		case 'persian':
		case 'urdu':
			return [
				REITH_QALAM_REGULAR,
				REITH_QALAM_BOLD,
			];
		default:
			return [];
	}
};