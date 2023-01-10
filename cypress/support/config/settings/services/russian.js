module.exports = {
  name: 'russian',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/russian/articles/c6ygxgl53w9o'],
          enabled: false,
        },
        test: {
          paths: ['/russian/articles/ck7pz7re3zgo'],
          enabled: false,
        },
        local: {
          paths: ['/russian/articles/ck7pz7re3zgo'],
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
          paths: ['/russian/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/russian'],
          enabled: true,
        },
        test: {
          paths: ['/russian'],
          enabled: true,
        },
        local: {
          paths: ['/russian'],
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
            '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
            '/russian/podcasts/p05607v8', // Podcast Brand
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
            '/russian/podcasts/p05607v8', // Podcast Brand
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/russian/podcasts/p05607v8/p06xlzvx', // Podcast Episode
            '/russian/podcasts/p05607v8', // Podcast Brand
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
          paths: ['/russian/topics/cez0n29ggrdt'],
          enabled: false,
        },
        test: {
          paths: ['/russian/topics/cez0n29ggrdt'],
          enabled: false,
        },
        local: {
          paths: ['/russian/topics/cez0n29ggrdt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/russian/av/media-45527896', // CPS video with redirect
            '/russian/multimedia/2012/04/120411_v_titanic_last_survivor', // TC2 video
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/russian/av/media-23320267', // CPS video with redirect
            '/russian/news/2016/05/160510_tc2_testmap3', // TC2 video
          ],
          enabled: true,
        },
        local: {
          paths: [],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostWatchedPage: { environments: undefined, smoke: false }, // No Most Watched page for Russian
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/russian/features-45782775'],
          enabled: false,
        },
        test: {
          paths: ['/russian/23181067'],
          enabled: false,
        },
        local: {
          paths: ['/russian/features-45782775'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/russian/features-54391793', '/russian/news-55041160'],
          enabled: true,
        },
        test: {
          paths: ['/russian/features-54391793', '/russian/news-55041160'],
          enabled: false,
        },
        local: {
          paths: ['/russian/features-54391793', '/russian/news-55041160'],
          enabled: true,
        },
      },
      smoke: true,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/russian/popular/read'],
          enabled: true,
        },
        test: {
          paths: ['/russian/popular/read'],
          enabled: true,
        },
        local: {
          paths: ['/russian/popular/read'],
          enabled: true,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/russian/media-52418005'],
          enabled: false,
        },
        test: {
          paths: ['/russian/sport-23045089'],
          enabled: false,
        },
        local: {
          paths: ['/russian/media-52418005'],
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
