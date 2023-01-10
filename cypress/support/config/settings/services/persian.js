module.exports = {
  name: 'persian',
  font: 'Nassim',
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: [
            '/persian/articles/c7eel0lmr4do',
            '/persian/articles/cld9872jgyjo',
          ],
          enabled: true,
        },
        test: {
          paths: ['/persian/articles/cej3lzd5e0go'],
          enabled: true,
        },
        local: {
          paths: ['/persian/articles/cej3lzd5e0go'],
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
          paths: ['/persian/articles/cxvxrj8tvppo'],
          enabled: true,
        },
      },
      smoke: true,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/persian'],
          enabled: false,
        },
        test: {
          paths: ['/persian'],
          enabled: true,
        },
        local: {
          paths: ['/persian'],
          enabled: true,
        },
      },
      smoke: true,
    },
    liveRadio: {
      environments: {
        live: {
          paths: [
            '/persian/bbc_persian_radio/liveradio',
            '/persian/bbc_dari_radio/liveradio',
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/persian/bbc_persian_radio/liveradio?renderer_env=live',
            '/persian/bbc_dari_radio/liveradio?renderer_env=live',
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/persian/bbc_persian_radio/liveradio',
            '/persian/bbc_dari_radio/liveradio',
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    onDemandAudio: {
      environments: {
        live: {
          paths: [
            '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Brand Dari
            '/persian/bbc_persian_radio/programmes/p0340vyx', // On Demand Brand Persian
            '/persian/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
            '/persian/bbc_persian_radio/w3ct2cv6', // On Demand Episode Persian
            '/persian/podcasts/p02pc9wf', // Podcast Brand
            '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/persian/bbc_dari_radio/programmes/p0364sj5', // On Demand Brand Dari
            '/persian/bbc_persian_radio/programmes/p0340vyw', // On Demand Brand Persian
            '/persian/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
            '/persian/bbc_persian_radio/w3ct2cv6', // On Demand Episode Persian
            '/persian/podcasts/p02pc9wf', // Podcast Brand
            '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/persian/bbc_persian_radio/w172x32355t5635',
            '/persian/bbc_dari_radio/w3csz7mf',
            '/persian/podcasts/p02pc9wf', // Podcast Brand
            '/persian/podcasts/p02pc9wf/p095lyj1', // Podcast Episode
          ],
          enabled: true,
        },
      },
      smoke: true,
    },
    onDemandTV: {
      environments: {
        live: {
          paths: [
            '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
            '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx', // Episode
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
            '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx', // Episode
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    topicPage: {
      environments: {
        live: {
          paths: ['/persian/topics/c5j85v96d92t'],
          enabled: false,
        },
        test: {
          paths: ['/persian/topics/c5j85v96d92t'],
          enabled: false,
        },
        local: {
          paths: ['/persian/topics/c5j85v96d92t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/persian/media-49522521', // CPS MAP with live stream
            '/persian/world-51497110', // CPS MAP with video clip
            '/persian/tv-and-radio-51780528', // CPS MAP with audio clip
            '/persian/world/2016/06/160613_om_naked_dining', // TC2 MAP with video clip
          ],
          enabled: true,
        },
        test: {
          paths: [
            '/persian/iran-23231114', // CPS MAP with audio clip
            '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
        local: {
          paths: [
            '/persian/iran-23231114', // CPS MAP with audio clip
            '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: true,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/persian/media/video'],
          enabled: true,
        },
        test: {
          paths: ['/persian/media/video'],
          enabled: true,
        },
        local: {
          paths: ['/persian/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/persian/magazine-49281981'],
          enabled: true,
        },
        test: {
          paths: ['/persian/23104784'],
          enabled: true,
        },
        local: {
          paths: ['/persian/magazine-49281981'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/persian/world-features-54279309'],
          enabled: false,
        },
        test: {
          paths: ['/persian/afghanistan-23292277'],
          enabled: false,
        },
        local: {
          paths: ['/persian/arts-52166891'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/persian/popular/read'],
          enabled: true,
        },
        test: {
          paths: ['/persian/popular/read'],
          enabled: true,
        },
        local: {
          paths: ['/persian/popular/read'],
          enabled: true,
        },
      },
      smoke: true,
    },
    idxPage: {
      environments: {
        live: {
          paths: ['/persian/afghanistan'],
          enabled: true,
        },
        test: {
          paths: ['/persian/afghanistan'],
          enabled: true,
        },
        local: {
          paths: ['/persian/afghanistan'],
          enabled: true,
        },
      },
      smoke: true,
    },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/persian/science-52004647'],
          enabled: true,
        },
        test: {
          paths: ['/persian/23278332'],
          enabled: false,
        },
        local: {
          paths: ['/persian/science-52004647'],
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
            // '/persian/articles/c7eel0lmr4do', // Article
            // '/persian/afghanistan', // IDX
            // '/persian/popular/read', // Most Read
            // '/persian/magazine-49281981', // CPS PGL
            // '/persian/world-51497110', // CPS MAP
            // '/persian/media-49522521', // CPS MAP with live stream
            // '/persian/world/2016/06/160613_om_naked_dining', // TC2 MAP
            // '/persian/bbc_persian_radio/liveradio', // Live Radio
            // '/persian/bbc_dari_radio/liveradio', // Live Radio
            // '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Radio Brand
            // '/persian/bbc_persian_radio/programmes/p0340vyx', // On Demand Radio Brand
            // '/persian/bbc_dari_radio/w3ct0bst', // On Demand Radio Episode
            // '/persian/bbc_persian_radio/w3ct0s49', // On Demand Radio Episode
          ],
          enabled: false,
        },
        test: {
          paths: [
            // '/persian/articles/cej3lzd5e0go', // Article
            // '/persian', // Front Page
            // '/persian/afghanistan', // IDX
            // '/persian/popular/read', // Most Read
            // '/persian/iran-23231114', // CPS MAP
            // '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP
            // '/persian/23104784', // CPS PGL
            // '/persian/bbc_persian_radio/liveradio', // Live Radio
            // '/persian/bbc_dari_radio/liveradio', // Live Radio
            // '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Radio Brand
            // '/persian/bbc_persian_radio/programmes/p0340vyx', // On Demand Radio Brand
            // '/persian/bbc_dari_radio/w3ct0bst', // On Demand Radio Episode
            // '/persian/bbc_persian_radio/w3ct0s49', // On Demand Radio Episode
          ],
          enabled: false,
        },
        local: {
          paths: [
            // '/persian/articles/cej3lzd5e0go', // Article
            // '/persian', // Front Page
            // '/persian/afghanistan', // IDX
            // '/persian/popular/read', // Most Read
            // '/persian/iran-23231114', // CPS MAP
            // '/persian/iran/2016/09/160907_tc2_testmap1', // TC2 MAP
            // '/persian/magazine-49281981', // CPS PGL
            // '/persian/arts-52166891', // CPS STY
            // '/persian/bbc_persian_radio/liveradio', // Live Radio
            // '/persian/bbc_dari_radio/liveradio', // Live Radio
            // // '', // On Demand Radio Brand
            // // '', // On Demand Radio Brand
            // '/persian/bbc_persian_radio/w172x32355t5635', // On Demand Radio Episode
            // '/persian/bbc_dari_radio/w3csz7mf', // On Demand Radio Episode
          ],
          enabled: false,
        },
      },
      smoke: false,
    },
  },
};
