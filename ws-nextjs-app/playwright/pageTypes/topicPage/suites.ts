import type { AppEnv } from '../../utilities/env';

export type TopicPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  variant?: string;
  includeTopicTests: boolean;
  includeUrlValidation: boolean;
  includeCanonicalSharedTests: boolean;
};

export type AtiTopicPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
};

const canonicalTestSuites: TopicPageTestSuite[] = [
  {
    path: '/arabic/topics/cwr9j7nv58nt',
    service: 'arabic',
    runForEnv: ['local', 'test', 'live'],
    includeTopicTests: true,
    includeUrlValidation: true,
    includeCanonicalSharedTests: true,
  },
  {
    path: '/persian/topics/cw9qgeqd1zqt',
    service: 'persian',
    runForEnv: ['test', 'live'],
    includeTopicTests: false,
    includeUrlValidation: true,
    includeCanonicalSharedTests: false,
  },
  {
    path: '/pidgin/topics/c95y35941vrt',
    service: 'pidgin',
    runForEnv: ['local', 'test', 'live'],
    includeTopicTests: true,
    includeUrlValidation: true,
    includeCanonicalSharedTests: true,
  },
  {
    path: '/portuguese/topics/cx2ggnx4j72t',
    service: 'portuguese',
    runForEnv: ['test', 'live'],
    includeTopicTests: false,
    includeUrlValidation: true,
    includeCanonicalSharedTests: false,
  },
  {
    path: '/serbian/topics/c1gd303q6y6t/lat',
    service: 'serbian',
    runForEnv: ['local', 'test', 'live'],
    variant: 'lat',
    includeTopicTests: true,
    includeUrlValidation: true,
    includeCanonicalSharedTests: true,
  },
  {
    path: '/ukrainian/topics/c61k92vrqz6t',
    service: 'ukrainian',
    runForEnv: ['test', 'live'],
    includeTopicTests: true,
    includeUrlValidation: true,
    includeCanonicalSharedTests: true,
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/cyr',
    service: 'uzbek',
    runForEnv: ['local', 'test', 'live'],
    variant: 'cyr',
    includeTopicTests: true,
    includeUrlValidation: true,
    includeCanonicalSharedTests: true,
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/lat',
    service: 'uzbek',
    runForEnv: ['local', 'test', 'live'],
    variant: 'lat',
    includeTopicTests: true,
    includeUrlValidation: true,
    includeCanonicalSharedTests: true,
  },
];

const atiTestSuites: AtiTopicPageTestSuite[] = [
  {
    path: '/marathi/topics/c1wmk63rjkvt',
    runForEnv: ['local', 'live'],
    service: 'marathi',
    pageIdentifier: 'marathi.topics.c1wmk63rjkvt.page',
    siteId: 59,
    applicationType: 'responsive',
    contentType: 'index-category',
  },
  {
    path: '/portuguese/topics/cx2ggnx4j72t',
    runForEnv: ['test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.topics.cx2ggnx4j72t.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'index-category',
  },
];

const atiLiteTestSuites: AtiTopicPageTestSuite[] = atiTestSuites.map(
  testSuite => ({
    ...testSuite,
    path: `${testSuite.path}.lite`,
    applicationType: 'lite',
  }),
);

export const topicPageSuites = {
  canonical: canonicalTestSuites,
  ati: atiTestSuites,
  atiLite: atiLiteTestSuites,
};
