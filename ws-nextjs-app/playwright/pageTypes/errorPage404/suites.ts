export type AppEnv = 'local' | 'test' | 'live';

export type ErrorPageTestSuite = {
  path: string;
  service: string;
  variant?: string;
  runforEnv: AppEnv[];
};

const canonicalTestSuites: ErrorPageTestSuite[] = [
  {
    path: '/arabic/articles/c123456abcdo',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
  },
  {
    path: '/mundo/articles/c123456abcdo',
    service: 'mundo',
    runforEnv: ['local', 'test', 'live'],
  },
  {
    path: '/serbian/articles/c123456abcdo/cyr',
    service: 'serbian',
    variant: 'cyr',
    runforEnv: ['local', 'test', 'live'],
  },
  {
    path: '/serbian/articles/c123456abcdo/lat',
    service: 'serbian',
    variant: 'lat',
    runforEnv: ['local', 'test', 'live'],
  },
  {
    path: '/ukrainian/articles/c123456abcdo',
    service: 'ukrainian',
    runforEnv: ['local', 'test', 'live'],
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
