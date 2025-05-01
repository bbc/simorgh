/* eslint-disable import/no-relative-packages */
import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { testsThatAlwaysRunForAllPages as testsForAllPages } from '../testsForAllPages';
import { testsThatFollowSmokeTestConfigForAllCanonicalPages as testsForAllCanonicalPages } from '../testsForAllCanonicalPages';
import { testsThatFollowSmokeTestConfigForAllAMPPages as testsForAllAMPPages } from '../testsForAllAMPPages';
import canonicalAndAmpArticleTests from './tests';
import ampArticleTests from './testsForAMPOnly';
import canonicalArticleTests from './testsForCanonicalOnly';
import liteArticleTests from './testsForLiteOnly';
import getOptimizelyKey from '../../../support/helpers/getOptimizelyKey';

const canonicalTests = [
  testsForAllPages,
  testsForAllCanonicalPages,
  canonicalAndAmpArticleTests,
  canonicalArticleTests,
];

const ampTests = [
  testsForAllPages,
  testsForAllAMPPages,
  canonicalAndAmpArticleTests,
  ampArticleTests,
];

const smokeCanonicalTestSuites = [
  {
    path: '/gahuza/articles/c5y51yxeg53o',
    runforEnv: ['local', 'live'],
    service: 'gahuza',
    tests: [...canonicalTests],
  },
  {
    path: '/mundo/articles/ce42wzqr2mko',
    runforEnv: ['local', 'test'],
    service: 'mundo',
    tests: [...canonicalTests],
  },
  {
    path: '/mundo/articles/ce7p1pw7165o',
    runforEnv: ['live'],
    service: 'mundo',
    tests: [...canonicalTests],
  },
  {
    path: '/persian/articles/cej3lzd5e0go',
    runforEnv: ['local', 'test'],
    service: 'persian',
    tests: [...canonicalTests],
  },
  {
    path: '/persian/articles/cld9872jgyjo',
    runforEnv: ['live'],
    service: 'persian',
    tests: [...canonicalTests],
  },
  {
    path: '/persian/articles/crgxnrdl1xvo',
    runforEnv: ['live'],
    service: 'persian',
    tests: [...canonicalTests],
  },
  {
    path: '/pidgin/articles/cgwk9w4zlg8o',
    runforEnv: ['live'],
    service: 'pidgin',
    tests: [...canonicalTests],
  },
  {
    path: '/pidgin/articles/crrrkxz2k0ko',
    runforEnv: ['test'],
    service: 'pidgin',
    tests: [...canonicalTests],
  },
  {
    path: '/pidgin/articles/cwl08rd38l6o',
    runforEnv: ['local', 'test'],
    service: 'pidgin',
    tests: [...canonicalTests],
  },
  {
    path: '/pidgin/articles/cw8qv1d11l9o',
    runforEnv: ['live'],
    service: 'pidgin',
    tests: [...canonicalTests],
  },
  {
    path: '/scotland/articles/czwj5l0n210o',
    runforEnv: ['local'],
    service: 'scotland',
    tests: [...canonicalTests],
  },
  {
    path: '/serbian/articles/c805k05kr73o/cyr',
    runforEnv: ['local'],
    service: 'serbian',
    variant: 'cyr',
    tests: [...canonicalTests],
  },
  {
    path: '/serbian/articles/c805k05kr73o/lat',
    runforEnv: ['local'],
    service: 'serbian',
    variant: 'lat',
    tests: [...canonicalTests],
  },
  {
    path: '/zhongwen/articles/c3xd4x9prgyo/simp',
    runforEnv: ['local'],
    service: 'zhongwen',
    variant: 'simp',
    tests: [...canonicalTests],
  },
  {
    path: '/zhongwen/articles/c3xd4x9prgyo/trad',
    runforEnv: ['local'],
    service: 'zhongwen',
    variant: 'trad',
    tests: [...canonicalTests],
  },
];

const nonSmokeCanonicalTestSuites = [
  {
    path: '/afaanoromoo/articles/c4g19kgl85ko',
    runforEnv: ['test'],
    service: 'afaanoromoo',
    tests: [...canonicalTests],
  },
  {
    path: '/afrique/articles/cz216x22106o',
    runforEnv: ['test'],
    service: 'afrique',
    tests: [...canonicalTests],
  },
  {
    path: '/azeri/articles/cv0lm08kngmo',
    runforEnv: ['live'],
    service: 'azeri',
    tests: [...canonicalTests],
  },
  {
    path: '/gahuza/articles/cey23zx8wx8o',
    runforEnv: ['test'],
    service: 'gahuza',
    tests: [...canonicalTests],
  },
  {
    path: '/japanese/articles/cdd6p3r9g7jo',
    runforEnv: ['test'],
    service: 'japanese',
    tests: [...canonicalTests],
  },
  {
    path: '/japanese/articles/cj4m7n5nrd8o',
    runforEnv: ['live'],
    service: 'japanese',
    tests: [...canonicalTests],
  },
  {
    path: '/kyrgyz/articles/c414v42gy75o',
    runforEnv: ['live'],
    service: 'kyrgyz',
    tests: [...canonicalTests],
  },
  {
    path: '/kyrgyz/articles/c41knv20gk7o',
    runforEnv: ['live'],
    service: 'kyrgyz',
    tests: [...canonicalTests],
  },
  {
    path: '/kyrgyz/articles/cpgx4k72wv4o',
    runforEnv: ['live'],
    service: 'kyrgyz',
    tests: [...canonicalTests],
  },
  {
    path: '/mundo/articles/ce7p1pw7165o',
    runforEnv: ['live'],
    service: 'mundo',
    tests: [...canonicalTests],
  },

  {
    path: '/nepali/articles/c16ljg1v008o',
    runforEnv: ['live'],
    service: 'nepali',
    tests: [...canonicalTests],
  },
  {
    path: '/ukrainian/articles/c8zv0eed9gko',
    runforEnv: ['live'],
    service: 'ukrainian',
    tests: [...canonicalTests],
  },
];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? smokeCanonicalTestSuites
  : nonSmokeCanonicalTestSuites;

const ampTestSuites = canonicalTestSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
    tests: [...ampTests],
  };
});

// Additional scenarios for news on higher environments
ampTestSuites.push(
  ...[
    {
      path: '/news/articles/cn7k01xp8kxo.amp',
      runforEnv: ['local', 'test'],
      service: 'news',
      tests: [...ampTests],
    },
    {
      path: '/news/articles/cj7xrxz0e8zo.amp',
      runforEnv: ['live'],
      service: 'news',
      tests: [...ampTests],
    },
  ],
);

const liteTestSuites = canonicalTestSuites
  .filter(({ service }) => service !== 'news')
  .map(testSuite => {
    return {
      ...testSuite,
      path: `${testSuite.path}.lite`,
      tests: [liteArticleTests],
    };
  });

describe('Article Page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: `https://cdn.optimizely.com/datafiles/${getOptimizelyKey()}.json`,
      },
      request => {
        request.reply({ statusCode: 404 });
      },
    ).as('disable-optimizely');
  });

  runTestsForPage({
    pageType: 'articles',
    testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  });
});
