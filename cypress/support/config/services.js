const services = {
  afaanoromoo: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/afaanoromoo/articles/ce3nlgrelv1o'
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
        path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/afaanoromoo/oduu-49490954',
        smoke: false,
      },
    },
  },
  afrique: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/afrique/articles/cx80n852v6mo'
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/afrique/monde-49500638',
        smoke: false,
      },
    },
  },
  amharic: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/amharic',
        smoke: false,
      },
      liveRadio: {
        path: '/amharic/bbc_amharic_radio/liveradio',
        smoke: true,
      },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/amharic/news-49562667',
        smoke: false,
      },
    },
  },
  arabic: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/arabic/articles/c8j91j2ljppo'
            : '/arabic/articles/c1er5mjnznzo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/arabic/articles/c123456abcdo',
        smoke: false,
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/arabic/media-49580542',
        smoke: false,
      },
    },
  },
  azeri: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/azeri/articles/cv0lm08kngmo'
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
        path: '/azeri',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/azeri/region-49364777',
        smoke: false,
      },
    },
  },
  bengali: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/bengali/news-49579870',
        smoke: false,
      },
    },
  },
  burmese: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/burmese/media-49571787',
        smoke: false,
      },
    },
  },
  cymrufyw: {
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/cymrufyw/erthyglau/c06p32z9x2mo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/cymrufyw/erthyglau/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/cymrufyw',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: { path: undefined, smoke: false },
    },
  },
  gahuza: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/gahuza/articles/cryd02nzn81o'
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/gahuza/amakuru-49534170',
        smoke: false,
      },
    },
  },
  gujarati: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/gujarati/media-49502679',
        smoke: false,
      },
    },
  },
  hausa: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/hausa/articles/c41rj1z261zo'
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/hausa/labarai-49513456',
        smoke: false,
      },
    },
  },
  hindi: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/hindi/media-49583110',
        smoke: false,
      },
    },
  },
  igbo: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/igbo/articles/ckjn8jnrn75o'
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
      frontPage: { path: '/igbo', smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/igbo/media-42986440',
        smoke: false,
      },
    },
  },
  indonesia: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/indonesia/articles/cvd36dly8zdo'
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
        path: '/indonesia/bbc_indonesian_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/indonesia/media-49591990',
        smoke: false,
      },
    },
  },
  japanese: {
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? undefined
            : '/japanese/articles/c693w95w0mko',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/japanese/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: '/japanese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/japanese/video-49589128',
        smoke: false,
      },
    },
  },
  korean: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
        path: '/korean/bbc_korean_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/korean/media-49590387',
        smoke: false,
      },
    },
  },
  kyrgyz: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
        path: '/kyrgyz',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/kyrgyz/sapar-tv-48695523',
        smoke: false,
      },
    },
  },
  marathi: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/marathi/india-48062804',
        smoke: false,
      },
    },
  },
  mundo: {
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/mundo/articles/cdwrpl7qwqqo'
            : '/mundo/articles/ce42wzqr2mko',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/mundo/noticias-49546078',
        smoke: false,
      },
    },
  },
  naidheachdan: {
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/naidheachdan/sgeulachdan/c18q7nedn2ko',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/naidheachdan/sgeulachdan/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: Cypress.env('APP_ENV') === 'live' ? undefined : '/naidheachdan',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: { path: undefined, smoke: false },
    },
  },
  nepali: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/nepali/news-49613544',
        smoke: false,
      },
    },
  },
  news: {
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/news/articles/cj7xrxz0e8zo'
            : '/news/articles/cn7k01xp8kxo',
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
      mediaAssetPage: { path: undefined, smoke: false },
    },
  },
  pashto: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/pashto/articles/c70970g2251o'
            : '/pashto/articles/cyjmdl92z3ro',
        smoke: false,
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/pashto/afghanistan-49628873',
        smoke: false,
      },
    },
  },
  persian: {
    font: 'Nassim',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/persian/articles/c7eel0lmr4do'
            : '/persian/articles/cej3lzd5e0go',
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
        smoke: true,
      },
      liveRadio: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/persian/bbc_persian_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/persian/world-49653162',
        smoke: false,
      },
    },
  },
  pidgin: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/pidgin/articles/cgwk9w4zlg8o'
            : '/pidgin/articles/cwl08rd38l6o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/pidgin/articles/cxvxrj8tvppo',
        smoke: false,
      },
      frontPage: { path: '/pidgin', smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/pidgin/tori-49450859',
        smoke: true,
      },
    },
  },
  portuguese: {
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/portuguese/articles/cpg5prg95lmo'
            : '/portuguese/articles/cd61pm8gzmpo',
        smoke: false,
      },
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/portuguese/geral-49602758',
        smoke: false,
      },
    },
  },
  punjabi: {
    font: undefined,
    variant: 'default',
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
        path: '/punjabi',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/punjabi/international-49567825',
        smoke: false,
      },
    },
  },
  russian: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/russian/media-49281069',
        smoke: false,
      },
    },
  },
  scotland: {
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/scotland/articles/cm49v4x1r9lo'
            : '/scotland/articles/czwj5l0n210o',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/scotland/articles/cabcdefghijo',
        smoke: false,
      },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: { path: undefined, smoke: false },
    },
  },
  serbian: {
    font: undefined,
    isWorldService: true,
    variant: 'lat',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/articles/c805k05kr73o/lat',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/articles/cabcdefghijo/lat',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/lat',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/srbija-49427344/lat',
        smoke: false,
      },
    },
  },
  sinhala: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/sinhala/sri-lanka-49411205',
        smoke: false,
      },
    },
  },
  somali: {
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/somali/articles/c8z79d4mzrlo'
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/somali/media-48870869',
        smoke: false,
      },
    },
  },
  sport: {
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: { path: undefined, smoke: false },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: { path: undefined, smoke: false },
    },
  },
  swahili: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/swahili/articles/cw794z3gpd5o'
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/swahili/dira-tv-49602132',
        smoke: false,
      },
    },
  },
  tamil: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/tamil/science-49626264',
        smoke: false,
      },
    },
  },
  telugu: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/telugu/india-49647976',
        smoke: false,
      },
    },
  },
  thai: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
        smoke: false,
      },
      frontPage: {
        path: '/thai',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/thai/international-49514085',
        smoke: false,
      },
    },
  },
  tigrinya: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
        path: '/tigrinya/bbc_tigrinya_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/tigrinya/news-49562338',
        smoke: false,
      },
    },
  },
  turkce: {
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/turkce/articles/cpgzpzjl3pdo'
            : '/turkce/articles/c8q1ze59n25o',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/turkce/haberler-dunya-49655644',
        smoke: false,
      },
    },
  },
  ukchina: {
    font: undefined,
    isWorldService: true,
    variant: 'simp',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/articles/c0e8weny66ko/simp',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/articles/cabcdefghijo/simp',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/simp',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/49375846/simp',
        smoke: false,
      },
    },
  },
  ukrainian: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukrainian/media-49656852',
        smoke: false,
      },
    },
  },
  urdu: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/urdu/articles/c4qg7qq63y6o'
            : '/urdu/articles/cwgq7rzv172o',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/urdu/articles/c123456abcdo',
        smoke: false,
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/urdu/pakistan-49644768',
        smoke: false,
      },
    },
  },
  uzbek: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/uzbek/sport-23248721',
        smoke: false,
      },
    },
  },
  vietnamese: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/vietnamese/articles/cpgqngyexq7o'
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
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/vietnamese/media-49614583',
        smoke: false,
      },
    },
  },
  yoruba: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live'
            ? '/yoruba/articles/cg7qz71en35o'
            : '/yoruba/articles/clw06m0nj8qo',
        smoke: false,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/yoruba/articles/cxvxrj8tvppo',
        smoke: false,
      },
      frontPage: { path: '/yoruba', smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/yoruba/media-42985961',
        smoke: false,
      },
    },
  },
  zhongwen: {
    font: undefined,
    isWorldService: true,
    variant: 'simp',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/articles/c3xd4x9prgyo/simp',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/articles/cabcdefghijo/simp',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/simp',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/chinese-news-49631219/simp',
        smoke: false,
      },
    },
  },
};

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');
if (runOnlyService && Object.keys(services).includes(runOnlyService)) {
  module.exports = { [runOnlyService]: services[runOnlyService] };
} else {
  module.exports = services;
}
