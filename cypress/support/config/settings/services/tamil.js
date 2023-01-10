module.exports = {
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
            '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
            '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/tamil/topics/c40379e2n2zt'],
          enabled: false,
        },
        test: {
          paths: ['/tamil/topics/c40379e2n2zt'],
          enabled: false,
        },
        local: {
          paths: ['/tamil/topics/c40379e2n2zt'],
          enabled: false,
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/tamil/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/tamil/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/tamil/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/tamil/india-53903714'],
          enabled: false,
        },
        test: {
          paths: ['/tamil/global-23067400'],
          enabled: false,
        },
        local: {
          paths: ['/tamil/india-53903714'],
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
};
