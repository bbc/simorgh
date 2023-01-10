module.exports = {
  name: 'arabic',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/arabic/articles/c8j91j2ljppo'],
          enabled: false,
        },
        test: {
          paths: ['/arabic/articles/c1er5mjnznzo'],
          enabled: false,
        },
        local: {
          paths: ['/arabic/articles/c1er5mjnznzo'],
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
          paths: ['/arabic/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/arabic'],
          enabled: true,
        },
        test: {
          paths: ['/arabic'],
          enabled: true,
        },
        local: {
          paths: ['/arabic'],
          enabled: true,
        },
      },
      smoke: true,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/arabic/bbc_arabic_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/arabic/bbc_arabic_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/arabic/bbc_arabic_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/arabic/bbc_arabic_radio/programmes/p030vh2y', // On Demand Brand
            '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
            '/arabic/podcasts/p02pc9qc', // Podcast Brand
            '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/arabic/bbc_arabic_radio/programmes/p030vh25', // On Demand Brand
            '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
            '/arabic/podcasts/p02pc9qc', // Podcast Brand
            '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/arabic/bbc_arabic_radio/w3ct01yb', // On Demand Episode
            '/arabic/podcasts/p02pc9qc', // Podcast Brand
            '/arabic/podcasts/p02pc9qc/p08wtg4d', // Podcast Episode
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
          paths: ['/arabic/topics/cwr9j7nv58nt'],
          enabled: true,
        },
        test: {
          paths: ['/arabic/topics/cwr9j7nv58nt'],
          enabled: true,
        },
        local: {
          paths: ['/arabic/topics/cwr9j7nv58nt'],
          enabled: false,
        },
      },
      smoke: true,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/arabic/media-53135426', // CPS video
            '/arabic/multimedia/2016/06/160601_qatar_sewika_smoking', // TC2 video
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/arabic/world-23278971', // CPS audio
            '/arabic/worldnews/2015/11/151120_t_arabic_av', // TC2 video
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/arabic/world-23278971', // CPS audio
            '/arabic/worldnews/2015/11/151120_t_arabic_av', // TC2 video
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/arabic/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/arabic/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/arabic/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/arabic/art-and-culture-38260491'],
          enabled: false,
        },
        test: {
          paths: ['/arabic/magazine-23209227'],
          enabled: false,
        },
        local: {
          paths: ['/arabic/art-and-culture-38260491'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/arabic/sports-54278377'],
          enabled: false,
        },
        test: {
          paths: ['/arabic/world-23349845'],
          enabled: false,
        },
        local: {
          paths: ['/arabic/23298105'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/arabic/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/arabic/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/arabic/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/arabic/magazine-54029177'],
          enabled: false,
        },
        test: {
          paths: ['/arabic/23195478'],
          enabled: false,
        },
        local: {
          paths: ['/arabic/magazine-54029177'],
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
