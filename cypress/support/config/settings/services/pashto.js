module.exports = {
  name: 'pashto',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/pashto/articles/c70970g2251o'],
          enabled: false,
        },
        test: {
          paths: ['/pashto/articles/cyjmdl92z3ro'],
          enabled: false,
        },
        local: {
          paths: ['/pashto/articles/cyjmdl92z3ro'],
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
          paths: ['/pashto/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/pashto'],
          enabled: false,
        },
        test: {
          paths: ['/pashto'],
          enabled: false,
        },
        local: {
          paths: ['/pashto'],
          enabled: true,
        },
      },
      smoke: false,
    },
    liveRadio: {
      environments: {
        live: {
          paths: ['/pashto/bbc_pashto_radio/liveradio'],
          enabled: true,
        },
        test: {
          paths: ['/pashto/bbc_pashto_radio/liveradio?renderer_env=live'],
          enabled: true,
        },
        local: {
          paths: ['/pashto/bbc_pashto_radio/liveradio'],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Brand
            '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/pashto/bbc_pashto_radio/programmes/p0340ysc', // On Demand Brand
            '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
          ],
          enabled: false,
        },
        local: {
          paths: ['/pashto/bbc_pashto_radio/w3ct0lz1'],
          enabled: false,
        },
      },
      smoke: false,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
            '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
            '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
            '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf', // Episode
          ],
          enabled: false,
        },
      },
      smoke: true,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/pashto/topics/cr50y57xj52t'],
          enabled: false,
        },
        test: {
          paths: ['/pashto/topics/cr50y57xj52t'],
          enabled: false,
        },
        local: {
          paths: ['/pashto/topics/cr50y57xj52t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/pashto/arts-and-literature-46787030', // CPS MAP with audio clip
            '/pashto/multimedia/2016/08/160827_gn_southafrica_female_farmer', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/pashto/media-23257523', // CPS MAP with video clip
            '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/pashto/media-23257523', // CPS MAP with video clip
            '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: true,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/pashto/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/pashto/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/pashto/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/pashto/arts-and-literature-50230813'],
          enabled: false,
        },
        test: {
          paths: ['/pashto/23092924'],
          enabled: false,
        },
        local: {
          paths: ['/pashto/arts-and-literature-50230813'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/pashto/world-52873295'],
          enabled: true,
        },
        test: {
          paths: ['/pashto/23289748'],
          enabled: true,
        },
        local: {
          paths: ['/pashto/23289748'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/pashto/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/pashto/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/pashto/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/pashto/columns-54029178'],
          enabled: false,
        },
        test: {
          paths: ['/pashto/sport-23079770'],
          enabled: true,
        },
        local: {
          paths: ['/pashto/columns-54029178'],
          enabled: true,
        },
      },
      smoke: true,
    },
  },
  specialFeatures: {
    cookieBanner: {
      environments: {
        live: {
          paths: [
            // '/pashto/articles/c70970g2251o', // Article
            // '/pashto', // Front Page
            '/pashto/bbc_pashto_radio/liveradio', // Live Radio
            // '/pashto/arts-and-literature-46787030', // CPS MAP
            '/pashto/multimedia/2016/08/160827_gn_southafrica_female_farmer', // TC2 MAP
            '/pashto/world-52873295', // CPS STY
            '/pashto/arts-and-literature-50230813', // PGL
            '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Radio Brand
            // '/pashto/bbc_pashto_radio/w172xjclrg44rpx', // On Demand Radio Episode
            // '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
            // '/pashto/popular/read', // Most Read
          ],
          enabled: true,
        },
        test: {
          paths: [
            // '/pashto/articles/cyjmdl92z3ro', // Article
            // '/pashto', // Front Page
            '/pashto/bbc_pashto_radio/liveradio', // Live Radio
            // '/pashto/media-23257523', // CPS MAP
            '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP
            '/pashto/23289748', // CPS STY
            '/pashto/23092924', // CPS PGL
            '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Radio Brand
            // '/pashto/bbc_pashto_radio/w172xjclrg44rpx', // On Demand Radio Episode
            '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
            // '', // On Demand TV Episode
            // '/pashto/popular/read', // Most Read
          ],
          enabled: true,
        },
        local: {
          paths: [
            // '/pashto/articles/c70970g2251o', // Article
            // '/pashto', // Front Page
            '/pashto/bbc_pashto_radio/liveradio', // Live Radio
            // '/pashto/media-23257523', // CPS MAP
            '/pashto/world/2016/09/160921_tc2_testmap1', // TC2 MAP
            '/pashto/23289748', // CPS STY
            '/pashto/arts-and-literature-50230813', // CPS PGL
            // '', // On Demand Radio Brand
            '/pashto/bbc_pashto_radio/w3ct2694', // On Demand Radio Episode
            '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
            // '', // On Demand TV Episode
            // '/pashto/popular/read', // Most Read
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
  },
};
