module.exports = {
  name: 'nepali',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/nepali/articles/c16ljg1v008o'],
          enabled: true,
        },
        test: {
          paths: ['/nepali/articles/cl90j9m3mn6o'],
          enabled: true,
        },
        local: {
          paths: ['/nepali/articles/cl90j9m3mn6o'],
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
          paths: ['/nepali/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/nepali'],
          enabled: false,
        },
        test: {
          paths: ['/nepali'],
          enabled: false,
        },
        local: {
          paths: ['/nepali'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/nepali/bbc_nepali_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/nepali/bbc_nepali_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/nepali/bbc_nepali_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
            '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
            '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
            '/nepali/podcasts/p02pc9w3', // Podcast Brand
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
            '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
            '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
            '/nepali/podcasts/p02pc9w3', // Podcast Brand
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/nepali/bbc_nepali_radio/w172x83pnptp1s8',
            '/nepali/podcasts/p02pc9w3/p086v2bv', // Podcast Episode
            '/nepali/podcasts/p02pc9w3', // Podcast Brand
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
          paths: ['/nepali/topics/cp2d78r6qppt'],
          enabled: false,
        },
        test: {
          paths: ['/nepali/topics/cp2d78r6qppt'],
          enabled: false,
        },
        local: {
          paths: ['/nepali/topics/cp2d78r6qppt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/nepali/news-51675223', // CPS MAP with video clip
            '/nepali/multimedia/2013/08/130806_boudhavideo', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/nepali/media-23269034', // CPS MAP with audio clip
            '/nepali/multimedia/2016/07/160725_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/nepali/media-23269034', // CPS MAP with audio clip
            '/nepali/multimedia/2016/07/160725_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/nepali/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/nepali/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/nepali/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/nepali/news-50627370'],
          enabled: false,
        },
        test: {
          paths: ['/nepali/news-23093383'],
          enabled: false,
        },
        local: {
          paths: ['/nepali/news-50627370'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/nepali/news-53409873'],
          enabled: false,
        },
        test: {
          paths: ['/nepali/23210795'],
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
          paths: ['/nepali/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/nepali/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/nepali/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/nepali/media-54029171'],
          enabled: false,
        },
        test: {
          paths: ['/nepali/news-23064489'],
          enabled: false,
        },
        local: {
          paths: ['/nepali/media-54029171'],
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
