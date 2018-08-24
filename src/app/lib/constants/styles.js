// Note - this file should only include standard constants,
// agreed to by UX and Engineering

// Colours
export const C_EBON = '#222222';
export const C_POSTBOX = '#B80000';
export const C_STORM = '#404040';
export const C_WHITE = '#FFFFFF';
export const C_BLUEJAY = '#0F556C';
export const C_BLUEJAY_LHT = '#C3DEE7';
export const C_OAT_LHT = '#F5F3F1';
export const C_PEBBLE = '#5C5752';
export const C_STONE = '#D5D0CD';
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

/*
    GEL Spacing
    Assumes 16px is set as the default font-size.
    This is changeable in the user's browser settings, as the html font-size is 100%
*/
export const GEL_SPACING = `0.5rem`;
export const GEL_SPACING_DBL = `1rem`; // 16px
export const GEL_SPACING_TRPL = `1.5rem`; // 16px
export const GEL_SPACING_HLF = `0.25rem`;
export const GEL_SPACING_QUAD = `2rem`;

/*
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/
export const smartPhoneScreenWidthMin = 20; // 320px
export const smartPhoneScreenWidthMax = 37.4375; // 599px
export const laptopScreenWidthMin = 37.5; // 600px

/*
    The following are breakpoints from GEL Grid
    Link to relevant GEL docs: https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes
    The only exception is that we have split out group 1 into 0 and 1
*/

export const group0ScreenWidthMin = `0em`; // 0px
export const group0ScreenWidthMax = `14.9375em`; // 239px

export const group1ScreenWidthMin = `15em`; // 240px
export const group1ScreenWidthMax = `24.9375em`; // 399px

export const group2ScreenWidthMin = `37.5em`; // 400px
export const group2ScreenWidthMax = `56.1875em`; // 599px

export const group3ScreenWidthMin = `37.5em`; // 600px
export const group3ScreenWidthMax = `62.9375em`; // 1007px

export const group4ScreenWidthMin = `63em`; // 1008px
export const group4ScreenWidthMax = `80em`; // 1279px

export const group5ScreenWidthMin = `80em`; // 1280px
