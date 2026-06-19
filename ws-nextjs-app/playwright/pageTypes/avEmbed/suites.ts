import type { AppEnv } from '../../utilities/env';

export type AvEmbedTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

const canonicalTestSuites: AvEmbedTestSuite[] = [
  {
    path: '/russian/av-embeds/media-38886884',
    service: 'russian',
    runForEnv: ['live'],
  },
];

export const avEmbedSuites = {
  canonical: canonicalTestSuites,
};
