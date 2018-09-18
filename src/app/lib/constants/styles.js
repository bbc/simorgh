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
export const C_OAT = '#F2EFEC';
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
export const GEL_SPACING_TRPL = `1.5rem`;
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

/*
  Base64 SVGs
*/

export const BBCBlocksSVG =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODguNTQ5IiBoZWlnaHQ9IjUzLjciIHZpZXdCb3g9IjAgMCAxODguNTQ5IDUzLjciPjxnIGZpbGw9IiNCQ0JDQkMiPjxwYXRoIGQ9Ik0xNjcuNCA3LjQ4NkMxNTcuMjEgNS43NSAxNDUuNjQ0IDkuNjUgMTQxLjUxIDE5LjgyYy0yLjA5IDUuMTM2LTEuOTEgMTAuOTQ3LjY4IDE1Ljg2MiAyLjQ2NSA0LjY3NyA2LjcwNyA4LjEzOCAxMS43MiA5Ljc3NSA2LjQwNSAyLjA5MiAxMy45NCAxLjU3NSAyMC4xNjgtLjg5LjUyLS4yMDYgMy4wOTgtLjk4IDMuMDk4LTEuNTZWMzUuODZjLTcuODU1IDUuMDIyLTIwLjcxMiA3LjY5LTI3LjM0OC0uODE2LTMuMS0zLjk3My0zLjUwOC05Ljc3NC0xLjIxLTE0LjIyNSAyLjQ5LTQuODU1IDcuODQyLTcuNDIzIDEzLjEzLTcuNjEzIDUuNDUtLjE5NSAxMC4zMiAxLjc0IDE1LjAyIDQuM3YtNi42NmMwLS4xOTQuMDktLjQ5Ni0uMTA4LS41NzUtLjk0Mi0uMzc4LTEuODk2LS43My0yLjg1My0xLjA2Ni0yLjA5LS43MzUtNC4yMy0xLjMyLTYuNDA4LTEuNzJ6TTEzMS40Ni4wMTZIMTg3LjgwN2MuNjE4IDAgLjctLjE1LjcuNDYydjUyLjMxNmMwIC41MS4yMTguOTA1LS4zMjcuOTA1aC01Ni42NDZjLS4xNyAwLS4wNzMtMS4zODMtLjA3My0xLjU1NVYuMDE2ek04Ny42MiAyOS42MnYxMC41NWg2Ljg1cy4xMzYtLjAwMy4zNi0uMDEyYy4yMy0uMDEuNTU3LS4wMi45NS0uMDU1Ljc1LS4wNyAxLjcyNi0uMjA1IDIuNjc1LS41MjYuODYtLjI5IDEuNjk4LS43MjUgMi4zMzYtMS4zNjQuMjQ3LS4yNDYuNDUtLjUwMy42MTUtLjc2Mi41MzgtLjg0Ni42NzQtMS43MDUuNzAzLTIuMTkzLjAxNi0uMjEyLjAxNS0uMzM0LjAxNS0uMzM0cy4wMDMtLjA5NiAwLS4yNmMtLjAwNy0uMjAzLS4wMzItLjYtLjE0LTEuMDItLjEzLS41LS4zNy0xLjA4Mi0uODAyLTEuNjEyLS4wOC0uMS0uMTY3LS4yLS4yNjUtLjI5OC0uMTg4LS4xODgtLjM5LS4zNy0uNjE0LS41MzMtLjM3NC0uMjc2LS44MDItLjUxMy0xLjI2OC0uNzE2LS42MTUtLjI2NS0xLjMwNS0uNDY0LTIuMDYtLjYwNS0uMzktLjA3NC0uOC0uMTM1LTEuMjItLjE3My0uMjYtLjAyNi0uNTItLjA0NC0uNzktLjA2LS4yMzMtLjAxNC0uNDc4LS4wMjQtLjcyMy0uMDI0LTIuNDMgMC02LjYyLS4wMDQtNi42Mi0uMDA0ek04Ny42MiAxMy41OHYxMC4wMDJoMy4zMTZzLjIyIDAgLjUxMy0uMDA4Yy4yMjgtLjAwOC41MDItLjAyMy43NDQtLjAzNi42ODMtLjA1IDEuNjI3LS4xNDYgMi41Ny0uNDEuMTg2LS4wNTIuMzctLjExLjU1My0uMTczLjc0LS4yNjMgMS40NS0uNjQ4IDItMS4xOS40NC0uNDMyLjczLS45MTIuOTItMS4zOC4yMzYtLjU3LjMyLTEuMTIuMzU0LTEuNTA3LjAzLS4zNDcuMDMtLjU2Ny4wMy0uNTY3cy4wMDYtLjE2My0uMDEtLjQyM2MtLjAyLS40MzctLjExMi0xLjE0NS0uNDU0LTEuODI3LS4xNjctLjMyNi0uMzk1LS42NC0uNzAyLS45NDUtLjM3NC0uMzctLjgyNi0uNjUtMS4zMTMtLjg2Ni0uOTMyLS40MTMtMi0uNTc3LTIuOS0uNjM3LS4zOS0uMDI2LS43NDgtLjAzLTEuMDUtLjAzLS42OC0uMDAyLTQuNTctLjAwMi00LjU3LS4wMDJ6TTgwLjY5NCA3LjU0NHYzOC42NjJoMTQuNTU0czcuMS4xOTUgMTEuMDE3LTMuNzI0YzMuMTg4LTMuMTg4IDIuOTYtNi44OCAyLjk2LTYuODhzLjIzLTMuODUzLTIuNzI0LTYuODA3Yy0yLjUxNS0yLjUxNi01LjcyOC0zLjE4Ni01LjcyOC0zLjE4NnMxLjQ1LS42ODIgMi41NjYtMS43OTdjLjUyLS41MjMgMi4zOC0yLjIgMi4zOC02LjI3MyAwLTQuMTA0LTIuNzMtNi40NjMtMi43My02LjQ2M3MtMi45OTItMy41MzQtOS43NDYtMy41MzRIODAuNjk0ek02NS43My4wMTZoNTcuMDQ1VjUzLjdINjUuNzNWLjAxNnpNMjEuODkgMjkuNjJ2MTAuNTVoNi44NDhzLjEzOC0uMDAzLjM2LS4wMTJjLjIzMy0uMDEuNTYtLjAyLjk1NC0uMDU1Ljc0Ni0uMDcgMS43MjMtLjIwNSAyLjY3My0uNTI2Ljg2LS4yOSAxLjY5Ny0uNzI1IDIuMzM3LTEuMzY0LjI0Ni0uMjQ2LjQ1LS41MDMuNjEzLS43NjIuNTM4LS44NDYuNjczLTEuNzA1LjcwMy0yLjE5My4wMTYtLjIxMi4wMTQtLjMzNC4wMTQtLjMzNHMuMDA0LS4wOTYgMC0uMjZjLS4wMDgtLjIwMy0uMDMtLjYtLjE0LTEuMDItLjEyOC0uNS0uMzctMS4wODItLjgtMS42MTItLjA4Mi0uMS0uMTctLjItLjI2Ni0uMjk4LS4xOS0uMTg4LS4zOTMtLjM3LS42MTUtLjUzMy0uMzc0LS4yNzYtLjgwMi0uNTEzLTEuMjctLjcxNi0uNjEzLS4yNjUtMS4zMDItLjQ2NC0yLjA2LS42MDUtLjM4Ny0uMDc0LS43OTgtLjEzNS0xLjIxNy0uMTczLS4yNi0uMDI2LS41Mi0uMDQ0LS43OS0uMDYtLjIzMy0uMDE0LS40OC0uMDI0LS43MjMtLjAyNC0yLjQzIDAtNi42Mi0uMDA0LTYuNjItLjAwNHpNMjEuODkgMTMuNTh2MTAuMDAyaDMuMzE2cy4yMiAwIC41MTMtLjAwOGMuMjI4LS4wMDguNTAyLS4wMjMuNzQ1LS4wMzYuNjgzLS4wNSAxLjYyNi0uMTQ2IDIuNTctLjQxLjE4NS0uMDUyLjM3LS4xMS41NTItLjE3My43NC0uMjYzIDEuNDUtLjY0OCAyLjAwMi0xLjE5LjQzNy0uNDMyLjcyNy0uOTEyLjkyLTEuMzguMjMzLS41Ny4zMTUtMS4xMi4zNS0xLjUwNy4wMy0uMzQ3LjAzLS41NjcuMDMtLjU2N3MuMDA2LS4xNjMtLjAwOC0uNDIzYy0uMDIzLS40MzctLjExNC0xLjE0NS0uNDU3LTEuODI3LS4xNjYtLjMyNi0uMzkzLS42NC0uNy0uOTQ1LS4zNzQtLjM3LS44MjYtLjY1LTEuMzEzLS44NjYtLjkzNC0uNDEzLTIuMDAyLS41NzctMi45MDItLjYzNy0uMzktLjAyNi0uNzQ4LS4wMy0xLjA1Mi0uMDMtLjY4LS4wMDItNC41Ny0uMDAyLTQuNTctLjAwMnpNMTQuOTY0IDcuNTQ0djM4LjY2MmgxNC41NTRzNy4wOTcuMTk1IDExLjAxNi0zLjcyNGMzLjE5LTMuMTg4IDIuOTYtNi44OCAyLjk2LTYuODhzLjIzMi0zLjg1My0yLjcyMy02LjgwN2MtMi41MTUtMi41MTYtNS43MjgtMy4xODYtNS43MjgtMy4xODZzMS40NS0uNjgyIDIuNTY2LTEuNzk3Yy41Mi0uNTIzIDIuMzgtMi4yIDIuMzgtNi4yNzMgMC00LjEwNC0yLjczLTYuNDYzLTIuNzMtNi40NjNzLTIuOTktMy41MzQtOS43NDYtMy41MzRIMTQuOTY0ek0wIC4wMTZoNTcuMDQ0VjUzLjdIMFYuMDE2eiIvPjwvZz48L3N2Zz4=';
