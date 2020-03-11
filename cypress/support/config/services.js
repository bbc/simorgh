const genServices = {
  afaanoromoo: {
    name: 'afaanoromoo',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        envs: {
          live: {
            paths: ['/afaanoromoo/articles/ce3nlgrelv1o'],
          },
          test: {
            paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
          },
          local: {
            paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/afaanoromoo/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/afaanoromoo'],
          },
          test: {
            paths: ['/afaanoromoo'],
          },
          local: {
            paths: ['/afaanoromoo'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
          },
          test: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
          },
          local: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/afaanoromoo/oduu-51248626', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/afaanoromoo/23149891', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/afaanoromoo/23149891'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/afaanoromoo/oduu-41217768'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/afrique/articles/cx80n852v6mo'],
          },
          test: {
            paths: ['/afrique/articles/cz216x22106o'],
          },
          local: {
            paths: ['/afrique/articles/cz216x22106o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/afrique/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/afrique'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
          },
          test: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/afrique/region-39269126'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/amharic/articles/c0lgxqknqkdo'],
          },
          test: {
            paths: ['/amharic/articles/czqverekrldo'],
          },
          local: {
            paths: ['/amharic/articles/czqverekrldo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/amharic/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/amharic'],
          },
          test: {
            paths: ['/amharic'],
          },
          local: {
            paths: ['/amharic'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
          },
          test: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
          },
          local: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
          },
          smoke: true,
        },
        mediaAssetPage: {
          envs: {
            live: {
              paths: [
                // '/amharic/news-51270657', // CPS MAP with video clip
              ],
            },
            test: {
              paths: [
                // '/amharic/news-23263266', // CPS MAP with video clip
              ],
            },
            local: {
              paths: ['/amharic/news-23263266'], // CPS MAP with video clip
            },
          },
          smoke: false,
        },
        photoGalleryPage: {
          envs: {
            live: {
              paths: [],
            },
            test: {
              paths: [],
            },
            local: {
              paths: ['/amharic/42743191'],
            },
          },
          smoke: false,
        },
        storyPage: {
          envs: {
            live: {
              paths: [],
            },
            test: {
              paths: [],
            },
            local: {
              paths: [],
            },
          },
          smoke: false,
        },
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
        envs: {
          live: {
            paths: ['/arabic/articles/c8j91j2ljppo'],
          },
          test: {
            paths: ['/arabic/articles/c1er5mjnznzo'],
          },
          local: {
            paths: ['/arabic/articles/c1er5mjnznzo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/arabic/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/arabic'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
          },
          test: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
          },
          local: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/arabic/art-and-culture-38260491'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/azeri/articles/cv0lm08kngmo'],
          },
          test: {
            paths: ['/azeri/articles/c5k08pqnzexo'],
          },
          local: {
            paths: ['/azeri/articles/c5k08pqnzexo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/azeri/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/azeri'],
          },
          test: {
            paths: ['/azeri'],
          },
          local: {
            paths: ['/azeri'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/azeri/international-51331762', // CPS MAP with video clip
              // '/azeri/multimedia/2012/09/120919_georgia_prison_video', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/azeri/azerbaijan-23257464', // CPS MAP with video clip
              // '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/azeri/azerbaijan-23257464', // CPS MAP with video clip
              // '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/azeri/azerbaijan-44208474'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/bengali/articles/cv90149zq1eo'],
          },
          test: {
            paths: ['/bengali/articles/c6p3yp5zzmeo'],
          },
          local: {
            paths: ['/bengali/articles/c6p3yp5zzmeo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/bengali/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/bengali'],
          },
          test: {
            paths: ['/bengali'],
          },
          local: {
            paths: ['/bengali'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
          },
          test: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
          },
          local: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/bengali/news-51660521', // CPS MAP with video clip
              // '/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/bengali/media-23269006', // CPS MAP with video clip
              // '/bengali/multimedia/2016/08/160803_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              'bengali/media-23269006', // CPS MAP with video clip
              // '/bengali/multimedia/2016/08/160803_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/bengali/news-38827173'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/burmese/articles/c41px3vd4nxo'],
          },
          test: {
            paths: ['/burmese/articles/cn0exdy1jzvo'],
          },
          local: {
            paths: ['/burmese/articles/cn0exdy1jzvo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/burmese/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/burmese'],
          },
          test: {
            paths: ['/burmese'],
          },
          local: {
            paths: ['/burmese'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
          },
          test: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
          },
          local: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/burmese/media-48707353', // CPS MAP with video clip
              // '/burmese/multimedia/2016/01/160108_korean_cook', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/burmese/media-23269011', // CPS MAP with video clip
              // '/burmese/sport/2016/08/160811_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/burmese/media-23269011', // CPS MAP with video clip
              // '/burmese/sport/2016/08/160811_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/burmese/media-47680015'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/cymrufyw/erthyglau/c06p32z9x2mo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/cymrufyw/erthyglau/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: { envs: undefined, smoke: false },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: { envs: undefined, smoke: false },
      photoGalleryPage: { envs: undefined, smoke: false },
      storyPage: { envs: undefined, smoke: false },
    },
  },
  gahuza: {
    name: 'gahuza',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        envs: {
          live: {
            paths: ['/gahuza/articles/cryd02nzn81o'],
          },
          test: {
            paths: ['/gahuza/articles/cey23zx8wx8o'],
          },
          local: {
            paths: ['/gahuza/articles/cey23zx8wx8o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/gahuza/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/gahuza'],
          },
          test: {
            paths: ['/gahuza'],
          },
          local: {
            paths: ['/gahuza'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
          },
          test: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
          },
          local: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              '/gahuza/amakuru-51710168', // CPS MAP with audio clip
              // '/gahuza/video/2015/12/151201_100womenburundi', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              '/gahuza/amakuru-23257470', // CPS MAP with video clip
              // '/gahuza/amakuru/2016/02/160215_map_amakuru_test1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/gahuza/amakuru-23257470', // CPS MAP with video clip
              // '/gahuza/amakuru/2016/02/160215_map_amakuru_test1', // TC2 MAP with video clip
            ],
          },
          smoke: true,
        },
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/gahuza/amakuru-43894701'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/gujarati/articles/c2rnxj48elwo'],
          },
          test: {
            paths: ['/gujarati/articles/cr5el5kw591o'],
          },
          local: {
            paths: ['/gujarati/articles/cr5el5kw591o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/gujarati/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/gujarati'],
          },
          test: {
            paths: ['/gujarati'],
          },
          local: {
            paths: ['/gujarati'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/gujarati/media-51389006', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/gujarati/other-news-23130286', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/gujarati/other-news-23130286'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/gujarati/international-41345658'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/hausa/articles/c41rj1z261zo'],
          },
          test: {
            paths: ['/hausa/articles/c2nr6xqmnewo'],
          },
          local: {
            paths: ['/hausa/articles/c2nr6xqmnewo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/hausa/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/hausa'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
          },
          test: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
          },
          local: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/hausa/labarai-51622389', // CPS MAP with video clip
              // '/hausa/multimedia/2012/07/120712_click', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/hausa/23269030', // CPS MAP with video clip
              // '/hausa/multimedia/2016/07/160714_tc2_audiomap', // TC2 MAP with audio clip
            ],
          },
          local: {
            paths: [
              '/hausa/23269030', // CPS MAP with video clip
              // '/hausa/multimedia/2016/07/160714_tc2_audiomap', // TC2 MAP with audio clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/hindi/articles/cd80y3ezl8go'],
          },
          test: {
            paths: ['/hindi/articles/c0469479x9xo'],
          },
          local: {
            paths: ['/hindi/articles/c0469479x9xo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/hindi/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/hindi'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/hindi/bbc_hindi_radio/liveradio'],
          },
          test: {
            paths: ['/hindi/bbc_hindi_radio/liveradio'],
          },
          local: {
            paths: ['/hindi/bbc_hindi_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/hindi/india-50198153'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/igbo/articles/ckjn8jnrn75o'], // CPS MAP with audio clip
            test: {
              paths: ['/igbo/articles/cr1lw620ygjo'],
            },
            local: {
              paths: ['/igbo/articles/cr1lw620ygjo'],
            },
          },
          smoke: false,
        },
        errorPage404: {
          envs: {
            live: {
              paths: [],
            },
            test: {
              paths: [],
            },
            local: {
              paths: ['/igbo/articles/cxvxrj8tvppo'],
            },
          },
          smoke: false,
        },
        frontPage: {
          envs: {
            live: {
              paths: ['/igbo'],
            },
            test: {
              paths: ['/igbo'],
            },
            local: {
              paths: ['/igbo'],
            },
          },
          smoke: false,
        },
        liveRadio: { envs: undefined, smoke: false },
        mediaAssetPage: {
          envs: {
            live: {
              paths: [
                // '/igbo/media-42986440', // CPS MAP with audio clip
              ],
            },
            test: {
              paths: [
                // '/igbo/media-23256786' // CPS MAP with video clip
              ],
            },
            local: {
              paths: ['/igbo/media-23256786'], // CPS MAP with video clip
            },
          },
          smoke: false,
        },
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/igbo/afirika-49666505'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/igbo/afirika-23252735'],
          },
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
        envs: {
          live: {
            paths: ['/indonesia/articles/cvd36dly8zdo'],
          },
          test: {
            paths: ['/indonesia/articles/c0q2zq8pzvzo'],
          },
          local: {
            paths: ['/indonesia/articles/c0q2zq8pzvzo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/indonesia/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/indonesia'],
          },
          test: {
            paths: ['/indonesia'],
          },
          local: {
            paths: ['/indonesia'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
          },
          test: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
          },
          local: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/indonesia/media-51703269', // CPS MAP with video clip
              // '/indonesia/bahasa_inggris/2016/08/160817_video_inggris', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/indonesia/media-23269037', // CPS MAP with video clip
              // '/indonesia/olahraga/2016/10/161003_tc2_videomap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/indonesia/media-23269037', // CPS MAP with video clip
              // '/indonesia/olahraga/2016/10/161003_tc2_videomap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/indonesia/indonesia-41635759'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/japanese/articles/cj4m7n5nrd8o'],
          },
          test: {
            paths: ['/japanese/articles/cdd6p3r9g7jo'],
          },
          local: {
            paths: ['/japanese/articles/cdd6p3r9g7jo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/japanese/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/japanese'],
          },
          test: {
            paths: ['/japanese'],
          },
          local: {
            paths: ['/japanese'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/japanese/video-23248670'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/japanese/features-and-analysis-42786589'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/korean/articles/crym1243d97o'],
          },
          test: {
            paths: ['/korean/articles/c3mn1lvz65xo'],
          },
          local: {
            paths: ['/korean/articles/c3mn1lvz65xo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/korean/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/korean'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
          },
          test: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
          },
          local: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/korean/international-51367672', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/korean/media-23248686', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/korean/media-23248686'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/korean/features-41397333'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
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
        envs: {
          live: {
            paths: ['/kyrgyz/articles/c414v42gy75o'],
          },
          test: {
            paths: ['/kyrgyz/articles/c3xd4xg3rm9o'],
          },
          local: {
            paths: ['/kyrgyz/articles/c3xd4xg3rm9o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/kyrgyz/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/kyrgyz'],
          },
          test: {
            paths: ['/kyrgyz'],
          },
          local: {
            paths: ['/kyrgyz'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
          },
          test: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
          },
          local: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/kyrgyz/magazine-51509456', // CPS MAP with video clip
              // '/kyrgyz/multimedia/2014/09/140903_iv_auturgan', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/kyrgyz/media-23257484', // CPS MAP with video clip
              // '/kyrgyz/multimedia/2015/03/150330_map_test', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/kyrgyz/media-23257484', // CPS MAP with video clip
              // '/kyrgyz/multimedia/2015/03/150330_map_test', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/kyrgyz/world-40847556'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/marathi/articles/cvjxwvn04yjo'],
          },
          test: {
            paths: ['/marathi/articles/cp47g4myxz7o'],
          },
          local: {
            paths: ['/marathi/articles/cp47g4myxz7o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/marathi/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/marathi'],
          },
          test: {
            paths: ['/marathi'],
          },
          local: {
            paths: ['/marathi'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/marathi/media-51314817', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/marathi/media-23127353', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/marathi/media-23127353'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/marathi/india-42894522'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/mundo/articles/cdwrpl7qwqqo'],
          },
          test: {
            paths: ['/mundo/articles/ce42wzqr2mko'],
          },
          local: {
            paths: ['/mundo/articles/ce42wzqr2mko'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/mundo/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/mundo'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/mundo/deportes-36935058'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/naidheachdan/sgeulachdan/c18q7nedn2ko'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/naidheachdan/sgeulachdan/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: { envs: undefined, smoke: false },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: { envs: undefined, smoke: false },
      photoGalleryPage: { envs: undefined, smoke: false },
      storyPage: { envs: undefined, smoke: false },
    },
  },
  nepali: {
    name: 'nepali',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        envs: {
          live: {
            paths: ['/nepali/articles/c16ljg1v008o'],
          },
          test: {
            paths: ['/nepali/articles/cl90j9m3mn6o'],
          },
          local: {
            paths: ['/nepali/articles/cl90j9m3mn6o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/nepali/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/nepali'],
          },
          test: {
            paths: ['/nepali'],
          },
          local: {
            paths: ['/nepali'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
          },
          test: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
          },
          local: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/nepali/news-51675223', // CPS MAP with video clip
              // '/nepali/multimedia/2013/08/130806_boudhavideo', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/nepali/media-23269034', // CPS MAP with audio clip
              // '/nepali/multimedia/2016/07/160725_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/nepali/media-23269034', // CPS MAP with audio clip
              // '/nepali/multimedia/2016/07/160725_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/nepali/news-50627370'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/news/articles/cj7xrxz0e8zo'],
          },
          test: {
            paths: ['/news/articles/cn7k01xp8kxo'],
          },
          local: {
            paths: ['/news/articles/cn7k01xp8kxo'],
          },
          smoke: true,
        },
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/news/articles/cxvxrj8tvppo'],
          },
          smoke: true,
        },
      },
      frontPage: { envs: undefined, smoke: false },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: { envs: undefined, smoke: false },
      photoGalleryPage: { envs: undefined, smoke: false },
      storyPage: { envs: undefined, smoke: false },
    },
  },
  pashto: {
    name: 'pashto',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        envs: {
          live: {
            paths: ['/pashto/articles/c70970g2251o'],
          },
          test: {
            paths: ['/pashto/articles/cyjmdl92z3ro'],
          },
          local: {
            paths: ['/pashto/articles/cyjmdl92z3ro'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/pashto/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/pashto'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
          },
          test: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
          },
          local: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/pashto/world-51657953', // CPS MAP with video clip
              // '/pashto/multimedia/2016/08/160827_gn_southafrica_female_farmer', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/pashto/media-23257523', // CPS MAP with video clip
              // '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/pashto/media-23257523', // CPS MAP with video clip
              // '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/pashto/arts-and-literature-50230813'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/persian/articles/c7eel0lmr4do'],
          },
          test: {
            paths: ['/persian/articles/cej3lzd5e0go'],
          },
          local: {
            paths: ['/persian/articles/cej3lzd5e0go'],
          },
          smoke: true,
        },
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/persian/articles/cxvxrj8tvppo'],
          },
          smoke: true,
        },
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/persian'],
          },
          smoke: true,
        },
      },
      liveRadio: {
        envs: {
          live: {
            paths: [
              '/persian/bbc_persian_radio/liveradio',
              '/persian/bbc_dari_radio/liveradio',
            ],
          },
          test: {
            paths: [
              '/persian/bbc_persian_radio/liveradio',
              '/persian/bbc_dari_radio/liveradio',
            ],
          },
          local: {
            paths: [
              '/persian/bbc_persian_radio/liveradio',
              '/persian/bbc_dari_radio/liveradio',
            ],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              '/persian/world-51497110', // CPS MAP with video clip
              // '/persian/world/2016/06/160613_om_naked_dining', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              '/persian/iran-23231114', // CPS MAP with audio clip
              // '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/persian/iran-23231114', // CPS MAP with audio clip
              // '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          smoke: true,
        },
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/persian/magazine-49281981'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/pidgin/articles/cgwk9w4zlg8o'],
          },
          test: {
            paths: ['/pidgin/articles/cwl08rd38l6o'],
          },
          local: {
            paths: ['/pidgin/articles/cwl08rd38l6o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/pidgin/articles/cxvxrj8tvppo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/pidgin'],
          },
          test: {
            paths: ['/pidgin'],
          },
          local: {
            paths: ['/pidgin'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: ['/pidgin/tori-50974590'], // CPS MAP with video clip
            test: {
              paths: ['/pidgin/23248703'], // CPS MAP with video clip
              local: {
                paths: ['/pidgin/23248703'], // CPS MAP with video clip
              },
              smoke: true,
            },
          },
        },
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/pidgin/sport-23252855'],
          },
          smoke: true,
        },
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/portuguese/articles/cpg5prg95lmo'],
          },
          test: {
            paths: ['/portuguese/articles/cd61pm8gzmpo'],
          },
          local: {
            paths: ['/portuguese/articles/cd61pm8gzmpo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/portuguese/articles/cxvxrj8tvppo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/portuguese'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/portuguese/geral-40302633'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/punjabi/articles/c39p51156lyo'],
          },
          test: {
            paths: ['/punjabi/articles/c0l79lr39qyo'],
          },
          local: {
            paths: ['/punjabi/articles/c0l79lr39qyo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/punjabi/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/punjabi'],
          },
          test: {
            paths: ['/punjabi'],
          },
          local: {
            paths: ['/punjabi'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/punjabi/india-51325361', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/punjabi/media-23248705', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/punjabi/media-23248705'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/punjabi/india-42928885'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/russian/articles/c6ygxgl53w9o'],
          },
          test: {
            paths: ['/russian/articles/ck7pz7re3zgo'],
          },
          local: {
            paths: ['/russian/articles/ck7pz7re3zgo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/russian/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/russian'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/russian/features-45782775'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/scotland/articles/cm49v4x1r9lo'],
          },
          test: {
            paths: ['/scotland/articles/czwj5l0n210o'],
          },
          local: {
            paths: ['/scotland/articles/czwj5l0n210o'],
          },
          smoke: true,
        },
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/scotland/articles/cabcdefghijo'],
          },
        },
        smoke: false,
      },
      frontPage: { envs: undefined, smoke: false },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: { envs: undefined, smoke: false },
      photoGalleryPage: { envs: undefined, smoke: false },
      storyPage: { envs: undefined, smoke: false },
    },
  },
  serbianCyr: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'cyr',
    pageTypes: {
      articles: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/articles/c805k05kr73o/cyr'],
          },
          smoke: true,
        },
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/articles/cabcdefghijo/cyr'],
          },
          smoke: true,
        },
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/cyr'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [], // Once support for variants is available: '/serbian/cyr/srbija-49427344'
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/articles/c805k05kr73o/lat'],
          },
          smoke: true,
        },
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/articles/cabcdefghijo/lat'],
          },
        },
        smoke: true,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/lat'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/serbian/srbija-46748932/lat'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/sinhala/articles/cldr38jnwd2o'],
          },
          test: {
            paths: ['/sinhala/articles/c45w255zlexo'],
          },
          local: {
            paths: ['/sinhala/articles/c45w255zlexo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/sinhala/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/sinhala'],
          },
          test: {
            paths: ['/sinhala'],
          },
          local: {
            paths: ['/sinhala'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/sinhala/bbc_sinhala_radio/liveradio'],
          },
          test: {
            paths: ['/sinhala/bbc_sinhala_radio/liveradio'],
          },
          local: {
            paths: ['/sinhala/bbc_sinhala_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/sinhala/sri-lanka-51375061', // CPS MAP with video clip
              // '/sinhala/world/2015/09/150919_technology_at_schools', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/sinhala/world-23257567', // CPS MAP with video clip
              // '/sinhala/multimedia/2016/03/160323_si_test_audio_map', // TC2 MAP with audio clip
            ],
          },
          local: {
            paths: [
              '/sinhala/23248970', // CPS MAP with audio clip
              // '/sinhala/multimedia/2016/03/160323_si_test_audio_map', // TC2 MAP with audio clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/sinhala/world-37657374'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/somali/articles/c8z79d4mzrlo'],
          },
          test: {
            paths: ['/somali/articles/cgn6emk3jm8o'],
          },
          local: {
            paths: ['/somali/articles/cgn6emk3jm8o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/somali/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/somali'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
          },
          test: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
          },
          local: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/somali/51642476', // CPS MAP with video clip
              // '/somali/war/2010/09/100929_business', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/somali/hayadeed-23269042', // CPS MAP with video clip
              // '/somali/maqal_iyo_muuqaal/2016/06/160628_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/somali/hayadeed-23269042', // CPS MAP with video clip
              // '/somali/maqal_iyo_muuqaal/2016/06/160628_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/somali/war-45947544'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
    },
  },
  sport: {
    name: 'sport',
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: { envs: undefined, smoke: false },
      errorPage404: { envs: undefined, smoke: false },
      frontPage: { envs: undefined, smoke: false },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: { envs: undefined, smoke: false },
      photoGalleryPage: { envs: undefined, smoke: false },
      storyPage: { envs: undefined, smoke: false },
    },
  },
  swahili: {
    name: 'swahili',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        envs: {
          live: {
            paths: ['/swahili/articles/cw794z3gpd5o'],
          },
          test: {
            paths: ['/swahili/articles/czjqge2jwn2o'],
          },
          local: {
            paths: ['/swahili/articles/czjqge2jwn2o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/swahili/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/swahili'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
          },
          test: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
          },
          local: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/swahili/gnb-51703829', // CPS MAP with video clip
              // '/swahili/medianuai/2016/05/160517_apatae_fatacky', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/swahili/media-23268999', // CPS MAP with audio clip
              // '/swahili/michezo/2016/07/160713_tc2_testmap2', // TC2 MAP with audio clip
            ],
          },
          local: {
            paths: [
              '/swahili/media-23268999', // CPS MAP with audio clip
              // '/swahili/michezo/2016/07/160713_tc2_testmap2', // TC2 MAP with audio clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/swahili/habari-48185450'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/tamil/articles/cvr4752gr13o'],
          },
          test: {
            paths: ['/tamil/articles/cwl08ll3me8o'],
          },
          local: {
            paths: ['/tamil/articles/cwl08ll3me8o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/tamil/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/tamil'],
          },
          test: {
            paths: ['/tamil'],
          },
          local: {
            paths: ['/tamil'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
          },
          test: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
          },
          local: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/tamil/sport-51702939', // CPS MAP with video clip
              // '/tamil/global/2014/07/140713_animalsvideo', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/tamil/india-23268994', // CPS MAP with video clip
              // '/tamil/global/2016/08/160822_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/tamil/india-23268994', // CPS MAP with video clip
              // '/tamil/global/2016/08/160822_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/tamil/global-47758688'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/telugu/articles/c1x76pey3x3o'],
          },
          test: {
            paths: ['/telugu/articles/cq0y4008d4vo'],
          },
          local: {
            paths: ['/telugu/articles/cq0y4008d4vo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/telugu/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/telugu'],
          },
          test: {
            paths: ['/telugu'],
          },
          local: {
            paths: ['/telugu'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/telugu/india-51309092', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/telugu/international-23263261', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/telugu/international-23263261'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/telugu/india-42321552'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/thai/articles/czx7w3zyme1o'],
          },
          test: {
            paths: ['/thai/articles/c442rl3md0eo'],
          },
          local: {
            paths: ['/thai/articles/c442rl3md0eo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/thai/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/thai'],
          },
          test: {
            paths: ['/thai'],
          },
          local: {
            paths: ['/thai'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/thai/international-51285795', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/thai/23122810', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/thai/23122810'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/thai/thailand-49950038'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/tigrinya/articles/c3vq38ve33xo'],
          },
          test: {
            paths: ['/tigrinya/articles/ck62z3rjwdeo'],
          },
          local: {
            paths: ['/tigrinya/articles/ck62z3rjwdeo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/tigrinya/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/tigrinya'],
          },
          test: {
            paths: ['/tigrinya'],
          },
          local: {
            paths: ['/tigrinya'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
          },
          test: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
          },
          local: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/tigrinya/news-51249937', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/tigrinya/news-23263262', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/tigrinya/news-23263262'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/tigrinya/news-49944566'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/turkce/articles/cpgzpzjl3pdo'],
          },
          test: {
            paths: ['/turkce/articles/c8q1ze59n25o'],
          },
          local: {
            paths: ['/turkce/articles/c8q1ze59n25o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/turkce/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/turkce'],
          },
          test: {
            paths: ['/turkce'],
          },
          local: {
            paths: ['/turkce'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/turkce/haberler-dunya-51621819', // CPS MAP with video clip
              // '/turkce/multimedya/2016/02/160216_vid_genclerde_depresyon', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/turkce/media-23268997', // CPS MAP with audio clip
              // '/turkce/multimedya/2016/05/160524_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/turkce/media-23268997', // CPS MAP with video clip
              // '/turkce/multimedya/2016/05/160524_tc2_testmap1', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/turkce/haberler-dunya-50924340'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/articles/c0e8weny66ko/simp'],
          },
          smoke: true,
        },
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/articles/cabcdefghijo/simp'],
          },
        },
        smoke: true,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/simp'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/articles/c0e8weny66ko/trad'],
          },
        },
        smoke: true,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/articles/cabcdefghijo/trad'],
          },
        },
        smoke: true,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/trad'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [], // Enable once variants supported '/ukchina/trad/49375846'
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukchina/trad/cool-britannia-38434549'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/ukrainian/articles/c8zv0eed9gko'],
          },
          test: {
            paths: ['/ukrainian/articles/cp4l2mrejvdo'],
          },
          local: {
            paths: ['/ukrainian/articles/cp4l2mrejvdo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukrainian/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukrainian'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/ukrainian/features-41278900'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/urdu/articles/c4qg7qq63y6o'],
          },
          test: {
            paths: ['/urdu/articles/cwgq7rzv172o'],
          },
          local: {
            paths: ['/urdu/articles/cwgq7rzv172o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/urdu/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/urdu'],
          },
          test: {
            paths: ['/urdu'],
          },
          local: {
            paths: ['/urdu'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
          },
          test: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
          },
          local: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              '/urdu/entertainment-51584098', // CPS MAP with audio clip
              // '/urdu/multimedia/2014/11/141104_hindu_riaz_kq', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              '/urdu/world-23268929', // CPS MAP with video clip
              // '/urdu/sport/2016/09/160902_tc2_testmap2', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/urdu/world-23268929', // CPS MAP with video clip
              // '/urdu/sport/2016/09/160902_tc2_testmap2', // TC2 MAP with video clip
            ],
          },
        },
        smoke: true,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/urdu/pakistan-48242478'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/uzbek/articles/cxj3rjxm6r0o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/uzbek/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/uzbek'],
          },
          test: {
            paths: ['/uzbek'],
          },
          local: {
            paths: ['/uzbek'],
          },
        },
        smoke: false,
      },
      liveRadio: {
        envs: {
          live: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
          },
          test: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
          },
          local: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/uzbek/sport-23248721'], // CPS MAP with video clip
          },
        },
        smoke: true,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/uzbek/central-asia-46716844'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/vietnamese/articles/cpgqngyexq7o'],
          },
          test: {
            paths: ['/vietnamese/articles/c3y59g5zm19o'],
          },
          local: {
            paths: ['/vietnamese/articles/c3y59g5zm19o'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/vietnamese/articles/c123456abcdo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/vietnamese'],
          },
          test: {
            paths: ['/vietnamese'],
          },
          local: {
            paths: ['/vietnamese'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/vietnamese/forum-51506476', // CPS MAP with video clip
              // '/vietnamese/multimedia/2015/04/150428_david_wheat_interview', // TC2 MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/vietnamese/media-23257614', // CPS MAP with video clip
              // '/vietnamese/sport/2016/09/160922_tc2_testmap2', // TC2 MAP with video clip
            ],
          },
          local: {
            paths: [
              '/vietnamese/23222411', // CPS MAP with video clip
              // '/vietnamese/sport/2016/09/160922_tc2_testmap2', // TC2 MAP with video clip
            ],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/vietnamese/world-48605529'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: ['/yoruba/articles/cg7qz71en35o'],
          },
          test: {
            paths: ['/yoruba/articles/clw06m0nj8qo'],
          },
          local: {
            paths: ['/yoruba/articles/clw06m0nj8qo'],
          },
        },
        smoke: false,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/yoruba/articles/cxvxrj8tvppo'],
          },
        },
        smoke: false,
      },
      frontPage: {
        envs: {
          live: {
            paths: ['/yoruba'],
          },
          test: {
            paths: ['/yoruba'],
          },
          local: {
            paths: ['/yoruba'],
          },
        },
        smoke: false,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [
              // '/yoruba/afrika-51116686', // CPS MAP with video clip
            ],
          },
          test: {
            paths: [
              // '/yoruba/media-23256797', // CPS MAP with video clip
            ],
          },
          local: {
            paths: ['/yoruba/media-23256797'], // CPS MAP with video clip
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/yoruba/media-50970014'],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/articles/c3xd4x9prgyo/simp'],
          },
        },
        smoke: true,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/articles/cabcdefghijo/simp'],
          },
        },
        smoke: true,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/simp'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
        smoke: false,
      },
      storyPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [],
          },
        },
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
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/articles/c3xd4x9prgyo/trad'],
          },
        },
        smoke: true,
      },
      errorPage404: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/articles/cabcdefghijo/trad'],
          },
        },
        smoke: true,
      },
      frontPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/trad'],
          },
        },
        smoke: true,
      },
      liveRadio: { envs: undefined, smoke: false },
      mediaAssetPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: [], // Once variant support is available '/zhongwen/trad/chinese-news-49631219'
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        envs: {
          live: {
            paths: [],
          },
          test: {
            paths: [],
          },
          local: {
            paths: ['/zhongwen/trad/chinese-news-49065935'],
          },
          smoke: true,
        },
        storyPage: {
          envs: {
            live: {
              paths: [],
            },
            test: {
              paths: [],
            },
            local: {
              paths: [],
            },
          },
          smoke: false,
        },
      },
    },
  },
};

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');

if (runOnlyService && Object.keys(genServices).includes(runOnlyService)) {
  module.exports = {
    [runOnlyService]: genServices[runOnlyService],
  };
} else {
  module.exports = genServices;
}
