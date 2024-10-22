const AUDIT_URLS = {
  FRONT_PAGE: {
    live: ['https://www.bbc.com/serbian/cyr'],
    test: [],
  },
  FIX: {
    live: ['https://www.bbc.com/persian/science-52004647'],
    test: [
      'https://www.test.bbc.com/persian/science-52004647?renderer_env=live',
    ],
  },

  LIVE_RADIO: {
    live: ['https://www.bbc.com/korean/bbc_korean_radio/liveradio'],
    test: ['https://www.test.bbc.com/korean/bbc_korean_radio/liveradio'],
  },

  OD_RADIO: {
    live: ['https://www.bbc.com/pashto/bbc_pashto_radio/programmes/p056fcjb'],
    test: [
      'https://www.test.bbc.com/pashto/bbc_pashto_radio/programmes/p056fcjb',
    ],
  },

  OD_TV: {
    live: ['https://www.bbc.com/pashto/bbc_pashto_tv/tv_programmes/w13xttn4'],
    test: [
      'https://www.test.bbc.com/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',
    ],
  },

  MAP: {
    live: ['https://www.bbc.com/mundo/media-52123665'],
    test: ['https://www.test.bbc.com/pidgin/23248703'],
  },

  MOST_READ: {
    live: ['https://www.bbc.com/vietnamese/popular/read'],
    test: ['https://www.test.bbc.com/vietnamese/popular/read'],
  },

  PGL: {
    live: ['https://www.bbc.com/arabic/art-and-culture-38260491'],
    test: ['https://www.test.bbc.com/afaanoromoo/oduu-23141286'],
  },

  STY: {
    live: ['https://www.bbc.com/arabic/sports-54278377'],
    test: [
      'https://www.test.bbc.com/pashto/afghanistan-52643309?renderer_env=live',
    ],
  },

  TOPIC_PAGE: {
    live: ['https://www.bbc.com/pidgin/topics/c0823e52dd0t'],
    test: ['https://www.test.bbc.com/pidgin/topics/c0823e52dd0t'],
  },

  TIPO_HOME_PAGE: {
    live: ['https://www.bbc.com/kyrgyz'],
    test: [
      'https://www.test.bbc.com/kyrgyz?renderer_env=live',
      'https://www.test.bbc.com/serbian/lat?renderer_env=live',
    ],
  },

  MEDIA_ARTICLE_PAGE: {
    live: ['https://www.bbc.com/hausa/articles/cw5kgkr4wvzo'],
    test: [
      'https://www.test.bbc.com/hausa/articles/cw5kgkr4wvzo?renderer_env=live',
    ],
  },

  PODCAST_PAGE: {
    live: [
      'https://www.bbc.com/marathi/podcasts/p09431p4', // Podcast Brand
      'https://www.bbc.com/marathi/podcasts/p09431p4/p0fmsqt5', // Podcast Episode
    ],
    test: [
      'https://www.test.bbc.com/marathi/podcasts/p09431p4', // Podcast Brand
      'https://www.test.bbc.com/marathi/podcasts/p09431p4/p0fmsqt5', // Podcast Episode
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
          { aggregationMethod: 'optimistic', minScore: 0.4 },
        ],
        'categories:accessibility': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.85 },
        ],
        'categories:best-practices': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.7 },
        ],
        'categories:seo': [
          'error',
          { aggregationMethod: 'optimistic', minScore: 0.8 },
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
