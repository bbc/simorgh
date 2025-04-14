import loadable from '@loadable/component';

export const themes = {
  afaanoromoo: loadable(
    () => import(/* webpackChunkName: "themes-afaanoromoo" */ './afaanoromoo'),
  ),
  afrique: loadable(
    () => import(/* webpackChunkName: "themes-afrique" */ './afrique'),
  ),
  amharic: loadable(
    () => import(/* webpackChunkName: "themes-amharic" */ './amharic'),
  ),
  arabic: loadable(
    () => import(/* webpackChunkName: "themes-arabic" */ './arabic'),
  ),
  archive: loadable(
    () => import(/* webpackChunkName: "themes-archive" */ './archive'),
  ),
  azeri: loadable(
    () => import(/* webpackChunkName: "themes-azeri" */ './azeri'),
  ),
  bengali: loadable(
    () => import(/* webpackChunkName: "themes-bengali" */ './bengali'),
  ),
  burmese: loadable(
    () => import(/* webpackChunkName: "themes-burmese" */ './burmese'),
  ),
  cymrufyw: loadable(
    () => import(/* webpackChunkName: "themes-cymrufyw" */ './cymrufyw'),
  ),
  gahuza: loadable(
    () => import(/* webpackChunkName: "themes-gahuza" */ './gahuza'),
  ),
  gujarati: loadable(
    () => import(/* webpackChunkName: "themes-gujarati" */ './gujarati'),
  ),
  hausa: loadable(
    () => import(/* webpackChunkName: "themes-hausa" */ './hausa'),
  ),
  hindi: loadable(
    () => import(/* webpackChunkName: "themes-hindi" */ './hindi'),
  ),
  igbo: loadable(() => import(/* webpackChunkName: "themes-igbo" */ './igbo')),
  indonesia: loadable(
    () => import(/* webpackChunkName: "themes-indonesia" */ './indonesia'),
  ),
  japanese: loadable(
    () => import(/* webpackChunkName: "themes-japanese" */ './japanese'),
  ),
  korean: loadable(
    () => import(/* webpackChunkName: "themes-korean" */ './korean'),
  ),
  kyrgyz: loadable(
    () => import(/* webpackChunkName: "themes-kyrgyz" */ './kyrgyz'),
  ),
  marathi: loadable(
    () => import(/* webpackChunkName: "themes-marathi" */ './marathi'),
  ),
  mundo: loadable(
    () => import(/* webpackChunkName: "themes-mundo" */ './mundo'),
  ),
  naidheachdan: loadable(
    () =>
      import(/* webpackChunkName: "themes-naidheachdan" */ './naidheachdan'),
  ),
  nepali: loadable(
    () => import(/* webpackChunkName: "themes-nepali" */ './nepali'),
  ),
  news: loadable(() => import(/* webpackChunkName: "themes-news" */ './news')),
  newsround: loadable(
    () => import(/* webpackChunkName: "themes-newsround" */ './newsround'),
  ),
  pashto: loadable(
    () => import(/* webpackChunkName: "themes-pashto" */ './pashto'),
  ),
  persian: loadable(
    () => import(/* webpackChunkName: "themes-persian" */ './persian'),
  ),
  pidgin: loadable(
    () => import(/* webpackChunkName: "themes-pidgin" */ './pidgin'),
  ),
  polska: loadable(
    () => import(/* webpackChunkName: "themes-polska" */ './polska'),
  ),
  portuguese: loadable(
    () => import(/* webpackChunkName: "themes-portuguese" */ './portuguese'),
  ),
  punjabi: loadable(
    () => import(/* webpackChunkName: "themes-punjabi" */ './punjabi'),
  ),
  russian: loadable(
    () => import(/* webpackChunkName: "themes-russian" */ './russian'),
  ),
  scotland: loadable(
    () => import(/* webpackChunkName: "themes-scotland" */ './scotland'),
  ),
  serbian: {
    cyr: loadable(
      () =>
        import(/* webpackChunkName: "themes-serbian-cyr" */ './serbian/cyr'),
    ),
    lat: loadable(
      () =>
        import(/* webpackChunkName: "themes-serbian-lat" */ './serbian/lat'),
    ),
  },
  sinhala: loadable(
    () => import(/* webpackChunkName: "themes-sinhala" */ './sinhala'),
  ),
  somali: loadable(
    () => import(/* webpackChunkName: "themes-somali" */ './somali'),
  ),
  sport: loadable(
    () => import(/* webpackChunkName: "themes-sport" */ './sport'),
  ),
  swahili: loadable(
    () => import(/* webpackChunkName: "themes-swahili" */ './swahili'),
  ),
  tamil: loadable(
    () => import(/* webpackChunkName: "themes-tamil" */ './tamil'),
  ),
  telugu: loadable(
    () => import(/* webpackChunkName: "themes-telugu" */ './telugu'),
  ),
  thai: loadable(() => import(/* webpackChunkName: "themes-thai" */ './thai')),
  tigrinya: loadable(
    () => import(/* webpackChunkName: "themes-tigrinya" */ './tigrinya'),
  ),
  turkce: loadable(
    () => import(/* webpackChunkName: "themes-turkce" */ './turkce'),
  ),
  ukchina: {
    simp: loadable(
      () =>
        import(/* webpackChunkName: "themes-ukchina-simp" */ './ukchina/simp'),
    ),
    trad: loadable(
      () =>
        import(/* webpackChunkName: "themes-ukchina-trad" */ './ukchina/trad'),
    ),
  },
  ukrainian: loadable(
    () => import(/* webpackChunkName: "themes-ukrainian" */ './ukrainian'),
  ),
  urdu: loadable(() => import(/* webpackChunkName: "themes-urdu" */ './urdu')),
  uzbek: {
    cyr: loadable(
      () => import(/* webpackChunkName: "themes-uzbek-cyr" */ './uzbek/cyr'),
    ),
    lat: loadable(
      () => import(/* webpackChunkName: "themes-uzbek-lat" */ './uzbek/lat'),
    ),
  },
  vietnamese: loadable(
    () => import(/* webpackChunkName: "themes-vietnamese" */ './vietnamese'),
  ),
  ws: loadable(() => import(/* webpackChunkName: "themes-ws" */ './ws')),
  yoruba: loadable(
    () => import(/* webpackChunkName: "themes-yoruba" */ './yoruba'),
  ),
  zhongwen: {
    simp: loadable(
      () =>
        import(
          /* webpackChunkName: "themes-zhongwen-simp" */ './zhongwen/simp'
        ),
    ),
    trad: loadable(
      () =>
        import(
          /* webpackChunkName: "themes-zhongwen-trad" */ './zhongwen/trad'
        ),
    ),
  },
};

export default themes;
