module.exports = {
  name: 'hindi',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/hindi/articles/cd80y3ezl8go'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/articles/c0469479x9xo'],
          enabled: false,
        },
        local: {
          paths: ['/hindi/articles/c0469479x9xo'],
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
          paths: ['/hindi/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/hindi'],
          enabled: false,
        },
        test: {
          paths: ['/hindi'],
          enabled: true,
        },
        local: {
          paths: ['/hindi'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: [],
          // route deprecated - hindi/bbc_hindi_radio/* will 404
          enabled: false,
        },
        test: {
          paths: [],
          // route deprecated - hindi/bbc_hindi_radio/* will 404
          enabled: false,
        },
        local: {
          paths: [],
          // route deprecated - hindi/bbc_hindi_radio/* will 404
          enabled: false,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/hindi/podcasts/p0552909', // Podcast Brand
            '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/hindi/podcasts/p0552909', // Podcast Brand
            '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/hindi/podcasts/p0552909', // Podcast Brand
            '/hindi/podcasts/p0552909/p0964mwl', // Podcast Episode
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
            '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
            '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/hindi/topics/ckdxnkz7607t'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/topics/ckdxnkz7607t'],
          enabled: false,
        },
        local: {
          paths: ['/hindi/topics/ckdxnkz7607t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/hindi/media-53139567', // CPS video
            '/hindi/multimedia/2015/09/150921_what_is_innovation_ms', // TC2 video
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/hindi/23201477', // CPS video
            '/hindi/sport/2016/08/160822_tc2_testmap1', // TC2 video
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/hindi/23201477', // CPS video
            '/hindi/sport/2016/08/160822_tc2_testmap1', // TC2 video
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/hindi/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/hindi/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/hindi/india-50198153'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/international-23095177'],
          enabled: false,
        },
        local: {
          paths: ['/hindi/india-50198153'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/hindi/vert-fut-54127040'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/india-23240074'],
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
          paths: ['/hindi/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/hindi/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/hindi/india-53901953'],
          enabled: false,
        },
        test: {
          paths: ['/hindi/india-23067562'],
          enabled: false,
        },
        local: {
          paths: ['/hindi/india-53901953'],
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
