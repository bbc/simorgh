/*
 * This config is used by `createLoadableContext`
 * to dynamically load each service's config.
 */
const loadableConfig = {
  afaanoromoo: {
    loader: () =>
      import(/* webpackChunkName: 'afaanoromoo' */ './afaanoromoo.js'),
    webpack: () => [require.resolveWeak('./afaanoromoo.js')],
  },
  afrique: {
    loader: () => import(/* webpackChunkName: 'afrique' */ './afrique.js'),
    webpack: () => [require.resolveWeak('./afrique.js')],
  },
  amharic: {
    loader: () => import(/* webpackChunkName: 'amharic' */ './amharic.js'),
    webpack: () => [require.resolveWeak('./amharic.js')],
  },
  arabic: {
    loader: () => import(/* webpackChunkName: 'arabic' */ './arabic.js'),
    webpack: () => [require.resolveWeak('./arabic.js')],
  },
  azeri: {
    loader: () => import(/* webpackChunkName: 'azeri' */ './azeri.js'),
    webpack: () => [require.resolveWeak('./azeri.js')],
  },
  bengali: {
    loader: () => import(/* webpackChunkName: 'bengali' */ './bengali.js'),
    webpack: () => [require.resolveWeak('./bengali.js')],
  },
  burmese: {
    loader: () => import(/* webpackChunkName: 'burmese' */ './burmese.js'),
    webpack: () => [require.resolveWeak('./burmese.js')],
  },
  cymrufyw: {
    loader: () => import(/* webpackChunkName: 'cymrufyw' */ './cymrufyw.js'),
    webpack: () => [require.resolveWeak('./cymrufyw.js')],
  },
  gahuza: {
    loader: () => import(/* webpackChunkName: 'gahuza' */ './gahuza.js'),
    webpack: () => [require.resolveWeak('./gahuza.js')],
  },
  gujarati: {
    loader: () => import(/* webpackChunkName: 'gujarati' */ './gujarati.js'),
    webpack: () => [require.resolveWeak('./gujarati.js')],
  },
  hausa: {
    loader: () => import(/* webpackChunkName: 'hausa' */ './hausa.js'),
    webpack: () => [require.resolveWeak('./hausa.js')],
  },
  hindi: {
    loader: () => import(/* webpackChunkName: 'hindi' */ './hindi.js'),
    webpack: () => [require.resolveWeak('./hindi.js')],
  },
  igbo: {
    loader: () => import(/* webpackChunkName: 'igbo' */ './igbo.js'),
    webpack: () => [require.resolveWeak('./igbo.js')],
  },
  indonesia: {
    loader: () => import(/* webpackChunkName: 'indonesia' */ './indonesia.js'),
    webpack: () => [require.resolveWeak('./indonesia.js')],
  },
  japanese: {
    loader: () => import(/* webpackChunkName: 'japanese' */ './japanese.js'),
    webpack: () => [require.resolveWeak('./japanese.js')],
  },
  korean: {
    loader: () => import(/* webpackChunkName: 'korean' */ './korean.js'),
    webpack: () => [require.resolveWeak('./korean.js')],
  },
  kyrgyz: {
    loader: () => import(/* webpackChunkName: 'kyrgyz' */ './kyrgyz.js'),
    webpack: () => [require.resolveWeak('./kyrgyz.js')],
  },
  marathi: {
    loader: () => import(/* webpackChunkName: 'marathi' */ './marathi.js'),
    webpack: () => [require.resolveWeak('./marathi.js')],
  },
  mundo: {
    loader: () => import(/* webpackChunkName: 'mundo' */ './mundo.js'),
    webpack: () => [require.resolveWeak('./mundo.js')],
  },
  naidheachdan: {
    loader: () =>
      import(/* webpackChunkName: 'naidheachdan' */ './naidheachdan.js'),
    webpack: () => [require.resolveWeak('./naidheachdan.js')],
  },
  nepali: {
    loader: () => import(/* webpackChunkName: 'nepali' */ './nepali.js'),
    webpack: () => [require.resolveWeak('./nepali.js')],
  },
  news: {
    loader: () => import(/* webpackChunkName: 'news' */ './news.js'),
    webpack: () => [require.resolveWeak('./news.js')],
  },
  pashto: {
    loader: () => import(/* webpackChunkName: 'pashto' */ './pashto.js'),
    webpack: () => [require.resolveWeak('./pashto.js')],
  },
  persian: {
    loader: () => import(/* webpackChunkName: 'persian' */ './persian.js'),
    webpack: () => [require.resolveWeak('./persian.js')],
  },
  pidgin: {
    loader: () => import(/* webpackChunkName: 'pidgin' */ './pidgin.js'),
    webpack: () => [require.resolveWeak('./pidgin.js')],
  },
  portuguese: {
    loader: () =>
      import(/* webpackChunkName: 'portuguese' */ './portuguese.js'),
    webpack: () => [require.resolveWeak('./portuguese.js')],
  },
  punjabi: {
    loader: () => import(/* webpackChunkName: 'punjabi' */ './punjabi.js'),
    webpack: () => [require.resolveWeak('./punjabi.js')],
  },
  russian: {
    loader: () => import(/* webpackChunkName: 'russian' */ './russian.js'),
    webpack: () => [require.resolveWeak('./russian.js')],
  },
  serbian: {
    variants: true,
    lat: {
      loader: () =>
        import(/* webpackChunkName: 'serbian_lat' */ './serbian_lat.js'),
      webpack: () => [require.resolveWeak('./serbian_lat.js')],
    },
    cyr: {
      loader: () =>
        import(/* webpackChunkName: 'serbian_cyr' */ './serbian_cyr.js'),
      webpack: () => [require.resolveWeak('./serbian_cyr.js')],
    },
  },
  sinhala: {
    loader: () => import(/* webpackChunkName: 'sinhala' */ './sinhala.js'),
    webpack: () => [require.resolveWeak('./sinhala.js')],
  },
  somali: {
    loader: () => import(/* webpackChunkName: 'somali' */ './somali.js'),
    webpack: () => [require.resolveWeak('./somali.js')],
  },
  swahili: {
    loader: () => import(/* webpackChunkName: 'swahili' */ './swahili.js'),
    webpack: () => [require.resolveWeak('./swahili.js')],
  },
  tamil: {
    loader: () => import(/* webpackChunkName: 'tamil' */ './tamil.js'),
    webpack: () => [require.resolveWeak('./tamil.js')],
  },
  telugu: {
    loader: () => import(/* webpackChunkName: 'telugu' */ './telugu.js'),
    webpack: () => [require.resolveWeak('./telugu.js')],
  },
  thai: {
    loader: () => import(/* webpackChunkName: 'thai' */ './thai.js'),
    webpack: () => [require.resolveWeak('./thai.js')],
  },
  tigrinya: {
    loader: () => import(/* webpackChunkName: 'tigrinya' */ './tigrinya.js'),
    webpack: () => [require.resolveWeak('./tigrinya.js')],
  },
  turkce: {
    loader: () => import(/* webpackChunkName: 'turkce' */ './turkce.js'),
    webpack: () => [require.resolveWeak('./turkce.js')],
  },
  ukchina: {
    variants: true,
    simp: {
      loader: () =>
        import(/* webpackChunkName: 'ukchina_simp' */ './ukchina_simp.js'),
      webpack: () => [require.resolveWeak('./ukchina_simp.js')],
    },
    trad: {
      loader: () =>
        import(/* webpackChunkName: 'ukchina_trad' */ './ukchina_trad.js'),
      webpack: () => [require.resolveWeak('./ukchina_trad.js')],
    },
  },
  ukrainian: {
    loader: () => import(/* webpackChunkName: 'ukrainian' */ './ukrainian.js'),
    webpack: () => [require.resolveWeak('./ukrainian.js')],
  },
  urdu: {
    loader: () => import(/* webpackChunkName: 'urdu' */ './urdu.js'),
    webpack: () => [require.resolveWeak('./urdu.js')],
  },
  uzbek: {
    loader: () => import(/* webpackChunkName: 'uzbek' */ './uzbek.js'),
    webpack: () => [require.resolveWeak('./uzbek.js')],
  },
  vietnamese: {
    loader: () =>
      import(/* webpackChunkName: 'vietnamese' */ './vietnamese.js'),
    webpack: () => [require.resolveWeak('./vietnamese.js')],
  },
  yoruba: {
    loader: () => import(/* webpackChunkName: 'yoruba' */ './yoruba.js'),
    webpack: () => [require.resolveWeak('./yoruba.js')],
  },
  zhongwen: {
    variants: true,
    simp: {
      loader: () =>
        import(/* webpackChunkName: 'zhongwen_simp' */ './zhongwen_simp.js'),
      webpack: () => [require.resolveWeak('./zhongwen_simp.js')],
    },
    trad: {
      loader: () =>
        import(/* webpackChunkName: 'zhongwen_trad' */ './zhongwen_trad.js'),
      webpack: () => [require.resolveWeak('./zhongwen_trad.js')],
    },
  },
};

export default loadableConfig;
