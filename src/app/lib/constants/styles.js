// Note - this file should only include standard constants,
// agreed to by UX and Engineering

// Colours
export const C_EBON = '#222222';
export const C_POSTBOX = '#B80000';
export const C_STORM = '#404040';
export const C_WHITE = '#FFFFFF';

// Colours from other services
export const C_ORBIT_GREY = '#4C4C4C';

// Font family
const fontFamilyBase = ', Helvetica, Arial, sans-serif';
export const FF_NEWS_SANS_LIT = `ReithSansNewsLight${fontFamilyBase}`;
export const FF_NEWS_SANS_REG = `ReithSansNewsRegular${fontFamilyBase}`;
export const FF_NEWS_SANS_MDM = `ReithSansNewsMedium${fontFamilyBase}`;
export const FF_NEWS_SANS_BLD = `ReithSansNewsBold${fontFamilyBase}`;
export const FF_NEWS_SERIF_LIT = `ReithSerifNewsLight${fontFamilyBase}`;
export const FF_NEWS_SERIF_REG = `ReithSerifNewsRegular${fontFamilyBase}`;
export const FF_NEWS_SERIF_MDM = `ReithSerifNewsMedium${fontFamilyBase}`;
export const FF_NEWS_SERIF_BLD = `ReithSerifNewsBold${fontFamilyBase}`;

// GEL Spacing
export const GEL_SPACING = 8;
export const GEL_SPACING_DBL = GEL_SPACING * 2;
export const GEL_SPACING_EIGTH = GEL_SPACING / 8; // 16px
export const GEL_SPACING_FOURTH = GEL_SPACING / 4; // 32px
export const GEL_SPACING_HLF = GEL_SPACING / 2;
export const GEL_SPACING_QUAD = GEL_SPACING * 4;

/*
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/
export const smartPhoneScreenWidthMin = 20; // 320px
export const smartPhoneScreenWidthMax = 37.4375; // 599px
export const laptopScreenWidthMin = 37.5; // 600px
