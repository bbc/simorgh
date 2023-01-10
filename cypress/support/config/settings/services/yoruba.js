module.exports = {
  name: 'yoruba',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/yoruba/articles/cg7qz71en35o'],
          enabled: false,
        },
        test: {
          paths: ['/yoruba/articles/clw06m0nj8qo'],
          enabled: false,
        },
        local: {
          paths: ['/yoruba/articles/clw06m0nj8qo'],
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
          paths: ['/yoruba/articles/cxvxrj8tvppo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/yoruba'],
          enabled: false,
        },
        test: {
          paths: ['/yoruba'],
          enabled: false,
        },
        local: {
          paths: ['/yoruba'],
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
          paths: ['/yoruba/topics/c340q0y3p5kt'],
          enabled: false,
        },
        test: {
          paths: ['/yoruba/topics/c340q0y3p5kt'],
          enabled: false,
        },
        local: {
          paths: ['/yoruba/topics/c340q0y3p5kt'],
          enabled: false,
        },
      },
      smoke: false,
    },
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
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/yoruba/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/yoruba/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/yoruba/media/video'],
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
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: [],
          enabled: false,
        },
        test: {
          paths: ['/yoruba/media-23159686'],
          enabled: false,
        },
        local: {
          paths: ['/yoruba/media-23159686'],
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
