module.exports = {
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
    topicPage: {
      environments: {
        live: {
          paths: ['/amharic/topics/c7zp57r92v5t'],
          enabled: false,
        },
        test: {
          paths: ['/amharic/topics/c7zp57r92v5t'],
          enabled: false,
        },
        local: {
          paths: ['/amharic/topics/c7zp57r92v5t'],
          enabled: false,
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
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/amharic/media/video'],
          enabled: true,
        },
        test: {
          paths: ['/amharic/media/video'],
          enabled: true,
        },
        local: {
          paths: ['/amharic/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: [],
          enabled: false,
        },
        test: {
          paths: ['/amharic/23119145'],
          enabled: false,
        },
        local: {
          paths: ['/amharic/23119145'],
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
