module.exports = {
    name: 'afrique',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/afrique/articles/cx80n852v6mo'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/articles/cz216x22106o'],
            enabled: true,
          },
          local: {
            paths: ['/afrique/articles/cz216x22106o'],
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
            paths: ['/afrique/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/afrique'],
            enabled: true,
          },
          test: {
            paths: ['/afrique'],
            enabled: true,
          },
          local: {
            paths: ['/afrique'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: {
        environments: {
          live: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: true,
          },
          test: {
            paths: ['/afrique/bbc_afrique_radio/liveradio?renderer_env=live'],
            enabled: true,
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/liveradio'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/afrique/bbc_afrique_radio/programmes/p030s6dq', // On Demand Brand
              '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afrique/bbc_afrique_radio/programmes/p030s6g6', // On Demand Brand
              '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
            ],
            enabled: true,
          },
          local: {
            paths: ['/afrique/bbc_afrique_radio/w172xqydyfv659p'],
            enabled: true,
          },
        },
        smoke: false,
      },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
              '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
              '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: {
        environments: {
          live: {
            paths: ['/afrique/topics/cnq687nn703t'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/topics/cnq687nn703t'],
            enabled: false,
          },
          local: {
            paths: ['/afrique/topics/cnq687nn703t'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/afrique/media-52121324', // CPS MAP
              '/afrique/institutionelles/2015/07/150714_hissene_habre_explainer', // TC2 MAP
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/afrique/region-23278969', // CPS MAP
              '/afrique/nos_emissions/2016/06/160622_tc2_testmap1', // TC2 MAP
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/afrique/region-23278969', // CPS MAP
              '/afrique/nos_emissions/2016/06/160622_tc2_testmap1', // TC2 MAP video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/afrique/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/afrique/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/afrique/region-50925908'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/sports-23240647'],
            enabled: false,
          },
          local: {
            paths: ['/afrique/region-39269126'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/afrique/monde-48370111'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/region-23268823'],
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
            paths: ['/afrique/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/afrique/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/afrique/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/afrique/48465371'],
            enabled: false,
          },
          test: {
            paths: ['/afrique/sports-23071094'],
            enabled: false,
          },
          local: {
            paths: ['/afrique/48465371'],
            enabled: true,
          },
        },
        smoke: true,
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
