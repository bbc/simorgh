module.exports = {
  name: 'afaanoromoo',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/afaanoromoo/articles/ce3nlgrelv1o'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
          enabled: true,
        },
        local: {
          paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
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
          paths: ['/afaanoromoo/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/afaanoromoo'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: [
            '/afaanoromoo/bbc_afaanoromoo_radio/liveradio?renderer_env=live',
          ],
          enabled: true,
        },
        local: {
          paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
          enabled: false,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
            '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wc0', // On Demand Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
            '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wd4', // On Demand Episode
          ],
          enabled: true,
        },
        local: {
          paths: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/afaanoromoo/topics/c2dwqdy81y1t'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo/topics/c2dwqdy81y1t'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/topics/c2dwqdy81y1t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/afaanoromoo/oduu-51248626', // CPS MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/afaanoromoo/23149891', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/23149891'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/afaanoromoo/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/afaanoromoo/oduu-50716382'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo/oduu-23141286'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/oduu-41217768'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/afaanoromoo/oduu-53260895'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo/oduu-23141504'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/oduu-53268428'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/afaanoromoo/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/afaanoromoo/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/popular/read'],
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
          paths: ['/afaanoromoo/sport-23125110'],
          enabled: false,
        },
        local: {
          paths: ['/afaanoromoo/sport-23125110'],
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
