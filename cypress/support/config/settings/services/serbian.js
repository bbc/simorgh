module.exports = {
  serbianCyr: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'cyr',
    pageTypes: {
      articles: {
        environments: {
          live: {
            paths: [],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/23279016'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/articles/c805k05kr73o/cyr'],
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
            paths: ['/serbian/articles/cabcdefghijo/cyr'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/cyr'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/topics/cqwvxvvw9qrt'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/topics/cqwvxvvw9qrt'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/cyr/topics/cqwvxvvw9qrt'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/serbian/cyr/srbija-52895074', // CPS video
            ],
            enabled: true,
          },
          test: {
            paths: ['/serbian/cyr/23279016'], // CPS video
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr/23279016'], // CPS video
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/cyr/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/srbija-46748932'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/23229409'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/cyr/srbija-46748932'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/svet-53387433'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/srbija-23257689'],
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
            paths: ['/serbian/cyr/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/cyr/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/cyr/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/serbian/cyr/srbija-52197807'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/cyr/23163088'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/cyr/srbija-52197807'],
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
  serbianLat: {
    name: 'serbian',
    font: undefined,
    isWorldService: true,
    variant: 'lat',
    pageTypes: {
      articles: {
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
            paths: ['/serbian/articles/c805k05kr73o/lat'],
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
            paths: ['/serbian/articles/cabcdefghijo/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/serbian/lat'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/topics/c1gd303q6y6t'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat/topics/c1gd303q6y6t'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat/topics/c1gd303q6y6t'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/serbian/lat/srbija-52895074', // CPS video
            ],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat/23279016'], // CPS video
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat/23279016'], // CPS video
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/lat/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/srbija-46748932'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/23229409'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/lat/srbija-46748932'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/srbija-53410255'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/srbija-23257689'],
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
            paths: ['/serbian/lat/popular/read'],
            enabled: true,
          },
          test: {
            paths: ['/serbian/lat/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/serbian/lat/popular/read'],
            enabled: true,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/serbian/lat/srbija-52197807'],
            enabled: false,
          },
          test: {
            paths: ['/serbian/lat/23163088'],
            enabled: false,
          },
          local: {
            paths: ['/serbian/lat/srbija-52197807'],
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
