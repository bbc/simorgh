module.exports = {
  name: 'vietnamese',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/vietnamese/articles/cpgqngyexq7o'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/articles/c3y59g5zm19o'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese/articles/c3y59g5zm19o'],
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
          paths: ['/vietnamese/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/vietnamese'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: { environments: undefined, smoke: false },
    onDemandAudio: { environments: undefined, smoke: false },
    onDemandTV: { environments: undefined, smoke: false },
    topicPage: {
      environments: {
        live: {
          paths: ['/vietnamese/topics/ckdxnx1x5rnt'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/topics/ckdxnx1x5rnt'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese/topics/ckdxnx1x5rnt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/vietnamese/forum-51506476', // CPS MAP with video clip
            '/vietnamese/multimedia/2015/04/150428_david_wheat_interview', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/vietnamese/media-23257614', // CPS MAP with video clip
            '/vietnamese/sport/2016/09/160922_tc2_testmap2', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/vietnamese/23222411', // CPS MAP with video clip
            '/vietnamese/sport/2016/09/160922_tc2_testmap2', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/vietnamese/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/vietnamese/world-48605529'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/23082328'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese/world-48605529'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/vietnamese/world-53413742'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/forum-23080276'],
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
          paths: ['/vietnamese/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/vietnamese/magazine-54029179'],
          enabled: false,
        },
        test: {
          paths: ['/vietnamese/sport-23079960'],
          enabled: false,
        },
        local: {
          paths: ['/vietnamese/magazine-54029179'],
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
