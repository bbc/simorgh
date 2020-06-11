module.exports = () => ({
  afaanoromoo: {
    name: 'afaanoromoo',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/afaanoromoo/articles/ce3nlgrelv1o'],
            enabled: false,
          },
          test: {
            paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/afaanoromoo'],
            enabled: false,
          },
          test: {
            paths: ['/afaanoromoo'],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
            enabled: true,
          },
          local: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/afaanoromoo/oduu-51248626', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/afaanoromoo/23149891', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/23149891'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/afaanoromoo/oduu-50716382'],
            enabled: false,
          },
          test: {
            paths: ['/afaanoromoo/oduu-23141286'],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/oduu-41217768'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/afaanoromoo/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/afaanoromoo/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  afrique: {
    name: 'afrique',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/afrique/articles/cx80n852v6mo'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/articles/cz216x22106o'],
            enabled: true,
          },
          local: {
            paths: ['/afrique/articles/cz216x22106o'],
            enabled: true,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/afrique/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/afrique'],
            enabled: true,
          },
          test: {
            paths: ['/afrique'],
            enabled: true,
          },
          local: {
            paths: ['/afrique'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/w172x601yx5z2n1'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/afrique/media-52121324', // CPS MAP
              '/afrique/institutionelles/2015/07/150714_hissene_habre_explainer', // TC2 MAP
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/afrique/region-23278969', // CPS MAP
              '/afrique/nos_emissions/2016/06/160622_tc2_testmap1', // TC2 MAP
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/afrique/region-23278969', // CPS MAP
              '/afrique/nos_emissions/2016/06/160622_tc2_testmap1', // TC2 MAP video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/afrique/region-50925908'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/sports-23240647'],
            enabled: false,
          },
          local: {
            paths: ['/afrique/region-39269126'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/afrique/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/afrique/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/afrique/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  amharic: {
    name: 'amharic',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/amharic/articles/c0lgxqknqkdo'],
            enabled: false,
          },
          test: {
            paths: ['/amharic/articles/czqverekrldo'],
            enabled: false,
          },
          local: {
            paths: ['/amharic/articles/czqverekrldo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/amharic/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/amharic'],
            enabled: false,
          },
          test: {
            paths: ['/amharic'],
            enabled: false,
          },
          local: {
            paths: ['/amharic'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: true,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/amharic/bbc_amharic_radio/w3csz5r9'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/amharic/news-51270657', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/amharic/news-23263266', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/amharic/news-23263266'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/amharic/42743191'],
            enabled: false,
          },
          test: {
            paths: ['/amharic/23194496'],
            enabled: false,
          },
          local: {
            paths: ['/amharic/42743191'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/amharic/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/amharic/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/amharic/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  arabic: {
    name: 'arabic',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/arabic/articles/c8j91j2ljppo'],
            enabled: false,
          },
          test: {
            paths: ['/arabic/articles/c1er5mjnznzo'],
            enabled: false,
          },
          local: {
            paths: ['/arabic/articles/c1er5mjnznzo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/arabic/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/arabic'],
            enabled: true,
          },
          test: {
            paths: ['/arabic'],
            enabled: true,
          },
          local: {
            paths: ['/arabic'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/arabic/bbc_arabic_radio/w3ct01yb'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [
              '/arabic/world-23278971', // CPS audio
              '/arabic/worldnews/2015/11/151120_t_arabic_av', // TC2 video
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/arabic/world-23278971', // CPS audio
              '/arabic/worldnews/2015/11/151120_t_arabic_av', // TC2 video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/arabic/art-and-culture-38260491'],
            enabled: false,
          },
          test: {
            paths: ['/arabic/magazine-23209227'],
            enabled: false,
          },
          local: {
            paths: ['/arabic/art-and-culture-38260491'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/arabic/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/arabic/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/arabic/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  azeri: {
    name: 'azeri',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/azeri/articles/cv0lm08kngmo'],
            enabled: true,
          },
          test: {
            paths: ['/azeri/articles/c5k08pqnzexo'],
            enabled: false,
          },
          local: {
            paths: ['/azeri/articles/c5k08pqnzexo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/azeri/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/azeri'],
            enabled: false,
          },
          test: {
            paths: ['/azeri'],
            enabled: false,
          },
          local: {
            paths: ['/azeri'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/azeri/international-51331762', // CPS MAP with video clip
              '/azeri/multimedia/2012/09/120919_georgia_prison_video', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/azeri/azerbaijan-23257464', // CPS MAP with video clip
              '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/azeri/azerbaijan-23257464', // CPS MAP with video clip
              '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/azeri/azerbaijan-44208474'],
            enabled: false,
          },
          test: {
            paths: ['/azeri/23160428'],
            enabled: false,
          },
          local: {
            paths: ['/azeri/azerbaijan-44208474'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/azeri/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/azeri/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/azeri/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  bengali: {
    name: 'bengali',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/bengali/articles/cv90149zq1eo'],
            enabled: false,
          },
          test: {
            paths: ['/bengali/articles/c6p3yp5zzmeo'],
            enabled: false,
          },
          local: {
            paths: ['/bengali/articles/c6p3yp5zzmeo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/bengali/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/bengali'],
            enabled: false,
          },
          test: {
            paths: ['/bengali'],
            enabled: false,
          },
          local: {
            paths: ['/bengali'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/bengali/bbc_bangla_radio/w172x0562jxntqx'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/bengali/news-51660521', // CPS MAP with video clip
              '/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/bengali/media-23269006', // CPS MAP with video clip
              '/bengali/multimedia/2016/08/160803_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/bengali/media-23269006', // CPS MAP with video clip
              '/bengali/multimedia/2016/08/160803_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/bengali/news-38827173'],
            enabled: false,
          },
          test: {
            paths: ['/bengali/23215236'],
            enabled: false,
          },
          local: {
            paths: ['/bengali/news-38827173'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/bengali/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/bengali/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/bengali/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  burmese: {
    name: 'burmese',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/burmese/articles/c41px3vd4nxo'],
            enabled: false,
          },
          test: {
            paths: ['/burmese/articles/cn0exdy1jzvo'],
            enabled: false,
          },
          local: {
            paths: ['/burmese/articles/cn0exdy1jzvo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/burmese/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/burmese'],
            enabled: false,
          },
          test: {
            paths: ['/burmese'],
            enabled: false,
          },
          local: {
            paths: ['/burmese'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/burmese/bbc_burmese_radio/w3csz62h'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/burmese/media-48707353', // CPS MAP with video clip
              '/burmese/multimedia/2016/01/160108_korean_cook', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/burmese/media-23269011', // CPS MAP with video clip
              '/burmese/sport/2016/08/160811_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/burmese/media-23269011', // CPS MAP with video clip
              '/burmese/sport/2016/08/160811_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/burmese/media-47680015'],
            enabled: false,
          },
          test: {
            paths: ['/burmese/burma-23129848'],
            enabled: false,
          },
          local: {
            paths: ['/burmese/media-47680015'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/burmese/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/burmese/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/burmese/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  cymrufyw: {
    name: 'cymrufyw',
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/cymrufyw/erthyglau/c06p32z9x2mo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/cymrufyw/erthyglau/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: { environments: undefined, smoke: false },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  gahuza: {
    name: 'gahuza',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/gahuza/articles/cryd02nzn81o'],
            enabled: false,
          },
          test: {
            paths: ['/gahuza/articles/cey23zx8wx8o'],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/articles/cey23zx8wx8o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/gahuza'],
            enabled: false,
          },
          test: {
            paths: ['/gahuza'],
            enabled: false,
          },
          local: {
            paths: ['/gahuza'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/gahuza/amakuru-51710168', // CPS MAP with audio clip
              '/gahuza/video/2015/12/151201_100womenburundi', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/gahuza/amakuru-23257470', // CPS MAP with video clip
              '/gahuza/amakuru/2016/02/160215_map_amakuru_test1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/gahuza/amakuru-23257470', // CPS MAP with video clip
              '/gahuza/amakuru/2016/02/160215_map_amakuru_test1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/gahuza/amakuru-43894701'],
            enabled: false,
          },
          test: {
            paths: ['/gahuza/23111981'],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/amakuru-43894701'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/gahuza/amakuru-52821373'],
            enabled: true,
          },
          test: {
            paths: ['/gahuza/23307435'],
            enabled: true,
          },
          local: {
            paths: ['/gahuza/23307435'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/gahuza/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/gahuza/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  gujarati: {
    name: 'gujarati',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/gujarati/articles/c2rnxj48elwo'],
            enabled: false,
          },
          test: {
            paths: ['/gujarati/articles/cr5el5kw591o'],
            enabled: false,
          },
          local: {
            paths: ['/gujarati/articles/cr5el5kw591o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/gujarati/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/gujarati'],
            enabled: false,
          },
          test: {
            paths: ['/gujarati'],
            enabled: false,
          },
          local: {
            paths: ['/gujarati'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/gujarati/media-51389006', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/gujarati/other-news-23130286', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/gujarati/other-news-23130286'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/gujarati/international-41345658'],
            enabled: false,
          },
          test: {
            paths: ['/gujarati/23148511'],
            enabled: false,
          },
          local: {
            paths: ['/gujarati/international-41345658'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/gujarati/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/gujarati/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/gujarati/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  hausa: {
    name: 'hausa',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/hausa/articles/c41rj1z261zo'],
            enabled: false,
          },
          test: {
            paths: ['/hausa/articles/c2nr6xqmnewo'],
            enabled: false,
          },
          local: {
            paths: ['/hausa/articles/c2nr6xqmnewo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/hausa/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/hausa'],
            enabled: false,
          },
          test: {
            paths: ['/hausa'],
            enabled: false,
          },
          local: {
            paths: ['/hausa'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/hausa/bbc_hausa_radio/w3cszrwm'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/hausa/labarai-51622389', // CPS MAP with video clip
              '/hausa/multimedia/2012/07/120712_click', // TC2 MAP with video clip
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/hausa/23269030', // CPS MAP with video clip
              '/hausa/multimedia/2016/07/160714_tc2_audiomap', // TC2 MAP with audio clip
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hausa/23269030', // CPS MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/hausa/labarai-39326441'],
            enabled: false,
          },
          test: {
            paths: ['/hausa/23132403'],
            enabled: false,
          },
          local: {
            paths: ['/hausa/labarai-39326441'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/hausa/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/hausa/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/hausa/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  hindi: {
    name: 'hindi',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/hindi/articles/cd80y3ezl8go'],
            enabled: false,
          },
          test: {
            paths: ['/hindi/articles/c0469479x9xo'],
            enabled: false,
          },
          local: {
            paths: ['/hindi/articles/c0469479x9xo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/hindi/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/hindi'],
            enabled: false,
          },
          test: {
            paths: ['/hindi'],
            enabled: false,
          },
          local: {
            paths: ['/hindi'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/hindi/bbc_hindi_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/hindi/bbc_hindi_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/hindi/bbc_hindi_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [
              '/hindi/23201477', // CPS video
              '/hindi/sport/2016/08/160822_tc2_testmap1', // TC2 video
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/hindi/23201477', // CPS video
              '/hindi/sport/2016/08/160822_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/hindi/india-50198153'],
            enabled: false,
          },
          test: {
            paths: ['/hindi/international-23095177'],
            enabled: false,
          },
          local: {
            paths: ['/hindi/india-50198153'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/hindi/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/hindi/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/hindi/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  igbo: {
    name: 'igbo',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/igbo/articles/ckjn8jnrn75o'],
            enabled: false,
          },
          test: {
            paths: ['/igbo/articles/cr1lw620ygjo'],
            enabled: false,
          },
          local: {
            paths: ['/igbo/articles/cr1lw620ygjo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/igbo/articles/cxvxrj8tvppo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/igbo'],
            enabled: false,
          },
          test: {
            paths: ['/igbo'],
            enabled: false,
          },
          local: {
            paths: ['/igbo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/igbo/media-42986440', // CPS MAP with audio clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/igbo/media-23256786', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/igbo/media-23256786'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/igbo/afirika-49666505'],
            enabled: false,
          },
          test: {
            paths: ['/igbo/egwuregwu-23252841'],
            enabled: false,
          },
          local: {
            paths: ['/igbo/afirika-49666505'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/igbo/afirika-52816709'],
            enabled: true,
          },
          test: {
            paths: ['/igbo/afirika-23252735'],
            enabled: true,
          },
          local: {
            paths: ['/igbo/afirika-23252735'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/igbo/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/igbo/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/igbo/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  indonesia: {
    name: 'indonesia',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/indonesia/articles/cvd36dly8zdo'],
            enabled: false,
          },
          test: {
            paths: ['/indonesia/articles/c0q2zq8pzvzo'],
            enabled: false,
          },
          local: {
            paths: ['/indonesia/articles/c0q2zq8pzvzo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/indonesia/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/indonesia'],
            enabled: false,
          },
          test: {
            paths: ['/indonesia'],
            enabled: false,
          },
          local: {
            paths: ['/indonesia'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [
              '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // Brand
              '/indonesia/bbc_indonesian_radio/w172xh281s8mkhr', // Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // Brand
              '/indonesia/bbc_indonesian_radio/w172xh281s8mkhr', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/indonesia/bbc_indonesian_radio/w172xh267fpn19l'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/indonesia/media-51703269', // CPS MAP with video clip
              '/indonesia/bahasa_inggris/2016/08/160817_video_inggris', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/indonesia/media-23269037', // CPS MAP with video clip
              '/indonesia/olahraga/2016/10/161003_tc2_videomap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/indonesia/media-23269037', // CPS MAP with video clip
              '/indonesia/olahraga/2016/10/161003_tc2_videomap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/indonesia/indonesia-41635759'],
            enabled: false,
          },
          test: {
            paths: ['/indonesia/majalah-23145828'],
            enabled: false,
          },
          local: {
            paths: ['/indonesia/indonesia-41635759'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/indonesia/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/indonesia/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/indonesia/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  japanese: {
    name: 'japanese',
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/japanese/articles/cj4m7n5nrd8o'],
            enabled: true,
          },
          test: {
            paths: ['/japanese/articles/cdd6p3r9g7jo'],
            enabled: true,
          },
          local: {
            paths: ['/japanese/articles/cdd6p3r9g7jo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/japanese/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/japanese'],
            enabled: false,
          },
          test: {
            paths: ['/japanese'],
            enabled: false,
          },
          local: {
            paths: ['/japanese'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/japanese/video-52178074', // CPS MAP
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/japanese/video-23248670', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/japanese/video-23248670'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/japanese/features-and-analysis-42786589'],
            enabled: false,
          },
          test: {
            paths: ['/japanese/world-23252856'],
            enabled: false,
          },
          local: {
            paths: ['/japanese/features-and-analysis-42786589'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/japanese/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/japanese/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/japanese/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  korean: {
    name: 'korean',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/korean/articles/crym1243d97o'],
            enabled: false,
          },
          test: {
            paths: ['/korean/articles/c3mn1lvz65xo'],
            enabled: false,
          },
          local: {
            paths: ['/korean/articles/c3mn1lvz65xo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/korean/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/korean'],
            enabled: false,
          },
          test: {
            paths: ['/korean'],
            enabled: false,
          },
          local: {
            paths: ['/korean'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
            enabled: true,
          },
          local: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/korean/bbc_korean_radio/w3ct0kn5'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/korean/international-51367672', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/korean/media-23248686', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/korean/media-23248686'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/korean/features-41397333'],
            enabled: false,
          },
          test: {
            paths: ['/korean/features-23163390'],
            enabled: false,
          },
          local: {
            paths: ['/korean/features-41397333'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/korean/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/korean/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/korean/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  kyrgyz: {
    name: 'kyrgyz',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/kyrgyz/articles/c414v42gy75o'],
            enabled: true,
          },
          test: {
            paths: ['/kyrgyz/articles/c3xd4xg3rm9o'],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/articles/c3xd4xg3rm9o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/kyrgyz'],
            enabled: false,
          },
          test: {
            paths: ['/kyrgyz'],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/w3cszwmc'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/kyrgyz/magazine-51509456', // CPS MAP with video clip
              '/kyrgyz/multimedia/2014/09/140903_iv_auturgan', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/kyrgyz/media-23257484', // CPS MAP with video clip
              '/kyrgyz/multimedia/2015/03/150330_map_test', // TC2 MAP with audio clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/kyrgyz/media-23257484', // CPS MAP with video clip
              // '/kyrgyz/multimedia/2015/03/150330_map_test', // TC2 MAP with audio clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/kyrgyz/world-40847556'],
            enabled: false,
          },
          test: {
            paths: ['/kyrgyz/23103385'],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/world-40847556'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/kyrgyz/kyrgyzstan-52891593'],
            enabled: true,
          },
          test: {
            paths: ['/kyrgyz/23292889'],
            enabled: true,
          },
          local: {
            paths: ['/kyrgyz/23292889'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/kyrgyz/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/kyrgyz/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  marathi: {
    name: 'marathi',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/marathi/articles/cvjxwvn04yjo'],
            enabled: false,
          },
          test: {
            paths: ['/marathi/articles/cp47g4myxz7o'],
            enabled: false,
          },
          local: {
            paths: ['/marathi/articles/cp47g4myxz7o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/marathi/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/marathi'],
            enabled: false,
          },
          test: {
            paths: ['/marathi'],
            enabled: false,
          },
          local: {
            paths: ['/marathi'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/marathi/media-51314817', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/marathi/media-23127353', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/marathi/media-23127353'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/marathi/india-42894522'],
            enabled: false,
          },
          test: {
            paths: ['/marathi/23247226'],
            enabled: false,
          },
          local: {
            paths: ['/marathi/india-42894522'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/marathi/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/marathi/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/marathi/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  mundo: {
    name: 'mundo',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/mundo/articles/cdwrpl7qwqqo'],
            enabled: false,
          },
          test: {
            paths: ['/mundo/articles/ce42wzqr2mko'],
            enabled: false,
          },
          local: {
            paths: ['/mundo/articles/ce42wzqr2mko'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/mundo/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/mundo'],
            enabled: false,
          },
          test: {
            paths: ['/mundo'],
            enabled: false,
          },
          local: {
            paths: ['/mundo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/mundo/media-52123665', // CPS MAP
              '/mundo/noticias/2011/05/110518_video_deforestacion_amazonia_brasil_lav', // TC2 MAP
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/mundo/media-23283126', // CPS MAP
              '/mundo/noticias/2016/04/160427_tc2_testmap1', // TC2 MAP
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/mundo/media-23283126', // CPS MAP
              '/mundo/noticias/2016/04/160427_tc2_testmap1', // TC2 MAP video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/mundo/deportes-36935058'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/noticias-23147451'],
            enabled: true,
          },
          local: {
            paths: ['/mundo/deportes-36935058'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/mundo/23263889'],
            enabled: false,
          },
        },
        smoke: true,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/mundo/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/mundo/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  naidheachdan: {
    name: 'naidheachdan',
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/naidheachdan/sgeulachdan/c18q7nedn2ko'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/naidheachdan/sgeulachdan/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: { environments: undefined, smoke: false },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  nepali: {
    name: 'nepali',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/nepali/articles/c16ljg1v008o'],
            enabled: true,
          },
          test: {
            paths: ['/nepali/articles/cl90j9m3mn6o'],
            enabled: true,
          },
          local: {
            paths: ['/nepali/articles/cl90j9m3mn6o'],
            enabled: true,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/nepali/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/nepali'],
            enabled: false,
          },
          test: {
            paths: ['/nepali'],
            enabled: false,
          },
          local: {
            paths: ['/nepali'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/nepali/bbc_nepali_radio/w172x83pnptp1s8'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/nepali/news-51675223', // CPS MAP with video clip
              '/nepali/multimedia/2013/08/130806_boudhavideo', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/nepali/media-23269034', // CPS MAP with audio clip
              '/nepali/multimedia/2016/07/160725_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/nepali/media-23269034', // CPS MAP with audio clip
              '/nepali/multimedia/2016/07/160725_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/nepali/news-50627370'],
            enabled: false,
          },
          test: {
            paths: ['/nepali/news-23093383'],
            enabled: false,
          },
          local: {
            paths: ['/nepali/news-50627370'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/nepali/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/nepali/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/nepali/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  news: {
    name: 'news',
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/news/articles/cj7xrxz0e8zo'],
            enabled: true,
          },
          test: {
            paths: ['/news/articles/cn7k01xp8kxo'],
            enabled: true,
          },
          local: {
            paths: ['/news/articles/cn7k01xp8kxo'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/news/articles/cxvxrj8tvppo'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: { environments: undefined, smoke: false },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  pashto: {
    name: 'pashto',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/pashto/articles/c70970g2251o'],
            enabled: false,
          },
          test: {
            paths: ['/pashto/articles/cyjmdl92z3ro'],
            enabled: false,
          },
          local: {
            paths: ['/pashto/articles/cyjmdl92z3ro'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/pashto/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/pashto'],
            enabled: false,
          },
          test: {
            paths: ['/pashto'],
            enabled: false,
          },
          local: {
            paths: ['/pashto'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [
              '/pashto/bbc_pashto_radio/programmes/p0340yr4', // Brand
              '/pashto/bbc_pashto_radio/w172xjcknn5x31c', // Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/pashto/bbc_pashto_radio/programmes/p0340yr4', // Brand
              '/pashto/bbc_pashto_radio/w172xjck9cw6lvc', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/pashto/bbc_pashto_radio/w3ct0lz1'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/pashto/arts-and-literature-46787030', // CPS MAP with audio clip
              '/pashto/multimedia/2016/08/160827_gn_southafrica_female_farmer', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/pashto/media-23257523', // CPS MAP with video clip
              '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/pashto/media-23257523', // CPS MAP with video clip
              '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/pashto/arts-and-literature-50230813'],
            enabled: false,
          },
          test: {
            paths: ['/pashto/23092924'],
            enabled: false,
          },
          local: {
            paths: ['/pashto/arts-and-literature-50230813'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/pashto/world-52873295'],
            enabled: true,
          },
          test: {
            paths: ['/pashto/23289748'],
            enabled: true,
          },
          local: {
            paths: ['/pashto/23289748'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/pashto/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/pashto/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/pashto/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  persian: {
    name: 'persian',
    font: 'Nassim',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/persian/articles/c7eel0lmr4do'],
            enabled: true,
          },
          test: {
            paths: ['/persian/articles/cej3lzd5e0go'],
            enabled: true,
          },
          local: {
            paths: ['/persian/articles/cej3lzd5e0go'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/persian/articles/cxvxrj8tvppo'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/persian'],
            enabled: false,
          },
          test: {
            paths: ['/persian'],
            enabled: false,
          },
          local: {
            paths: ['/persian'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: {
        environments: {
          live: {
            paths: [
              '/persian/bbc_persian_radio/liveradio',
              '/persian/bbc_dari_radio/liveradio',
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/persian/bbc_persian_radio/liveradio',
              '/persian/bbc_dari_radio/liveradio',
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/persian/bbc_persian_radio/liveradio',
              '/persian/bbc_dari_radio/liveradio',
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [
              '/persian/bbc_persian_radio/w172x32355t5635',
              '/persian/bbc_dari_radio/w3csz7mf',
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/persian/media-49522521', // CPS MAP with live stream
              '/persian/world-51497110', // CPS MAP with video clip
              '/persian/tv-and-radio-51780528', // CPS MAP with audio clip
              '/persian/world/2016/06/160613_om_naked_dining', // TC2 MAP with video clip
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/persian/iran-23231114', // CPS MAP with audio clip
              '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/persian/iran-23231114', // CPS MAP with audio clip
              '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/persian/magazine-49281981'],
            enabled: true,
          },
          test: {
            paths: ['/persian/23104784'],
            enabled: true,
          },
          local: {
            paths: ['/persian/magazine-49281981'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/persian/arts-52166891'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/persian/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/persian/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/persian/popular/read'],
            enabled: true,
          },
        },
        smoke: true,
      },
      idxPage: {
        environments: {
          live: {
            paths: ['/persian/afghanistan'],
            enabled: false,
          },
          test: {
            paths: ['/persian/afghanistan'],
            enabled: true,
          },
          local: {
            paths: ['/persian/afghanistan'],
            enabled: true,
          },
        },
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
        environments: {
          live: {
            paths: ['/pidgin/articles/cgwk9w4zlg8o'],
            enabled: true,
          },
          test: {
            paths: ['/pidgin/articles/cwl08rd38l6o'],
            enabled: true,
          },
          local: {
            paths: ['/pidgin/articles/cwl08rd38l6o'],
            enabled: true,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/pidgin/articles/cxvxrj8tvppo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/pidgin'],
            enabled: false,
          },
          test: {
            paths: ['/pidgin'],
            enabled: false,
          },
          local: {
            paths: ['/pidgin'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: ['/pidgin/tori-50974590'], // CPS MAP with video clip
            enabled: false,
          },
          test: {
            paths: ['/pidgin/23248703'], // CPS MAP with video clip
            enabled: false,
          },
          local: {
            paths: ['/pidgin/23248703'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/pidgin/50913502'],
            enabled: true,
          },
          test: {
            paths: ['/pidgin/sport-23252855'],
            enabled: true,
          },
          local: {
            paths: ['/pidgin/sport-23252855'],
            enabled: true,
          },
        },
        smoke: true,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/pidgin/tori-51745682'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/pidgin/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/pidgin/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/pidgin/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  portuguese: {
    name: 'portuguese',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/portuguese/articles/cpg5prg95lmo'],
            enabled: false,
          },
          test: {
            paths: ['/portuguese/articles/cd61pm8gzmpo'],
            enabled: false,
          },
          local: {
            paths: ['/portuguese/articles/cd61pm8gzmpo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/portuguese/articles/cxvxrj8tvppo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/portuguese'],
            enabled: false,
          },
          test: {
            paths: ['/portuguese'],
            enabled: false,
          },
          local: {
            paths: ['/portuguese'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/portuguese/internacional-51918335', // CPS MAP
              '/portuguese/noticias/2012/07/120711_video_estomago_camera_cc', // TC2 MAP
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/portuguese/media-23282671', // CPS MAP
              '/portuguese/revista/2016/05/160506_tc2_map_0605', // TC2 MAP
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/portuguese/media-23282671', // CPS MAP
              '/portuguese/revista/2016/05/160506_tc2_map_0605', // TC2 MAP video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/portuguese/geral-40302633'],
            enabled: false,
          },
          test: {
            paths: ['/portuguese/revista-23038840'],
            enabled: false,
          },
          local: {
            paths: ['/portuguese/geral-40302633'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/portuguese/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/portuguese/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/portuguese/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  punjabi: {
    name: 'punjabi',
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/punjabi/articles/c39p51156lyo'],
            enabled: false,
          },
          test: {
            paths: ['/punjabi/articles/c0l79lr39qyo'],
            enabled: false,
          },
          local: {
            paths: ['/punjabi/articles/c0l79lr39qyo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/punjabi/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/punjabi'],
            enabled: false,
          },
          test: {
            paths: ['/punjabi'],
            enabled: false,
          },
          local: {
            paths: ['/punjabi'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/punjabi/india-51325361', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/punjabi/media-23248705', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/punjabi/media-23248705'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/punjabi/india-42928885'],
            enabled: false,
          },
          test: {
            paths: ['/punjabi/23185977'],
            enabled: false,
          },
          local: {
            paths: ['/punjabi/india-42928885'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/punjabi/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/punjabi/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/punjabi/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  russian: {
    name: 'russian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/russian/articles/c6ygxgl53w9o'],
            enabled: false,
          },
          test: {
            paths: ['/russian/articles/ck7pz7re3zgo'],
            enabled: false,
          },
          local: {
            paths: ['/russian/articles/ck7pz7re3zgo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/russian/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/russian'],
            enabled: false,
          },
          test: {
            paths: ['/russian'],
            enabled: false,
          },
          local: {
            paths: ['/russian'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/russian/features-45782775'],
            enabled: false,
          },
          test: {
            paths: ['/russian/23181067'],
            enabled: false,
          },
          local: {
            paths: ['/russian/features-45782775'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/russian/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/russian/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/russian/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  scotland: {
    name: 'scotland',
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/scotland/articles/cm49v4x1r9lo'],
            enabled: true,
          },
          test: {
            paths: ['/scotland/articles/czwj5l0n210o'],
            enabled: true,
          },
          local: {
            paths: ['/scotland/articles/czwj5l0n210o'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/scotland/articles/cabcdefghijo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: { environments: undefined, smoke: false },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  serbianCyr: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'cyr',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/23279016'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/articles/c805k05kr73o/cyr'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/serbian/articles/cabcdefghijo/cyr'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/cyr'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/23279016'], // CPS video
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr/23279016'], // CPS video
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/srbija-46748932'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/23229409'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/cyr/srbija-46748932'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/cyr/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  serbianLat: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'lat',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/serbian/articles/c805k05kr73o/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/serbian/articles/cabcdefghijo/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/serbian/lat'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/23279016'], // CPS video
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat/23279016'], // CPS video
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/srbija-46748932'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/23229409'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/lat/srbija-46748932'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  sinhala: {
    name: 'sinhala',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/sinhala/articles/cldr38jnwd2o'],
            enabled: false,
          },
          test: {
            paths: ['/sinhala/articles/c45w255zlexo'],
            enabled: false,
          },
          local: {
            paths: ['/sinhala/articles/c45w255zlexo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/sinhala/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/sinhala'],
            enabled: false,
          },
          test: {
            paths: ['/sinhala'],
            enabled: false,
          },
          local: {
            paths: ['/sinhala'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/sinhala/bbc_sinhala_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/sinhala/bbc_sinhala_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/sinhala/bbc_sinhala_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/sinhala/bbc_sinhala_radio/w172x8zn8th1lwb'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/sinhala/sri-lanka-51375061', // CPS MAP with video clip
              '/sinhala/world/2015/09/150919_technology_at_schools', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/sinhala/world-23257567', // CPS MAP with video clip
              '/sinhala/multimedia/2016/03/160323_si_test_audio_map', // TC2 MAP with audio clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/sinhala/23248970', // CPS MAP with audio clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/sinhala/world-37657374'],
            enabled: false,
          },
          test: {
            paths: ['/sinhala/sport-23033481'],
            enabled: false,
          },
          local: {
            paths: ['/sinhala/world-37657374'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/sinhala/world-51723376'],
            enabled: true,
          },
          test: {
            paths: ['/sinhala/23225618'],
            enabled: true,
          },
          local: {
            paths: ['/sinhala/23225618'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/sinhala/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/sinhala/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/sinhala/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  somali: {
    name: 'somali',
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/somali/articles/c8z79d4mzrlo'],
            enabled: false,
          },
          test: {
            paths: ['/somali/articles/cgn6emk3jm8o'],
            enabled: false,
          },
          local: {
            paths: ['/somali/articles/cgn6emk3jm8o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/somali/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/somali'],
            enabled: false,
          },
          test: {
            paths: ['/somali'],
            enabled: false,
          },
          local: {
            paths: ['/somali'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/somali/bbc_somali_radio/w172x90wfxd2qh4'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/somali/51642476', // CPS MAP with video clip
              '/somali/war/2010/09/100929_business', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/somali/hayadeed-23269042', // CPS MAP with video clip
              '/somali/maqal_iyo_muuqaal/2016/06/160628_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/somali/hayadeed-23269042', // CPS MAP with video clip
              '/somali/maqal_iyo_muuqaal/2016/06/160628_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/somali/war-45947544'],
            enabled: false,
          },
          test: {
            paths: ['/somali/23064216'],
            enabled: false,
          },
          local: {
            paths: ['/somali/war-45947544'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/somali/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/somali/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/somali/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  sport: {
    name: 'sport',
    font: undefined,
    variant: 'default',
    pageTypes: {
      articles: { environments: undefined, smoke: false },
      errorPage404: { environments: undefined, smoke: false },
      frontPage: { environments: undefined, smoke: false },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  swahili: {
    name: 'swahili',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/swahili/articles/cw794z3gpd5o'],
            enabled: false,
          },
          test: {
            paths: ['/swahili/articles/czjqge2jwn2o'],
            enabled: false,
          },
          local: {
            paths: ['/swahili/articles/czjqge2jwn2o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/swahili/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/swahili'],
            enabled: false,
          },
          test: {
            paths: ['/swahili'],
            enabled: false,
          },
          local: {
            paths: ['/swahili'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/swahili/bbc_swahili_radio/w172x94ky63591m'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/swahili/gnb-51703829', // CPS MAP with video clip
              '/swahili/medianuai/2016/05/160517_apatae_fatacky', // TC2 MAP with video clip
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/swahili/media-23268999', // CPS MAP with live stream
              '/swahili/michezo/2016/07/160713_tc2_testmap2', // TC2 MAP with audio clip
            ],
            enabled: true,
          },
          local: {
            paths: [
              // '/swahili/media-23268999', // CPS MAP with live stream
              '/swahili/michezo/2016/07/160712_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/swahili/habari-48185450'],
            enabled: false,
          },
          test: {
            paths: ['/swahili/23124175'],
            enabled: false,
          },
          local: {
            paths: ['/swahili/habari-48185450'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/swahili/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/swahili/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/swahili/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  tamil: {
    name: 'tamil',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/tamil/articles/cvr4752gr13o'],
            enabled: false,
          },
          test: {
            paths: ['/tamil/articles/cwl08ll3me8o'],
            enabled: false,
          },
          local: {
            paths: ['/tamil/articles/cwl08ll3me8o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/tamil/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/tamil'],
            enabled: false,
          },
          test: {
            paths: ['/tamil'],
            enabled: false,
          },
          local: {
            paths: ['/tamil'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/tamil/bbc_tamil_radio/w172x966tn9jwmh'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/tamil/sport-51702939', // CPS MAP with video clip
              '/tamil/global/2014/07/140713_animalsvideo', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/tamil/india-23268994', // CPS MAP with video clip
              '/tamil/global/2016/08/160822_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/tamil/india-23268994', // CPS MAP with video clip
              '/tamil/global/2016/08/160822_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/tamil/global-47758688'],
            enabled: false,
          },
          test: {
            paths: ['/tamil/india-23099589'],
            enabled: false,
          },
          local: {
            paths: ['/tamil/global-47758688'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/tamil/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/tamil/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/tamil/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  telugu: {
    name: 'telugu',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/telugu/articles/c1x76pey3x3o'],
            enabled: false,
          },
          test: {
            paths: ['/telugu/articles/cq0y4008d4vo'],
            enabled: false,
          },
          local: {
            paths: ['/telugu/articles/cq0y4008d4vo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/telugu/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/telugu'],
            enabled: false,
          },
          test: {
            paths: ['/telugu'],
            enabled: false,
          },
          local: {
            paths: ['/telugu'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/telugu/india-51309092', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/telugu/international-23263261', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/telugu/international-23263261'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/telugu/india-42321552'],
            enabled: false,
          },
          test: {
            paths: ['/telugu/other-news-23128500'],
            enabled: false,
          },
          local: {
            paths: ['/telugu/india-42321552'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/telugu/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/telugu/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/telugu/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  thai: {
    name: 'thai',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/thai/articles/czx7w3zyme1o'],
            enabled: false,
          },
          test: {
            paths: ['/thai/articles/c442rl3md0eo'],
            enabled: false,
          },
          local: {
            paths: ['/thai/articles/c442rl3md0eo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/thai/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/thai'],
            enabled: false,
          },
          test: {
            paths: ['/thai'],
            enabled: false,
          },
          local: {
            paths: ['/thai'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/thai/international-51285795', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/thai/23122810', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/thai/23122810'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/thai/thailand-49950038'],
            enabled: false,
          },
          test: {
            paths: ['/thai/international-23252840'],
            enabled: false,
          },
          local: {
            paths: ['/thai/thailand-49950038'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/thai/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/thai/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/thai/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  tigrinya: {
    name: 'tigrinya',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/tigrinya/articles/c3vq38ve33xo'],
            enabled: false,
          },
          test: {
            paths: ['/tigrinya/articles/ck62z3rjwdeo'],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/articles/ck62z3rjwdeo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/tigrinya'],
            enabled: true,
          },
          test: {
            paths: ['/tigrinya'],
            enabled: true,
          },
          local: {
            paths: ['/tigrinya'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/bbc_tigrinya_radio/w3cszzz1'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/tigrinya/news-51249937', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/tigrinya/news-23263262', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/news-23263262'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/tigrinya/news-49944566'],
            enabled: false,
          },
          test: {
            paths: ['/tigrinya/news-23143804'],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/news-49944566'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/tigrinya/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/tigrinya/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  turkce: {
    name: 'turkce',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/turkce/articles/cpgzpzjl3pdo'],
            enabled: false,
          },
          test: {
            paths: ['/turkce/articles/c8q1ze59n25o'],
            enabled: false,
          },
          local: {
            paths: ['/turkce/articles/c8q1ze59n25o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/turkce/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/turkce'],
            enabled: false,
          },
          test: {
            paths: ['/turkce'],
            enabled: false,
          },
          local: {
            paths: ['/turkce'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/turkce/haberler-dunya-51621819', // CPS MAP with video clip
              '/turkce/multimedya/2016/02/160216_vid_genclerde_depresyon', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/turkce/media-23268997', // CPS MAP with audio clip
              '/turkce/multimedya/2016/05/160524_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/turkce/media-23268997', // CPS MAP with video clip
              '/turkce/multimedya/2016/05/160524_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/turkce/haberler-dunya-50924340'],
            enabled: false,
          },
          test: {
            paths: ['/turkce/23059103'],
            enabled: false,
          },
          local: {
            paths: ['/turkce/haberler-dunya-50924340'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/turkce/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/turkce/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/turkce/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  ukchinaSimp: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'simp',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/articles/c0e8weny66ko/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/articles/cabcdefghijo/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [
              '/ukchina/simp/23279012', // CPS video
              '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/ukchina/simp/23279012', // CPS video
              '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/cool-britannia-38434549'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/23099907'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/cool-britannia-38434549'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/52836902'],
            enabled: true,
          },
          test: {
            paths: ['/ukchina/simp/23307454'],
            enabled: true,
          },
          local: {
            paths: ['/ukchina/simp/23307454'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  ukchinaTrad: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/articles/c0e8weny66ko/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/articles/cabcdefghijo/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [
              '/ukchina/trad/23279012', // CPS video
              '/ukchina/trad/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/ukchina/trad/23279012', // CPS video
              '/ukchina/trad/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/cool-britannia-38434549'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/23099907'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/cool-britannia-38434549'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/52836902'],
            enabled: true,
          },
          test: {
            paths: ['/ukchina/trad/23307454'],
            enabled: true,
          },
          local: {
            paths: ['/ukchina/trad/23307454'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  ukrainian: {
    name: 'ukrainian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/ukrainian/articles/c8zv0eed9gko'],
            enabled: true,
          },
          test: {
            paths: ['/ukrainian/articles/cp4l2mrejvdo'],
            enabled: true,
          },
          local: {
            paths: ['/ukrainian/articles/cp4l2mrejvdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/ukrainian'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/ukrainian/media-51975068', // Ukrainian CPS MAP
              '/ukrainian/news-russian-38395917', // Russian CPS MAP
              '/ukrainian/multimedia/2014/05/140508_biggest_dinosaur_found_ag', // Ukrainian TC2
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/ukrainian/world-23087423', // Russian CPS
              '/ukrainian/other-news-23279018', // Ukrainian CPS
              '/ukrainian/entertainment/2016/10/161025_tc2_testmap1', // TC2 Ukrainian (no Russian TC2 MAP)
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/ukrainian/world-23087423', // Russian CPS
              '/ukrainian/other-news-23279018', // Ukrainian CPS
              '/ukrainian/entertainment/2016/10/161025_tc2_testmap1', // TC2 Ukrainian video (no Russian TC2 MAP)
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/ukrainian/features-41278900'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/23111903'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/features-41278900'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/ukrainian/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: {
        environments: {
          live: {
            paths: ['/ukrainian/ukraine_in_russian'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/ukraine_in_russian'],
            enabled: true,
          },
          local: {
            paths: ['/ukrainian/ukraine_in_russian'],
            enabled: true,
          },
        },
        smoke: true,
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
        environments: {
          live: {
            paths: ['/urdu/articles/c4qg7qq63y6o'],
            enabled: false,
          },
          test: {
            paths: ['/urdu/articles/cwgq7rzv172o'],
            enabled: false,
          },
          local: {
            paths: ['/urdu/articles/cwgq7rzv172o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/urdu/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/urdu'],
            enabled: false,
          },
          test: {
            paths: ['/urdu'],
            enabled: false,
          },
          local: {
            paths: ['/urdu'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/urdu/bbc_urdu_radio/w172x9dx052c8sr'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/urdu/entertainment-51584098', // CPS MAP with audio clip
              '/urdu/multimedia/2014/11/141104_hindu_riaz_kq', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/urdu/world-23268929', // CPS MAP with video clip
              '/urdu/sport/2016/09/160902_tc2_testmap2', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/urdu/world-23268929', // CPS MAP with video clip
              '/urdu/sport/2016/09/160902_tc2_testmap2', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/urdu/pakistan-48242478'],
            enabled: false,
          },
          test: {
            paths: ['/urdu/23214883'],
            enabled: false,
          },
          local: {
            paths: ['/urdu/pakistan-48242478'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/urdu/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/urdu/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/urdu/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  uzbek: {
    name: 'uzbek',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/articles/cxj3rjxm6r0o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/uzbek'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandRadio: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/bbc_uzbek_radio/w172x9f9qjcq3lm'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/uzbek/media-50461363', // Cyrillic CPS MAP
              '/uzbek/lotin-44512908', // Latin CPS MAP
              '/uzbek/lotin/2016/02/160212_latin_gravity_video', // Latin TC2 MAP
              '/uzbek/institutional/2016/03/160313_audio_zokirjon_mashrabov', // Cyrillic TC2 MAP Audio clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/uzbek/world-23053613', // CPS MAP Cyrillic
              '/uzbek/23279019', // CPS MAP Latin
              '/uzbek/multimedia/2016/06/160610_tc2_testmap1', // TC2 MAP Cyrillic
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/uzbek/world-23053613', // CPS MAP Cyrillic
              '/uzbek/23279019', // CPS MAP Latin
              '/uzbek/multimedia/2016/06/160610_tc2_testmap1', // TC2 MAP Cyrillic
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/uzbek/central-asia-46716844'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/sport-23098743'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/central-asia-46716844'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/uzbek/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  vietnamese: {
    name: 'vietnamese',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/vietnamese/articles/cpgqngyexq7o'],
            enabled: false,
          },
          test: {
            paths: ['/vietnamese/articles/c3y59g5zm19o'],
            enabled: false,
          },
          local: {
            paths: ['/vietnamese/articles/c3y59g5zm19o'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/vietnamese/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/vietnamese'],
            enabled: false,
          },
          test: {
            paths: ['/vietnamese'],
            enabled: false,
          },
          local: {
            paths: ['/vietnamese'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/vietnamese/forum-51506476', // CPS MAP with video clip
              '/vietnamese/multimedia/2015/04/150428_david_wheat_interview', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/vietnamese/media-23257614', // CPS MAP with video clip
              '/vietnamese/sport/2016/09/160922_tc2_testmap2', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/vietnamese/23222411', // CPS MAP with video clip
              '/vietnamese/sport/2016/09/160922_tc2_testmap2', // TC2 MAP with video clip
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/vietnamese/world-48605529'],
            enabled: false,
          },
          test: {
            paths: ['/vietnamese/23082328'],
            enabled: false,
          },
          local: {
            paths: ['/vietnamese/world-48605529'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/vietnamese/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/vietnamese/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/vietnamese/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  yoruba: {
    name: 'yoruba',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/yoruba/articles/cg7qz71en35o'],
            enabled: false,
          },
          test: {
            paths: ['/yoruba/articles/clw06m0nj8qo'],
            enabled: false,
          },
          local: {
            paths: ['/yoruba/articles/clw06m0nj8qo'],
            enabled: false,
          },
        },
        smoke: false,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/yoruba/articles/cxvxrj8tvppo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/yoruba'],
            enabled: false,
          },
          test: {
            paths: ['/yoruba'],
            enabled: false,
          },
          local: {
            paths: ['/yoruba'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/yoruba/afrika-51116686', // CPS MAP with video clip
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/yoruba/media-23256797', // CPS MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: ['/yoruba/media-23256797'], // CPS MAP with video clip
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/yoruba/media-50970014'],
            enabled: false,
          },
          test: {
            paths: ['/yoruba/ere-idaraya-23252844'],
            enabled: false,
          },
          local: {
            paths: ['/yoruba/media-50970014'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/yoruba/afrika-51998079'],
            enabled: true,
          },
          test: {
            paths: ['/yoruba/afrika-23252769'],
            enabled: true,
          },
          local: {
            paths: ['/yoruba/afrika-23252769'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/yoruba/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/yoruba/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/yoruba/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  zhongwenSimp: {
    name: 'zhongwen',
    font: undefined,
    isWorldService: true,
    variant: 'simp',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/articles/c3xd4x9prgyo/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/articles/cabcdefghijo/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [
              '/zhongwen/simp/uk-23283128', // CPS Audio
              '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/simp/uk-23283128', // CPS Audio
              '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp/chinese-news-49065935'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/23161412'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/simp/chinese-news-49065935'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/zhongwen/simp/popular/read'],
            enabled: true,
          },
        },
        smoke: true,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
  zhongwenTrad: {
    name: 'zhongwen',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/articles/c3xd4x9prgyo/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      errorPage404: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/articles/cabcdefghijo/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandRadio: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [
              '/zhongwen/trad/uk-23283128', // CPS Audio
              '/zhongwen/trad/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/trad/uk-23283128', // CPS Audio
              '/zhongwen/trad/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad/chinese-news-49065935'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/23161412'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad/chinese-news-49065935'],
            enabled: true,
          },
        },
        smoke: true,
      },
      storyPage: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: [],
            enabled: false,
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
    },
  },
});
