import type { AppEnv } from '../../utilities/env';

export type OnDemandAudioTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type OnDemandAudioAtiTest =
  | 'assertPageView'
  | 'assertResonancePageView'
  | 'assertPodcastLinksComponentView'
  | 'assertPodcastLinksComponentClick'
  | 'assertRecentAudioEpisodesComponentView'
  | 'assertRecentAudioEpisodesComponentClick'
  | 'assertPodcastPromoComponentView'
  | 'assertPodcastPromoComponentClick'
  | 'assertRadioScheduleComponentView'
  | 'assertRadioScheduleComponentClick'
  | 'assertLiteSiteSummaryComponentToMainSiteClick';

export type AtiOnDemandAudioTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
  tests: OnDemandAudioAtiTest[];
};

const getPathWithSuffix = ({
  path,
  suffix,
}: {
  path: string;
  suffix: string;
}) => {
  const normalizedSuffix = suffix.startsWith('.') ? suffix : `.${suffix}`;
  return `${path}${normalizedSuffix}`;
};

const canonicalTestSuites: OnDemandAudioTestSuite[] = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq',
    service: 'afrique',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/afrique/bbc_afrique_radio/w172y1g3d9108lh',
    service: 'afrique',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh2y',
    service: 'arabic',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/arabic/bbc_arabic_radio/w172y3wn75cm441',
    service: 'arabic',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/arabic/podcasts/p02pc9qc',
    service: 'arabic',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/arabic/podcasts/p02pc9qc/p09kwwfs',
    service: 'arabic',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/dari/bbc_dari_radio/programmes/p0340v0s',
    service: 'dari',
    runForEnv: ['test'],
  },
  {
    path: '/dari/bbc_dari_radio/w172y2n5p9pfj6x',
    service: 'dari',
    runForEnv: ['test'],
  },
  {
    path: '/hausa/bbc_hausa_radio/programmes/p030s4mh',
    service: 'hausa',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hausa/bbc_hausa_radio/w3ct1qzn',
    service: 'hausa',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hausa/podcasts/p08mlgcb',
    service: 'hausa',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p09l0fw6',
    service: 'hausa',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hindi/podcasts/p0552909',
    service: 'hindi',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hindi/podcasts/p0552909/p09kjqjm',
    service: 'hindi',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/persian/podcasts/p02pc9wf',
    service: 'persian',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/persian/podcasts/p02pc9wf/p09knl1v',
    service: 'persian',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t',
    service: 'portuguese',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p09clrrg',
    service: 'portuguese',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/russian/podcasts/p05607v8/p06x0tn3',
    service: 'russian',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/russian/podcasts/p05607v8',
    service: 'russian',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/urdu/bbc_urdu_radio/programmes/p03413l5',
    service: 'urdu',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/urdu/bbc_urdu_radio/w172y03qq2blt8p',
    service: 'urdu',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp',
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
  },
];

const atiAnalyticsPodcastComponentTests: OnDemandAudioAtiTest[] = [
  'assertPageView',
  'assertPodcastLinksComponentView',
  'assertPodcastLinksComponentClick',
  'assertRecentAudioEpisodesComponentView',
  'assertRecentAudioEpisodesComponentClick',
];

const atiTestSuites: AtiOnDemandAudioTestSuite[] = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq',
    runForEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_radio.programmes.p030s6dq.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [
      'assertPageView',
      'assertRecentAudioEpisodesComponentView',
      'assertRecentAudioEpisodesComponentClick',
      'assertRadioScheduleComponentView',
      'assertRadioScheduleComponentClick',
    ],
  },
  {
    path: '/arabic/bbc_arabic_radio/w3ct01yb',
    runForEnv: ['local', 'test', 'live'],
    service: 'arabic',
    pageIdentifier: 'arabic.bbc_arabic_radio.w3ct01yb.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: ['assertPageView', 'assertResonancePageView'],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb',
    runForEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.programmes.p07yh8hb.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n',
    runForEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.p094vs2n.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t',
    runForEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.programmes.p07r3r3t.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p0ldy4p8',
    runForEnv: ['test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.p0ldy4p8.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/ukrainian/podcasts/p09jsy3h',
    runForEnv: ['test', 'live'],
    service: 'ukrainian',
    pageIdentifier:
      'ukrainian.bbc_ukrainian_audio.podcasts.programmes.p09jsy3h.page',
    siteId: 94,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
];

const atiLiteTestSuites: AtiOnDemandAudioTestSuite[] = atiTestSuites.map(
  testSuite => {
    const excludedLiteTests: OnDemandAudioAtiTest[] = [
      'assertPodcastPromoComponentView',
      'assertPodcastPromoComponentClick',
    ];

    const liteSiteTests = testSuite.tests.filter(
      assertion => !excludedLiteTests.includes(assertion),
    );

    liteSiteTests.push('assertLiteSiteSummaryComponentToMainSiteClick');

    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
      applicationType: 'lite',
      tests: [...liteSiteTests],
    };
  },
);

export const onDemandAudioSuites = {
  canonical: canonicalTestSuites,
  ati: atiTestSuites,
  atiLite: atiLiteTestSuites,
};
