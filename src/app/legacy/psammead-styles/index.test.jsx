import { testUtilityPackages } from '@bbc/psammead-test-helpers';

const fontsExpectedExports = {
  F_REITH_SERIF_REGULAR: 'function',
  F_REITH_SERIF_ITALIC: 'function',
  F_REITH_SERIF_BOLD: 'function',
  F_REITH_SERIF_BOLD_ITALIC: 'function',
  F_REITH_SERIF_LIGHT: 'function',
  F_REITH_SERIF_LIGHT_ITALIC: 'function',
  F_REITH_SERIF_MEDIUM: 'function',
  F_REITH_SERIF_MEDIUM_ITALIC: 'function',
  F_REITH_SERIF_EXTRA_BOLD: 'function',
  F_REITH_SERIF_EXTRA_BOLD_ITALIC: 'function',
  F_REITH_SANS_REGULAR: 'function',
  F_REITH_SANS_ITALIC: 'function',
  F_REITH_SANS_BOLD: 'function',
  F_REITH_SANS_BOLD_ITALIC: 'function',
  F_REITH_SANS_LIGHT: 'function',
  F_REITH_SANS_LIGHT_ITALIC: 'function',
  F_REITH_SANS_MEDIUM: 'function',
  F_REITH_SANS_MEDIUM_ITALIC: 'function',
  F_REITH_SANS_EXTRA_BOLD: 'function',
  F_REITH_SANS_EXTRA_BOLD_ITALIC: 'function',
  F_REITH_SANS_CONDENSED_REGULAR: 'function',
  F_REITH_SANS_CONDENSED_BOLD: 'function',
  F_REITH_QALAM_REGULAR: 'function',
  F_REITH_QALAM_BOLD: 'function',
  F_NOTO_SERIF_SINHALA_REGULAR: 'function',
  F_NOTO_SERIF_SINHALA_BOLD: 'function',
  F_NOTO_SANS_TAMIL_REGULAR: 'function',
  F_NOTO_SANS_TAMIL_BOLD: 'function',
  F_MALLANNA_REGULAR: 'function',
  F_NOTO_SANS_ETHIOPIC_REGULAR: 'function',
  F_NOTO_SANS_ETHIOPIC_BOLD: 'function',
  F_PADAUK_REGULAR: 'function',
  F_PADAUK_BOLD: 'function',
  F_NOTO_SERIF_BENGALI_REGULAR: 'function',
  F_NOTO_SERIF_BENGALI_BOLD: 'function',
};

const detectionExpectedExports = {
  grid: 'string',
};

const coloursExpectedExports = {
  C_EBON: 'string',
  C_POSTBOX: 'string',
  C_STORM: 'string',
  C_WHITE: 'string',
  C_BLUEJAY: 'string',
  C_BLUEJAY_LHT: 'string',
  C_OAT_LHT: 'string',
  C_PEBBLE: 'string',
  C_RHINO: 'string',
  C_STONE: 'string',
  C_CHALK: 'string',
  C_ORBIT_GREY: 'string',
  C_SHADOW: 'string',
  C_CLOUD_DARK: 'string',
  C_CLOUD_LIGHT: 'string',
  C_LUNAR: 'string',
  C_LUNAR_LIGHT: 'string',
  C_GHOST: 'string',
  C_METAL: 'string',
  C_CONSENT_BACKGROUND: 'string',
  C_CONSENT_ACTION: 'string',
  C_CONSENT_CONTENT: 'string',
  C_CONSENT_FOCUS: 'string',
  C_DARK_SALTIRE: 'string',
  C_WEATHER_BLUE: 'string',
  C_ARCHIVE_BLUE: 'string',
  C_KINGFISHER: 'string',
  C_LE_TEAL: 'string',
  C_MIDNIGHT_BLACK: 'string',
  C_NEWSROUND_PURPLE: 'string',
  C_NEWSROUND_PURPLE_30: 'string',
  C_SPORT_YELLOW: 'string',
  C_SPORT_YELLOW_30: 'string',
  C_SPORT_SILVER: 'string',
  C_SPORT_MIST: 'string',
  C_BLACK: 'string',
  C_POSTBOX_30: 'string',
  C_GREY_2: 'string',
  C_GREY_6: 'string',
  C_GREY_8: 'string',
  C_DIM_GREY: 'string',
  C_GREY_11: 'string',
  C_PHILIPPINE_GREY: 'string',
  C_GREY_10: 'string',
};

const expectedExports = {
  colours: coloursExpectedExports,
  detection: detectionExpectedExports,
  fonts: fontsExpectedExports,
};

const getExports = key => {
  const exports = {};
  Object.keys(expectedExports).forEach(expectedExport => {
    /* eslint-disable global-require, import/no-dynamic-require */
    const packageJson = require(`./${expectedExport}/package.json`);
    exports[
      expectedExport
    ] = require(`./${expectedExport}/${packageJson[key]}`);
    /* eslint-enable global-require, import/no-dynamic-require */
  });
  return exports;
};

describe('Psammead styles', () => {
  it('should test all the utility exports exist and are the correct type', () => {
    testUtilityPackages(getExports('main'), expectedExports, 'psammead-styles');
  });

  it('should test all the utility exports exist and are the correct type when coming from src/', () => {
    testUtilityPackages(
      getExports('module'),
      expectedExports,
      'psammead-styles',
    );
  });
});
