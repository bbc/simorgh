module.exports = {
  name: 'pidgin',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/pidgin/articles/cgwk9w4zlg8o'],
          enabled: true,
        },
        test: {
          paths: [
            '/pidgin/articles/cwl08rd38l6o',
            '/pidgin/articles/crrrkxz2k0ko',
          ],
          enabled: true,
        },
        local: {
          paths: ['/pidgin/articles/cwl08rd38l6o'],
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
          paths: ['/pidgin/articles/cxvxrj8tvppo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/pidgin'],
          enabled: false,
        },
        test: {
          paths: ['/pidgin'],
          enabled: false,
        },
        local: {
          paths: ['/pidgin'],
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
          paths: [
            '/pidgin/topics/c95y35941vrt',
            '/pidgin/topics/cnq68qvkjp1t', // One page only
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/pidgin/topics/cqywjyzk2vyt',
            '/pidgin/topics/cnq68qvkjp1t', // One page only
          ],
          enabled: true,
        },
        local: {
          paths: ['/pidgin/topics/cnq68qvkjp1t'], // DO NOT ENABLE
          enabled: false,
        },
      },
      smoke: true,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: ['/pidgin/tori-50974590'], // CPS MAP with video clip
          enabled: false,
        },
        test: {
          paths: ['/pidgin/23248703'], // CPS MAP with video clip
          enabled: false,
        },
        local: {
          paths: ['/pidgin/23248703'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/pidgin/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/pidgin/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/pidgin/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/pidgin/50913502'],
          enabled: true,
        },
        test: {
          paths: ['/pidgin/sport-23252855'],
          enabled: true,
        },
        local: {
          paths: ['/pidgin/sport-23252855'],
          enabled: true,
        },
      },
      smoke: true,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/pidgin/media-53261553'],
          enabled: false,
        },
        test: {
          paths: ['/pidgin/tori-23146434'],
          enabled: false,
        },
        local: {
          paths: ['/pidgin/tori-51745682'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/pidgin/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/pidgin/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/pidgin/popular/read'],
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
          paths: ['/pidgin/tori-23133559'],
          enabled: true,
        },
        local: {
          paths: ['/pidgin/tori-23133559'],
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
