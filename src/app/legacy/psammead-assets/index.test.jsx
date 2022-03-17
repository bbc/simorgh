import { testUtilityPackages } from '@bbc/psammead-test-helpers';

const ampBoilerplateExpectedExports = {
  AMP_SCRIPT: 'string',
  AMP_NO_SCRIPT: 'string',
  AMP_ACCESS_JS: 'object',
  AMP_ANALYTICS_JS: 'object',
  AMP_BIND_JS: 'object',
  AMP_CONSENT_JS: 'object',
  AMP_GEO_JS: 'object',
  AMP_JS: 'object',
  AMP_LIST_JS: 'object',
  AMP_MUSTACHE_JS: 'object',
  AMP_ADS_JS: 'object',
  AMP_AD: 'object',
};

const svgsExpectedExports = {
  BBC_BLOCKS: 'string',
  BBC_BLOCKS_DARK_MODE: 'string',
  coreIcons: 'object',
  mediaIcons: 'object',
  navigationIcons: 'object',
  afaanoromoo: 'object',
  afrique: 'object',
  amharic: 'object',
  arabic: 'object',
  archive: 'object',
  azeri: 'object',
  bengali: 'object',
  burmese: 'object',
  cymrufyw: 'object',
  gahuza: 'object',
  gujarati: 'object',
  hausa: 'object',
  hindi: 'object',
  igbo: 'object',
  indonesia: 'object',
  japanese: 'object',
  korean: 'object',
  kyrgyz: 'object',
  learningenglish: 'object',
  marathi: 'object',
  mundo: 'object',
  naidheachdan: 'object',
  nepali: 'object',
  news: 'object',
  newsround: 'object',
  pashto: 'object',
  persian: 'object',
  pidgin: 'object',
  portuguese: 'object',
  punjabi: 'object',
  russian: 'object',
  scotland: 'object',
  serbian: 'object',
  sinhala: 'object',
  somali: 'object',
  sport: 'object',
  swahili: 'object',
  tamil: 'object',
  telugu: 'object',
  thai: 'object',
  tigrinya: 'object',
  turkce: 'object',
  urdu: 'object',
  ukchina: 'object',
  ukrainian: 'object',
  uzbek: 'object',
  vietnamese: 'object',
  weather: 'object',
  yoruba: 'object',
  zhongwen: 'object',
};

const expectedExports = {
  svgs: svgsExpectedExports,
  'amp-boilerplate': ampBoilerplateExpectedExports,
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

describe('Psammead assets', () => {
  it('should test all the utility exports exist and are the correct type for main', () => {
    testUtilityPackages(getExports('main'), expectedExports, 'psammead-assets');
  });

  it('should test all the utility exports exist and are the correct type for module', () => {
    testUtilityPackages(
      getExports('module'),
      expectedExports,
      'psammead-assets',
    );
  });
});
