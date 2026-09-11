import type { AppEnv } from '../../utilities/env';

export type MostReadPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type AtiMostReadPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
};

const canonicalTestSuites: MostReadPageTestSuite[] = [
  {
    path: '/pidgin/popular/read',
    service: 'pidgin',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/arabic/popular/read',
    service: 'arabic',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/igbo/popular/read',
    service: 'igbo',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/serbian/cyr/popular/read',
    service: 'serbian',
    runForEnv: ['test', 'live'],
  },
];

const liteTestSuites: MostReadPageTestSuite[] = canonicalTestSuites.map(
  testSuite => ({
    ...testSuite,
    path: `${testSuite.path}.lite`,
  }),
);

const atiTestSuites: AtiMostReadPageTestSuite[] = [
  {
    path: '/pidgin/popular/read',
    service: 'pidgin',
    runForEnv: ['local', 'test', 'live'],
    pageIdentifier: 'pidgin.popular.read.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'list-datadriven',
  },
];

const atiLiteTestSuites: AtiMostReadPageTestSuite[] = atiTestSuites.map(
  testSuite => ({
    ...testSuite,
    path: `${testSuite.path}.lite`,
    applicationType: 'lite',
  }),
);

export const mostReadPageSuites = {
  canonical: canonicalTestSuites,
  lite: liteTestSuites,
  ati: atiTestSuites,
  atiLite: atiLiteTestSuites,
};
