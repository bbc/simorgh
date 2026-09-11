import type { AppEnv } from '../../utilities/env';

export type ErrorPageTestSuite = {
  path: string;
  service: string;
  variant?: string;
  runForEnv: AppEnv[];
};

const canonicalTestSuites: ErrorPageTestSuite[] = [
  {
    path: '/arabic/articles/c123456abcdo',
    service: 'arabic',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/mundo/articles/c123456abcdo',
    service: 'mundo',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/serbian/articles/c123456abcdo/cyr',
    service: 'serbian',
    variant: 'cyr',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/serbian/articles/c123456abcdo/lat',
    service: 'serbian',
    variant: 'lat',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/ukrainian/articles/c123456abcdo',
    service: 'ukrainian',
    runForEnv: ['local', 'test', 'live'],
  },
];

const ampTestSuites = canonicalTestSuites.map(testSuite => ({
  ...testSuite,
  path: `${testSuite.path}.amp`,
}));

export const errorPage404Suites = {
  canonical: canonicalTestSuites,
  amp: ampTestSuites,
};
