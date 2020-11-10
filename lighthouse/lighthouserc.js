const AUDIT_URLS = {
  FRONT_PAGE: {
    live: ['https://www.bbc.com/arabic'],
    test: ['https://www.test.bbc.com/arabic'],
  },

  IDX: {
    live: ['https://www.bbc.com/persian/afghanistan'],
    test: [
      'https://www.test.bbc.com/persian/afghanistan',
      'https://www.test.bbc.com/azeri/azerbaijan-23066612',
    ],
  },

  LIVE_RADIO: {
    live: ['https://www.bbc.com/korean/bbc_korean_radio/liveradio'],
    test: ['https://www.test.bbc.com/korean/bbc_korean_radio/liveradio'],
  },

  OD_RADIO: {
    live: ['https://www.bbc.com/pashto/bbc_pashto_radio/programmes/p056fcjb',],
    test: [
      'https://www.test.bbc.com/pashto/bbc_pashto_radio/programmes/p056fcjb',
    ],
  },

  OD_TV: {
    live: ['https://www.bbc.com/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',],
    test: [
      'https://www.test.bbc.com/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',
    ],
  },

  MAP: {
    live: [],
    test: ['https://www.test.bbc.com/pidgin/23248703'],
  },

  MOST_READ: {
    live: ['https://www.bbc.com/vietnamese/popular/read'],
    test: ['https://www.test.bbc.com/vietnamese/popular/read'],
  },

  MOST_WATCHED: {
    live: ['https://www.bbc.com/afrique/media/video'],
    test: ['https://test.bbc.com/afrique/media/video'],
  },

  PGL: {
    live: [],
    test: ['https://www.test.bbc.com/afaanoromoo/oduu-23141286'],
  },

  STY: {
    live: [],
    test: [
      'https://www.test.bbc.com/pashto/afghanistan-52643309?renderer_env=live',
    ],
  },
};

const urlsToAudit = Object.entries(AUDIT_URLS)
  .map(([, urls]) => urls[process.env.LIGHTHOUSE_APP_ENV])
  .flat();

module.exports = {
  ci: {
    collect: {
      url: urlsToAudit,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      includePassedAssertions: true,
      assertions: {
        'categories:performance': [
          'warn',
          { aggregationMethod: 'optimistic', minScore: 0.7 },
        ],
        'categories:accessibility': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.9 },
        ],
        'categories:best-practices': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.9 },
        ],
        'categories:seo': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.9 },
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
