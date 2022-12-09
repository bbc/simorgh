module.exports = () => ({
  mundo: {
    name: 'mundo',
    font: 'Reith',
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/mundo/articles/cdwrpl7qwqqo'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/articles/ce42wzqr2mko'],
            enabled: true,
          },
          local: {
            paths: ['/mundo/articles/ce42wzqr2mko'],
            enabled: true,
          },
        },
        smoke: true,
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
            paths: ['/mundo/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/mundo'],
            enabled: false,
          },
          test: {
            paths: ['/mundo'],
            enabled: true,
          },
          local: {
            paths: ['/mundo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/mundo/media-52123665', // CPS MAP
              '/mundo/noticias/2011/05/110518_video_deforestacion_amazonia_brasil_lav', // TC2 MAP
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/mundo/media-23283126', // CPS MAP
              '/mundo/noticias/2016/04/160427_tc2_testmap1', // TC2 MAP
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/mundo/media-23283126', // CPS MAP
              '/mundo/noticias/2016/04/160427_tc2_testmap1', // TC2 MAP video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/mundo/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/mundo/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/mundo/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/mundo/deportes-36935058'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/noticias-23147451'],
            enabled: true,
          },
          local: {
            paths: ['/mundo/deportes-36935058'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/mundo/noticias-54274735'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/23263889'],
            enabled: true,
          },
          local: {
            paths: [
              '/mundo/23263889',
              '/mundo/noticias-internacional-51266689',
            ],
            enabled: true,
          },
        },
        smoke: true,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/mundo/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/mundo/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/mundo/noticias-internacional-53826365'],
            enabled: true,
          },
          test: {
            paths: ['/mundo/noticias-internacional-23055705'],
            enabled: false,
          },
          local: {
            paths: ['/mundo/noticias-internacional-53826365'],
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
            paths: [
              '/mundo/articles/cdwrpl7qwqqo',
              '/mundo',
              '/mundo/noticias-internacional-53826365',
              '/mundo/popular/read',
              '/mundo/media-52123665',
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/mundo/articles/ce42wzqr2mko',
              '/mundo',
              '/mundo/noticias-internacional-23055705',
              '/mundo/popular/read',
              '/mundo/media-23283126',
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/mundo/articles/ce42wzqr2mko',
              '/mundo',
              '/mundo/noticias-internacional-53826365',
              '/mundo/popular/read',
              '/mundo/media-23283126',
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
    },
  }
});
