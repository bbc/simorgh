module.exports = {
  name: 'gahuza',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/gahuza/articles/cryd02nzn81o'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/articles/cey23zx8wx8o'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/articles/cey23zx8wx8o'],
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
          paths: ['/gahuza/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/gahuza'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/bbc_gahuza_radio/liveradio?renderer_env=live'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/bbc_gahuza_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
            '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
            '/gahuza/podcasts/p07yh8hb', // Podcast Brand
            '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
            '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
            '/gahuza/podcasts/p07yh8hb', // Podcast Brand
            '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz',
            '/gahuza/podcasts/p07yh8hb', // Podcast Brand
            '/gahuza/podcasts/p07yh8hb/p094vs2n', // Podcast Episode
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
          paths: ['/gahuza/topics/crvnv566zx9t'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/topics/crvnv566zx9t'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/topics/crvnv566zx9t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/gahuza/amakuru-51710168', // CPS MAP with audio clip
            '/gahuza/video/2015/12/151201_100womenburundi', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/gahuza/amakuru-23257470', // CPS MAP with video clip
            '/gahuza/amakuru/2016/02/160215_map_amakuru_test1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/gahuza/amakuru-23257470', // CPS MAP with video clip
            '/gahuza/amakuru/2016/02/160215_map_amakuru_test1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: true,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/gahuza/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/gahuza/amakuru-43894701'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/23111981'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/amakuru-43894701'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/gahuza/amakuru-52821373'],
          enabled: true,
        },
        test: {
          paths: ['/gahuza/23307435'],
          enabled: true,
        },
        local: {
          paths: ['/gahuza/23307435'],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/gahuza/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/gahuza/52551839'],
          enabled: false,
        },
        test: {
          paths: ['/gahuza/amakuru-23108776'],
          enabled: false,
        },
        local: {
          paths: ['/gahuza/52551839'],
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
