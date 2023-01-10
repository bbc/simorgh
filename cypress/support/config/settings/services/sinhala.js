module.exports = {
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
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: { environments: undefined, smoke: false },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/sinhala/topics/cg7267dz901t'],
          enabled: false,
        },
        test: {
          paths: ['/sinhala/topics/cg7267dz901t'],
          enabled: false,
        },
        local: {
          paths: ['/sinhala/topics/cg7267dz901t'],
          enabled: false,
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
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/sinhala/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/sinhala/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/sinhala/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/sinhala/51727586'],
          enabled: false,
        },
        test: {
          paths: ['/sinhala/world-23030633'],
          enabled: false,
        },
        local: {
          paths: ['/sinhala/51727586'],
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
