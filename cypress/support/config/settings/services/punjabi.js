module.exports = {
  name: 'punjabi',
  font: undefined,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/punjabi/articles/c39p51156lyo'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/articles/c0l79lr39qyo'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/articles/c0l79lr39qyo'],
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
          paths: ['/punjabi/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/punjabi'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi'],
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
          paths: ['/punjabi/topics/cz74k76gjqxt'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/topics/cz74k76gjqxt'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/topics/cz74k76gjqxt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/punjabi/india-51325361', // CPS MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/punjabi/media-23248705', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/media-23248705'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/punjabi/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/punjabi/india-42928885'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/23185977'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/india-42928885'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/punjabi/international-53261870'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/institutional-23129794'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/international-53251686'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/punjabi/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/punjabi/india-53963142'],
          enabled: false,
        },
        test: {
          paths: ['/punjabi/india-23131884'],
          enabled: false,
        },
        local: {
          paths: ['/punjabi/india-53963142'],
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
