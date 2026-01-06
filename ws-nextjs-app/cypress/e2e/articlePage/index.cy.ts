/* eslint-disable import/no-relative-packages */
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { assertPageView } from '#cypress/e2e/specialFeatures/atiAnalytics/assertions';
import runTestsForPage, {
  TestDataType,
} from '../../support/helpers/runTestsForPage';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import testsForAllAMPPages from '../testsForAllAMPPages';
import canonicalAndAmpArticleTests from './tests';
import ampArticleTests from './testsForAMPOnly';
import canonicalArticleTests from './testsForCanonicalOnly';
import liteArticleTests from './testsForLiteOnly';

import {
  assertContinueReadingButtonComponentClick,
  assertContinueReadingButtonComponentView,
} from '../specialFeatures/atiAnalytics/assertions/continueReadingButton';
import {
  assertTopBarOJComponentClick,
  assertTopBarOJComponentView,
} from '../specialFeatures/atiAnalytics/assertions/topBarOjs';
import { setUserIDCookie } from '../specialFeatures/atiAnalytics/helpers';
import {
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
} from '../specialFeatures/atiAnalytics/assertions/articleLiteSiteLink';
import {
  assertTopStoriesComponentClick,
  assertTopStoriesComponentView,
} from '../specialFeatures/atiAnalytics/assertions/topStories';
import {
  assertFeaturesAnalysisComponentClick,
  assertFeaturesAnalysisComponentView,
} from '../specialFeatures/atiAnalytics/assertions/featuresAnalysis';
import {
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
} from '../specialFeatures/atiAnalytics/assertions/podcastPromo';
import {
  assertRelatedTopicsComponentClick,
  assertRelatedTopicsComponentView,
} from '../specialFeatures/atiAnalytics/assertions/relatedTopics';
import {
  assertRelatedContentComponentClick,
  assertRelatedContentComponentView,
} from '../specialFeatures/atiAnalytics/assertions/relatedContent';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../specialFeatures/atiAnalytics/assertions/mostRead';
import {
  assertLatestMediaComponentClick,
  assertLatestMediaComponentView,
} from '../specialFeatures/atiAnalytics/assertions/latestMedia';
import {
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
} from '../specialFeatures/atiAnalytics/assertions/socialEmbed';
import {
  assertScrollablePromoComponentClick,
  assertScrollablePromoComponentView,
} from '../specialFeatures/atiAnalytics/assertions/scrollablePromo';
import getPathWithSuffix from '../../support/helpers/getPathWithSuffix';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../specialFeatures/atiAnalytics/assertions/liteSiteSummary';

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
    path: '/hindi/articles/c0kprrej277o',
    runforEnv: ['live'],
    service: 'hindi',
    tests: [...canonicalTests],
  },
  {
    path: '/mundo/articles/ce42wzqr2mko',
    runforEnv: ['local', 'test'],
    service: 'mundo',
    tests: [...canonicalTests],
  },
  {
    path: '/mundo/articles/cle16n19nd9o',
    runforEnv: ['test'],
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
    path: '/dari/articles/c502ljngpqeo',
    runforEnv: ['local'],
    service: 'dari',
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
    path: '/magyarul/articles/cjxvnv0rvr0o',
    runforEnv: ['local', 'test'],
    service: 'magyarul',
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
    path: '/polska/articles/c639526lxlro',
    runforEnv: ['local', 'test'],
    service: 'polska',
    tests: [...canonicalTests],
  },
  {
    path: '/ukrainian/articles/c8zv0eed9gko',
    runforEnv: ['live'],
    service: 'ukrainian',
    tests: [...canonicalTests],
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/hausa/articles/cw43vy8zdjvo',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.articles.cw43vy8zdjvo.page',
    siteId: 51,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    useReverb: true,
    tests: [
      assertPageView,
      assertLatestMediaComponentView,
      assertLatestMediaComponentClick,
    ],
  },
  {
    path: '/hindi/articles/cn8xe1llnyyo',
    runforEnv: ['live'],
    service: 'hindi',
    pageIdentifier: 'hindi.articles.cn8xe1llnyyo.page',
    siteId: 52,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [
      assertContinueReadingButtonComponentClick,
      assertContinueReadingButtonComponentView,
    ],
  },
  {
    path: '/gahuza/articles/c5y51yxeg53o',
    runforEnv: ['local'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.articles.c5y51yxeg53o.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertArticleLiteSiteLinkComponentView,
      assertArticleLiteSiteLinkComponentClick,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
      assertPodcastPromoComponentView,
      assertPodcastPromoComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/ce9wk6glg4lo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.ce9wk6glg4lo.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertFeaturesAnalysisComponentView,
      assertMostReadComponentView,
      assertMostReadComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertSocialEmbedComponentView,
      assertSocialEmbedComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/cyv3zm4y428o',
    runforEnv: ['live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cyv3zm4y428o.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertScrollablePromoComponentClick,
      assertScrollablePromoComponentView,
    ],
  },
  {
    path: '/pidgin/articles/cw0x29n2pvqo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cw0x29n2pvqo.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    useReverb: true,
    tests: [
      assertPageView,
      assertLatestMediaComponentClick,
      assertLatestMediaComponentView,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
    ],
  },
  {
    path: '/polska/articles/c639526lxlro',
    runforEnv: ['local'],
    service: 'polska',
    pageIdentifier: 'polska.articles.c639526lxlro.page',
    siteId: 135,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopBarOJComponentClick,
      assertTopBarOJComponentView,
    ],
  },
] as unknown as TestDataType[];

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

const atiAmpTestSuites = atiAnalyticsTestSuites
  .map(testSuite => {
    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
      useReverb: true,
      applicationType: 'amp',
      tests: [assertPageView],
    };
  })
  .concat([
    {
      path: 'news/articles/c0g992jmmkko.amp',
      runforEnv: ['local', 'test'],
      service: 'news',
      pageIdentifier: 'news.articles.c0g992jmmkko.page',
      siteId: 64,
      applicationType: 'amp',
      contentType: 'article',
      useReverb: true,
      tests: [assertPageView],
    },
    {
      path: '/news/articles/c9djwv3q6w9o.amp',
      runforEnv: ['live'],
      service: 'news',
      pageIdentifier: 'news.articles.c9djwv3q6w9o.page',
      siteId: 64,
      applicationType: 'amp',
      contentType: 'article',
      useReverb: true,
      tests: [assertPageView],
    },
  ]);

const atiLiteTestSuites = atiAnalyticsTestSuites
  .filter(({ path, service }) => path !== '/ws/languages' && service !== 'news')
  .map(testSuite => {
    const excludedLiteTests = [
      assertPodcastPromoComponentView, // Podcast promo removed from lite article pages
      assertPodcastPromoComponentClick, // Podcast promo removed from lite article pages
      assertSocialEmbedComponentView, // Social embeds removed from lite article pages
      assertSocialEmbedComponentClick, // Social embeds removed from lite article pages
      assertArticleLiteSiteLinkComponentView, // Lite Site Link only displayed on canonical article pages
      assertArticleLiteSiteLinkComponentClick, // Lite Site Link only displayed on canonical article pages
      assertFeaturesAnalysisComponentClick, // Features & Analysis component click event test not working on lite pages
    ];

    const liteSiteTests = testSuite.tests
      .filter(test => !excludedLiteTests.includes(test))
      .filter(
        test =>
          // Exclude component click tests, as component click support is not supported on all components yet
          !test.name.toLowerCase().includes('click'),
      );

    // All lite enabled pages should have the Lite Site Summary component
    liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
      applicationType: 'lite',
      useReverb: true,
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  pageType: ARTICLE_PAGE,
  beforeEachFns: [],
  testSuites: [
    ...atiAmpTestSuites,
    ...atiAnalyticsTestSuites.filter(({ service }) => service !== 'news'),
    ...atiLiteTestSuites,
  ] as unknown as TestDataType[],
  beforeAll: [setUserIDCookie],
});

runTestsForPage({
  pageType: ARTICLE_PAGE,
  beforeEachFns: [],
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  deleteServiceWorker: true,
});
