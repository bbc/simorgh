module.exports = {
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
    topicPage: {
      environments: {
        live: {
          paths: ['/tigrinya/topics/cdr56vr8qvnt'],
          enabled: false,
        },
        test: {
          paths: ['/tigrinya/topics/cdr56vr8qvnt'],
          enabled: false,
        },
        local: {
          paths: ['/tigrinya/topics/cdr56vr8qvnt'],
          enabled: false,
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
          enabled: true,
        },
        local: {
          paths: ['/tigrinya/news-23263262'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/tigrinya/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/tigrinya/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/tigrinya/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: [],
          enabled: false,
        },
        test: {
          paths: ['/tigrinya/23124146'],
          enabled: false,
        },
        local: {
          paths: ['/tigrinya/23124146'],
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
