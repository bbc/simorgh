// Single Lighthouse CI config used locally, in GitHub Actions and in CodeBuild.
// LIGHTHOUSE_APP_ENV selects the URL set and thresholds: local (default) | test | live
const APP_ENV = process.env.LIGHTHOUSE_APP_ENV || 'local';
const IS_LOCAL = APP_ENV === 'local';

const LOCAL_URL = 'http://localhost:7081';

const AUDIT_URLS = {
  ARTICLE_PAGE: {
    local: [`${LOCAL_URL}/pidgin/articles/ce9wk6glg4lo`],
  },

  HOME_PAGE: {
    local: [`${LOCAL_URL}/hindi`],
  },

  LIVE_PAGE: {
    local: [`${LOCAL_URL}/pidgin/live/c7p765ynk9qt`],
  },

  UGC_PAGE: {
    local: [`${LOCAL_URL}/somali/send/u130092370`],
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
    live: [
      'https://www.bbc.com/kyrgyz',
      'https://www.bbc.com/serbian/lat',
      'https://www.bbc.com/uzbek/lat',
    ],
    test: [
      // Temporarily disabled: https://www.test.bbc.com/kyrgyz currently returns 500 due to ongoing work
      // 'https://www.test.bbc.com/kyrgyz?renderer_env=live',
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

const urlsToAudit = Object.values(AUDIT_URLS)
  .map(urls => urls[APP_ENV] || [])
  .flat();

if (urlsToAudit.length === 0) {
  throw new Error(`No Lighthouse URLs configured for "${APP_ENV}"`);
}

const SKIP_AUDITS = {
  // Local server runs over http and third-party cookies are out of our control
  local: ['is-on-https', 'third-party-cookies'],
  // Non-live environments send x-robots-tag: noindex, so is-crawlable always fails there
  test: ['is-crawlable'],
  live: [],
};

const MIN_SCORES = {
  local: { accessibility: 0.9, 'best-practices': 0.88, seo: 1 },
  test: { accessibility: 0.85, 'best-practices': 0.7, seo: 0.85 },
  live: { accessibility: 0.85, 'best-practices': 0.7, seo: 0.85 },
};

const categoryAssertion = minScore => [
  'error',
  { aggregationMethod: 'optimistic', minScore },
];

module.exports = {
  ci: {
    collect: {
      url: urlsToAudit,
      // A local build is deterministic enough that one run per URL is sufficient
      numberOfRuns: IS_LOCAL ? 1 : 3,
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu',
        // Performance against a local server isn't meaningful, so skip it to save time
        ...(IS_LOCAL && {
          onlyCategories: ['accessibility', 'best-practices', 'seo'],
        }),
        skipAudits: SKIP_AUDITS[APP_ENV],
      },
    },
    assert: {
      includePassedAssertions: true,
      assertions: {
        ...(!IS_LOCAL && {
          'categories:performance': [
            'warn',
            { aggregationMethod: 'optimistic', minScore: 0.2 },
          ],
        }),
        'categories:accessibility': categoryAssertion(
          MIN_SCORES[APP_ENV].accessibility,
        ),
        'categories:best-practices': categoryAssertion(
          MIN_SCORES[APP_ENV]['best-practices'],
        ),
        'categories:seo': categoryAssertion(MIN_SCORES[APP_ENV].seo),
        'third-party-cookies': 'off',
      },
    },
    upload: {
      // Reports are written to .lighthouseci/ locally; CI runs get a shareable public link
      target:
        IS_LOCAL && !process.env.CI ? 'filesystem' : 'temporary-public-storage',
      outputDir: '.lighthouseci/reports',
    },
  },
};
