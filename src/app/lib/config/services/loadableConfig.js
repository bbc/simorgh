import loadable from '@loadable/component';

/*
 * This config is used by `createLoadableContext`
 * to dynamically load each service's config.
 */
const loadableConfig = {
  afaanoromoo: loadable(
    import(/* webpackChunkName: 'afaanoromoo' */ './afaanoromoo.js'),
  ),
  afrique: loadable(import(/* webpackChunkName: 'afrique' */ './afrique.js')),
  amharic: loadable(import(/* webpackChunkName: 'amharic' */ './amharic.js')),
  arabic: loadable(import(/* webpackChunkName: 'arabic' */ './arabic.js')),
  azeri: loadable(import(/* webpackChunkName: 'azeri' */ './azeri.js')),
  bengali: loadable(import(/* webpackChunkName: 'bengali' */ './bengali.js')),
  burmese: loadable(import(/* webpackChunkName: 'burmese' */ './burmese.js')),
  cymrufyw: loadable(
    import(/* webpackChunkName: 'cymrufyw' */ './cymrufyw.js'),
  ),
  gahuza: loadable(import(/* webpackChunkName: 'gahuza' */ './gahuza.js')),
  gujarati: loadable(
    import(/* webpackChunkName: 'gujarati' */ './gujarati.js'),
  ),
  hausa: loadable(import(/* webpackChunkName: 'hausa' */ './hausa.js')),
  hindi: loadable(import(/* webpackChunkName: 'hindi' */ './hindi.js')),
  igbo: loadable(import(/* webpackChunkName: 'igbo' */ './igbo.js')),
  indonesia: loadable(
    import(/* webpackChunkName: 'indonesia' */ './indonesia.js'),
  ),
  japanese: loadable(
    import(/* webpackChunkName: 'japanese' */ './japanese.js'),
  ),
  korean: loadable(import(/* webpackChunkName: 'korean' */ './korean.js')),
  kyrgyz: loadable(import(/* webpackChunkName: 'kyrgyz' */ './kyrgyz.js')),
  marathi: loadable(import(/* webpackChunkName: 'marathi' */ './marathi.js')),
  mundo: loadable(import(/* webpackChunkName: 'mundo' */ './mundo.js')),
  naidheachdan: loadable(
    import(/* webpackChunkName: 'naidheachdan' */ './naidheachdan.js'),
  ),
  nepali: loadable(import(/* webpackChunkName: 'nepali' */ './nepali.js')),
  news: loadable(import(/* webpackChunkName: 'news' */ './news.js')),
  pashto: loadable(import(/* webpackChunkName: 'pashto' */ './pashto.js')),
  persian: loadable(import(/* webpackChunkName: 'persian' */ './persian.js')),
  pidgin: loadable(import(/* webpackChunkName: 'pidgin' */ './pidgin.js')),
  portuguese: loadable(
    import(/* webpackChunkName: 'portuguese' */ './portuguese.js'),
  ),
  punjabi: loadable(import(/* webpackChunkName: 'punjabi' */ './punjabi.js')),
  russian: loadable(import(/* webpackChunkName: 'russian' */ './russian.js')),
  serbian: loadable(import(/* webpackChunkName: 'serbian' */ './serbian.js')),
  sinhala: loadable(import(/* webpackChunkName: 'sinhala' */ './sinhala.js')),
  somali: loadable(import(/* webpackChunkName: 'somali' */ './somali.js')),
  swahili: loadable(import(/* webpackChunkName: 'swahili' */ './swahili.js')),
  tamil: loadable(import(/* webpackChunkName: 'tamil' */ './tamil.js')),
  telugu: loadable(import(/* webpackChunkName: 'telugu' */ './telugu.js')),
  thai: loadable(import(/* webpackChunkName: 'thai' */ './thai.js')),
  tigrinya: loadable(
    import(/* webpackChunkName: 'tigrinya' */ './tigrinya.js'),
  ),
  turkce: loadable(import(/* webpackChunkName: 'turkce' */ './turkce.js')),
  ukchina: loadable(import(/* webpackChunkName: 'ukchina' */ './ukchina.js')),
  ukrainian: loadable(
    import(/* webpackChunkName: 'ukrainian' */ './ukrainian.js'),
  ),
  urdu: loadable(import(/* webpackChunkName: 'urdu' */ './urdu.js')),
  uzbek: loadable(import(/* webpackChunkName: 'uzbek' */ './uzbek.js')),
  vietnamese: loadable(
    import(/* webpackChunkName: 'vietnamese' */ './vietnamese.js'),
  ),
  yoruba: loadable(import(/* webpackChunkName: 'yoruba' */ './yoruba.js')),
  zhongwen: loadable(
    import(/* webpackChunkName: 'zhongwen' */ './zhongwen.js'),
  ),
};

export default loadableConfig;
