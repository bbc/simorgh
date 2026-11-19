import type { AppEnv } from '../../utilities/env';

export type LiveTvPageTestSuite = {
  path: string;
  service: string;
  variant?: string;
  runForEnv: AppEnv[];
};

export type AtiLiveTvPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
};

const canonicalTestSuites: LiveTvPageTestSuite[] = [
  {
    path: '/dari/watch/bbc_afghan_tv/live',
    service: 'dari',
    runForEnv: ['local', 'test'],
  },
];

const atiTestSuites: AtiLiveTvPageTestSuite[] = [
  {
    path: '/arabic/watch/bbc_arabic_tv/live',
    runForEnv: ['live'],
    service: 'arabic',
    pageIdentifier: 'arabic.bbc_arabic_tv.livetv.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'player-live',
  },
];

export const liveTvPageSuites = {
  canonical: canonicalTestSuites,
  ati: atiTestSuites,
};
