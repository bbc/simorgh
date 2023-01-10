module.exports = {
  name: 'gujarati',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/gujarati/articles/c2rnxj48elwo'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/articles/cr5el5kw591o'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/articles/cr5el5kw591o'],
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
          paths: ['/gujarati/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/gujarati'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: {
      environments: undefined,
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
            '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
            '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/gujarati/topics/c06gq3993v3t'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/topics/c06gq3993v3t'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/topics/c06gq3993v3t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/gujarati/media-51389006', // CPS MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/gujarati/other-news-23130286', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/other-news-23130286'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/gujarati/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/gujarati/international-41345658'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/23148511'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/international-41345658'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/gujarati/india-53214502'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/india-23155321'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/international-53214116'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/gujarati/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/gujarati/india-53920818'],
          enabled: false,
        },
        test: {
          paths: ['/gujarati/india-23189893'],
          enabled: false,
        },
        local: {
          paths: ['/gujarati/india-53920818'],
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
