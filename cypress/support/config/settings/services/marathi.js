module.exports = {
  name: 'marathi',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/marathi/articles/cvjxwvn04yjo'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/articles/cp47g4myxz7o'],
          enabled: false,
        },
        local: {
          paths: ['/marathi/articles/cp47g4myxz7o'],
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
          paths: ['/marathi/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/marathi'],
          enabled: false,
        },
        test: {
          paths: ['/marathi'],
          enabled: false,
        },
        local: {
          paths: ['/marathi'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/marathi/podcasts/p09431p4', // Podcast Brand
            '/marathi/podcasts/p09431p4/p09kx7q9', // Podcast Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/marathi/podcasts/p09431p4', // Podcast Brand
            '/marathi/podcasts/p09431p4/p09kx7q9', // Podcast Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/marathi/podcasts/p09431p4', // Podcast Brand
            '/marathi/podcasts/p09431p4/p09bplch', // Podcast Episode
          ],
          enabled: true,
        },
      },
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/marathi/bbc_marathi_tv/tv_programmes/w13xttr2', // Brand
          ],
          enabled: false, // Marathi TV currently not broadcasting - do not enable
        },
        test: {
          paths: [
            '/marathi/bbc_marathi_tv/tv_programmes/w13xttr2', // Brand
          ],
          enabled: false, // Marathi TV currently not broadcasting - do not enable
        },
        local: {
          paths: [],
          enabled: false,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/marathi/topics/c5qvpxvv7y3t'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/topics/c5qvpxvv7y3t'],
          enabled: false,
        },
        local: {
          paths: ['/marathi/topics/c5qvpxvv7y3t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/marathi/media-51314817', // CPS MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/marathi/media-23127353', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/marathi/media-23127353'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/marathi/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/marathi/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/marathi/india-42894522'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/23247226'],
          enabled: false,
        },
        local: {
          paths: ['/marathi/india-42894522'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/marathi/india-53414454'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/india-23126095'],
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
          paths: ['/marathi/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/marathi/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/marathi/india-53901688'],
          enabled: false,
        },
        test: {
          paths: ['/marathi/23195696'],
          enabled: false,
        },
        local: {
          paths: ['/marathi/india-53901688'],
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
