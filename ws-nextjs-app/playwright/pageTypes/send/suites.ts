import type { AppEnv } from '../../utilities/env';

export type SendPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

const canonicalTestSuites: SendPageTestSuite[] = [
  {
    path: '/somali/send/u130092370',
    service: 'somali',
    runForEnv: ['test', 'local'],
  },
  {
    path: '/mundo/send/u50853489',
    service: 'mundo',
    runForEnv: ['live', 'local'],
  },
];

const liteTestSuites: SendPageTestSuite[] = canonicalTestSuites.map(
  testSuite => ({
    ...testSuite,
    path: `${testSuite.path}.lite`,
  }),
);

export const sendPageSuites = {
  canonical: canonicalTestSuites,
  lite: liteTestSuites,
};
