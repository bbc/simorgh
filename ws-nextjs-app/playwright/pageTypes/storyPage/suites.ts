import type { AppEnv } from '../../utilities/env';

export type StoryPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type StoryPageAtiTest =
  | 'assertPageView'
  | 'assertResonancePageView'
  | 'assertDropdownNavigationComponentView'
  | 'assertDropdownNavigationComponentClick'
  | 'assertScrollableNavigationComponentView'
  | 'assertScrollableNavigationComponentClick';

export type AtiStoryPageTestSuite = StoryPageTestSuite & {
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
  tests: StoryPageAtiTest[];
};

const canonicalSmokeTestSuites: StoryPageTestSuite[] = [
  {
    path: '/hausa/labarai-54292969',
    service: 'hausa',
    runForEnv: ['live'],
  },
  {
    path: '/hausa/labarai-23190660',
    service: 'hausa',
    runForEnv: ['local', 'test'],
  },
  {
    path: '/mundo/noticias-54274735',
    service: 'mundo',
    runForEnv: ['live'],
  },
  {
    path: '/mundo/noticias-66171332',
    service: 'mundo',
    runForEnv: ['live'],
  },
  {
    path: '/mundo/noticias-internacional-51266689',
    service: 'mundo',
    runForEnv: ['local'],
  },
  {
    path: '/russian/features-54391793',
    service: 'russian',
    runForEnv: ['live', 'local'],
  },
  {
    path: '/russian/news-55041160',
    service: 'russian',
    runForEnv: ['live', 'local'],
  },
  {
    path: '/thai/international-53381389',
    service: 'thai',
    runForEnv: ['live'],
  },
  {
    path: '/uzbek/uzbekistan-53263099',
    service: 'uzbek',
    runForEnv: ['local'],
  },
];

const canonicalNonSmokeTestSuites: StoryPageTestSuite[] = [
  {
    path: '/gahuza/amakuru-52821373',
    service: 'gahuza',
    runForEnv: ['live'],
  },
  {
    path: '/gahuza/23307435',
    service: 'gahuza',
    runForEnv: ['local', 'test'],
  },
  {
    path: '/igbo/afirika-52816709',
    service: 'igbo',
    runForEnv: ['live'],
  },
  {
    path: '/igbo/afirika-23252735',
    service: 'igbo',
    runForEnv: ['local', 'test'],
  },
  {
    path: '/indonesia/dunia-53413801',
    service: 'indonesia',
    runForEnv: ['live'],
  },
  {
    path: '/kyrgyz/kyrgyzstan-52891593',
    service: 'kyrgyz',
    runForEnv: ['live'],
  },
  {
    path: '/kyrgyz/23292889',
    service: 'kyrgyz',
    runForEnv: ['test'],
  },
  {
    path: '/pashto/world-52873295',
    service: 'pashto',
    runForEnv: ['live'],
  },
  {
    path: '/sinhala/world-51723376',
    service: 'sinhala',
    runForEnv: ['live'],
  },
  {
    path: '/sinhala/23225618',
    service: 'sinhala',
    runForEnv: ['test'],
  },
  {
    path: '/yoruba/afrika-58539527',
    service: 'yoruba',
    runForEnv: ['live'],
  },
  {
    path: '/yoruba/afrika-23252769',
    service: 'yoruba',
    runForEnv: ['test'],
  },
];

const atiAnalyticsTests: StoryPageAtiTest[] = [
  'assertPageView',
  'assertDropdownNavigationComponentView',
  'assertDropdownNavigationComponentClick',
  'assertScrollableNavigationComponentView',
  'assertScrollableNavigationComponentClick',
];

const atiAnalyticsTestSuites: AtiStoryPageTestSuite[] = [
  {
    path: '/hausa/labarai-54292969',
    runForEnv: ['live'],
    service: 'hausa',
    pageIdentifier: 'hausa.news.story.54292969.page',
    siteId: 51,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/mundo/noticias-54274735',
    runForEnv: ['live'],
    service: 'mundo',
    pageIdentifier: 'mundo.also_in_the_news.story.54274735.page',
    siteId: 62,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/russian/news-55041160',
    runForEnv: ['live'],
    service: 'russian',
    pageIdentifier: 'russian.news.story.55041160.page',
    siteId: 75,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/thai/international-53381389',
    runForEnv: ['live'],
    service: 'thai',
    pageIdentifier: 'thai.international.story.53381389.page',
    siteId: 90,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/marathi/india-53414454',
    runForEnv: ['live'],
    service: 'marathi',
    pageIdentifier: 'marathi.india.story.53414454.page',
    siteId: 59,
    applicationType: 'responsive',
    contentType: 'article',
    tests: ['assertResonancePageView'],
  },
];

const canonicalTestSuites = process.env.SMOKE
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

export const storyPageSuites = {
  canonical: canonicalTestSuites,
  amp: canonicalTestSuites.map(testSuite => ({
    ...testSuite,
    path: `${testSuite.path}.amp`,
  })),
  lite: canonicalSmokeTestSuites
    .filter(({ service }) => service !== 'news' && service !== 'hausa')
    .map(testSuite => ({ ...testSuite, path: `${testSuite.path}.lite` })),
  ati: atiAnalyticsTestSuites,
};
