module.exports = {
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
    topicPage: {
      environments: {
        live: {
          paths: ['/korean/topics/cnwng7v0e54t'],
          enabled: false,
        },
        test: {
          paths: ['/korean/topics/cnwng7v0e54t'],
          enabled: false,
        },
        local: {
          paths: ['/korean/topics/cnwng7v0e54t'],
          enabled: false,
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/korean/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/korean/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/korean/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/korean/features-44652556'],
          enabled: false,
        },
        test: {
          paths: ['/korean/features-23136351'],
          enabled: false,
        },
        local: {
          paths: ['/korean/features-44652556'],
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
