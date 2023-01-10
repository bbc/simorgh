module.exports = {
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
            '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
            '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/uzbek/topics/c8y949r98pgt'],
          enabled: false,
        },
        test: {
          paths: ['/uzbek/topics/c8y949r98pgt'],
          enabled: false,
        },
        local: {
          paths: ['/uzbek/topics/c8y949r98pgt'],
          enabled: false,
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/uzbek/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/uzbek/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/uzbek/media/video'],
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
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/uzbek/52149619'],
          enabled: false,
        },
        test: {
          paths: ['/uzbek/sport-23053653'],
          enabled: false,
        },
        local: {
          paths: ['/uzbek/52149619'],
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
