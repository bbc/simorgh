module.exports = {
  name: 'igbo',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/igbo/articles/ckjn8jnrn75o'],
          enabled: false,
        },
        test: {
          paths: ['/igbo/articles/cr1lw620ygjo'],
          enabled: false,
        },
        local: {
          paths: ['/igbo/articles/cr1lw620ygjo'],
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
          paths: ['/igbo/articles/cxvxrj8tvppo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/igbo'],
          enabled: false,
        },
        test: {
          paths: ['/igbo'],
          enabled: false,
        },
        local: {
          paths: ['/igbo'],
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
          paths: ['/igbo/topics/cnq68k0x2vrt'],
          enabled: false,
        },
        test: {
          paths: ['/igbo/topics/cnq68k0x2vrt'],
          enabled: false,
        },
        local: {
          paths: ['/igbo/topics/cnq68k0x2vrt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/igbo/media-42986440', // CPS MAP with audio clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/igbo/media-23256786', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/igbo/media-23256786'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/igbo/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/igbo/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/igbo/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/igbo/afirika-49666505'],
          enabled: false,
        },
        test: {
          paths: ['/igbo/egwuregwu-23252841'],
          enabled: false,
        },
        local: {
          paths: ['/igbo/afirika-49666505'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/igbo/afirika-52816709'],
          enabled: true,
        },
        test: {
          paths: ['/igbo/afirika-23252735'],
          enabled: true,
        },
        local: {
          paths: ['/igbo/afirika-23252735'],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/igbo/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/igbo/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/igbo/popular/read'],
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
          paths: ['/igbo/media-23160433'],
          enabled: false,
        },
        local: {
          paths: ['/igbo/media-23160433'],
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
