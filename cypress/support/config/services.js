export default {
  afaanoromoo: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/afaanoromoo/articles/c4g19kgl85ko',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/afaanoromoo/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/afaanoromoo',
    },
  },
  afrique: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/afrique/articles/cz216x22106o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/afrique/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/afrique',
    },
  },
  amharic: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/amharic/articles/c3rykrrvy19o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/amharic/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/amharic',
    },
  },
  arabic: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? '/arabic/articles/c8j91j2ljppo'
          : '/arabic/articles/c69dvq19k63o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? '/arabic/articles/c123456abcdo'
          : '/arabic/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/arabic',
    },
  },
  azeri: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/azeri/articles/c5k08pqnzexo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/azeri/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/azeri',
    },
  },
  bengali: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/bengali/articles/c6p3yp5zzmeo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/bengali/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/bengali',
    },
  },
  burmese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/burmese/articles/c3w1kwwmm5yo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/burmese/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/burmese',
    },
  },
  cymrufyw: {
    font: undefined,
    isWorldService: false,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/cymrufyw/articles/c06p32z9x2mo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/cymrufyw/articles/c123456abcdo',
      frontPage:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/cymrufyw',
    },
  },
  gahuza: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/gahuza/articles/cey23zx8wx8o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/gahuza/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/gahuza',
    },
  },
  gujarati: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/gujarati/articles/cr5el5kw591o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/gujarati/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/gujarati',
    },
  },
  hausa: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/hausa/articles/c2nr6xqmnewo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/hausa/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/hausa',
    },
  },
  hindi: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/hindi/articles/c0469479x9xo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/hindi/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/hindi',
    },
  },
  igbo: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/igbo/articles/cr1lw620ygjo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/igbo/articles/cxvxrj8tvppo',
      frontPage: '/igbo',
    },
  },
  indonesia: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/indonesia/articles/c0q2zq8pzvzo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/indonesia/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/indonesia',
    },
  },
  japanese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/japanese/articles/c693w95w0mko',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/japanese/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/japanese',
    },
  },
  korean: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/korean/articles/cpv9kv2yzk6o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/korean/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/korean',
    },
  },
  kyrgyz: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/kyrgyz/articles/c3xd4xg3rm9o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/kyrgyz/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/kyrgyz',
    },
  },
  marathi: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/marathi/articles/cp47g4myxz7o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/marathi/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/marathi',
    },
  },
  mundo: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/mundo/articles/c45965g63xno',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/mundo/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/mundo',
    },
  },
  naidheachdan: {
    font: undefined,
    isWorldService: false,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/naidheachdan/articles/c18q7nedn2ko',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/naidheachdan/articles/c123456abcdo',
      frontPage:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/naidheachdan',
    },
  },
  nepali: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/nepali/articles/cl90j9m3mn6o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/nepali/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/nepali',
    },
  },
  news: {
    font: 'Reith',
    isWorldService: false,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? '/news/articles/c5ll353v7y9o'
          : '/news/articles/c6v11qzyv8po',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/news/articles/cxvxrj8tvppo',
      frontPage: undefined,
    },
  },
  pashto: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? '/pashto/articles/c70970g2251o'
          : '/pashto/articles/cng0e8v85eko',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? '/pashto/articles/c123456abcdo'
          : '/pashto/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/pashto',
    },
  },
  persian: {
    font: 'Nassim',
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/persian/articles/c4vlle3q337o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/persian/articles/cxvxrj8tvppo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/persian',
    },
  },
  pidgin: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/pidgin/articles/cwl08rd38l6o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/pidgin/articles/cxvxrj8tvppo',
      frontPage: '/pidgin',
    },
  },
  portuguese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: undefined,
      errorPage404: undefined,
      frontPage: undefined,
    },
  },
  punjabi: {
    font: undefined,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/punjabi/articles/c0l79lr39qyo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/punjabi/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/punjabi',
    },
  },
  russian: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/russian/articles/ck7pz7re3zgo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/russian/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/russian',
    },
  },
  serbian: {
    font: undefined,
    pageTypes: {
      articles: undefined,
      errorPage404: undefined,
      frontPage: undefined,
    },
  },
  sinhala: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/sinhala/articles/c45w255zlexo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/sinhala/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/sinhala',
    },
  },
  somali: {
    font: undefined,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/somali/articles/cgn6emk3jm8o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/somali/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/somali',
    },
  },
  sport: {
    font: undefined,
    pageTypes: {
      articles: undefined,
      errorPage404: undefined,
      frontPage: undefined,
    },
  },
  swahili: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/swahili/articles/czjqge2jwn2o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/swahili/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/swahili',
    },
  },
  tamil: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/tamil/articles/cwl08ll3me8o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/tamil/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/tamil',
    },
  },
  telugu: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/telugu/articles/cq0y4008d4vo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/telugu/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/telugu',
    },
  },
  thai: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/thai/articles/c3qxeqm7ldjo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/thai/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/thai',
    },
  },
  tigrinya: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/tigrinya/articles/c12g32eldk6o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/tigrinya/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/tigrinya',
    },
  },
  turkce: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/turkce/articles/cr2d32lwww2o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/turkce/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/turkce',
    },
  },
  ukchina: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: undefined,
      errorPage404: undefined,
      frontPage: undefined,
    },
  },
  ukrainian: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/ukrainian/articles/c0glz45kqz6o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/ukrainian/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/ukrainian',
    },
  },
  urdu: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? '/urdu/articles/c4qg7qq63y6o'
          : '/urdu/articles/cx621klkm1ro',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? '/urdu/articles/c123456abcdo'
          : '/urdu/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/urdu',
    },
  },
  uzbek: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/uzbek/articles/cxj3rjxm6r0o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/uzbek/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/uzbek',
    },
  },
  vietnamese: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/vietnamese/articles/c3y59g5zm19o',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/vietnamese/articles/c123456abcdo',
      frontPage: Cypress.env('APP_ENV') === 'live' ? undefined : '/vietnamese',
    },
  },
  yoruba: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : '/yoruba/articles/clw06m0nj8qo',
      errorPage404:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : '/yoruba/articles/cxvxrj8tvppo',
      frontPage: '/yoruba',
    },
  },
  zhongwen: {
    font: undefined,
    isWorldService: true,
    pageTypes: {
      articles: undefined,
      errorPage404: undefined,
      frontPage: undefined,
    },
  },
};
