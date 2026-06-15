import type { AppEnv } from '../../utilities/env';

export type LiveTvPageTestSuite = {
  path: string;
  service: string;
  variant?: string;
  runforEnv: AppEnv[];
};

const canonicalTestSuites: LiveTvPageTestSuite[] = [
  {
    path: '/dari/watch/bbc_afghan_tv/live',
    service: 'dari',
    runforEnv: ['local', 'test'],
  },
];

export const liveTvPageSuites = {
  canonical: canonicalTestSuites,
};
