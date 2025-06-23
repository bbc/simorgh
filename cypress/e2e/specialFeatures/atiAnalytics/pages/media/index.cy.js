import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertPageView } from '../../assertions';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../assertions/liteSiteSummary';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../assertions/navigation';
import {
  assertPodcastLinksComponentClick,
  assertPodcastLinksComponentView,
} from '../../assertions/podcastLinks';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../assertions/radioSchedule';
import {
  assertRecentAudioEpisodesComponentClick,
  assertRecentAudioEpisodesComponentView,
} from '../../assertions/recentAudioEpisodes';
import { getPathWithSuffix, setUserIDCookie } from '../../helpers';

const canonicalTestSuites = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_radio.programmes.p030s6dq.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertDropdownNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertScrollableNavigationComponentView,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv_programmes.w13xttmz.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertDropdownNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertScrollableNavigationComponentView,
    ],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w3ct05mp',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv.w3ct05mp.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.programmes.p07yh8hb.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertDropdownNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertScrollableNavigationComponentView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.p094vs2n.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.bbc_hausa_radio.liveradio.page',
    applicationType: 'responsive',
    contentType: 'player-live',
    useReverb: true,
    tests: [
      assertPageView,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t',
    runforEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.programmes.p07r3r3t.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/ukrainian/podcasts/p09jsy3h',
    runforEnv: ['test', 'live'],
    service: 'ukrainian',
    pageIdentifier:
      'ukrainian.bbc_ukrainian_audio.podcasts.programmes.p09jsy3h.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
];

const liteTestSuites = canonicalTestSuites.map(testSuite => {
  const excludedLiteTests = [
    assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
    assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
  ];

  const liteSiteTests = testSuite.tests.filter(
    test => !excludedLiteTests.includes(test),
  );

  // All lite enabled pages should have the Lite Site Summary component
  liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
    applicationType: 'lite',
    useReverb: false,
    tests: [...liteSiteTests],
  };
});

runTestsForPage({
  testSuites: [...canonicalTestSuites, ...liteTestSuites],
  beforeAll: [setUserIDCookie],
});
