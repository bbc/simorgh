import loadable from '@loadable/component';

const loadableConfig = {
  afaanoromoo: loadable(
    () => import(/* webpackChunkName: "afaanoromoo" */ './afaanoromoo'),
  ),
  afrique: loadable(
    () => import(/* webpackChunkName: "afrique" */ './afrique'),
  ),
  amharic: loadable(
    () => import(/* webpackChunkName: "amharic" */ './amharic'),
  ),
  arabic: loadable(() => import(/* webpackChunkName: "arabic" */ './arabic')),
  archive: loadable(
    () => import(/* webpackChunkName: "archive" */ './archive'),
  ),
  azeri: loadable(() => import(/* webpackChunkName: "azeri" */ './azeri')),
  bengali: loadable(
    () => import(/* webpackChunkName: "bengali" */ './bengali'),
  ),
  burmese: loadable(
    () => import(/* webpackChunkName: "burmese" */ './burmese'),
  ),
  cymrufyw: loadable(
    () => import(/* webpackChunkName: "cymrufyw" */ './cymrufyw'),
  ),
  gahuza: loadable(() => import(/* webpackChunkName: "gahuza" */ './gahuza')),
  gujarati: loadable(
    () => import(/* webpackChunkName: "gujarati" */ './gujarati'),
  ),
  hausa: loadable(() => import(/* webpackChunkName: "hausa" */ './hausa')),
  hindi: loadable(() => import(/* webpackChunkName: "hindi" */ './hindi')),
  igbo: loadable(() => import(/* webpackChunkName: "igbo" */ './igbo')),
  indonesia: loadable(
    () => import(/* webpackChunkName: "indonesia" */ './indonesia'),
  ),
  japanese: loadable(
    () => import(/* webpackChunkName: "japanese" */ './japanese'),
  ),
  korean: loadable(() => import(/* webpackChunkName: "korean" */ './korean')),
  kyrgyz: loadable(() => import(/* webpackChunkName: "kyrgyz" */ './kyrgyz')),
  marathi: loadable(
    () => import(/* webpackChunkName: "marathi" */ './marathi'),
  ),
  mundo: loadable(() => import(/* webpackChunkName: "mundo" */ './mundo')),
  naidheachdan: loadable(
    () => import(/* webpackChunkName: "naidheachdan" */ './naidheachdan'),
  ),
  nepali: loadable(() => import(/* webpackChunkName: "nepali" */ './nepali')),
  news: loadable(() => import(/* webpackChunkName: "news" */ './news')),
  newsround: loadable(
    () => import(/* webpackChunkName: "newsround" */ './newsround'),
  ),
  pashto: loadable(() => import(/* webpackChunkName: "pashto" */ './pashto')),
  persian: loadable(
    () => import(/* webpackChunkName: "persian" */ './persian'),
  ),
  pidgin: loadable(() => import(/* webpackChunkName: "pidgin" */ './pidgin')),
  portuguese: loadable(
    () => import(/* webpackChunkName: "portuguese" */ './portuguese'),
  ),
  punjabi: loadable(
    () => import(/* webpackChunkName: "punjabi" */ './punjabi'),
  ),
  russian: loadable(
    () => import(/* webpackChunkName: "russian" */ './russian'),
  ),
  scotland: loadable(
    () => import(/* webpackChunkName: "scotland" */ './scotland'),
  ),
  serbian: loadable(
    () => import(/* webpackChunkName: "serbian" */ './serbian'),
  ),
  sinhala: loadable(
    () => import(/* webpackChunkName: "sinhala" */ './sinhala'),
  ),
  somali: loadable(() => import(/* webpackChunkName: "somali" */ './somali')),
  sport: loadable(() => import(/* webpackChunkName: "sport" */ './sport')),
  swahili: loadable(
    () => import(/* webpackChunkName: "swahili" */ './swahili'),
  ),
  tamil: loadable(() => import(/* webpackChunkName: "tamil" */ './tamil')),
  telugu: loadable(() => import(/* webpackChunkName: "telugu" */ './telugu')),
  thai: loadable(() => import(/* webpackChunkName: "thai" */ './thai')),
  tigrinya: loadable(
    () => import(/* webpackChunkName: "tigrinya" */ './tigrinya'),
  ),
  turkce: loadable(() => import(/* webpackChunkName: "turkce" */ './turkce')),
  ukchina: loadable(
    () => import(/* webpackChunkName: "ukchina" */ './ukchina'),
  ),
  ukrainian: loadable(
    () => import(/* webpackChunkName: "ukrainian" */ './ukrainian'),
  ),
  urdu: loadable(() => import(/* webpackChunkName: "urdu" */ './urdu')),
  uzbek: loadable(() => import(/* webpackChunkName: "uzbek" */ './uzbek')),
  vietnamese: loadable(
    () => import(/* webpackChunkName: "vietnamese" */ './vietnamese'),
  ),
  yoruba: loadable(() => import(/* webpackChunkName: "yoruba" */ './yoruba')),
  zhongwen: loadable(
    () => import(/* webpackChunkName: "zhongwen" */ './zhongwen'),
  ),
};

export default loadableConfig;
