module.exports = {
  name: 'burmese',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/burmese/articles/c41px3vd4nxo'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/articles/cn0exdy1jzvo'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/articles/cn0exdy1jzvo'],
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
          paths: ['/burmese/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/burmese'],
          enabled: false,
        },
        test: {
          paths: ['/burmese'],
          enabled: false,
        },
        local: {
          paths: ['/burmese'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/burmese/bbc_burmese_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/burmese/bbc_burmese_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/burmese/bbc_burmese_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
            '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
            '/burmese/podcasts/p02pc9lh', // Podcast brand
            '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
            '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
            '/burmese/podcasts/p02pc9lh', // Podcast brand
            '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/burmese/bbc_burmese_radio/w3csz62h', // On Demand Brand
            '/burmese/podcasts/p02pc9lh', // Podcast brand
            '/burmese/podcasts/p02pc9lh/p0967thw', // Podcast Episode
          ],
          enabled: false,
        },
      },
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3', // Brand
            '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3', // Brand
            '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/burmese/bbc_burmese_tv/tv/w172xbmg65lczy0', // Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/burmese/topics/c404v08p1wxt'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/topics/c404v08p1wxt'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/topics/c404v08p1wxt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/burmese/media-48707353', // CPS MAP with video clip
            '/burmese/multimedia/2016/01/160108_korean_cook', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/burmese/media-23269011', // CPS MAP with video clip
            '/burmese/sport/2016/08/160811_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/burmese/media-23269011', // CPS MAP with video clip
            '/burmese/sport/2016/08/160811_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/burmese/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/burmese/media-47680015'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/burma-23129848'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/media-47680015'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/burmese/burma-53261612'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/23211014'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/world-53250349'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/burmese/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/burmese/burma-50522534'],
          enabled: false,
        },
        test: {
          paths: ['/burmese/sport-23068024'],
          enabled: false,
        },
        local: {
          paths: ['/burmese/burma-50522534'],
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
