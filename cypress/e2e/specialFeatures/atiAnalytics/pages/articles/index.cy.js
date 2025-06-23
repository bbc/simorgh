import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertPageView } from '../../assertions';
import {
  assertFeaturesAnalysisComponentClick,
  assertFeaturesAnalysisComponentView,
} from '../../assertions/featuresAnalysis';
import {
  assertLatestMediaComponentClick,
  assertLatestMediaComponentView,
} from '../../assertions/latestMedia';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../assertions/liteSiteSummary';
import {
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
} from '../../assertions/articleLiteSiteLink';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../../assertions/mostRead';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../assertions/navigation';
import {
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
} from '../../assertions/podcastPromo';
import {
  assertRecommendationsComponentClick,
  assertRecommendationsComponentView,
} from '../../assertions/recommendations';
import {
  assertRelatedContentComponentClick,
  assertRelatedContentComponentView,
} from '../../assertions/relatedContent';
import {
  assertRelatedTopicsComponentClick,
  assertRelatedTopicsComponentView,
} from '../../assertions/relatedTopics';
import {
  assertScrollablePromoComponentClick,
  assertScrollablePromoComponentView,
} from '../../assertions/scrollablePromo';
import {
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
} from '../../assertions/socialEmbed';
import {
  assertTopStoriesComponentClick,
  assertTopStoriesComponentView,
} from '../../assertions/topStories';
import { getPathWithSuffix, setUserIDCookie } from '../../helpers';

const canonicalTestSuites = [
  {
    path: '/gahuza/articles/c5y51yxeg53o',
    runforEnv: ['local'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.articles.c5y51yxeg53o.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
      assertScrollableNavigationComponentClick,
      assertScrollableNavigationComponentView,
      assertArticleLiteSiteLinkComponentView,
      assertArticleLiteSiteLinkComponentClick,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertPodcastPromoComponentView,
      assertPodcastPromoComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/hausa/articles/cw43vy8zdjvo',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.articles.cw43vy8zdjvo.page',
    applicationType: 'responsive',
    contentType: 'article-sfv',
    useReverb: true,
    tests: [
      assertPageView,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
      assertScrollableNavigationComponentClick,
      assertScrollableNavigationComponentView,
      assertLatestMediaComponentView,
      assertLatestMediaComponentClick,
    ],
  },
  {
    path: '/hindi/articles/c9w59wnx27ro',
    runforEnv: ['local', 'live'],
    service: 'hindi',
    pageIdentifier: 'hindi.articles.c9w59wnx27ro.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertRecommendationsComponentView,
      assertRecommendationsComponentClick,
      assertPodcastPromoComponentView,
      assertPodcastPromoComponentClick,
      assertScrollablePromoComponentView,
      assertScrollablePromoComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/ce9wk6glg4lo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.ce9wk6glg4lo.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertSocialEmbedComponentView,
      assertSocialEmbedComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/cyv3zm4y428o',
    runforEnv: ['live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cyv3zm4y428o.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertScrollablePromoComponentClick,
      assertScrollablePromoComponentView,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/cw0x29n2pvqo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cw0x29n2pvqo.page',
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
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [assertPageView],
  },
];

const ampTestSuites = canonicalTestSuites
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
      path: '/news/articles/c0g992jmmkko.amp',
      runforEnv: ['local', 'test'],
      service: 'news',
      pageIdentifier: 'news.articles.c0g992jmmkko.page',
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
      applicationType: 'amp',
      contentType: 'article',
      useReverb: true,
      tests: [assertPageView],
    },
  ]);

const supportsLite = ({ path }) => !path.startsWith('/persian/afghanistan');

const liteTestSuites = canonicalTestSuites
  .filter(supportsLite)
  .map(testSuite => {
    const excludedLiteTests = [
      assertPodcastPromoComponentView, // Podcast promo removed from lite article pages
      assertPodcastPromoComponentClick, // Podcast promo removed from lite article pages
      assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
      assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
      assertSocialEmbedComponentView, // Social embeds removed from lite article pages
      assertSocialEmbedComponentClick, // Social embeds removed from lite article pages
      assertArticleLiteSiteLinkComponentView, // Lite Site Link only displayed on canonical article pages
      assertArticleLiteSiteLinkComponentClick, // Lite Site Link only displayed on canonical article pages
      assertFeaturesAnalysisComponentClick, // Features & Analysis component click event test not working on lite pages
    ];

    const liteSiteTests = testSuite.tests.filter(
      test => !excludedLiteTests.includes(test),
    );

    // All lite enabled pages should have the Lite Site Summary component
    liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
      applicationType: 'lite',
      useReverb: false,
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  beforeAll: [setUserIDCookie],
});
