module.exports = {
  name: 'somali',
  font: undefined,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/somali/articles/c8z79d4mzrlo'],
          enabled: false,
        },
        test: {
          paths: ['/somali/articles/cgn6emk3jm8o'],
          enabled: false,
        },
        local: {
          paths: ['/somali/articles/cgn6emk3jm8o'],
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
          paths: ['/somali/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/somali'],
          enabled: false,
        },
        test: {
          paths: ['/somali'],
          enabled: false,
        },
        local: {
          paths: ['/somali'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/somali/bbc_somali_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/somali/bbc_somali_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/somali/bbc_somali_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
            '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
            '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
          ],
          enabled: false,
        },
        local: {
          paths: ['/somali/bbc_somali_radio/w172x90wfxd2qh4'],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/somali/topics/cpzd4zj1pn2t'],
          enabled: false,
        },
        test: {
          paths: ['/somali/topics/cpzd4zj1pn2t'],
          enabled: false,
        },
        local: {
          paths: ['/somali/topics/cpzd4zj1pn2t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
            '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z', // Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
            '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z', // Episode
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
          ],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/somali/51642476', // CPS MAP with video clip
            '/somali/war/2010/09/100929_business', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/somali/hayadeed-23269042', // CPS MAP with video clip
            '/somali/maqal_iyo_muuqaal/2016/06/160628_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/somali/hayadeed-23269042', // CPS MAP with video clip
            '/somali/maqal_iyo_muuqaal/2016/06/160628_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/somali/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/somali/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/somali/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/somali/war-45947544'],
          enabled: false,
        },
        test: {
          paths: ['/somali/23064216'],
          enabled: false,
        },
        local: {
          paths: ['/somali/war-45947544'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/somali/war-53233077'],
          enabled: false,
        },
        test: {
          paths: ['/somali/23222390'],
          enabled: false,
        },
        local: {
          paths: ['/somali/53266542'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/somali/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/somali/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/somali/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/somali/war-53203408'],
          enabled: false,
        },
        test: {
          paths: ['/somali/cayaaraha-23058016'],
          enabled: false,
        },
        local: {
          paths: ['/somali/war-53203408'],
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
