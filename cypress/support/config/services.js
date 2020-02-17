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
    name: 'afaanoromoo',
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
        path: '/afaanoromoo',
        smoke: false,
      },
      liveRadio: {
        path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/afaanoromoo/oduu-51248626'
          : '/afaanoromoo/23149891',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/afaanoromoo/oduu-41217768',
        smoke: false,
      },
    },
  },
  afrique: {
    name: 'afrique',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/afrique',
        smoke: false,
      },
      liveRadio: {
        path: '/afrique/bbc_afrique_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/afrique/region-39269126',
        smoke: false,
      },
    },
  },
  amharic: {
    name: 'amharic',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/amharic/articles/c0lgxqknqkdo'
          : '/amharic/articles/czqverekrldo',
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
        path: '/amharic',
        smoke: false,
      },
      liveRadio: {
        path: '/amharic/bbc_amharic_radio/liveradio',
        smoke: true,
      },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/amharic/news-51270657'
          : '/amharic/news-23263266',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv) ? undefined : '/amharic/42743191',
        smoke: false,
      },
    },
  },
  arabic: {
    name: 'arabic',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/arabic',
        smoke: false,
      },
      liveRadio: {
        path: '/arabic/bbc_arabic_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/arabic/art-and-culture-38260491',
        smoke: false,
      },
    },
  },
  azeri: {
    name: 'azeri',
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
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/azeri/azerbaijan-44208474',
        smoke: false,
      },
    },
  },
  bengali: {
    name: 'bengali',
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
        path: '/bengali',
        smoke: false,
      },
      liveRadio: {
        path: '/bengali/bbc_bangla_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/bengali/news-38827173',
        smoke: false,
      },
    },
  },
  burmese: {
    name: 'burmese',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/burmese/articles/c41px3vd4nxo'
          : '/burmese/articles/cn0exdy1jzvo',
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
        path: '/burmese',
        smoke: false,
      },
      liveRadio: {
        path: '/burmese/bbc_burmese_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/burmese/media-47680015',
        smoke: false,
      },
    },
  },
  cymrufyw: {
    name: 'cymrufyw',
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
      photoGalleryPage: { path: undefined, smoke: false },
    },
  },
  gahuza: {
    name: 'gahuza',
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
        path: '/gahuza',
        smoke: false,
      },
      liveRadio: {
        path: '/gahuza/bbc_gahuza_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/gahuza/amakuru-43894701',
        smoke: false,
      },
    },
  },
  gujarati: {
    name: 'gujarati',
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
        path: '/gujarati',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/gujarati/media-51389006'
          : '/gujarati/other-news-23130286',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/gujarati/international-41345658',
        smoke: false,
      },
    },
  },
  hausa: {
    name: 'hausa',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/hausa',
        smoke: false,
      },
      liveRadio: {
        path: '/hausa/bbc_hausa_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path: undefined,
        smoke: false,
      },
    },
  },
  hindi: {
    name: 'hindi',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/hindi',
        smoke: false,
      },
      liveRadio: {
        path: '/hindi/bbc_hindi_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/hindi/india-50198153',
        smoke: false,
      },
    },
  },
  igbo: {
    name: 'igbo',
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
        path: isLive(appEnv) ? '/igbo/media-42986440' : '/igbo/media-23256786', // live is audio clip
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/igbo/afirika-49666505',
        smoke: false,
      },
    },
  },
  indonesia: {
    name: 'indonesia',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/indonesia',
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
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/indonesia/indonesia-41635759',
        smoke: false,
      },
    },
  },
  japanese: {
    name: 'japanese',
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/japanese/articles/cj4m7n5nrd8o'
          : '/japanese/articles/cdd6p3r9g7jo',
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
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/japanese/video-23248670',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/japanese/features-and-analysis-42786589',
        smoke: false,
      },
    },
  },
  korean: {
    name: 'korean',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/korean/articles/crym1243d97o'
          : '/korean/articles/c3mn1lvz65xo',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/korean',
        smoke: false,
      },
      liveRadio: {
        path: '/korean/bbc_korean_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/korean/international-51367672'
          : '/korean/media-23248686',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/korean/features-41397333',
        smoke: false,
      },
    },
  },
  kyrgyz: {
    name: 'kyrgyz',
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
        path: '/kyrgyz/bbc_kyrgyz_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/kyrgyz/world-40847556',
        smoke: false,
      },
    },
  },
  marathi: {
    name: 'marathi',
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
        path: '/marathi',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/marathi/media-51314817'
          : '/marathi/media-23127353',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/marathi/india-42894522',
        smoke: false,
      },
    },
  },
  mundo: {
    name: 'mundo',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/mundo',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/mundo/deportes-36935058',
        smoke: false,
      },
    },
  },
  naidheachdan: {
    name: 'naidheachdan',
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
      photoGalleryPage: { path: undefined, smoke: false },
    },
  },
  nepali: {
    name: 'nepali',
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
        path: '/nepali',
        smoke: false,
      },
      liveRadio: {
        path: '/nepali/bbc_nepali_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/nepali/news-50627370',
        smoke: false,
      },
    },
  },
  news: {
    name: 'news',
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
      photoGalleryPage: { path: undefined, smoke: false },
    },
  },
  pashto: {
    name: 'pashto',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/pashto',
        smoke: false,
      },
      liveRadio: {
        path: '/pashto/bbc_pashto_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/pashto/arts-and-literature-50230813',
        smoke: false,
      },
    },
  },
  persian: {
    name: 'persian',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/persian',
        smoke: true,
      },
      liveRadio: {
        path: [
          '/persian/bbc_persian_radio/liveradio',
          '/persian/bbc_dari_radio/liveradio',
        ],
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/persian/magazine-49281981',
        smoke: true,
      },
    },
  },
  pidgin: {
    name: 'pidgin',
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
        path: isLive(appEnv) ? '/pidgin/tori-50974590' : '/pidgin/23248703', // live is video with related content
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/pidgin/sport-23252855',
        smoke: true,
      },
    },
  },
  portuguese: {
    name: 'portuguese',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/portuguese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/portuguese/geral-40302633',
        smoke: false,
      },
    },
  },
  punjabi: {
    name: 'punjabi',
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
        path: isLive(appEnv)
          ? '/punjabi/india-51325361'
          : '/punjabi/media-23248705',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/punjabi/india-42928885',
        smoke: false,
      },
    },
  },
  russian: {
    name: 'russian',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/russian',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/russian/features-45782775',
        smoke: false,
      },
    },
  },
  scotland: {
    name: 'scotland',
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
      photoGalleryPage: { path: undefined, smoke: false },
    },
  },
  serbianCyr: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'cyr',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/articles/c805k05kr73o/cyr',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/articles/cabcdefghijo/cyr',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/serbian/cyr',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : undefined, // '/serbian/srbija-49427344/cyr'
        smoke: false,
      },
      photoGalleryPage: { path: undefined, smoke: false },
    },
  },
  serbianLat: {
    name: 'serbian',
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
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/serbian/srbija-46748932/lat',
        smoke: false,
      },
    },
  },
  sinhala: {
    name: 'sinhala',
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
        path: '/sinhala',
        smoke: false,
      },
      liveRadio: {
        path: '/sinhala/bbc_sinhala_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          isLive(appEnv) || isTest(appEnv) ? undefined : '/sinhala/23248970',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/sinhala/world-37657374',
        smoke: false,
      },
    },
  },
  somali: {
    name: 'somali',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/somali',
        smoke: false,
      },
      liveRadio: {
        path: '/somali/bbc_somali_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv) ? undefined : '/somali/war-45947544',
        smoke: false,
      },
    },
  },
  sport: {
    name: 'sport',
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: { path: undefined, smoke: false },
      errorPage404: { path: undefined, smoke: false },
      frontPage: { path: undefined, smoke: false },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: { path: undefined, smoke: false },
      photoGalleryPage: { path: undefined, smoke: false },
    },
  },
  swahili: {
    name: 'swahili',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/swahili',
        smoke: false,
      },
      liveRadio: {
        path: '/swahili/bbc_swahili_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/swahili/habari-48185450',
        smoke: false,
      },
    },
  },
  tamil: {
    name: 'tamil',
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
        path: '/tamil',
        smoke: false,
      },
      liveRadio: {
        path: '/tamil/bbc_tamil_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/tamil/global-47758688',
        smoke: false,
      },
    },
  },
  telugu: {
    name: 'telugu',
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
        path: '/telugu',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/telugu/india-51309092'
          : '/telugu/international-23263261',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/telugu/india-42321552',
        smoke: false,
      },
    },
  },
  thai: {
    name: 'thai',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/thai/articles/czx7w3zyme1o'
          : '/thai/articles/c442rl3md0eo',
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
        path: isLive(appEnv)
          ? '/thai/international-51285795'
          : '/thai/thailand-23248713',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/thai/thailand-49950038',
        smoke: false,
      },
    },
  },
  tigrinya: {
    name: 'tigrinya',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/tigrinya/articles/c3vq38ve33xo'
          : '/tigrinya/articles/ck62z3rjwdeo',
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
        path: '/tigrinya',
        smoke: false,
      },
      liveRadio: {
        path: '/tigrinya/bbc_tigrinya_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: isLive(appEnv)
          ? '/tigrinya/news-51249937'
          : '/tigrinya/news-23263262',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/tigrinya/news-49944566',
        smoke: false,
      },
    },
  },
  turkce: {
    name: 'turkce',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/turkce',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/turkce/haberler-dunya-50924340',
        smoke: false,
      },
    },
  },
  ukchinaSimp: {
    name: 'ukchina',
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
      photoGalleryPage: {
        path: undefined,
        smoke: false,
      },
    },
  },
  ukchinaTrad: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/articles/c0e8weny66ko/trad',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/articles/cabcdefghijo/trad',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/ukchina/trad',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : undefined, // '/ukchina/49375846/trad'
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/ukchina/cool-britannia-38434549/trad',
        smoke: false,
      },
    },
  },
  ukrainian: {
    name: 'ukrainian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: isLive(appEnv)
          ? '/ukrainian/articles/c8zv0eed9gko'
          : '/ukrainian/articles/cp4l2mrejvdo',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/ukrainian',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/ukrainian/features-41278900',
        smoke: false,
      },
    },
  },
  urdu: {
    name: 'urdu',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/urdu',
        smoke: false,
      },
      liveRadio: {
        path: '/urdu/bbc_urdu_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/urdu/pakistan-48242478',
        smoke: false,
      },
    },
  },
  uzbek: {
    name: 'uzbek',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/uzbek/articles/cxj3rjxm6r0o',
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
        path: '/uzbek',
        smoke: false,
      },
      liveRadio: {
        path: '/uzbek/bbc_uzbek_radio/liveradio',
        smoke: false,
      },
      mediaAssetPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/uzbek/sport-23248721',
        smoke: true,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/uzbek/central-asia-46716844',
        smoke: false,
      },
    },
  },
  vietnamese: {
    name: 'vietnamese',
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
        path: isLive(appEnv) || isTest(appEnv) ? undefined : '/vietnamese',
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: undefined,
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/vietnamese/world-48605529',
        smoke: false,
      },
    },
  },
  yoruba: {
    name: 'yoruba',
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
        path: isLive(appEnv)
          ? '/yoruba/afrika-51116686'
          : '/yoruba/media-23256797', // live is video clip
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/yoruba/media-50970014',
        smoke: false,
      },
    },
  },
  zhongwenSimp: {
    name: 'zhongwen',
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
      photoGalleryPage: {
        path: undefined,
        smoke: false,
      },
    },
  },
  zhongwenTrad: {
    name: 'zhongwen',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
    pageTypes: {
      articles: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/articles/c3xd4x9prgyo/trad',
        smoke: true,
      },
      errorPage404: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/articles/cabcdefghijo/trad',
        smoke: true,
      },
      frontPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : '/zhongwen/trad',
        smoke: true,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path:
          Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
            ? undefined
            : undefined, // '/zhongwen/chinese-news-49631219/trad'
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/zhongwen/chinese-news-49065935/trad',
        smoke: true,
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
