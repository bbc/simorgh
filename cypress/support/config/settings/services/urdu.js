module.exports = {
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
            '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1', // Brand
            '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/urdu/bbc_urdu_tv/tv/w172xctrrk6t25t', // Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/urdu/topics/cjgn7n9zzq7t'],
          enabled: false,
        },
        test: {
          paths: ['/urdu/topics/cjgn7n9zzq7t'],
          enabled: false,
        },
        local: {
          paths: ['/urdu/topics/cjgn7n9zzq7t'],
          enabled: false,
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/urdu/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/urdu/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/urdu/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/urdu/science-51314202'],
          enabled: true,
        },
        test: {
          paths: ['/urdu/world-23075586'],
          enabled: false,
        },
        local: {
          paths: ['/urdu/world-53692225'],
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
