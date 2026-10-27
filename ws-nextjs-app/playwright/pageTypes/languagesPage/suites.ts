import type { AppEnv } from '../../utilities/env';

export type LanguagesPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type AtiLanguagesPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
};

const canonicalTestSuites: LanguagesPageTestSuite[] = [
  {
    path: '/ws/languages',
    service: 'ws',
    runForEnv: ['local', 'test', 'live'],
  },
];

const atiTestSuites: AtiLanguagesPageTestSuite[] = [
  {
    path: '/ws/languages',
    service: 'ws',
    runForEnv: ['local', 'test', 'live'],
    pageIdentifier: 'ws.languages.page',
    siteId: 30,
    applicationType: 'responsive',
    contentType: 'index-home',
  },
];

export const languagesPageSuites = {
  canonical: canonicalTestSuites,
  ati: atiTestSuites,
};
