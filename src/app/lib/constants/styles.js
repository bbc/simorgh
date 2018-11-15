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
export const C_RHINO = '#5A5A5A';
export const C_STONE = '#D5D0CD';
export const C_CHALK = '#ECEAE7';
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
export const GEL_SPACING_TRPL = `1.5rem`;
export const GEL_SPACING_HLF = `0.25rem`;
export const GEL_SPACING_QUAD = `2rem`;

/*
    GEL Grid
    Margins and Gutters are defined here
    https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes
*/
export const GEL_MARGIN_BELOW_400PX = `${GEL_SPACING}`;
export const GEL_GUTTER_BELOW_600PX = `${GEL_SPACING}`;
export const GEL_MARGIN_ABOVE_400PX = `${GEL_SPACING_DBL}`;
export const GEL_GUTTER_ABOVE_600PX = `${GEL_SPACING_DBL}`;

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

export const group2ScreenWidthMin = `25em`; // 400px
export const group2ScreenWidthMax = `37.4375em`; // 599px

export const group3ScreenWidthMin = `37.5em`; // 600px
export const group3ScreenWidthMax = `62.9375em`; // 1007px

export const group4ScreenWidthMin = `63em`; // 1008px
export const group4ScreenWidthMax = `80em`; // 1279px

export const group5ScreenWidthMin = `80em`; // 1280px

/*
  Base64 SVGs
*/

export const BBCBlocksSVG =
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI0NzkiIGhlaWdodD0iMTM2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iI0Q1RDBDRCI+PGc+PHBhdGggZD0iTTQ0OS41NTYgOTEuNTUzbC0yLjMxIDEuNDFjLTExLjE2NyA2LjgxOC0yMy4zMTMgMTAuNDc0LTM0LjM0NiAxMC40Ny0yMy42MS0uMDktMzkuMTYzLTE0LjA4My0zOS4yMjctMzQuNDUzLjAzLTE5LjkxOCAxNi4yNy0zNC42NjMgMzguNjMzLTM0LjcxOCAxMS4zODcuMDEgMjEuNzAzIDIuOTU0IDMzLjk2MiA5LjY3MmwyLjI1MSAxLjI0di0xOC4xOWwtLjk2Mi0uMzc3Yy0xMy44MjQtNS40NTgtMjQuNTMtNy44OS0zNS4xMDMtNy44ODQtMTYuMzQ2LS4wMDYtMzAuNTMzIDUuMzk0LTQwLjYzNyAxNC41NTctMTAuMTA1IDkuMTYzLTE2LjEwNiAyMi4xMDItMTYuMDk5IDM2Ljk1My4wMDggMTAuMzQ4IDQuMjc5IDIyLjQ4IDEzLjQyIDMyLjEwNSA5LjEyMSA5LjYyOCAyMy4xNjUgMTYuNjQ4IDQyLjQzIDE2LjYzOWguMDYzYzE1Ljk4IDAgMjcuMDYyLTMuNTYzIDM3LjA3NC04LjQ5MmwuODUxLS40MTRWOTEuNTUzek0zMzQgMTM1LjY5N2gxNDQuMTk1VjBIMzM0djEzNS42OTd6Ii8+PHBhdGggZD0iTTI3Ni45MzcgODkuOTY4Yy4wNDEtMTIuMzMtOC4xNzEtMjEuNjk2LTIxLjMwOC0yNS4zIDMuNTQ0LTEuODA5IDYuMzUtNC4wMjMgOC40MDQtNi43MjcgMi43NS0zLjYyMiA0LjA2MS04LjA2NCA0LjA0Ni0xMy4yMzUuMDE1LTYuMzU5LTIuNDg2LTEyLjgzOS03Ljg1OC0xNy42ODctNS4zNzItNC44NDctMTMuNTI2LTcuOTk3LTI0LjY1NC03Ljk5MUgyMDQuODN2OTcuNzI4aDM2LjA3M2MxMi44NyAwIDIxLjkwNi0zLjQ4MiAyNy43MjItOC42NSA1LjgxOC01LjE1NSA4LjMyLTExLjkxIDguMzEyLTE4LjEzOHpNMTY3IDEzNS42OThoMTQ0LjE5N1YwSDE2N3YxMzUuNjk3eiIvPjxwYXRoIGQ9Ik0xMDkuOTM3IDg5Ljk2OGMuMDQxLTEyLjMzLTguMTcxLTIxLjY5Ni0yMS4zMDgtMjUuMyAzLjU0NC0xLjgwOSA2LjM1LTQuMDIzIDguNDA0LTYuNzI3IDIuNzUtMy42MjIgNC4wNjEtOC4wNjQgNC4wNDYtMTMuMjM1LjAxNS02LjM1OS0yLjQ4Ni0xMi44MzktNy44NTgtMTcuNjg3LTUuMzcyLTQuODQ3LTEzLjUyNi03Ljk5Ny0yNC42NTQtNy45OTFIMzcuODN2OTcuNzI4aDM2LjA3M2MxMi44NyAwIDIxLjkwNi0zLjQ4MiAyNy43MjItOC42NSA1LjgxOC01LjE1NSA4LjMyLTExLjkxIDguMzEyLTE4LjEzOHpNMCAxMzUuNjk4aDE0NC4xOTdWMEgwdjEzNS42OTd6Ii8+PHBhdGggZD0iTTI1OC42NjIgODguMTk4Yy0uMDEzIDMuMjI5LTEuMDA3IDYuNDc1LTMuODk2IDkuMDExLTIuODg0IDIuNTM3LTcuODczIDQuNDYzLTE2LjEzMyA0LjQ2M0gyMjJWNzVoMTUuODkzYzcuNDExIDAgMTIuNjcgMS41MDIgMTUuOTY1IDMuODUgMy4yODkgMi4zNjIgNC43NzYgNS40NjMgNC44MDQgOS4zNDgiLz48cGF0aCBkPSJNOTEuNjYyIDg4LjE5OGMtLjAxMyAzLjIyOS0xLjAwNyA2LjQ3NS0zLjg5NiA5LjAxMS0yLjg4NCAyLjUzNy03Ljg3NCA0LjQ2My0xNi4xMzMgNC40NjNINTVWNzVoMTUuODkyYzcuNDEyIDAgMTIuNjcyIDEuNTAyIDE1Ljk2NiAzLjg1IDMuMjg5IDIuMzYyIDQuNzc2IDUuNDYzIDQuODA0IDkuMzQ4Ii8+PHBhdGggZD0iTTI0NS4xODYgNTUuNzljMy4wOTYtMi4yMzcgNC41OS01LjM4NiA0LjYxMy0xMC4xMjQtLjAxNS0zLjI1LS45NDMtNi4wMzMtMy4yODEtOC4xMTEtMi4zNDYtMi4wNzgtNi4zMy0zLjU1NS0xMi43NTQtMy41NTVIMjIydjI1LjI3NWg4LjA3NmM2Ljk4OC4wMDQgMTEuOTk4LTEuMjQzIDE1LjExLTMuNDg2Ii8+PHBhdGggZD0iTTc4LjE4NiA1NS43OWMzLjA5Ni0yLjIzNyA0LjU5LTUuMzg2IDQuNjEzLTEwLjEyNC0uMDE1LTMuMjUtLjk0My02LjAzMy0zLjI4Mi04LjExMUM3Ny4xNzIgMzUuNDc3IDczLjE4OCAzNCA2Ni43NjQgMzRINTV2MjUuMjc1aDguMDc2YzYuOTg4LjAwNCAxMS45OTgtMS4yNDMgMTUuMTEtMy40ODYiLz48L2c+PC9nPjwvZz48L3N2Zz4K';

/*
  AMP Boilerplate Code https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md
*/

export const ampScript = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;
export const ampNoscript = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;
