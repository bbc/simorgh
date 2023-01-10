module.exports = {
  name: 'kyrgyz',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: [
            '/kyrgyz/articles/c414v42gy75o',
            '/kyrgyz/articles/c41knv20gk7o',
            '/kyrgyz/articles/cpgx4k72wv4o',
          ],
          enabled: true,
        },
        test: {
          paths: ['/kyrgyz/articles/c3xd4xg3rm9o'],
          enabled: true,
        },
        local: {
          paths: ['/kyrgyz/articles/c3xd4xg3rm9o'],
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
          paths: ['/kyrgyz/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/kyrgyz'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz'],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/kyrgyz/bbc_kyrgyz_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
            '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
            '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
          ],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz/bbc_kyrgyz_radio/w3cszwmc'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx', // Brand
            '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx', // Brand
            '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/kyrgyz/bbc_kyrgyz_tv/tv/w172xcgmgcj9864', // Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/kyrgyz/topics/czp8pjrkgp0t'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz/topics/czp8pjrkgp0t'],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz/topics/czp8pjrkgp0t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/kyrgyz/magazine-51509456', // CPS MAP with video clip
            '/kyrgyz/multimedia/2014/09/140903_iv_auturgan', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/kyrgyz/media-23257484', // CPS MAP with video clip
            '/kyrgyz/multimedia/2015/03/150330_map_test', // TC2 MAP with audio clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/kyrgyz/media-23257484', // CPS MAP with video clip
            // '/kyrgyz/multimedia/2015/03/150330_map_test', // TC2 MAP with audio clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/kyrgyz/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/kyrgyz/world-40847556'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz/23103385'],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz/world-40847556'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/kyrgyz/kyrgyzstan-52891593'],
          enabled: true,
        },
        test: {
          paths: ['/kyrgyz/23292889'],
          enabled: true,
        },
        local: {
          paths: ['/kyrgyz/23292889'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/kyrgyz/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/kyrgyz/magazine-54071664'],
          enabled: false,
        },
        test: {
          paths: ['/kyrgyz/world-23086329'],
          enabled: false,
        },
        local: {
          paths: ['/kyrgyz/magazine-54071664'],
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
