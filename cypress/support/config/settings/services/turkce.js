module.exports = {
  name: 'turkce',
  font: 'Reith',
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/turkce/articles/cpgzpzjl3pdo'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/articles/c8q1ze59n25o'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/articles/c8q1ze59n25o'],
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
          paths: ['/turkce/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/turkce'],
          enabled: false,
        },
        test: {
          paths: ['/turkce'],
          enabled: false,
        },
        local: {
          paths: ['/turkce'],
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
          paths: ['/turkce/topics/ckdxn2xk95gt'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/topics/ckdxn2xk95gt'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/topics/ckdxn2xk95gt'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/turkce/haberler-dunya-51621819', // CPS MAP with video clip
            '/turkce/multimedya/2016/02/160216_vid_genclerde_depresyon', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/turkce/media-23268997', // CPS MAP with audio clip
            '/turkce/multimedya/2016/05/160524_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/turkce/media-23268997', // CPS MAP with video clip
            '/turkce/multimedya/2016/05/160524_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/turkce/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/turkce/haberler-dunya-50924340'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/23059103'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/haberler-dunya-50924340'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/turkce/haberler-turkiye-53818555'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/23059095'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/haberler-dunya-53818547'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/turkce/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/turkce/haberler-dunya-51801130'],
          enabled: false,
        },
        test: {
          paths: ['/turkce/spor-23049925'],
          enabled: false,
        },
        local: {
          paths: ['/turkce/haberler-dunya-51801130'],
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
