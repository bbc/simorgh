module.exports = {
  ukrainianRu: {
    name: 'ukrainian',
    font: undefined,
    isWorldService: true,
    variant: 'ru-UA',
    pageTypes: {
      idxPage: {
        environments: {
          live: {
            paths: ['/ukrainian/ukraine_in_russian'],
            enabled: true,
          },
          test: {
            paths: ['/ukrainian/ukraine_in_russian'],
            enabled: true,
          },
          local: {
            paths: ['/ukrainian/ukraine_in_russian'],
            enabled: true,
          },
        },
        smoke: true,
      },
      articles: { environments: undefined, smoke: false },
      frontPage: { environments: undefined, smoke: false },
      liveRadio: { environments: undefined, smoke: false },
      errorPage404: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/ukrainian/topics/c61k92vrqz6t'], // ukrainian in russian
            enabled: true,
          },
          test: {
            paths: ['/ukrainian/topics/c61k92vrqz6t'], // ukrainian in russian
            enabled: true,
          },
          local: {
            paths: ['/ukrainian/topics/c61k92vrqz6t'], // ukrainian in russian
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: { environments: undefined, smoke: false },
      mostWatchedPage: { environments: undefined, smoke: false },
      photoGalleryPage: { environments: undefined, smoke: false },
      storyPage: { environments: undefined, smoke: false },
      mostReadPage: { environments: undefined, smoke: false },
      featureIndexPage: { environments: undefined, smoke: false },
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
  },
  ukrainian: {
    name: 'ukrainian',
    font: undefined,
    isWorldService: true,
    variant: 'default',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: ['/ukrainian/articles/c8zv0eed9gko'],
            enabled: true,
          },
          test: {
            paths: ['/ukrainian/articles/cp4l2mrejvdo'],
            enabled: true,
          },
          local: {
            paths: ['/ukrainian/articles/cp4l2mrejvdo'],
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
            paths: ['/ukrainian/articles/c123456abcdo'],
            enabled: true,
          },
        },
        smoke: false,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/ukrainian'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian'],
            enabled: true,
          },
        },
        smoke: false,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: {
        environments: {
          live: {
            paths: [
              '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9', // Brand
              '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m', // Episode
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9', // Brand
              '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m', // Episode
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/ukrainian/bbc_ukrainian_tv/tv/w172xct4hclz27g', // Episode
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      topicPage: {
        environments: {
          live: {
            paths: ['/ukrainian/topics/czp6w66edqpt'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/topics/czp6w66edqpt'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/topics/czp6w66edqpt'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/ukrainian/media-51975068', // Ukrainian CPS MAP
              '/ukrainian/news-russian-38395917', // Russian CPS MAP
              '/ukrainian/multimedia/2014/05/140508_biggest_dinosaur_found_ag', // Ukrainian TC2
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/ukrainian/world-23087423', // Russian CPS
              '/ukrainian/other-news-23279018', // Ukrainian CPS
              '/ukrainian/entertainment/2016/10/161025_tc2_testmap1', // TC2 Ukrainian (no Russian TC2 MAP)
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/ukrainian/world-23087423', // Russian CPS
              '/ukrainian/other-news-23279018', // Ukrainian CPS
              '/ukrainian/entertainment/2016/10/161025_tc2_testmap1', // TC2 Ukrainian video (no Russian TC2 MAP)
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/ukrainian/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/ukrainian/features-41278900'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/23111903'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/features-41278900'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/ukrainian/features-53779581'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/23154182'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/23340963'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/ukrainian/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: {
        environments: undefined,
        smoke: false,
      },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/ukrainian/53725237'],
            enabled: false,
          },
          test: {
            paths: ['/ukrainian/23086477'],
            enabled: false,
          },
          local: {
            paths: ['/ukrainian/53725237'],
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
  },
};
