module.exports = () => ({
  afaanoromoo: {
    name: 'afaanoromoo',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: [
              '/afaanoromoo/bbc_afaanoromoo_radio/liveradio?renderer_env=live',
            ],
            enabled: true,
          },
          local: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
            enabled: false,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
              '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wc0', // On Demand Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
              '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wd4', // On Demand Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/afaanoromoo/oduu-53260895'],
            enabled: false,
          },
          test: {
            paths: ['/afaanoromoo/oduu-23141504'],
            enabled: false,
          },
          local: {
            paths: ['/afaanoromoo/oduu-53268428'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  afrique: {
    name: 'afrique',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/afrique/bbc_afrique_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/afrique/bbc_afrique_radio/programmes/p030s6dq', // On Demand Brand
              '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afrique/bbc_afrique_radio/programmes/p030s6g6', // On Demand Brand
              '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/w172xqydyfv659p'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite', // Brand
              '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv', // Episode
              '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite', // Brand
              '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv', // Episode
              '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/afrique/media-52121324', // CPS MAP
              '/afrique/institutionelles/2015/07/150714_hissene_habre_explainer', // TC2 MAP
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afrique/region-23278969', // CPS MAP
              '/afrique/nos_emissions/2016/06/160622_tc2_testmap1?renderer_env=test', // TC2 MAP
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/afrique/region-23278969', // CPS MAP
              '/afrique/nos_emissions/2016/06/160622_tc2_testmap1', // TC2 MAP video
            ],
            enabled: false,
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
            paths: ['/afrique/monde-48370111'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/region-23268823'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  amharic: {
    name: 'amharic',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/amharic/bbc_amharic_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/amharic/bbc_amharic_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: true,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/amharic/bbc_amharic_radio/programmes/w13xttnt', // On Demand Brand
              '/amharic/bbc_amharic_radio/w3ct1lqy', // On Demand Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/amharic/bbc_amharic_radio/programmes/w13xttnt', // On Demand Brand
              '/amharic/bbc_amharic_radio/w3ct1lqy', // On Demand Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/amharic/bbc_amharic_radio/w3csz5r9'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/amharic/news-51270657', // CPS MAP with video clip
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/amharic/news-23263266', // CPS MAP with video clip
            ],
            enabled: true,
          },
          local: {
            paths: ['/amharic/news-23263266'], // CPS MAP with video clip
            enabled: false,
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
            paths: ['/amharic/news-53260522'],
            enabled: false,
          },
          test: {
            paths: ['/amharic/23229137'],
            enabled: false,
          },
          local: {
            paths: ['/amharic/news-53260525'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  arabic: {
    name: 'arabic',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/arabic/bbc_arabic_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/arabic/bbc_arabic_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/arabic/bbc_arabic_radio/programmes/p030vh2y', // On Demand Brand
              '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
              '/arabic/podcasts/p02pc9qc', // Podcast Brand
              '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/arabic/bbc_arabic_radio/programmes/p030vh25', // On Demand Brand
              '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
              '/arabic/podcasts/p02pc9qc', // Podcast Brand
              '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/arabic/bbc_arabic_radio/w3ct01yb', // On Demand Episode
              '/arabic/podcasts/p02pc9qc', // Podcast Brand
              '/arabic/podcasts/p02pc9qc/p08wtg4d', // Podcast Episode
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/arabic/topics/cwr9j7nv58nt'],
            enabled: true,
          },
          test: {
            paths: ['/arabic/topics/cwr9j7nv58nt'],
            enabled: true,
          },
          local: {
            paths: ['/arabic/topics/cwr9j7nv58nt'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/arabic/media-53135426', // CPS video
              '/arabic/multimedia/2016/06/160601_qatar_sewika_smoking', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/arabic/world-23278971', // CPS audio
              '/arabic/worldnews/2015/11/151120_t_arabic_av?renderer_env=test', // TC2 video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/arabic/world-23278971', // CPS audio
              '/arabic/worldnews/2015/11/151120_t_arabic_av', // TC2 video
            ],
            enabled: false,
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
            paths: ['/arabic/sports-54278377'],
            enabled: false,
          },
          test: {
            paths: ['/arabic/world-23349845'],
            enabled: false,
          },
          local: {
            paths: ['/arabic/23298105'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  azeri: {
    name: 'azeri',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/azeri/other-news-53245528'],
            enabled: false,
          },
          test: {
            paths: ['/azeri/international-23069958'],
            enabled: false,
          },
          local: {
            paths: ['/azeri/international-53242449'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  bengali: {
    name: 'bengali',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/bengali/bbc_bangla_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/bengali/bbc_bangla_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/bengali/bbc_bangla_radio/programmes/p030vjwg', // On Demand Brand
              '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/bengali/bbc_bangla_radio/programmes/p030vjwm', // On Demand Brand
              '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/bengali/bbc_bangla_radio/w172x0562jxntqx'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/bengali/news-54280809'],
            enabled: false,
          },
          test: {
            paths: ['/bengali/23268280'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  burmese: {
    name: 'burmese',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/burmese/bbc_burmese_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/burmese/bbc_burmese_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
              '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
              '/burmese/podcasts/p02pc9lh', // Podcast brand
              '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
              '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
              '/burmese/podcasts/p02pc9lh', // Podcast brand
              '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/burmese/bbc_burmese_radio/w3csz62h', // On Demand Brand
              '/burmese/podcasts/p02pc9lh', // Podcast brand
              '/burmese/podcasts/p02pc9lh/p0967thw', // Podcast Episode
            ],
            enabled: false,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3', // Brand
              '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3.lite', // Brand
              '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw', // Episode
              '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3', // Brand
              '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3.lite', // Brand
              '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw', // Episode
              '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/burmese/bbc_burmese_tv/tv/w172xbmg65lczy0', // Episode
              '/burmese/bbc_burmese_tv/tv/w172xbmg65lczy0.lite', // Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/burmese/burma-53261612'],
            enabled: false,
          },
          test: {
            paths: ['/burmese/23211014'],
            enabled: false,
          },
          local: {
            paths: ['/burmese/world-53250349'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  cymrufyw: {
    name: 'cymrufyw',
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  gahuza: {
    name: 'gahuza',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio?renderer_env=live'],
            enabled: false,
          },
          local: {
            paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
              '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
              '/gahuza/podcasts/p07yh8hb', // Podcast Brand
              '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
              '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
              '/gahuza/podcasts/p07yh8hb', // Podcast Brand
              '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz',
              '/gahuza/podcasts/p07yh8hb', // Podcast Brand
              '/gahuza/podcasts/p07yh8hb/p094vs2n', // Podcast Episode
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  gujarati: {
    name: 'gujarati',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: undefined,
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
              '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr.lite', // Brand
              '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj', // Episode
              '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
              '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr.lite', // Brand
              '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj', // Episode
              '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
              '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/gujarati/india-53214502'],
            enabled: false,
          },
          test: {
            paths: ['/gujarati/india-23155321'],
            enabled: false,
          },
          local: {
            paths: ['/gujarati/international-53214116'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  hausa: {
    name: 'hausa',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/hausa/bbc_hausa_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/hausa/bbc_hausa_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/hausa/bbc_hausa_radio/programmes/p030s4mh', // On Demand Brand
              '/hausa/bbc_hausa_radio/w3ct1qzn', // On Demand Episode
              '/hausa/podcasts/p08mlgcb', // Podcast Brand
              '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/hausa/bbc_hausa_radio/programmes/p030s4mx', // On Demand Brand
              '/hausa/bbc_hausa_radio/w3ct1033', // On Demand Episode
              '/hausa/podcasts/p08mlgcb', // Podcast Brand
              '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hausa/bbc_hausa_radio/w3cszrwm',
              '/hausa/podcasts/p08mlgcb', // Podcast Brand
              '/hausa/podcasts/p08mlgcb/p095k3hd', // Podcast Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0', // Brand
              '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0.lite', // Brand
              '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq', // Episode
              '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0', // Brand
              '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0.lite', // Brand
              '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq', // Episode
              '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p', // Episode
              '/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p.lite', // Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
              '/hausa/multimedia/2016/07/160714_tc2_audiomap?renderer_env=test', // TC2 MAP with audio clip
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hausa/23269030', // CPS MAP with video clip
            ],
            enabled: false,
          },
        },
        smoke: true,
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
            paths: ['/hausa/labarai-54292969'],
            enabled: true,
          },
          test: {
            paths: ['/hausa/labarai-23190660'],
            enabled: true,
          },
          local: {
            paths: ['/hausa/labarai-23190660'],
            enabled: true,
          },
        },
        smoke: true,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  hindi: {
    name: 'hindi',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: [],
            // route deprecated - hindi/bbc_hindi_radio/* will 404
            enabled: false,
          },
          test: {
            paths: [],
            // route deprecated - hindi/bbc_hindi_radio/* will 404
            enabled: false,
          },
          local: {
            paths: [],
            // route deprecated - hindi/bbc_hindi_radio/* will 404
            enabled: false,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/hindi/podcasts/p0552909', // Podcast Brand
              '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/hindi/podcasts/p0552909', // Podcast Brand
              '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hindi/podcasts/p0552909', // Podcast Brand
              '/hindi/podcasts/p0552909/p0964mwl', // Podcast Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
              '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.lite', // Brand
              '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp', // Episode
              '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
              '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.lite', // Brand
              '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp', // Episode
              '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
              '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/hindi/media-53139567', // CPS video
              '/hindi/multimedia/2015/09/150921_what_is_innovation_ms', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/hindi/23201477', // CPS video
              '/hindi/sport/2016/08/160822_tc2_testmap1?renderer_env=test', // TC2 video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/hindi/23201477', // CPS video
              '/hindi/sport/2016/08/160822_tc2_testmap1', // TC2 video
            ],
            enabled: false,
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
            paths: ['/hindi/vert-fut-54127040'],
            enabled: false,
          },
          test: {
            paths: ['/hindi/india-23240074'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  igbo: {
    name: 'igbo',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  indonesia: {
    name: 'indonesia',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: [
              '/indonesia/bbc_indonesian_radio/liveradio?renderer_env=live',
            ],
            enabled: true,
          },
          local: {
            paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
              '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
              '/indonesia/podcasts/p02pc9v6', // Podcast Brand
              '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
              '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
              '/indonesia/podcasts/p02pc9v6', // Podcast Brand
              '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/indonesia/bbc_indonesian_radio/w172xh267fpn19l', // On Demand Episode
              '/indonesia/podcasts/p02pc9v6', // Podcast Brand
              '/indonesia/podcasts/p02pc9v6/p096mj9z', // Podcast Episode
            ],
            enabled: false,
          },
        },
        smoke: true,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/indonesia/dunia-53413801'],
            enabled: true,
          },
          test: {
            paths: ['/indonesia/indonesia-23130787'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  japanese: {
    name: 'japanese',
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/japanese/53413346'],
            enabled: false,
          },
          test: {
            paths: ['/japanese/23003063'],
            enabled: false,
          },
          local: {
            paths: ['/japanese/world-23252833'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  korean: {
    name: 'korean',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/korean/bbc_korean_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/korean/bbc_korean_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/korean/bbc_korean_radio/programmes/w13xttll', // On Demand Brand
              '/korean/bbc_korean_radio/w3ct1vk5', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/korean/bbc_korean_radio/programmes/w13xttlm', // On Demand Brand
              '/korean/bbc_korean_radio/w3ct1vk5', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/korean/bbc_korean_radio/w3ct0kn5'],
            enabled: true,
          },
        },
        smoke: true,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/korean/international-53260056'],
            enabled: false,
          },
          test: {
            paths: ['/korean/23228540'],
            enabled: false,
          },
          local: {
            paths: ['/korean/features-53146758'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  kyrgyz: {
    name: 'kyrgyz',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
              '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
              '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/kyrgyz/bbc_kyrgyz_radio/w3cszwmc'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx', // Brand
              '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx.lite', // Brand
              '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562', // Episode
              '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx', // Brand
              '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx.lite', // Brand
              '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562', // Episode
              '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/kyrgyz/bbc_kyrgyz_tv/tv/w172xcgmgcj9864', // Episode
              '/kyrgyz/bbc_kyrgyz_tv/tv/w172xcgmgcj9864.lite', // Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: {
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
            enabled: false,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  marathi: {
    name: 'marathi',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/marathi/podcasts/p09431p4', // Podcast Brand
              '/marathi/podcasts/p09431p4/p0f1vp21', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/marathi/podcasts/p09431p4', // Podcast Brand
              '/marathi/podcasts/p09431p4/p0f1vp21', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/marathi/podcasts/p09431p4', // Podcast Brand
              '/marathi/podcasts/p09431p4/p09bplch', // Podcast Episode
            ],
            enabled: true,
          },
        },
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/marathi/bbc_marathi_tv/tv_programmes/w13xttr2', // Brand
              '/marathi/bbc_marathi_tv/tv_programmes/w13xttr2.lite', // Brand
            ],
            enabled: false, // Marathi TV currently not broadcasting - do not enable
          },
          test: {
            paths: [
              '/marathi/bbc_marathi_tv/tv_programmes/w13xttr2', // Brand
              '/marathi/bbc_marathi_tv/tv_programmes/w13xttr2.lite', // Brand
            ],
            enabled: false, // Marathi TV currently not broadcasting - do not enable
          },
          local: {
            paths: [],
            enabled: false,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/marathi/india-53414454'],
            enabled: false,
          },
          test: {
            paths: ['/marathi/india-23126095'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  mundo: {
    name: 'mundo',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/mundo/noticias-54274735', '/mundo/noticias-66171332'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/23263889'],
            enabled: true,
          },
          local: {
            paths: [
              '/mundo/23263889',
              '/mundo/noticias-internacional-51266689',
            ],
            enabled: true,
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
    },
    specialFeatures: {
      cookieBanner: {
        environments: {
          live: {
            paths: [
              '/mundo/articles/ce7p1pw7165o',
              '/mundo',
              '/mundo/popular/read',
              '/mundo/media-52123665',
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/mundo/articles/ce42wzqr2mko',
              '/mundo',
              '/mundo/popular/read',
              '/mundo/media-23283126',
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/mundo/articles/ce42wzqr2mko',
              '/mundo',
              '/mundo/popular/read',
              '/mundo/media-23283126',
            ],
            enabled: true,
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  nepali: {
    name: 'nepali',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/nepali/bbc_nepali_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/nepali/bbc_nepali_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
              '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
              '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
              '/nepali/podcasts/p02pc9w3', // Podcast Brand
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
              '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
              '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
              '/nepali/podcasts/p02pc9w3', // Podcast Brand
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/nepali/bbc_nepali_radio/w172x83pnptp1s8',
              '/nepali/podcasts/p02pc9w3/p086v2bv', // Podcast Episode
              '/nepali/podcasts/p02pc9w3', // Podcast Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/nepali/news-53409873'],
            enabled: false,
          },
          test: {
            paths: ['/nepali/23210795'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  news: {
    name: 'news',
    font: 'Reith',
    isWorldService: false,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: {
        environments: {
          live: {
            paths: ['/news/uk-56342465', '/news/technology-56294493'],
            enabled: true,
          },
          test: {
            paths: ['/news/23393110'],
            enabled: true,
          },
          local: {
            paths: ['/news/uk-56342465', '/news/technology-56294493'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
        environments: {
          live: {
            paths: [
              '/news/articles/cj7xrxz0e8zo', // Article
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/news/articles/cn7k01xp8kxo', // Article
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/news/articles/cn7k01xp8kxo', // Article
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
    },
  },
  newsround: {
    name: 'newsround',
    font: undefined,
    variant: 'default',
    pageTypes: {
      errorPage404: { environments: undefined, smoke: false },

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: {
        environments: {
          live: {
            paths: ['/newsround/56331357'],
            enabled: true,
          },
          test: {
            paths: ['/newsround/23212028'],
            enabled: true,
          },
          local: {
            paths: ['/newsround/56331357'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  pashto: {
    name: 'pashto',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/pashto/bbc_pashto_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/pashto/bbc_pashto_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Brand
              '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/pashto/bbc_pashto_radio/programmes/p0340ysc', // On Demand Brand
              '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/pashto/bbc_pashto_radio/w3ct0lz1'],
            enabled: false,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.lite', // Brand
              '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1', // Episode
              '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.lite', // Brand
              '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1', // Episode
              '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.lite', // Brand
              '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf', // Episode
              '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf.lite', // Episode
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      topicPage: { environments: undefined, smoke: false },
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
              '/pashto/world/2016/09/160921_tc2_testmap1?renderer_env=test', // TC2 MAP with video clip
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/pashto/media-23257523', // CPS MAP with video clip
              '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
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
    },
    specialFeatures: {
      cookieBanner: {
        environments: {
          live: {
            paths: [
              // '/pashto/articles/c70970g2251o', // Article
              // '/pashto', // Home Page
              '/pashto/bbc_pashto_radio/liveradio', // Live Radio
              // '/pashto/arts-and-literature-46787030', // CPS MAP
              '/pashto/multimedia/2016/08/160827_gn_southafrica_female_farmer', // TC2 MAP
              '/pashto/world-52873295', // CPS STY
              '/pashto/arts-and-literature-50230813', // PGL
              '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Radio Brand
              // '/pashto/bbc_pashto_radio/w172xjclrg44rpx', // On Demand Radio Episode
              // '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
              // '/pashto/popular/read', // Most Read
            ],
            enabled: true,
          },
          test: {
            paths: [
              // '/pashto/articles/cyjmdl92z3ro', // Article
              // '/pashto', // Home Page
              '/pashto/bbc_pashto_radio/liveradio', // Live Radio
              // '/pashto/media-23257523', // CPS MAP
              '/pashto/world/2016/09/160921_tc2_testmap1?renderer_env=test', // TC2 MAP
              '/pashto/23289748', // CPS STY
              '/pashto/23092924', // CPS PGL
              '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Radio Brand
              // '/pashto/bbc_pashto_radio/w172xjclrg44rpx', // On Demand Radio Episode
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
              // '', // On Demand TV Episode
              // '/pashto/popular/read', // Most Read
            ],
            enabled: true,
          },
          local: {
            paths: [
              // '/pashto/articles/c70970g2251o', // Article
              // '/pashto', // Home Page
              '/pashto/bbc_pashto_radio/liveradio', // Live Radio
              // '/pashto/media-23257523', // CPS MAP
              '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP
              '/pashto/23289748', // CPS STY
              '/pashto/arts-and-literature-50230813', // CPS PGL
              // '', // On Demand Radio Brand
              '/pashto/bbc_pashto_radio/w3ct2694', // On Demand Radio Episode
              '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
              // '', // On Demand TV Episode
              // '/pashto/popular/read', // Most Read
            ],
            enabled: true,
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/persian/bbc_dari_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/persian/bbc_dari_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/persian/bbc_dari_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Brand Dari
              '/persian/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
              '/persian/podcasts/p02pc9wf', // Podcast Brand
              '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/persian/bbc_dari_radio/programmes/p0364sj5', // On Demand Brand Dari
              '/persian/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
              '/persian/podcasts/p02pc9wf', // Podcast Brand
              '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/persian/bbc_dari_radio/w3csz7mf',
              '/persian/podcasts/p02pc9wf', // Podcast Brand
              '/persian/podcasts/p02pc9wf/p095lyj1', // Podcast Episode
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
              '/persian/bbc_persian_tv/tv_programmes/w13xttnr.lite', // Brand
              '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx', // Episode
              '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
              '/persian/bbc_persian_tv/tv_programmes/w13xttnr.lite', // Brand
              '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx', // Episode
              '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
              '/persian/bbc_persian_tv/tv_programmes/w13xttnr.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/persian/media-49522521', // CPS MAP with live stream
              '/persian/world-51497110', // CPS MAP with video clip
              '/persian/tv-and-radio-51780528', // CPS MAP with audio clip
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/persian/iran-23231114', // CPS MAP with audio clip
              '/persian/iran/2016/09/160907_tc2_testmap1?renderer_env=test', // TC2 MAP with video clip
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
            paths: ['/persian/world-features-54279309'],
            enabled: false,
          },
          test: {
            paths: ['/persian/afghanistan-23292277'],
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
    },
    specialFeatures: {
      cookieBanner: {
        environments: {
          live: {
            paths: [
              // '/persian/articles/c7eel0lmr4do', // Article
              // '/persian/popular/read', // Most Read
              // '/persian/magazine-49281981', // CPS PGL
              // '/persian/world-51497110', // CPS MAP
              // '/persian/media-49522521', // CPS MAP with live stream
              // '/persian/world/2016/06/160613_om_naked_dining', // TC2 MAP
              // '/persian/bbc_dari_radio/liveradio', // Live Radio
              // '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Radio Brand
              // '/persian/bbc_dari_radio/w3ct0bst', // On Demand Radio Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              // '/persian/articles/cej3lzd5e0go', // Article
              // '/persian', // Home Page
              // '/persian/popular/read', // Most Read
              // '/persian/iran-23231114', // CPS MAP
              // '/persian/iran/2016/09/160907_tc2_testmap1?renderer_env=test', // TC2 MAP
              // '/persian/23104784', // CPS PGL
              // '/persian/bbc_dari_radio/liveradio', // Live Radio
              // '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Radio Brand
              // '/persian/bbc_dari_radio/w3ct0bst', // On Demand Radio Episode
            ],
            enabled: false,
          },
          local: {
            paths: [
              // '/persian/articles/cej3lzd5e0go', // Article
              // '/persian', // Home Page
              // '/persian/popular/read', // Most Read
              // '/persian/iran-23231114', // CPS MAP
              // '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP
              // '/persian/magazine-49281981', // CPS PGL
              // '/persian/arts-52166891', // CPS STY
              // '/persian/bbc_dari_radio/liveradio', // Live Radio
              // // '', // On Demand Radio Brand
              // // '', // On Demand Radio Brand
              // '/persian/bbc_dari_radio/w3csz7mf', // On Demand Radio Episode
            ],
            enabled: false,
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/pidgin/topics/c95y35941vrt'],
            enabled: true,
          },
          test: {
            paths: ['/pidgin/topics/cqywjyzk2vyt'],
            enabled: true,
          },
          local: {
            paths: ['/pidgin/topics/c95y35941vrt'],
            enabled: true,
          },
        },
        smoke: true,
      },
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
            enabled: false,
          },
        },
        smoke: true,
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
            paths: ['/pidgin/media-53261553'],
            enabled: false,
          },
          test: {
            paths: ['/pidgin/tori-23146434'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  portuguese: {
    name: 'portuguese',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/portuguese/podcasts/p07r3r3t', // Podcast Brand
              '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/portuguese/podcasts/p07r3r3t', // Podcast Brand
              '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/portuguese/podcasts/p07r3r3t', // Podcast Brand
              '/portuguese/podcasts/p07r3r3t/p083x9gr', // Podcast Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/portuguese/vert-fut-54196350'],
            enabled: false,
          },
          test: {
            paths: ['/portuguese/brasil-23241143'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  punjabi: {
    name: 'punjabi',
    font: undefined,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/punjabi/international-53261870'],
            enabled: false,
          },
          test: {
            paths: ['/punjabi/institutional-23129794'],
            enabled: false,
          },
          local: {
            paths: ['/punjabi/international-53251686'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  russian: {
    name: 'russian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
              '/russian/podcasts/p05607v8', // Podcast Brand
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
              '/russian/podcasts/p05607v8', // Podcast Brand
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/russian/podcasts/p05607v8/p06xlzvx', // Podcast Episode
              '/russian/podcasts/p05607v8', // Podcast Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/russian/av/media-45527896', // CPS video with redirect
              '/russian/multimedia/2012/04/120411_v_titanic_last_survivor', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/russian/av/media-23320267', // CPS video with redirect
              '/russian/news/2016/05/160510_tc2_testmap3?renderer_env=test', // TC2 video
            ],
            enabled: true,
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
            paths: ['/russian/features-54391793', '/russian/news-55041160'],
            enabled: true,
          },
          test: {
            paths: ['/russian/features-54391793', '/russian/news-55041160'],
            enabled: false,
          },
          local: {
            paths: ['/russian/features-54391793', '/russian/news-55041160'],
            enabled: true,
          },
        },
        smoke: true,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  scotland: {
    name: 'scotland',
    font: undefined,
    isWorldService: false,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  serbianCyr: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'cyr',
    pageTypes: {
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
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/serbian/cyr/srbija-52895074', // CPS video
            ],
            enabled: true,
          },
          test: {
            paths: ['/serbian/cyr/23279016'], // CPS video
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr/23279016'], // CPS video
            enabled: false,
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
            paths: ['/serbian/cyr/svet-53387433'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/srbija-23257689'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  serbianLat: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'lat',
    pageTypes: {
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
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/serbian/topics/c1gd303q6y6t/lat'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/topics/c1gd303q6y6t/lat'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/topics/c1gd303q6y6t/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/serbian/lat/srbija-52895074', // CPS video
            ],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat/23279016'], // CPS video
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat/23279016'], // CPS video
            enabled: false,
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
            paths: ['/serbian/lat/srbija-53410255'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/srbija-23257689'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  sinhala: {
    name: 'sinhala',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  somali: {
    name: 'somali',
    font: undefined,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/somali/bbc_somali_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/somali/bbc_somali_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
              '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
              '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/somali/bbc_somali_radio/w172x90wfxd2qh4'],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
              '/somali/bbc_somali_tv/tv_programmes/w13xttqt.lite', // Brand
              '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z', // Episode
              '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z.lite', // Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
              '/somali/bbc_somali_tv/tv_programmes/w13xttqt.lite', // Brand
              '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z', // Episode
              '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z.lite', // Episode
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
              '/somali/bbc_somali_tv/tv_programmes/w13xttqt.lite', // Brand
            ],
            enabled: false,
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
            enabled: false,
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
            paths: ['/somali/war-53233077'],
            enabled: false,
          },
          test: {
            paths: ['/somali/23222390'],
            enabled: false,
          },
          local: {
            paths: ['/somali/53266542'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  sport: {
    name: 'sport',
    font: undefined,
    variant: 'default',
    pageTypes: {
      errorPage404: { environments: undefined, smoke: false },

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: {
        environments: {
          live: {
            paths: ['/sport/rugby-union/56359986', '/sport/golf/56318994'],
            enabled: true,
          },
          test: {
            paths: ['/sport/formula1/23355387', '/sport/tennis/23372108'],
            enabled: true,
          },
          local: {
            paths: ['/sport/rugby-union/56359986', '/sport/golf/56318994'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  swahili: {
    name: 'swahili',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/swahili/bbc_swahili_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/swahili/bbc_swahili_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/swahili/bbc_swahili_radio/programmes/p03411mj', // On Demand Brand
              '/swahili/bbc_swahili_radio/w3ct1y1s', // On Demand Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/swahili/bbc_swahili_radio/programmes/p030s7gh', // On Demand Brand
              '/swahili/bbc_swahili_radio/w3ct1y1s', // On Demand Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/swahili/bbc_swahili_radio/w172x94ky63591m'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3', // Brand
              '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3.lite', // Brand
              '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n', // Episode
              '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3', // Brand
              '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3.lite', // Brand
              '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n', // Episode
              '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/swahili/bbc_swahili_tv/tv/w172xcqnsxfj1bk', // Episode
              '/swahili/bbc_swahili_tv/tv/w172xcqnsxfj1bk.lite', // Episode
            ],
            enabled: false,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
              '/swahili/michezo/2016/07/160713_tc2_testmap2?renderer_env=test', // TC2 MAP with audio clip
            ],
            enabled: true,
          },
          local: {
            paths: [
              // '/swahili/media-23268999', // CPS MAP with live stream
              '/swahili/michezo/2016/07/160712_tc2_testmap1', // TC2 MAP with video clip
            ],
            enabled: false,
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
            paths: ['/swahili/habari-53255795'],
            enabled: false,
          },
          test: {
            paths: ['/swahili/habari-23257760'],
            enabled: false,
          },
          local: {
            paths: ['/swahili/habari-53264596'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  tamil: {
    name: 'tamil',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/tamil/bbc_tamil_radio/liveradio?renderer_env=live'],
            enabled: false,
          },
          local: {
            paths: ['/tamil/bbc_tamil_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/tamil/bbc_tamil_radio/programmes/p03412jh', // On Demand Brand
              '/tamil/bbc_tamil_radio/w172y03bbzbnwc0', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/tamil/bbc_tamil_radio/programmes/p03412jh', // On Demand Brand
              '/tamil/bbc_tamil_radio/w172y03bbzbnwc0', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/tamil/bbc_tamil_radio/w172x966tn9jwmh'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
              '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy.lite', // Brand
              '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv', // Episode
              '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
              '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy.lite', // Brand
              '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv', // Episode
              '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
              '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/tamil/india-53414170'],
            enabled: false,
          },
          test: {
            paths: ['/tamil/23140134'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  telugu: {
    name: 'telugu',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // On Demand Brand
              '/telugu/bbc_telugu_tv/tv_programmes/w13xttld.lite', // On Demand Brand
              '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p', // On Demand Episode
              '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p.lite', // On Demand Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // On Demand Brand
              '/telugu/bbc_telugu_tv/tv_programmes/w13xttld.lite', // On Demand Brand
              '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p', // On Demand Episode
              '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p.lite', // On Demand Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // Brand
              '/telugu/bbc_telugu_tv/tv_programmes/w13xttld.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/telugu/india-53415434'],
            enabled: false,
          },
          test: {
            paths: ['/telugu/23144024'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  thai: {
    name: 'thai',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
          },
        },
        smoke: true,
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
        smoke: true,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/thai/international-53381389'],
            enabled: true,
          },
          test: {
            paths: ['/thai/23124008'],
            enabled: false,
          },
          local: {
            paths: ['/thai/international-23252825'],
            enabled: false,
          },
        },
        smoke: true,
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
    },
    specialFeatures: {
      cookieBanner: {
        environments: {
          live: {
            paths: [
              '/thai/articles/czx7w3zyme1o', // Article
              '/thai', // Home Page
              '/thai/popular/read', // Most Read
              '/thai/international-51285795', // CPS MAP with video clip
              '/thai/thailand-49950038', // CPS PGL
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/thai/articles/c442rl3md0eo', // Article
              '/thai', // Home Page
              '/thai/popular/read', // Most Read
              '/thai/international-23252840', // CPS PGL
              // '', // CPS STY
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/thai/articles/c442rl3md0eo', // Article
              '/thai', // Home Page
              '/thai/popular/read', // Most Read
              '/thai/thailand-49950038', // CPS PGL
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
    },
  },
  tigrinya: {
    name: 'tigrinya',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/tigrinya/bbc_tigrinya_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/tigrinya/bbc_tigrinya_radio/programmes/w13xttny', // On Demand Brand
              '/tigrinya/bbc_tigrinya_radio/w3ct1xhz', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/tigrinya/bbc_tigrinya_radio/programmes/w13xttny', // On Demand Brand
              '/tigrinya/bbc_tigrinya_radio/w3ct1xhz', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/bbc_tigrinya_radio/w3cszzz1'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: true,
          },
          local: {
            paths: ['/tigrinya/news-23263262'], // CPS MAP with video clip
            enabled: false,
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
            paths: ['/tigrinya/news-53258375'],
            enabled: false,
          },
          test: {
            paths: ['/tigrinya/23160271'],
            enabled: false,
          },
          local: {
            paths: ['/tigrinya/53247266'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  turkce: {
    name: 'turkce',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/turkce/haberler-turkiye-53818555'],
            enabled: false,
          },
          test: {
            paths: ['/turkce/23059095'],
            enabled: false,
          },
          local: {
            paths: ['/turkce/haberler-dunya-53818547'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  ukchinaSimp: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'simp',
    pageTypes: {
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
            enabled: false,
          },
        },
        smoke: false,
      },

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/ukchina/simp/52970385', // CPS video
              '/ukchina/simp/elt/2015/08/150908_are_326_barrel_of_laughs_audio', // TC2 audio
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/ukchina/simp/23279012', // CPS video
              '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/ukchina/simp/23279012', // CPS video
              '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: false,
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
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/23307454'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/23307454'],
            enabled: false,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  ukchinaTrad: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
    pageTypes: {
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
            enabled: false,
          },
        },
        smoke: false,
      },

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/ukchina/trad/52970385', // CPS video
              '/ukchina/trad/elt/2015/08/150908_are_326_barrel_of_laughs_audio', // TC2 audio
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/ukchina/trad/23279012', // CPS video
              '/ukchina/trad/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/ukchina/trad/23279012', // CPS video
              '/ukchina/trad/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: false,
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
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/52836902'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/23307454'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/23307454'],
            enabled: false,
          },
        },
        smoke: false,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  ukrainianRu: {
    name: 'ukrainian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      liveRadio: { environments: undefined, smoke: false },
      errorPage404: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/ukrainian/topics/c61k92vrqz6t'], // ukrainian in russian
            enabled: true,
          },
          test: {
            paths: ['/ukrainian/topics/c61k92vrqz6t'], // ukrainian in russian
            enabled: true,
          },
          local: { paths: [], enabled: false },
        },
        smoke: false,
      },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  ukrainian: {
    name: 'ukrainian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9', // Brand
              '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9.lite', // Brand
              '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m', // Episode
              '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9', // Brand
              '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9.lite', // Brand
              '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m', // Episode
              '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/ukrainian/bbc_ukrainian_tv/tv/w172xct4hclz27g', // Episode
              '/ukrainian/bbc_ukrainian_tv/tv/w172xct4hclz27g.lite', // Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/ukrainian/features-53779581'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/23154182'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/23340963'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  urdu: {
    name: 'urdu',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/urdu/bbc_urdu_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/urdu/bbc_urdu_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/urdu/bbc_urdu_radio/programmes/p03413l5', // On Demand Brand
              '/urdu/bbc_urdu_radio/w172y03qq2blt8p', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/urdu/bbc_urdu_radio/programmes/p03413l5', // On Demand Brand
              '/urdu/bbc_urdu_radio/w172y03qq2blt8p', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/urdu/bbc_urdu_radio/w172x9dx052c8sr'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1', // Brand
              '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1.lite', // Brand
              '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n', // Episode
              '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1', // Brand
              '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1.lite', // Brand
              '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n', // Episode
              '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/urdu/bbc_urdu_tv/tv/w172xctrrk6t25t', // Episode
              '/urdu/bbc_urdu_tv/tv/w172xctrrk6t25t.lite', // Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/urdu/entertainment-51584098', // CPS MAP with audio clip
              '/urdu/multimedia/2014/11/141104_hindu_riaz_kq', // TC2 MAP with video clip
            ],
            enabled: true,
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
            enabled: false,
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
            paths: ['/urdu/sport-54291601'],
            enabled: false,
          },
          test: {
            paths: ['/urdu/science-23286193'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  uzbek: {
    name: 'uzbek',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: {
        environments: {
          live: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio?renderer_env=live'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/bbc_uzbek_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/uzbek/bbc_uzbek_radio/programmes/p03414fb', // On Demand Brand
              '/uzbek/bbc_uzbek_radio/w172y044spy82mn', // On Demand Episode
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/uzbek/bbc_uzbek_radio/programmes/p03414fb', // On Demand Brand
              '/uzbek/bbc_uzbek_radio/w172y044spy82mn', // On Demand Episode
            ],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/bbc_uzbek_radio/w172x9f9qjcq3lm'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
              '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv.lite', // Brand
              '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz', // Episode
              '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz.lite', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
              '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv.lite', // Brand
              '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz', // Episode
              '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz.lite', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
              '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv.lite', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/uzbek/uzbekistan-53263098'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/23061077'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/uzbekistan-53263099'],
            enabled: true,
          },
        },
        smoke: true,
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  uzbekCyr: {
    name: 'uzbek',
    font: undefined,
    isWorldService: true,
    variant: 'cyr',
    pageTypes: {
      errorPage404: { environments: undefined, smoke: false },

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/uzbek/topics/c8y949r98pgt/cyr'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/topics/c8y949r98pgt/cyr'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/topics/c8y949r98pgt/cyr'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      specialFeatures: {
        cookieBanner: { environments: undefined, smoke: false },
      },
    },
  },
  uzbekLat: {
    name: 'uzbek',
    font: undefined,
    isWorldService: true,
    variant: 'lat',
    pageTypes: {
      errorPage404: { environments: undefined, smoke: false },

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/uzbek/topics/c8y949r98pgt/lat'],
            enabled: false,
          },
          test: {
            paths: ['/uzbek/topics/c8y949r98pgt/lat'],
            enabled: false,
          },
          local: {
            paths: ['/uzbek/topics/c8y949r98pgt/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mediaAssetPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      specialFeatures: {
        cookieBanner: { environments: undefined, smoke: false },
      },
    },
  },
  vietnamese: {
    name: 'vietnamese',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/vietnamese/world-53413742'],
            enabled: false,
          },
          test: {
            paths: ['/vietnamese/forum-23080276'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  yoruba: {
    name: 'yoruba',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
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

      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
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
            enabled: false,
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
            paths: ['/yoruba/afrika-58539527'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  zhongwenSimp: {
    name: 'zhongwen',
    font: undefined,
    isWorldService: true,
    variant: 'simp',
    pageTypes: {
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
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/zhongwen/simp/bbc_cantonese_radio/w172xn6l7ng41qb', // Brand
              '/zhongwen/simp/podcasts/p02pc9xp/p0968qrl', // Podcast Episode
              '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/zhongwen/simp/world-53107744', // CPS video
              '/zhongwen/simp/multimedia/2016/06/160608_vid_gaokao_voxpop', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/zhongwen/simp/uk-23283128', // CPS Audio
              '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1?renderer_env=test', // TC2 Video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/simp/uk-23283128', // CPS Audio
              '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: false,
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
            paths: ['/zhongwen/simp/uk-54289474'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/chinese-news-23263669'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
  zhongwenTrad: {
    name: 'zhongwen',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
    pageTypes: {
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
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/trad/bbc_cantonese_radio/w172xf3r5x8hw4v', // Brand
              '/zhongwen/trad/podcasts/p02pc9xp/p0968qrl', // Podcast Episode
              '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/zhongwen/trad/world-53107744', // CPS video
              '/zhongwen/trad/multimedia/2016/06/160608_vid_gaokao_voxpop', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/zhongwen/trad/uk-23283128', // CPS Audio
              '/zhongwen/trad/multimedia/2016/11/161107_tc2_testmap1?renderer_env=test', // TC2 Video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/trad/uk-23283128', // CPS Audio
              '/zhongwen/trad/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: false,
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
            paths: ['/zhongwen/trad/uk-54289474'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/chinese-news-23263669'],
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
    },
    specialFeatures: {
      cookieBanner: {
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
    },
  },
});
