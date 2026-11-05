import type { AppEnv } from '../../utilities/env';

export type OnDemandAudioTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  includeSharedPageTests: boolean;
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

// Pages are chosen to cover radio/podcast, brand/episode, LTR/RTL,
// script variants and services with toggles both on and off.
const canonicalTestSuites: OnDemandAudioTestSuite[] = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq', // Radio Brand, LTR
    service: 'afrique',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: true,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // Radio Episode, LTR
    service: 'afrique',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: false,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh2y', // Radio Brand, RTL
    service: 'arabic',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: false,
  },
  {
    path: '/arabic/bbc_arabic_radio/w172y3wn75cm441', // Radio Episode, RTL
    service: 'arabic',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: true,
  },
  {
    path: '/arabic/podcasts/p02pc9qc', // Podcast Brand, RTL
    service: 'arabic',
    runForEnv: ['local', 'test', 'live'],
    includeSharedPageTests: true,
  },
  {
    path: '/dari/bbc_dari_radio/programmes/p0340v0s', // Radio Brand, recent audio episodes toggled off
    service: 'dari',
    runForEnv: ['test'],
    includeSharedPageTests: false,
  },
  {
    path: '/hausa/podcasts/p08mlgcb', // Podcast Brand, LTR
    service: 'hausa',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: false,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode, LTR
    service: 'hausa',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: true,
  },
  {
    path: '/persian/podcasts/p02pc9wf', // Podcast Brand
    service: 'persian',
    runForEnv: ['local', 'test', 'live'],
    includeSharedPageTests: false,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t', // Podcast Brand
    service: 'portuguese',
    runForEnv: ['local', 'test', 'live'],
    includeSharedPageTests: false,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // Radio Episode, script variant, radio schedule toggled off
    service: 'zhongwen',
    runForEnv: ['test', 'live'],
    includeSharedPageTests: true,
  },
];

const atiAnalyticsPodcastComponentTests: OnDemandAudioAtiTest[] = [
  'assertPageView',
  'assertPodcastPromoComponentView',
  'assertPodcastPromoComponentClick',
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

const liteTestPaths = [
  '/afrique/bbc_afrique_radio/programmes/p030s6dq',
  '/portuguese/podcasts/p07r3r3t',
  '/portuguese/podcasts/p07r3r3t/p0ldy4p8',
];

const atiLiteTestSuites: AtiOnDemandAudioTestSuite[] = atiTestSuites
  .filter(({ path }) => liteTestPaths.includes(path))
  .map(testSuite => {
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
  });

export const onDemandAudioSuites = {
  canonical: canonicalTestSuites,
  ati: atiTestSuites,
  atiLite: atiLiteTestSuites,
};
