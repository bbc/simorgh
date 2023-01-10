module.exports = {
  name: 'bengali',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/bengali/articles/cv90149zq1eo'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/articles/c6p3yp5zzmeo'],
          enabled: false,
        },
        local: {
          paths: ['/bengali/articles/c6p3yp5zzmeo'],
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
          paths: ['/bengali/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/bengali'],
          enabled: false,
        },
        test: {
          paths: ['/bengali'],
          enabled: false,
        },
        local: {
          paths: ['/bengali'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/bengali/bbc_bangla_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/bengali/bbc_bangla_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/bengali/bbc_bangla_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/bengali/bbc_bangla_radio/programmes/p030vjwg', // On Demand Brand
            '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/bengali/bbc_bangla_radio/programmes/p030vjwm', // On Demand Brand
            '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
          ],
          enabled: false,
        },
        local: {
          paths: ['/bengali/bbc_bangla_radio/w172x0562jxntqx'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/bengali/topics/cxy7jg418e7t'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/topics/cxy7jg418e7t'],
          enabled: false,
        },
        local: {
          paths: ['/bengali/topics/cxy7jg418e7t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/bengali/news-51660521', // CPS MAP with video clip
            '/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/bengali/media-23269006', // CPS MAP with video clip
            '/bengali/multimedia/2016/08/160803_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/bengali/media-23269006', // CPS MAP with video clip
            '/bengali/multimedia/2016/08/160803_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/bengali/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/bengali/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/bengali/news-38827173'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/23215236'],
          enabled: false,
        },
        local: {
          paths: ['/bengali/news-38827173'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/bengali/news-54280809'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/23268280'],
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
          paths: ['/bengali/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/bengali/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/bengali/53988070'],
          enabled: false,
        },
        test: {
          paths: ['/bengali/sport-23066929'],
          enabled: false,
        },
        local: {
          paths: ['/bengali/53988070'],
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
