import type { AppEnv } from '../../utilities/env';

export type ArticlePageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  variant?: string;
};

export type ArticlePageAtiTest =
  | 'assertPageView'
  | 'assertResonancePageView'
  | 'assertContinueReadingButtonComponentClick'
  | 'assertContinueReadingButtonComponentView'
  | 'assertTopBarOJComponentClick'
  | 'assertTopBarOJComponentView'
  | 'assertArticleLiteSiteLinkComponentClick'
  | 'assertArticleLiteSiteLinkComponentView'
  | 'assertTopStoriesComponentClick'
  | 'assertTopStoriesComponentView'
  | 'assertFeaturesAnalysisComponentClick'
  | 'assertFeaturesAnalysisComponentView'
  | 'assertPodcastPromoComponentClick'
  | 'assertPodcastPromoComponentView'
  | 'assertRelatedTopicsComponentClick'
  | 'assertRelatedTopicsComponentView'
  | 'assertRelatedContentComponentClick'
  | 'assertRelatedContentComponentView'
  | 'assertMostReadComponentClick'
  | 'assertMostReadComponentView'
  | 'assertLatestMediaComponentClick'
  | 'assertLatestMediaComponentView'
  | 'assertSocialEmbedComponentClick'
  | 'assertSocialEmbedComponentView'
  | 'assertArticleLinksBlockComponentClick'
  | 'assertArticleLinksBlockComponentView'
  | 'assertLiteSiteSummaryComponentToMainSiteClick';

export type ArticlePageAtiTestSuite = ArticlePageTestSuite & {
  headers?: Record<string, string>;
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
  expectsResonanceEvents?: boolean;
  tests: ArticlePageAtiTest[];
};

const makeSuite = (
  path: string,
  service: string,
  runForEnv: AppEnv[],
  variant?: string,
): ArticlePageTestSuite => ({
  path,
  service,
  runForEnv,
  ...(variant ? { variant } : {}),
});

const smokeCanonicalTestSuites: ArticlePageTestSuite[] = [
  makeSuite('/gahuza/articles/c5y51yxeg53o', 'gahuza', ['local', 'live']),
  makeSuite('/hindi/articles/c0kprrej277o', 'hindi', ['live']),
  makeSuite('/mundo/articles/ce42wzqr2mko', 'mundo', ['local', 'test']),
  makeSuite('/mundo/articles/cle16n19nd9o', 'mundo', ['test']),
  makeSuite('/mundo/articles/ce7p1pw7165o', 'mundo', ['live']),
  makeSuite('/persian/articles/cej3lzd5e0go', 'persian', ['local']),
  makeSuite('/persian/articles/cld9872jgyjo', 'persian', ['live']),
  makeSuite('/persian/articles/crgxnrdl1xvo', 'persian', ['live']),
  makeSuite('/pidgin/articles/cgwk9w4zlg8o', 'pidgin', ['live']),
  makeSuite('/pidgin/articles/crrrkxz2k0ko', 'pidgin', ['test']),
  makeSuite('/pidgin/articles/cwl08rd38l6o', 'pidgin', ['local', 'test']),
  makeSuite('/pidgin/articles/cw8qv1d11l9o', 'pidgin', ['live']),
  makeSuite('/scotland/articles/czwj5l0n210o', 'scotland', ['local']),
  makeSuite('/serbian/articles/c805k05kr73o/cyr', 'serbian', ['local'], 'cyr'),
  makeSuite('/serbian/articles/c805k05kr73o/lat', 'serbian', ['local'], 'lat'),
  makeSuite(
    '/zhongwen/articles/c3xd4x9prgyo/simp',
    'zhongwen',
    ['local'],
    'simp',
  ),
  makeSuite(
    '/zhongwen/articles/c3xd4x9prgyo/trad',
    'zhongwen',
    ['local'],
    'trad',
  ),
];

const nonSmokeCanonicalTestSuites: ArticlePageTestSuite[] = [
  makeSuite('/afaanoromoo/articles/c4g19kgl85ko', 'afaanoromoo', ['test']),
  makeSuite('/afrique/articles/cz216x22106o', 'afrique', ['test']),
  makeSuite('/arabic/articles/cl5m3453w36o', 'arabic', ['test']),
  makeSuite('/azeri/articles/cv0lm08kngmo', 'azeri', ['live']),
  makeSuite('/dari/articles/c502ljngpqeo', 'dari', ['local']),
  makeSuite('/gahuza/articles/cey23zx8wx8o', 'gahuza', ['test']),
  makeSuite('/kyrgyz/articles/c414v42gy75o', 'kyrgyz', ['live']),
  makeSuite('/kyrgyz/articles/c41knv20gk7o', 'kyrgyz', ['live']),
  makeSuite('/kyrgyz/articles/cpgx4k72wv4o', 'kyrgyz', ['live']),
  makeSuite('/magyarul/articles/cjxvnv0rvr0o', 'magyarul', ['local', 'test']),
  makeSuite('/magyarul/articles/cwy04ln10zdo', 'magyarul', ['live']),
  makeSuite('/romania/articles/c2x404ljvkro', 'romania', ['local', 'test']),
  makeSuite('/romania/articles/c3rynpp24dwo', 'romania', ['live']),
  makeSuite('/mundo/articles/ce7p1pw7165o', 'mundo', ['live']),
  makeSuite('/nepali/articles/c16ljg1v008o', 'nepali', ['live']),
  makeSuite('/polska/articles/c639526lxlro', 'polska', ['local', 'test']),
  makeSuite('/tamil/articles/cqxdxv159rlo', 'tamil', ['local', 'live']),
  makeSuite('/ukrainian/articles/c8zv0eed9gko', 'ukrainian', ['live']),
];

const atiAnalyticsTestSuites: ArticlePageAtiTestSuite[] = [
  {
    ...makeSuite('/arabic/articles/c8j91j2ljppo', 'arabic', ['local', 'live']),
    pageIdentifier: 'arabic.articles.c8j91j2ljppo.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'article',
    tests: ['assertResonancePageView'],
  },
  {
    ...makeSuite('/hausa/articles/cw43vy8zdjvo', 'hausa', ['local', 'live']),
    pageIdentifier: 'hausa.articles.cw43vy8zdjvo.page',
    siteId: 51,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    expectsResonanceEvents: false,
    tests: [
      'assertPageView',
      'assertResonancePageView',
      'assertLatestMediaComponentView',
      'assertLatestMediaComponentClick',
    ],
  },
  {
    ...makeSuite('/hindi/articles/cn8xe1llnyyo', 'hindi', ['live']),
    pageIdentifier: 'hindi.articles.cn8xe1llnyyo.page',
    siteId: 52,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [
      'assertContinueReadingButtonComponentClick',
      'assertContinueReadingButtonComponentView',
    ],
  },
  {
    ...makeSuite('/gahuza/articles/c5y51yxeg53o', 'gahuza', ['local']),
    pageIdentifier: 'gahuza.articles.c5y51yxeg53o.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [
      'assertPageView',
      'assertArticleLiteSiteLinkComponentView',
      'assertArticleLiteSiteLinkComponentClick',
      'assertFeaturesAnalysisComponentView',
      'assertFeaturesAnalysisComponentClick',
      'assertMostReadComponentView',
      'assertMostReadComponentClick',
      'assertPodcastPromoComponentView',
      'assertPodcastPromoComponentClick',
      'assertRelatedContentComponentView',
      'assertRelatedContentComponentClick',
      'assertTopStoriesComponentView',
      'assertTopStoriesComponentClick',
    ],
  },
  {
    ...makeSuite('/pidgin/articles/ce9wk6glg4lo', 'pidgin', ['local', 'live']),
    pageIdentifier: 'pidgin.articles.ce9wk6glg4lo.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [
      'assertPageView',
      'assertFeaturesAnalysisComponentView',
      'assertMostReadComponentView',
      'assertMostReadComponentClick',
      'assertRelatedContentComponentView',
      'assertRelatedContentComponentClick',
      'assertTopStoriesComponentView',
      'assertTopStoriesComponentClick',
      'assertSocialEmbedComponentView',
      'assertSocialEmbedComponentClick',
    ],
  },
  {
    ...makeSuite('/pidgin/articles/cyv3zm4y428o', 'pidgin', ['live']),
    pageIdentifier: 'pidgin.articles.cyv3zm4y428o.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [
      'assertPageView',
      'assertFeaturesAnalysisComponentView',
      'assertFeaturesAnalysisComponentClick',
      'assertMostReadComponentView',
      'assertMostReadComponentClick',
      'assertRelatedContentComponentView',
      'assertRelatedContentComponentClick',
      'assertTopStoriesComponentView',
      'assertTopStoriesComponentClick',
      'assertArticleLinksBlockComponentClick',
      'assertArticleLinksBlockComponentView',
    ],
  },
  {
    ...makeSuite('/pidgin/articles/cw0x29n2pvqo', 'pidgin', ['local', 'live']),
    pageIdentifier: 'pidgin.articles.cw0x29n2pvqo.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [
      'assertPageView',
      'assertLatestMediaComponentClick',
      'assertLatestMediaComponentView',
      'assertRelatedContentComponentView',
      'assertRelatedContentComponentClick',
    ],
  },
  {
    ...makeSuite('/polska/articles/c639526lxlro', 'polska', ['local']),
    headers: {
      'mvt-newswb_ws_topbarojs_read_more': 'experiment;top-bar-top-stories',
    },
    pageIdentifier: 'polska.articles.c639526lxlro.page',
    siteId: 135,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [
      'assertPageView',
      'assertTopBarOJComponentClick',
      'assertTopBarOJComponentView',
    ],
  },
  {
    ...makeSuite('/magyarul/articles/cwy04ln10zdo', 'magyarul', ['live']),
    pageIdentifier: 'magyarul.articles.cwy04ln10zdo.page',
    siteId: 134,
    applicationType: 'responsive',
    contentType: 'article',
    tests: ['assertPageView'],
  },
  {
    ...makeSuite('/romania/articles/c3rynpp24dwo', 'romania', ['live']),
    pageIdentifier: 'romania.articles.c3rynpp24dwo.page',
    siteId: 136,
    applicationType: 'responsive',
    contentType: 'article',
    tests: ['assertPageView'],
  },
];

const canonicalTestSuites = process.env.SMOKE
  ? smokeCanonicalTestSuites
  : nonSmokeCanonicalTestSuites;

const atiLiteExcludedTests: ArticlePageAtiTest[] = [
  'assertTopBarOJComponentView',
  'assertPodcastPromoComponentView',
  'assertPodcastPromoComponentClick',
  'assertSocialEmbedComponentView',
  'assertSocialEmbedComponentClick',
  'assertArticleLiteSiteLinkComponentView',
  'assertArticleLiteSiteLinkComponentClick',
  'assertFeaturesAnalysisComponentClick',
];

export const articlePageSuites = {
  canonical: canonicalTestSuites,
  amp: canonicalTestSuites.map(suite => ({
    ...suite,
    path: `${suite.path}.amp`,
  })),
  lite: canonicalTestSuites
    .filter(({ service }) => service !== 'news')
    .map(suite => ({ ...suite, path: `${suite.path}.lite` })),
  ati: atiAnalyticsTestSuites,
  atiAmp: atiAnalyticsTestSuites.map(suite => ({
    ...suite,
    path: `${suite.path}.amp`,
    applicationType: 'amp',
    tests: [
      'assertPageView',
      'assertResonancePageView',
    ] as ArticlePageAtiTest[],
  })),
  atiLite: atiAnalyticsTestSuites
    .filter(({ service }) => service !== 'news')
    .map(suite => ({
      ...suite,
      path: `${suite.path}.lite`,
      applicationType: 'lite',
      tests: [
        ...suite.tests.filter(
          testName =>
            !atiLiteExcludedTests.includes(testName) &&
            !testName.toLowerCase().includes('click'),
        ),
        'assertLiteSiteSummaryComponentToMainSiteClick',
      ] as ArticlePageAtiTest[],
    })),
};
