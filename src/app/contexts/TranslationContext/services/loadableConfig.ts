import loadable from '@loadable/component';

const loadableConfig = {
  afaanoromoo: loadable(
    () => import(/* webpackChunkName: "translations-afaanoromoo" */ './afaanoromoo'),
  ),
  afrique: loadable(
    () => import(/* webpackChunkName: "translations-afrique" */ './afrique'),
  ),
  amharic: loadable(
    () => import(/* webpackChunkName: "translations-amharic" */ './amharic'),
  ),
  arabic: loadable(() => import(/* webpackChunkName: "translations-arabic" */ './arabic')),
  archive: loadable(
    () => import(/* webpackChunkName: "translations-archive" */ './archive'),
  ),
  azeri: loadable(() => import(/* webpackChunkName: "translations-azeri" */ './azeri')),
  bengali: loadable(
    () => import(/* webpackChunkName: "translations-bengali" */ './bengali'),
  ),
  burmese: loadable(
    () => import(/* webpackChunkName: "translations-burmese" */ './burmese'),
  ),
  cymrufyw: loadable(
    () => import(/* webpackChunkName: "translations-cymrufyw" */ './cymrufyw'),
  ),
  gahuza: loadable(() => import(/* webpackChunkName: "translations-gahuza" */ './gahuza')),
  gujarati: loadable(
    () => import(/* webpackChunkName: "translations-gujarati" */ './gujarati'),
  ),
  hausa: loadable(() => import(/* webpackChunkName: "translations-hausa" */ './hausa')),
  hindi: loadable(() => import(/* webpackChunkName: "translations-hindi" */ './hindi')),
  igbo: loadable(() => import(/* webpackChunkName: "translations-igbo" */ './igbo')),
  indonesia: loadable(
    () => import(/* webpackChunkName: "translations-indonesia" */ './indonesia'),
  ),
  japanese: loadable(
    () => import(/* webpackChunkName: "translations-japanese" */ './japanese'),
  ),
  korean: loadable(() => import(/* webpackChunkName: "translations-korean" */ './korean')),
  kyrgyz: loadable(() => import(/* webpackChunkName: "translations-kyrgyz" */ './kyrgyz')),
  marathi: loadable(
    () => import(/* webpackChunkName: "translations-marathi" */ './marathi'),
  ),
  mundo: loadable(() => import(/* webpackChunkName: "translations-mundo" */ './mundo')),
  naidheachdan: loadable(
    () => import(/* webpackChunkName: "translations-naidheachdan" */ './naidheachdan'),
  ),
  nepali: loadable(() => import(/* webpackChunkName: "translations-nepali" */ './nepali')),
  news: loadable(() => import(/* webpackChunkName: "translations-news" */ './news')),
  newsround: loadable(
    () => import(/* webpackChunkName: "translations-newsround" */ './newsround'),
  ),
  pashto: loadable(() => import(/* webpackChunkName: "translations-pashto" */ './pashto')),
  persian: loadable(
    () => import(/* webpackChunkName: "translations-persian" */ './persian'),
  ),
  pidgin: loadable(() => import(/* webpackChunkName: "translations-pidgin" */ './pidgin')),
  portuguese: loadable(
    () => import(/* webpackChunkName: "translations-portuguese" */ './portuguese'),
  ),
  punjabi: loadable(
    () => import(/* webpackChunkName: "translations-punjabi" */ './punjabi'),
  ),
  russian: loadable(
    () => import(/* webpackChunkName: "translations-russian" */ './russian'),
  ),
  scotland: loadable(
    () => import(/* webpackChunkName: "translations-scotland" */ './scotland'),
  ),
  serbian: loadable(
    () => import(/* webpackChunkName: "translations-serbian" */ './serbian'),
  ),
  sinhala: loadable(
    () => import(/* webpackChunkName: "translations-sinhala" */ './sinhala'),
  ),
  somali: loadable(() => import(/* webpackChunkName: "translations-somali" */ './somali')),
  sport: loadable(() => import(/* webpackChunkName: "translations-sport" */ './sport')),
  swahili: loadable(
    () => import(/* webpackChunkName: "translations-swahili" */ './swahili'),
  ),
  tamil: loadable(() => import(/* webpackChunkName: "translations-tamil" */ './tamil')),
  telugu: loadable(() => import(/* webpackChunkName: "translations-telugu" */ './telugu')),
  thai: loadable(() => import(/* webpackChunkName: "translations-thai" */ './thai')),
  tigrinya: loadable(
    () => import(/* webpackChunkName: "translations-tigrinya" */ './tigrinya'),
  ),
  turkce: loadable(() => import(/* webpackChunkName: "translations-turkce" */ './turkce')),
  ukchina: loadable(
    () => import(/* webpackChunkName: "translations-ukchina" */ './ukchina'),
  ),
  ukrainian: loadable(
    () => import(/* webpackChunkName: "translations-ukrainian" */ './ukrainian'),
  ),
  urdu: loadable(() => import(/* webpackChunkName: "translations-urdu" */ './urdu')),
  uzbek: loadable(() => import(/* webpackChunkName: "translations-uzbek" */ './uzbek')),
  vietnamese: loadable(
    () => import(/* webpackChunkName: "translations-vietnamese" */ './vietnamese'),
  ),
  yoruba: loadable(() => import(/* webpackChunkName: "translations-yoruba" */ './yoruba')),
  zhongwen: loadable(
    () => import(/* webpackChunkName: "translations-zhongwen" */ './zhongwen'),
  ),
};

export default loadableConfig;
