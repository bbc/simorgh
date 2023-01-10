module.exports = {
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
    onDemandAudio: { environments: undefined, smoke: false },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/japanese/topics/cyx5k201n3qt'],
          enabled: false,
        },
        test: {
          paths: ['/japanese/topics/cyx5k201n3qt'],
          enabled: false,
        },
        local: {
          paths: ['/japanese/topics/cyx5k201n3qt'],
          enabled: false,
        },
      },
      smoke: false,
    },
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/japanese/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/japanese/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/japanese/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/japanese/53969845'],
          enabled: false,
        },
        test: {
          paths: [],
          enabled: false,
        },
        local: {
          paths: ['/japanese/53969845'],
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
