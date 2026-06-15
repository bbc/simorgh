import type { AppEnv } from '../../utilities/env';

export type LivePageTestSuite = {
  path: string;
  service: string;
  variant?: string;
  runforEnv: AppEnv[];
  hasMediaPlayer?: boolean;
};

export type AtiLivePageTestSuite = {
  path: string;
  service: string;
  runforEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
};

const livePageTestSuites: LivePageTestSuite[] = [
  {
    path: '/pidgin/live/c7p765ynk9qt',
    service: 'pidgin',
    runforEnv: ['local'],
    hasMediaPlayer: true,
  },
  {
    path: '/urdu/live/cx2qdkezzzvt',
    service: 'urdu',
    runforEnv: ['live'],
  },
];

const livePageAtiTestSuites: AtiLivePageTestSuite[] = [
  {
    path: '/arabic/live/cvp5r6m6mgpt',
    service: 'arabic',
    runforEnv: ['local', 'test'],
    pageIdentifier: 'live_coverage.cvp5r6m6mgpt.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'live-coverage',
  },
  {
    path: '/pidgin/live/c7p765ynk9qt',
    service: 'pidgin',
    runforEnv: ['local'],
    pageIdentifier: 'live_coverage.c7p765ynk9qt.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'live-coverage',
  },
  {
    path: '/urdu/live/cx2qdkezzzvt',
    service: 'urdu',
    runforEnv: ['live'],
    pageIdentifier: 'live_coverage.cx2qdkezzzvt.page',
    siteId: 95,
    applicationType: 'responsive',
    contentType: 'live-coverage',
  },
];

export const livePageSuites = {
  canonical: livePageTestSuites,
  ati: livePageAtiTestSuites,
};
