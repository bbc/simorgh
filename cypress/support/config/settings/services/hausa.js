module.exports = {
  name: 'hausa',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/hausa/articles/c41rj1z261zo'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/articles/c2nr6xqmnewo'],
          enabled: false,
        },
        local: {
          paths: ['/hausa/articles/c2nr6xqmnewo'],
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
          paths: ['/hausa/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/hausa'],
          enabled: false,
        },
        test: {
          paths: ['/hausa'],
          enabled: false,
        },
        local: {
          paths: ['/hausa'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/hausa/bbc_hausa_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/hausa/bbc_hausa_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/hausa/bbc_hausa_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/hausa/bbc_hausa_radio/programmes/p030s4mh', // On Demand Brand
            '/hausa/bbc_hausa_radio/w3ct1qzn', // On Demand Episode
            '/hausa/podcasts/p08mlgcb', // Podcast Brand
            '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/hausa/bbc_hausa_radio/programmes/p030s4mx', // On Demand Brand
            '/hausa/bbc_hausa_radio/w3ct1033', // On Demand Episode
            '/hausa/podcasts/p08mlgcb', // Podcast Brand
            '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/hausa/bbc_hausa_radio/w3cszrwm',
            '/hausa/podcasts/p08mlgcb', // Podcast Brand
            '/hausa/podcasts/p08mlgcb/p095k3hd', // Podcast Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0', // Brand
            '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0', // Brand
            '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/hausa/bbc_hausa_tv/tv/w172xcg0kg6vph8', // Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/hausa/topics/cg726kz37wdt'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/topics/cg726kz37wdt'],
          enabled: false,
        },
        local: {
          paths: ['/hausa/topics/cg726kz37wdt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/hausa/labarai-51622389', // CPS MAP with video clip
            '/hausa/multimedia/2012/07/120712_click', // TC2 MAP with video clip
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/hausa/23269030', // CPS MAP with video clip
            '/hausa/multimedia/2016/07/160714_tc2_audiomap', // TC2 MAP with audio clip
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/hausa/23269030', // CPS MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/hausa/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/media/video'],
          enabled: false,
        },
        local: {
          paths: ['hausa/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/hausa/labarai-39326441'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/23132403'],
          enabled: false,
        },
        local: {
          paths: ['/hausa/labarai-39326441'],
          enabled: false,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/hausa/labarai-54292969'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/labarai-23190660'],
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
          paths: ['/hausa/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/hausa/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/hausa/labarai-52299135'],
          enabled: false,
        },
        test: {
          paths: ['/hausa/wasanni-23061643'],
          enabled: false,
        },
        local: {
          paths: ['/hausa/labarai-52299135'],
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
