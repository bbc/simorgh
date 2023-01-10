module.exports = {
  name: 'indonesia',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/indonesia/articles/cvd36dly8zdo'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia/articles/c0q2zq8pzvzo'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia/articles/c0q2zq8pzvzo'],
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
          paths: ['/indonesia/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/indonesia'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: [
            '/indonesia/bbc_indonesian_radio/liveradio?renderer_env=live',
          ],
          enabled: true,
        },
        local: {
          paths: ['/indonesia/bbc_indonesian_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
            '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
            '/indonesia/podcasts/p02pc9v6', // Podcast Brand
            '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
            '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
            '/indonesia/podcasts/p02pc9v6', // Podcast Brand
            '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/indonesia/bbc_indonesian_radio/w172xh267fpn19l', // On Demand Episode
            '/indonesia/podcasts/p02pc9v6', // Podcast Brand
            '/indonesia/podcasts/p02pc9v6/p096mj9z', // Podcast Episode
          ],
          enabled: false,
        },
      },
      smoke: true,
    },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/indonesia/topics/cjgn7k8yx4gt'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia/topics/cjgn7k8yx4gt'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia/topics/cjgn7k8yx4gt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/indonesia/media-51703269', // CPS MAP with video clip
            '/indonesia/bahasa_inggris/2016/08/160817_video_inggris', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/indonesia/media-23269037', // CPS MAP with video clip
            '/indonesia/olahraga/2016/10/161003_tc2_videomap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/indonesia/media-23269037', // CPS MAP with video clip
            '/indonesia/olahraga/2016/10/161003_tc2_videomap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/indonesia/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/indonesia/indonesia-41635759'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia/majalah-23145828'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia/indonesia-41635759'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/indonesia/dunia-53413801'],
          enabled: true,
        },
        test: {
          paths: ['/indonesia/indonesia-23130787'],
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
          paths: ['/indonesia/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/indonesia/laporan-khusus-53760712'],
          enabled: false,
        },
        test: {
          paths: ['/indonesia/olahraga-23080621'],
          enabled: false,
        },
        local: {
          paths: ['/indonesia/laporan-khusus-53760712'],
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
