module.exports = {
  name: 'azeri',
  font: undefined,
  isWorldService: true,
  variant: 'default',
  pageTypes: {
    articles: {
      environments: {
        live: {
          paths: ['/azeri/articles/cv0lm08kngmo'],
          enabled: true,
        },
        test: {
          paths: ['/azeri/articles/c5k08pqnzexo'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/articles/c5k08pqnzexo'],
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
          paths: ['/azeri/articles/c123456abcdo'],
          enabled: true,
        },
      },
      smoke: false,
    },
    frontPage: {
      environments: {
        live: {
          paths: ['/azeri'],
          enabled: false,
        },
        test: {
          paths: ['/azeri'],
          enabled: false,
        },
        local: {
          paths: ['/azeri'],
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
          paths: ['/azeri/topics/c7zp571g7y7t'],
          enabled: false,
        },
        test: {
          paths: ['/azeri/topics/c7zp571g7y7t'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/topics/c7zp571g7y7t'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mediaAssetPage: {
      environments: {
        live: {
          paths: [
            '/azeri/international-51331762', // CPS MAP with video clip
            '/azeri/multimedia/2012/09/120919_georgia_prison_video', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        test: {
          paths: [
            '/azeri/azerbaijan-23257464', // CPS MAP with video clip
            '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP with video clip
          ],
          enabled: false,
        },
        local: {
          paths: [
            '/azeri/azerbaijan-23257464', // CPS MAP with video clip
            '/azeri/multimedia/2015/08/150804_azeri_test', // TC2 MAP with video clip
          ],
          enabled: true,
        },
      },
      smoke: false,
    },
    mostWatchedPage: {
      environments: {
        live: {
          paths: ['/azeri/media/video'],
          enabled: false,
        },
        test: {
          paths: ['/azeri/media/video'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/media/video'],
          enabled: false,
        },
      },
      smoke: false,
    },
    photoGalleryPage: {
      environments: {
        live: {
          paths: ['/azeri/azerbaijan-44208474'],
          enabled: false,
        },
        test: {
          paths: ['/azeri/23160428'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/azerbaijan-44208474'],
          enabled: true,
        },
      },
      smoke: false,
    },
    storyPage: {
      environments: {
        live: {
          paths: ['/azeri/other-news-53245528'],
          enabled: false,
        },
        test: {
          paths: ['/azeri/international-23069958'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/international-53242449'],
          enabled: false,
        },
      },
      smoke: false,
    },
    mostReadPage: {
      environments: {
        live: {
          paths: ['/azeri/popular/read'],
          enabled: false,
        },
        test: {
          paths: ['/azeri/popular/read'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/popular/read'],
          enabled: false,
        },
      },
      smoke: false,
    },
    idxPage: { environments: undefined, smoke: false },
    featureIndexPage: {
      environments: {
        live: {
          paths: ['/azeri/azerbaijan-44208475'],
          enabled: false,
        },
        test: {
          paths: ['/azeri/azerbaijan-23066612'],
          enabled: false,
        },
        local: {
          paths: ['/azeri/azerbaijan-44208475'],
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
