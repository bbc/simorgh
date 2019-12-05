const isLive = appEnv => appEnv === 'live';

const isTest = appEnv => appEnv === 'test';

const serviceMapper = appEnv => {
  if (appEnv === 'stage') {
    return 'test';
  }

  return appEnv;
};

const genServices = appEnv => ({
  afaanoromoo: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/afaanoromoo/articles/ce3nlgrelv1o'
          : '/afaanoromoo/articles/c4g19kgl85ko',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/afaanoromoo/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/afaanoromoo',
        smoke: false,
      },
      liveRadio: {
        path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/afrique/articles/cx80n852v6mo'
          : '/afrique/articles/cz216x22106o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/afrique/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/afrique',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/afrique/bbc_afrique_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv) ? undefined : '/amharic/articles/czqverekrldo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/amharic/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/amharic',
        smoke: false,
      },
      liveRadio: {
        path: '/amharic/bbc_amharic_radio/liveradio',
        smoke: true,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/arabic/articles/c8j91j2ljppo'
          : '/arabic/articles/c1er5mjnznzo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/arabic/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/arabic',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/arabic/bbc_arabic_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
    },
  },
  archive: {
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path: undefined,
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/archive/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: undefined,
        smoke: false,
      },
      liveRadio: {
        path: undefined,
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/azeri/articles/cv0lm08kngmo'
          : '/azeri/articles/c5k08pqnzexo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
        path: undefined,
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
        path: isLive(appEnv)
          ? '/bengali/articles/cv90149zq1eo'
          : '/bengali/articles/c6p3yp5zzmeo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/bengali/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/bengali',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/bengali/bbc_bangla_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv) ? undefined : '/burmese/articles/cn0exdy1jzvo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/burmese/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/burmese',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/burmese/bbc_burmese_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/cymrufyw/erthyglau/c06p32z9x2mo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/cymrufyw/erthyglau/c123456abcdo',
        smoke: false,
      },
      frontPage: {},
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
        path: isLive(appEnv)
          ? '/gahuza/articles/cryd02nzn81o'
          : '/gahuza/articles/cey23zx8wx8o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/gahuza/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/gahuza',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/gahuza/bbc_gahuza_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/gujarati/articles/c2rnxj48elwo'
          : '/gujarati/articles/cr5el5kw591o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/gujarati/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/gujarati',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/hausa/articles/c41rj1z261zo'
          : '/hausa/articles/c2nr6xqmnewo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/hausa/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/hausa',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/hausa/bbc_hausa_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/hindi/articles/cd80y3ezl8go'
          : '/hindi/articles/c0469479x9xo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/hindi/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/hindi',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/hindi/bbc_hindi_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/igbo/articles/ckjn8jnrn75o'
          : '/igbo/articles/cr1lw620ygjo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/igbo/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: { path: '/igbo', smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          isLive(appEnv) || isTest(appEnv) ? undefined : '/igbo/media-23256786',
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
        path: isLive(appEnv)
          ? '/indonesia/articles/cvd36dly8zdo'
          : '/indonesia/articles/c0q2zq8pzvzo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/indonesia/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/indonesia',
        smoke: false,
      },
      liveRadio: {
        path: '/indonesia/bbc_indonesian_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv) ? undefined : '/japanese/articles/cdd6p3r9g7jo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
        path: isLive(appEnv) ? undefined : '/japanese/video-23248670',
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
        path: isLive(appEnv) ? undefined : '/korean/articles/c3mn1lvz65xo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/korean/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/korean',
        smoke: false,
      },
      liveRadio: {
        path: '/korean/bbc_korean_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: isLive(appEnv) ? undefined : '/korean/media-23248686',
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
        path: isLive(appEnv)
          ? '/kyrgyz/articles/c414v42gy75o'
          : '/kyrgyz/articles/c3xd4xg3rm9o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/kyrgyz/bbc_kyrgyz_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/marathi/articles/cvjxwvn04yjo'
          : '/marathi/articles/cp47g4myxz7o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/marathi/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/marathi',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/mundo/articles/cdwrpl7qwqqo'
          : '/mundo/articles/ce42wzqr2mko',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/mundo/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/mundo',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/naidheachdan/sgeulachdan/c18q7nedn2ko',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/naidheachdan/sgeulachdan/c123456abcdo',
        smoke: false,
      },
      frontPage: {},
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
        path: isLive(appEnv)
          ? '/nepali/articles/c16ljg1v008o'
          : '/nepali/articles/cl90j9m3mn6o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/nepali/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/nepali',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/nepali/bbc_nepali_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/news/articles/cj7xrxz0e8zo'
          : '/news/articles/cn7k01xp8kxo',
        smoke: true,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
        path: isLive(appEnv)
          ? '/pashto/articles/c70970g2251o'
          : '/pashto/articles/cyjmdl92z3ro',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/pashto/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/pashto',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/pashto/bbc_pashto_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/persian/articles/c7eel0lmr4do'
          : '/persian/articles/cej3lzd5e0go',
        smoke: true,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/persian/articles/cxvxrj8tvppo',
        smoke: true,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/persian',
        smoke: true,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/persian/bbc_persian_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/pidgin/articles/cgwk9w4zlg8o'
          : '/pidgin/articles/cwl08rd38l6o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/pidgin/articles/cxvxrj8tvppo',
        smoke: false,
      },
      frontPage: { path: '/pidgin', smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/pidgin/23248703',
        smoke: false,
      },
    },
  },
  portuguese: {
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/portuguese/articles/cpg5prg95lmo'
          : '/portuguese/articles/cd61pm8gzmpo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/portuguese/articles/cxvxrj8tvppo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/portuguese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
    },
  },
  punjabi: {
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/punjabi/articles/c39p51156lyo'
          : '/punjabi/articles/c0l79lr39qyo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
        path: isLive(appEnv) ? undefined : '/punjabi/media-23248705',
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
        path: isLive(appEnv)
          ? '/russian/articles/c6ygxgl53w9o'
          : '/russian/articles/ck7pz7re3zgo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/russian/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/russian',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/scotland/articles/cm49v4x1r9lo'
          : '/scotland/articles/czwj5l0n210o',
        smoke: true,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/serbian/articles/c805k05kr73o/lat',
        smoke: true,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/serbian/articles/cabcdefghijo/lat',
        smoke: true,
      },
      frontPage: {
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/serbian/lat',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/sinhala/articles/cldr38jnwd2o'
          : '/sinhala/articles/c45w255zlexo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/sinhala/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/sinhala',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/sinhala/bbc_sinhala_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: isLive(appEnv) ? undefined : '/sinhala/23248970',
        smoke: false,
      },
    },
  },
  somali: {
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/somali/articles/c8z79d4mzrlo'
          : '/somali/articles/cgn6emk3jm8o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/somali/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/somali',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/somali/bbc_somali_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/swahili/articles/cw794z3gpd5o'
          : '/swahili/articles/czjqge2jwn2o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/swahili/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/swahili',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/swahili/bbc_swahili_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/tamil/articles/cvr4752gr13o'
          : '/tamil/articles/cwl08ll3me8o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/tamil/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/tamil',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/tamil/bbc_tamil_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/telugu/articles/c1x76pey3x3o'
          : '/telugu/articles/cq0y4008d4vo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/telugu/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/telugu',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv) ? undefined : '/thai/articles/c442rl3md0eo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
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
        path: isLive(appEnv) ? undefined : '/thai/thailand-23248713',
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
        path: isLive(appEnv) ? undefined : '/tigrinya/articles/ck62z3rjwdeo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/tigrinya/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/tigrinya',
        smoke: false,
      },
      liveRadio: {
        path: '/tigrinya/bbc_tigrinya_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/turkce/articles/cpgzpzjl3pdo'
          : '/turkce/articles/c8q1ze59n25o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/turkce/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/turkce',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/ukchina/articles/c0e8weny66ko/simp',
        smoke: true,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/ukchina/articles/cabcdefghijo/simp',
        smoke: true,
      },
      frontPage: {
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/ukchina/simp',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv) ? undefined : '/ukrainian/articles/c0glz45kqz6o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/ukrainian/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/ukrainian',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/urdu/articles/c4qg7qq63y6o'
          : '/urdu/articles/cwgq7rzv172o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/urdu/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/urdu',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/urdu/bbc_urdu_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv) ? undefined : '/uzbek/articles/cxj3rjxm6r0o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/uzbek/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/uzbek',
        smoke: false,
      },
      liveRadio: {
        path:
          isLive(appEnv) || isTest(appEnv) || Cypress.env('APP_ENV') === 'local'
            ? undefined
            : '/uzbek/bbc_uzbek_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: isLive(appEnv) ? undefined : '/uzbek/sport-23248721',
        smoke: true,
      },
    },
  },
  vietnamese: {
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/vietnamese/articles/cpgqngyexq7o'
          : '/vietnamese/articles/c3y59g5zm19o',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/vietnamese/articles/c123456abcdo',
        smoke: false,
      },
      frontPage: {
        path: isLive(appEnv) ? undefined : '/vietnamese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? '/yoruba/articles/cg7qz71en35o'
          : '/yoruba/articles/clw06m0nj8qo',
        smoke: false,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/yoruba/articles/cxvxrj8tvppo',
        smoke: false,
      },
      frontPage: { path: '/yoruba', smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/yoruba/media-23256797',
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
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/zhongwen/articles/c3xd4x9prgyo/simp',
        smoke: true,
      },
      errorPage404: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/zhongwen/articles/cabcdefghijo/simp',
        smoke: true,
      },
      frontPage: {
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/zhongwen/simp',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
    },
  },
});

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');
const environment = serviceMapper(Cypress.env('APP_ENV'));

if (
  runOnlyService &&
  Object.keys(genServices(environment)).includes(runOnlyService)
) {
  module.exports = {
    [runOnlyService]: genServices(environment)[runOnlyService],
  };
} else {
  module.exports = genServices(environment);
}
