/* eslint-disable no-nested-ternary */
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
        path: {
          live: '/afaanoromoo/articles/ce3nlgrelv1o',
          test: '/afaanoromoo/articles/c4g19kgl85ko',
          local: '/afaanoromoo/articles/c4g19kgl85ko',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/afaanoromoo/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/afaanoromoo',
          test: '/afaanoromoo',
          local: '/afaanoromoo',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
          test: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
          local: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: 'afaanoromoo/oduu-51248626',
          test: 'afaanoromoo/23149891',
          local: '/afaanoromoo/23149891',
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/afaanoromoo/oduu-41217768',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: 'afrique/articles/cx80n852v6mo',
          test: '/afrique/articles/cz216x22106o',
          local: '/afrique/articles/cz216x22106o',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/afrique/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/afrique',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/afrique/bbc_afrique_radio/liveradio',
          test: '/afrique/bbc_afrique_radio/liveradio',
          local: '/afrique/bbc_afrique_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/afrique/region-39269126',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/amharic/articles/c0lgxqknqkdo',
          test: '/amharic/articles/czqverekrldo',
          local: '/amharic/articles/czqverekrldo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/amharic/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/amharic',
          test: '/amharic',
          local: '/amharic',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/amharic/bbc_amharic_radio/liveradio',
          test: '/amharic/bbc_amharic_radio/liveradio',
          local: '/amharic/bbc_amharic_radio/liveradio',
        },
        smoke: true,
      },
      mediaAssetPage: {
        path: {
          live: '/amharic/news-51270657',
          test: '/amharic/news-23263266',
          local: '/amharic/news-23263266',
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/amharic/42743191',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/arabic/articles/c8j91j2ljppo',
          test: '/arabic/articles/c1er5mjnznzo',
          local: '/arabic/articles/c1er5mjnznzo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/arabic/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/arabic',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/arabic/bbc_arabic_radio/liveradio',
          test: '/arabic/bbc_arabic_radio/liveradio',
          local: '/arabic/bbc_arabic_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/arabic/art-and-culture-38260491',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/azeri/articles/cv0lm08kngmo',
          test: '/azeri/articles/c5k08pqnzexo',
          local: '/azeri/articles/c5k08pqnzexo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/azeri/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/azeri',
          test: '/azeri',
          local: '/azeri',
        },
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: [
            '/azeri/azerbaijan-23257464', // CPS MAP
            '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP
          ],
          local: [
            '/azeri/region-49364777', // CPS MAP
            '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP
          ],
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/azeri/azerbaijan-44208474',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/bengali/articles/cv90149zq1eo',
          test: '/bengali/articles/c6p3yp5zzmeo',
          local: '/bengali/articles/c6p3yp5zzmeo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/bengali/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/bengali',
          test: '/bengali',
          local: '/bengali',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/bengali/bbc_bangla_radio/liveradio',
          test: '/bengali/bbc_bangla_radio/liveradio',
          local: '/bengali/bbc_bangla_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/bengali/news-38827173',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/burmese/articles/c41px3vd4nxo',
          test: '/burmese/articles/cn0exdy1jzvo',
          local: '/burmese/articles/cn0exdy1jzvo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/burmese/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/burmese',
          test: '/burmese',
          local: '/burmese',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/burmese/bbc_burmese_radio/liveradio',
          test: '/burmese/bbc_burmese_radio/liveradio',
          local: '/burmese/bbc_burmese_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/burmese/media-47680015',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: undefined,
          test: undefined,
          local: '/cymrufyw/erthyglau/c06p32z9x2mo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/cymrufyw/erthyglau/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {},
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
    },
  },
  gahuza: {
    name: 'gahuza',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        path: {
          live: '/gahuza/articles/cryd02nzn81o',
          test: '/gahuza/articles/cey23zx8wx8o',
          local: '/gahuza/articles/cey23zx8wx8o',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/gahuza/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/gahuza',
          test: '/gahuza',
          local: '/gahuza',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/gahuza/bbc_gahuza_radio/liveradio',
          test: '/gahuza/bbc_gahuza_radio/liveradio',
          local: '/gahuza/bbc_gahuza_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: [
            '/gahuza/amakuru-23257470', // CPS MAP
            '/gahuza/video/2015/12/151217_test_long', // TC2 MAP
          ],
          local: [
            '/gahuza/amakuru-49534170', // CPS MAP
            '/gahuza/video/2015/12/151217_test_long', // TC2 MAP
          ],
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/gahuza/amakuru-43894701',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/gujarati/articles/c2rnxj48elwo',
          test: '/gujarati/articles/cr5el5kw591o',
          local: '/gujarati/articles/cr5el5kw591o',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/gujarati/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/gujarati',
          test: '/gujarati',
          local: '/gujarati',
        },
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: {
          live: '/gujarati/media-51389006',
          test: '/gujarati/other-news-23130286',
          local: '/gujarati/other-news-23130286',
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/gujarati/international-41345658',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/hausa/articles/c41rj1z261zo',
          test: '/hausa/articles/c2nr6xqmnewo',
          local: '/hausa/articles/c2nr6xqmnewo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/hausa/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/hausa',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/hausa/bbc_hausa_radio/liveradio',
          test: '/hausa/bbc_hausa_radio/liveradio',
          local: '/hausa/bbc_hausa_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/hindi/articles/cd80y3ezl8go',
          test: '/hindi/articles/c0469479x9xo',
          local: '/hindi/articles/c0469479x9xo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/hindi/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/hindi',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/hindi/bbc_hindi_radio/liveradio',
          test: '/hindi/bbc_hindi_radio/liveradio',
          local: '/hindi/bbc_hindi_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/hindi/india-50198153',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/igbo/articles/ckjn8jnrn75o',
          test: '/igbo/articles/cr1lw620ygjo',
          local: '/igbo/articles/cr1lw620ygjo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/igbo/articles/cxvxrj8tvppo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/igbo',
          test: '/igbo',
          local: '/igbo',
        },
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: {
          live: '/igbo/media-42986440',
          test: '/igbo/media-23256786',
          local: '/igbo/media-23256786',
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/igbo/afirika-49666505',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/igbo/afirika-23252735',
        },
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
        path: {
          live: '/indonesia/articles/cvd36dly8zdo',
          test: '/indonesia/articles/c0q2zq8pzvzo',
          local: '/indonesia/articles/c0q2zq8pzvzo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/indonesia/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/indonesia',
          test: '/indonesia',
          local: '/indonesia',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/indonesia/bbc_indonesian_radio/liveradio',
          test: '/indonesia/bbc_indonesian_radio/liveradio',
          local: '/indonesia/bbc_indonesian_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/indonesia/indonesia-41635759',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/japanese/articles/cj4m7n5nrd8o',
          test: '/japanese/articles/cdd6p3r9g7jo',
          local: '/japanese/articles/cdd6p3r9g7jo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/japanese/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: '/japanese',
          test: '/japanese',
          local: '/japanese',
        },
        smoke: false,
      },
      liveRadio: { path: undefined, smoke: false },
      mediaAssetPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/japanese/video-23248670',
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/japanese/features-and-analysis-42786589',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: {
          live: '/korean/articles/crym1243d97o',
          test: '/korean/articles/c3mn1lvz65xo',
          local: '/korean/articles/c3mn1lvz65xo',
        },
        smoke: false,
      },
      errorPage404: {
        path: {
          live: undefined,
          test: undefined,
          local: '/korean/articles/c123456abcdo',
        },
        smoke: false,
      },
      frontPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/korean',
        },
        smoke: false,
      },
      liveRadio: {
        path: {
          live: '/korean/bbc_korean_radio/liveradio',
          test: '/korean/bbc_korean_radio/liveradio',
          local: '/korean/bbc_korean_radio/liveradio',
        },
        smoke: false,
      },
      mediaAssetPage: {
        path: {
          live: '/korean/international-51367672',
          test: undefined,
          local: '/korean/media-23248686',
        },
        smoke: false,
      },
      photoGalleryPage: {
        path: {
          live: undefined,
          test: undefined,
          local: '/korean/features-41397333',
        },
        smoke: false,
      },
      storyPage: {
        path: {
          live: undefined,
          test: undefined,
          local: undefined,
        },
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
        path: isLive(appEnv)
          ? undefined
          : '/kyrgyz/multimedia/2015/03/150330_map_test',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/kyrgyz/world-40847556',
        smoke: false,
      },
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
        smoke: false,
      },
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
        smoke: false,
      },
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
        path: isLive(appEnv)
          ? undefined
          : '/pashto/world/2016/09/160921_tc2_testmap1',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/pashto/arts-and-literature-50230813',
        smoke: false,
      },
      storyPage: {
        path: undefined,
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
        path: isLive(appEnv)
          ? undefined
          : '/persian/iran/2016/09/160907_tc2_testmap1',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/persian/magazine-49281981',
        smoke: true,
      },
      storyPage: {
        path: undefined,
        smoke: false,
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
      storyPage: {
        path: undefined,
        smoke: false,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
        smoke: false,
      },
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
      storyPage: {
        path: undefined,
        smoke: false,
      },
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
      storyPage: {
        path: undefined,
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
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/sinhala/sri_lanka/2014/01/140120_disabled_soldiers_pay_292',

        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/sinhala/world-37657374',
        smoke: false,
      },
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
        smoke: false,
      },
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
        // eslint-disable-next-line no-nested-ternary
        path: isLive(appEnv)
          ? undefined
          : '/vietnamese/sport/2016/09/160922_tc2_testmap2',
        smoke: false,
      },
      photoGalleryPage: {
        path:
          isLive(appEnv) || isTest(appEnv)
            ? undefined
            : '/vietnamese/world-48605529',
        smoke: false,
      },
      storyPage: {
        path: undefined,
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
      storyPage: {
        path: undefined,
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
      storyPage: {
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
      storyPage: {
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
