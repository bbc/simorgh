module.exports = {
  zhongwenSimp: {
    name: 'zhongwen',
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
            paths: ['/zhongwen/articles/c3xd4x9prgyo/simp'],
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
            paths: ['/zhongwen/articles/cabcdefghijo/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/simp'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: false,
          },
          test: {
            paths: [
              '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: false,
          },
          local: {
            paths: [
              '/zhongwen/simp/bbc_cantonese_radio/w172xn6l7ng41qb', // Brand
              '/zhongwen/simp/podcasts/p02pc9xp/p0968qrl', // Podcast Episode
              '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
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
            paths: ['/zhongwen/simp/topics/ck2l9z0em07t'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/topics/ck2l9z0em07t'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/simp/topics/ck2l9z0em07t'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/zhongwen/simp/world-53107744', // CPS video
              '/zhongwen/simp/multimedia/2016/06/160608_vid_gaokao_voxpop', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/zhongwen/simp/uk-23283128', // CPS Audio
              '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/simp/uk-23283128', // CPS Audio
              '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/media/video'],
            enabled: true,
          },
          local: {
            paths: ['/zhongwen/simp/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp/chinese-news-49065935'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/23161412'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/simp/chinese-news-49065935'],
            enabled: false,
          },
        },
        smoke: false,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp/uk-54289474'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/chinese-news-23263669'],
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
            paths: ['/zhongwen/simp/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/simp/popular/read'],
            enabled: true,
          },
          local: {
            paths: ['/zhongwen/simp/popular/read'],
            enabled: true,
          },
        },
        smoke: true,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/zhongwen/simp/world-54547455'],
            enabled: true,
          },
          test: {
            paths: ['/zhongwen/simp/23161271'],
            enabled: true,
          },
          local: {
            paths: [],
            enabled: false,
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
  },
  zhongwenTrad: {
    name: 'zhongwen',
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
            paths: ['/zhongwen/articles/c3xd4x9prgyo/trad'],
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
            paths: ['/zhongwen/articles/cabcdefghijo/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      frontPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad'],
            enabled: true,
          },
        },
        smoke: true,
      },
      liveRadio: { environments: undefined, smoke: false },
      onDemandAudio: {
        environments: {
          live: {
            paths: [
              '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
              '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
              '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
              '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/trad/bbc_cantonese_radio/w172xf3r5x8hw4v', // Brand
              '/zhongwen/trad/podcasts/p02pc9xp/p0968qrl', // Podcast Episode
              '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
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
            paths: ['/zhongwen/trad/topics/c83plve5vmjt'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/topics/c83plve5vmjt'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad/topics/c83plve5vmjt'],
            enabled: false,
          },
        },
        smoke: false,
      },
      mediaAssetPage: {
        environments: {
          live: {
            paths: [
              '/zhongwen/trad/world-53107744', // CPS video
              '/zhongwen/trad/multimedia/2016/06/160608_vid_gaokao_voxpop', // TC2 video
            ],
            enabled: true,
          },
          test: {
            paths: [
              '/zhongwen/trad/uk-23283128', // CPS Audio
              '/zhongwen/trad/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
          local: {
            paths: [
              '/zhongwen/trad/uk-23283128', // CPS Audio
              '/zhongwen/trad/multimedia/2016/11/161107_tc2_testmap1', // TC2 Video
            ],
            enabled: true,
          },
        },
        smoke: false,
      },
      mostWatchedPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad/media/video'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/media/video'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad/media/video'],
            enabled: false,
          },
        },
        smoke: false,
      },
      photoGalleryPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad/chinese-news-49065935'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/23161412'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad/chinese-news-49065935'],
            enabled: true,
          },
        },
        smoke: true,
      },
      storyPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad/uk-54289474'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/chinese-news-23263669'],
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
            paths: ['/zhongwen/trad/popular/read'],
            enabled: false,
          },
          test: {
            paths: ['/zhongwen/trad/popular/read'],
            enabled: false,
          },
          local: {
            paths: ['/zhongwen/trad/popular/read'],
            enabled: false,
          },
        },
        smoke: false,
      },
      idxPage: { environments: undefined, smoke: false },
      featureIndexPage: {
        environments: {
          live: {
            paths: ['/zhongwen/trad/world-54547455'],
            enabled: true,
          },
          test: {
            paths: ['/zhongwen/trad/23161271'],
            enabled: true,
          },
          local: {
            paths: [],
            enabled: false,
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
  },
};
