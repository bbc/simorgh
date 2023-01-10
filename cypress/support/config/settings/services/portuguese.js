module.exports = {
  name: 'portuguese',
  font: 'Reith',
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/portuguese/articles/cpg5prg95lmo'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/articles/cd61pm8gzmpo'],
          enabled: false,
        },
        local: {
          paths: ['/portuguese/articles/cd61pm8gzmpo'],
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
          paths: ['/portuguese/articles/cxvxrj8tvppo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/portuguese'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese'],
          enabled: true,
        },
        local: {
          paths: ['/portuguese'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/portuguese/podcasts/p07r3r3t', // Podcast Brand
            '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/portuguese/podcasts/p07r3r3t', // Podcast Brand
            '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/portuguese/podcasts/p07r3r3t', // Podcast Brand
            '/portuguese/podcasts/p07r3r3t/p083x9gr', // Podcast Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/portuguese/topics/cz74k717pw5t'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/topics/cz74k717pw5t'],
          enabled: false,
        },
        local: {
          paths: ['/portuguese/topics/cz74k717pw5t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/portuguese/internacional-51918335', // CPS MAP
            '/portuguese/noticias/2012/07/120711_video_estomago_camera_cc', // TC2 MAP
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/portuguese/media-23282671', // CPS MAP
            '/portuguese/revista/2016/05/160506_tc2_map_0605', // TC2 MAP
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/portuguese/media-23282671', // CPS MAP
            '/portuguese/revista/2016/05/160506_tc2_map_0605', // TC2 MAP video
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/portuguese/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/portuguese/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/portuguese/geral-40302633'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/revista-23038840'],
          enabled: false,
        },
        local: {
          paths: ['/portuguese/geral-40302633'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/portuguese/vert-fut-54196350'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/brasil-23241143'],
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
          paths: ['/portuguese/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/portuguese/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/portuguese/geral-51774675'],
          enabled: false,
        },
        test: {
          paths: ['/portuguese/internacional-23049710'],
          enabled: false,
        },
        local: {
          paths: ['/portuguese/geral-51774675'],
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
