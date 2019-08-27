module.exports = {
  afaanoromoo: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/afaanoromoo/articles/c4g19kgl85ko',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/afaanoromoo/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/afaanoromoo',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
        smoke: true,
      },
    },
  },
  afrique: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/afrique/articles/cz216x22106o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/afrique/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/afrique',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/afrique/bbc_afrique_radio/liveradio',
        smoke: false,
      },
    },
  },
  amharic: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/amharic/articles/c3rykrrvy19o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/amharic/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/amharic',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/amharic/bbc_amharic_radio/liveradio',
        smoke: true,
      },
    },
  },
  arabic: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/arabic/articles/c8j91j2ljppo'
            : '/arabic/articles/c69dvq19k63o',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/arabic/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/arabic',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/arabic/bbc_arabic_radio/liveradio',
        smoke: false,
      },
    },
  },
  azeri: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/azeri/articles/c5k08pqnzexo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/azeri/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/azeri',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  bengali: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/bengali/articles/c6p3yp5zzmeo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/bengali/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/bengali',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/bengali/bbc_bangla_radio/liveradio',
        smoke: false,
      },
    },
  },
  burmese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/burmese/articles/c3w1kwwmm5yo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/burmese/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/burmese',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/burmese/bbc_burmese_radio/liveradio',
        smoke: false,
      },
    },
  },
  cymrufyw: {
    font: undefined,
    isWorldService: false,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/cymrufyw/articles/c06p32z9x2mo',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/cymrufyw/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/cymrufyw',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  gahuza: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/gahuza/articles/cey23zx8wx8o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/gahuza/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/gahuza',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/gahuza/bbc_gahuza_radio/liveradio',
        smoke: false,
      },
    },
  },
  gujarati: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/gujarati/articles/cr5el5kw591o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/gujarati/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/gujarati',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  hausa: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/hausa/articles/c2nr6xqmnewo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/hausa/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/hausa',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/hausa/bbc_hausa_radio/liveradio',
        smoke: false,
      },
    },
  },
  hindi: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/hindi/articles/c0469479x9xo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/hindi/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/hindi',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/hindi/bbc_hindi_radio/liveradio',
        smoke: false,
      },
    },
  },
  igbo: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/igbo/articles/cr1lw620ygjo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/igbo/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: { path: '/igbo', smoke: true },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  indonesia: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/indonesia/articles/c0q2zq8pzvzo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/indonesia/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/indonesia',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/indonesia/bbc_indonesian_radio/liveradio',
        smoke: true,
      },
    },
  },
  japanese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/japanese/articles/c693w95w0mko',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/japanese/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/japanese',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  korean: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/korean/articles/cpv9kv2yzk6o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/korean/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/korean',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/korean/bbc_korean_radio/liveradio',
        smoke: true,
      },
    },
  },
  kyrgyz: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/kyrgyz/articles/c3xd4xg3rm9o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/kyrgyz/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/kyrgyz',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/kyrgyz/bbc_kyrgyz_radio/liveradio',
        smoke: false,
      },
    },
  },
  marathi: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/marathi/articles/cp47g4myxz7o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/marathi/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/marathi',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  mundo: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/mundo/articles/c45965g63xno',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/mundo/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/mundo',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  naidheachdan: {
    font: undefined,
    isWorldService: false,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/naidheachdan/articles/c18q7nedn2ko',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/naidheachdan/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/naidheachdan',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  nepali: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/nepali/articles/cl90j9m3mn6o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/nepali/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/nepali',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/nepali/bbc_nepali_radio/liveradio',
        smoke: false,
      },
    },
  },
  news: {
    font: 'Reith',
    isWorldService: false,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/news/articles/c5ll353v7y9o'
            : '/news/articles/c6v11qzyv8po',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/news/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  pashto: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/pashto/articles/c70970g2251o'
            : '/pashto/articles/cng0e8v85eko',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/pashto/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/pashto',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/pashto/bbc_pashto_radio/liveradio',
        smoke: false,
      },
    },
  },
  persian: {
    font: 'Nassim',
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/persian/articles/c7eel0lmr4do'
            : '/persian/articles/c4vlle3q337o',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/persian/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/persian',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/persian/bbc_persian_radio/liveradio',
        smoke: false,
      },
    },
  },
  pidgin: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/pidgin/articles/cwl08rd38l6o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/pidgin/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: { path: '/pidgin', smoke: true },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  portuguese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/portuguese/articles/cxvxrj8tvppo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/portuguese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  punjabi: {
    font: undefined,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/punjabi/articles/c0l79lr39qyo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/punjabi/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/punjabi',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  russian: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/russian/articles/ck7pz7re3zgo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/russian/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/russian',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  serbian: {
    font: undefined,
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: { path: undefined, smoke: false },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  sinhala: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/sinhala/articles/c45w255zlexo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/sinhala/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/sinhala',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/sinhala/bbc_sinhala_radio/liveradio',
        smoke: false,
      },
    },
  },
  somali: {
    font: undefined,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/somali/articles/cgn6emk3jm8o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/somali/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/somali',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/somali/bbc_somali_radio/liveradio',
        smoke: false,
      },
    },
  },
  sport: {
    font: undefined,
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: { path: undefined, smoke: false },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  swahili: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/swahili/articles/czjqge2jwn2o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/swahili/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/swahili',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/swahili/bbc_swahili_radio/liveradio',
        smoke: false,
      },
    },
  },
  tamil: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/tamil/articles/cwl08ll3me8o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/tamil/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/tamil',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/tamil/bbc_tamil_radio/liveradio',
        smoke: false,
      },
    },
  },
  telugu: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/telugu/articles/cq0y4008d4vo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/telugu/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/telugu',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  thai: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/thai/articles/c3qxeqm7ldjo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/thai/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path: '/thai',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  tigrinya: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/tigrinya/articles/c12g32eldk6o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/tigrinya/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/tigrinya',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/tigrinya/bbc_tigrinya_radio/liveradio',
        smoke: true,
      },
    },
  },
  turkce: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/turkce/articles/cr2d32lwww2o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/turkce/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/turkce',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  ukchina: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: { path: undefined, smoke: false },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  ukrainian: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/ukrainian/articles/c0glz45kqz6o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukrainian/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/ukrainian',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  urdu: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/urdu/articles/c4qg7qq63y6o'
            : '/urdu/articles/cx621klkm1ro',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/urdu/articles/c123456abcdo',
        smoke: true,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/urdu',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/urdu/bbc_urdu_radio/liveradio',
        smoke: false,
      },
    },
  },
  uzbek: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/uzbek/articles/cxj3rjxm6r0o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/uzbek/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/uzbek',
        smoke: false,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' ||
          Cypress.env('APP_ENV') === 'test' ||
          Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/uzbek/bbc_uzbek_radio/liveradio',
        smoke: false,
      },
    },
  },
  vietnamese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/vietnamese/articles/c3y59g5zm19o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/vietnamese/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/vietnamese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  yoruba: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/yoruba/articles/clw06m0nj8qo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/yoruba/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: { path: '/yoruba', smoke: true },
      liveRadio: { path: undefined, smoke: false },
    },
  },
  zhongwen: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: { path: undefined, smoke: false },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
    },
  },
};
