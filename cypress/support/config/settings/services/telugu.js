module.exports = {
  name: 'telugu',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/telugu/articles/c1x76pey3x3o'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/articles/cq0y4008d4vo'],
          enabled: false,
        },
        local: {
          paths: ['/telugu/articles/cq0y4008d4vo'],
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
          paths: ['/telugu/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/telugu'],
          enabled: false,
        },
        test: {
          paths: ['/telugu'],
          enabled: false,
        },
        local: {
          paths: ['/telugu'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: { environments: undefined, smoke: false },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // On Demand Brand
            '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p', // On Demand Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // On Demand Brand
            '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p', // On Demand Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // Brand
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/telugu/topics/c5qvp16w7dnt'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/topics/c5qvp16w7dnt'],
          enabled: false,
        },
        local: {
          paths: ['/telugu/topics/c5qvp16w7dnt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/telugu/india-51309092', // CPS MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/telugu/international-23263261', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/telugu/international-23263261'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/telugu/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/telugu/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/telugu/india-42321552'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/other-news-23128500'],
          enabled: false,
        },
        local: {
          paths: ['/telugu/india-42321552'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/telugu/india-53415434'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/23144024'],
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
          paths: ['/telugu/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/telugu/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/telugu/india-53944227'],
          enabled: false,
        },
        test: {
          paths: ['/telugu/india-23128751'],
          enabled: false,
        },
        local: {
          paths: ['/telugu/india-53944227'],
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
