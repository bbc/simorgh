module.exports = {
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
            '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3', // Brand
            '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/swahili/bbc_swahili_tv/tv/w172xcqnsxfj1bk', // Episode
          ],
          enabled: false,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/swahili/topics/ckdxndddjkxt'],
          enabled: false,
        },
        test: {
          paths: ['/swahili/topics/ckdxndddjkxt'],
          enabled: false,
        },
        local: {
          paths: ['/swahili/topics/ckdxndddjkxt'],
          enabled: false,
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/swahili/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/swahili/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/swahili/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/swahili/habari-53516858'],
          enabled: false,
        },
        test: {
          paths: ['/swahili/michezo-23111684'],
          enabled: false,
        },
        local: {
          paths: ['/swahili/habari-53516858'],
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
