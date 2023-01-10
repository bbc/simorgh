module.exports = {
  ukchinaSimp: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'simp',
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
            paths: ['/ukchina/articles/c0e8weny66ko/simp'],
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
            paths: ['/ukchina/articles/cabcdefghijo/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/ukchina/simp/52970385', // CPS video
              '/ukchina/simp/elt/2015/08/150908_are_326_barrel_of_laughs_audio', // TC2 audio
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/ukchina/simp/23279012', // CPS video
              '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/ukchina/simp/23279012', // CPS video
              '/ukchina/simp/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/cool-britannia-38434549'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/23099907'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/cool-britannia-38434549'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/52836902'],
            enabled: true,
          },
          test: {
            paths: ['/ukchina/simp/23307454'],
            enabled: true,
          },
          local: {
            paths: ['/ukchina/simp/23307454'],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/in_depth/cluster_uk_election_2105'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/simp/sport-23094383'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/simp/in_depth/cluster_uk_election_2105'],
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
  ukchinaTrad: {
    name: 'ukchina',
    font: undefined,
    isWorldService: true,
    variant: 'trad',
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
            paths: ['/ukchina/articles/c0e8weny66ko/trad'],
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
            paths: ['/ukchina/articles/cabcdefghijo/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: { environments: undefined, smoke: false },
      onDemandTV: { environments: undefined, smoke: false },
      topicPage: { environments: undefined, smoke: false },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/ukchina/trad/52970385', // CPS video
              '/ukchina/trad/elt/2015/08/150908_are_326_barrel_of_laughs_audio', // TC2 audio
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/ukchina/trad/23279012', // CPS video
              '/ukchina/trad/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/ukchina/trad/23279012', // CPS video
              '/ukchina/trad/multimedia/2016/11/161104_tc2_testmap1', // TC2 video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/cool-britannia-38434549'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/23099907'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/cool-britannia-38434549'],
            enabled: true,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/52836902'],
            enabled: true,
          },
          test: {
            paths: ['/ukchina/trad/23307454'],
            enabled: true,
          },
          local: {
            paths: ['/ukchina/trad/23307454'],
            enabled: true,
          },
        },
        smoke: true,
      },
      mostReadPage: {
        environments: {
          live: {
            paths: ['/ukchina/trad/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/ukchina/simp/in_depth/cluster_uk_election_2105'],
            enabled: false,
          },
          test: {
            paths: ['/ukchina/trad/sport-23094383'],
            enabled: false,
          },
          local: {
            paths: ['/ukchina/trad/in_depth/cluster_uk_election_2105'],
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
