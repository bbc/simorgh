jest.mock('../../../cypress/support/config/services', () => {
  const services = {
    afaanoromoo: {
      name: 'afaanoromoo',
      pageTypes: {
        articles: {
          environments: {
            local: {
              paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
              enabled: true,
            },
          },
        },
        frontPage: {
          environments: {
            local: {
              paths: ['/afaanoromoo'],
              enabled: true,
            },
          },
        },
        liveRadio: {
          environments: {
            local: {
              paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
              enabled: true,
            },
          },
        },
        onDemandRadioEpisode: {
          environments: {
            local: {
              paths: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y'],
              enabled: true,
            },
          },
        },
        mediaAssetPage: {
          environments: {
            local: {
              paths: ['/afaanoromoo/23149891'],
              enabled: true,
            },
          },
        },
        photoGalleryPage: {
          environments: {
            local: {
              paths: ['/afaanoromoo/oduu-41217768'],
              enabled: true,
            },
          },
        },
      },
    },
    amharic: {
      name: 'amharic',
      pageTypes: {
        articles: {
          environments: {
            local: {
              paths: ['/amharic/articles/czqverekrldo'],
              enabled: true,
            },
          },
        },
        errorPage404: {
          environments: {
            local: {
              paths: ['/amharic/articles/c123456abcdo'],
              enabled: true,
            },
          },
        },
        frontPage: {
          environments: {
            local: {
              paths: ['/amharic'],
              enabled: true,
            },
          },
        },
        liveRadio: {
          environments: {
            local: {
              paths: ['/amharic/bbc_amharic_radio/liveradio'],
              enabled: true,
            },
          },
        },
        onDemandRadioEpisode: {
          environments: {
            local: {
              paths: ['/amharic/bbc_amharic_radio/w3csz5r9'],
              enabled: true,
            },
          },
        },
        mediaAssetPage: {
          environments: {
            local: {
              paths: ['/amharic/news-23263266'],
              enabled: true,
            },
          },
        },
        photoGalleryPage: {
          environments: {
            local: {
              paths: ['/amharic/42743191'],
              enabled: true,
            },
          },
        },
      },
    },
  };

  return {
    ...services,
  };
});
