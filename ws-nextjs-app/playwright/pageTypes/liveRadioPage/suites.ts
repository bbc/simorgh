import type { AppEnv } from '../../utilities/env';

export type LiveRadioPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type AtiLiveRadioPageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
};

const canonicalTestSuites: LiveRadioPageTestSuite[] = [
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
    service: 'afaanoromoo',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/afrique/bbc_afrique_radio/liveradio',
    service: 'afrique',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/amharic/bbc_amharic_radio/liveradio',
    service: 'amharic',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/arabic/bbc_arabic_radio/liveradio',
    service: 'arabic',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/burmese/bbc_burmese_radio/liveradio',
    service: 'burmese',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/dari/bbc_dari_radio/liveradio',
    service: 'dari',
    runForEnv: ['test'],
  },
  {
    path: '/gahuza/bbc_gahuza_radio/liveradio',
    service: 'gahuza',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    service: 'hausa',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/korean/bbc_korean_radio/liveradio',
    service: 'korean',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio',
    service: 'nepali',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/pashto/bbc_pashto_radio/liveradio',
    service: 'pashto',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/somali/bbc_somali_radio/liveradio',
    service: 'somali',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/swahili/bbc_swahili_radio/liveradio',
    service: 'swahili',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/liveradio',
    service: 'tigrinya',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/uzbek/bbc_uzbek_radio/liveradio',
    service: 'uzbek',
    runForEnv: ['local', 'test', 'live'],
  },
];

const atiTestSuites: AtiLiveRadioPageTestSuite[] = [
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    runForEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.bbc_hausa_radio.liveradio.page',
    siteId: 51,
    applicationType: 'responsive',
    contentType: 'player-live',
  },
];

export const liveRadioPageSuites = {
  canonical: canonicalTestSuites,
  ati: atiTestSuites,
};
