jest.mock('../../../cypress/support/config/services', () => {
  const services = {
    afaanoromoo: {
      name: 'afaanoromoo',
      font: undefined,
      isWorldService: true,
      variant: 'default',
      pageTypes: {
        articles: {
          environments: {
            live: {
              paths: ['/afaanoromoo/articles/ce3nlgrelv1o'],
              enabled: true,
            },
            test: {
              paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
              enabled: true,
            },
            local: {
              paths: ['/afaanoromoo/articles/c4g19kgl85ko'],
              enabled: true,
            },
          },
          smoke: false,
        },
        frontPage: {
          environments: {
            live: {
              paths: ['/afaanoromoo'],
              enabled: true,
            },
            test: {
              paths: ['/afaanoromoo'],
              enabled: true,
            },
            local: {
              paths: ['/afaanoromoo'],
              enabled: true,
            },
          },
          smoke: false,
        },
        liveRadio: {
          environments: {
            live: {
              paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
              enabled: true,
            },
            test: {
              paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
              enabled: true,
            },
            local: {
              paths: ['/afaanoromoo/bbc_afaanoromoo_radio/liveradio'],
              enabled: true,
            },
          },
          smoke: false,
        },
        onDemandRadioEpisode: {
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
              paths: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y'],
              enabled: true,
            },
          },
          smoke: false,
        },
        mediaAssetPage: {
          environments: {
            live: {
              paths: [
                '/afaanoromoo/oduu-51248626', // CPS MAP with video clip
              ],
              enabled: false,
            },
            test: {
              paths: [
                '/afaanoromoo/23149891', // CPS MAP with video clip
              ],
              enabled: true,
            },
            local: {
              paths: ['/afaanoromoo/23149891'], // CPS MAP with video clip
              enabled: true,
            },
          },
          smoke: false,
        },
        photoGalleryPage: {
          environments: {
            live: {
              paths: ['/afaanoromoo/oduu-50716382'],
              enabled: false,
            },
            test: {
              paths: ['/afaanoromoo/oduu-23141286'],
              enabled: false,
            },
            local: {
              paths: ['/afaanoromoo/oduu-41217768'],
              enabled: true,
            },
          },
          smoke: false,
        },
      },
    },
    amharic: {
      name: 'amharic',
      font: undefined,
      isWorldService: true,
      variant: 'default',
      pageTypes: {
        articles: {
          environments: {
            live: {
              paths: ['/amharic/articles/c0lgxqknqkdo'],
              enabled: true,
            },
            test: {
              paths: ['/amharic/articles/czqverekrldo'],
              enabled: true,
            },
            local: {
              paths: ['/amharic/articles/czqverekrldo'],
              enabled: true,
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
              paths: ['/amharic/articles/c123456abcdo'],
              enabled: true,
            },
          },
          smoke: false,
        },
        frontPage: {
          environments: {
            live: {
              paths: ['/amharic'],
              enabled: true,
            },
            test: {
              paths: ['/amharic'],
              enabled: true,
            },
            local: {
              paths: ['/amharic'],
              enabled: true,
            },
          },
          smoke: false,
        },
        liveRadio: {
          environments: {
            live: {
              paths: ['/amharic/bbc_amharic_radio/liveradio'],
              enabled: true,
            },
            test: {
              paths: ['/amharic/bbc_amharic_radio/liveradio'],
              enabled: true,
            },
            local: {
              paths: ['/amharic/bbc_amharic_radio/liveradio'],
              enabled: true,
            },
          },
          smoke: true,
        },
        onDemandRadioEpisode: {
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
              paths: ['/amharic/bbc_amharic_radio/w3csz5r9'],
              enabled: true,
            },
          },
          smoke: false,
        },
        mediaAssetPage: {
          environments: {
            live: {
              paths: [
                '/amharic/news-51270657', // CPS MAP with video clip
              ],
              enabled: false,
            },
            test: {
              paths: [
                '/amharic/news-23263266', // CPS MAP with video clip
              ],
              enabled: true,
            },
            local: {
              paths: ['/amharic/news-23263266'], // CPS MAP with video clip
              enabled: true,
            },
          },
        },
        photoGalleryPage: {
          environments: {
            live: {
              paths: ['/amharic/42743191'],
              enabled: false,
            },
            test: {
              paths: ['/amharic/23194496'],
              enabled: false,
            },
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
