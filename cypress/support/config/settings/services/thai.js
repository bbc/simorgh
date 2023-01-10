module.exports = {
  name: 'thai',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/thai/articles/czx7w3zyme1o'],
          enabled: false,
        },
        test: {
          paths: ['/thai/articles/c442rl3md0eo'],
          enabled: false,
        },
        local: {
          paths: ['/thai/articles/c442rl3md0eo'],
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
          paths: ['/thai/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/thai'],
          enabled: false,
        },
        test: {
          paths: ['/thai'],
          enabled: false,
        },
        local: {
          paths: ['/thai'],
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
          paths: ['/thai/topics/cjgn73g98rqt'],
          enabled: false,
        },
        test: {
          paths: ['/thai/topics/cjgn73g98rqt'],
          enabled: false,
        },
        local: {
          paths: ['/thai/topics/cjgn73g98rqt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/thai/international-51285795', // CPS MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/thai/23122810', // CPS MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: ['/thai/23122810'], // CPS MAP with video clip
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/thai/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/thai/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/thai/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/thai/thailand-49950038'],
          enabled: false,
        },
        test: {
          paths: ['/thai/international-23252840'],
          enabled: false,
        },
        local: {
          paths: ['/thai/thailand-49950038'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/thai/international-53381389'],
          enabled: false,
        },
        test: {
          paths: ['/thai/23124008'],
          enabled: false,
        },
        local: {
          paths: ['/thai/international-23252825'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/thai/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/thai/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/thai/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/thai/international-48101964'],
          enabled: false,
        },
        test: {
          paths: [],
          enabled: false,
        },
        local: {
          paths: ['/thai/international-48101964'],
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
          paths: [
            '/thai/articles/czx7w3zyme1o', // Article
            '/thai', // Front Page
            '/thai/popular/read', // Most Read
            '/thai/international-51285795', // CPS MAP with video clip
            '/thai/thailand-49950038', // CPS PGL
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/thai/articles/c442rl3md0eo', // Article
            '/thai', // Front Page
            '/thai/popular/read', // Most Read
            '/thai/23122810', // CPS MAP
            '/thai/international-23252840', // CPS PGL
            // '', // CPS STY
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/thai/articles/c442rl3md0eo', // Article
            '/thai', // Front Page
            '/thai/popular/read', // Most Read
            '/thai/23122810', // CPS MAP
            '/thai/thailand-49950038', // CPS PGL
          ],
          enabled: false,
        },
      },
      smoke: true,
    },
  },
};
