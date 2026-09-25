import type { AppEnv } from '../../utilities/env';

export type OnDemandTVTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type OnDemandTVAtiTest =
  | 'assertPageView'
  | 'assertResonancePageView'
  | 'assertDropdownNavigationComponentView'
  | 'assertDropdownNavigationComponentClick'
  | 'assertLiteSiteSummaryComponentToMainSiteClick';

export type AtiOnDemandTVTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
  tests: OnDemandTVAtiTest[];
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

const canonicalTestSuites: OnDemandTVTestSuite[] = [
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz',
    service: 'afrique',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv',
    service: 'afrique',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3',
    service: 'burmese',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw',
    service: 'burmese',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr',
    service: 'gujarati',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj',
    service: 'gujarati',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0',
    service: 'hausa',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/hausa/bbc_hausa_tv/tv/w172yjj83ptptnj',
    service: 'hausa',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw',
    service: 'hindi',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp',
    service: 'hindi',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx',
    service: 'kyrgyz',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562',
    service: 'kyrgyz',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',
    service: 'pashto',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1',
    service: 'pashto',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/persian/bbc_persian_tv/tv_programmes/w13xttnr',
    service: 'persian',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx',
    service: 'persian',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/somali/bbc_somali_tv/tv_programmes/w13xttqt',
    service: 'somali',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z',
    service: 'somali',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3',
    service: 'swahili',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n',
    service: 'swahili',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy',
    service: 'tamil',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv',
    service: 'tamil',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/telugu/bbc_telugu_tv/tv_programmes/w13xttld',
    service: 'telugu',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p',
    service: 'telugu',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9',
    service: 'ukrainian',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m',
    service: 'ukrainian',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/ukrainian/bbc_ukrainian_tv/tv/w172xct4hclz27g',
    service: 'ukrainian',
    runForEnv: ['local'],
  },
  {
    path: '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1',
    service: 'urdu',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n',
    service: 'urdu',
    runForEnv: ['test', 'live'],
  },
  {
    path: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv',
    service: 'uzbek',
    runForEnv: ['local', 'test', 'live'],
  },
  {
    path: '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz',
    service: 'uzbek',
    runForEnv: ['test', 'live'],
  },
];

const atiTestSuites: AtiOnDemandTVTestSuite[] = [
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz',
    runForEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv_programmes.w13xttmz.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: ['assertPageView'],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w3ct05mp',
    runForEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv.w3ct05mp.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: ['assertPageView'],
  },
  {
    path: '/arabic/bbc_arabic_tv/tv_programmes/w13xtw9k',
    runForEnv: ['local'],
    service: 'arabic',
    pageIdentifier: 'arabic.bbc_arabic_tv.tv_programmes.w13xtw9k.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: ['assertResonancePageView'],
  },
];

const liteTestSuites: OnDemandTVTestSuite[] = canonicalTestSuites.map(
  testSuite => ({
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
  }),
);

const atiLiteTestSuites: AtiOnDemandTVTestSuite[] = atiTestSuites.map(
  testSuite => {
    const excludedLiteTests: OnDemandTVAtiTest[] = [
      'assertDropdownNavigationComponentView',
      'assertDropdownNavigationComponentClick',
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

export const onDemandTVSuites = {
  canonical: canonicalTestSuites,
  lite: liteTestSuites,
  ati: atiTestSuites,
  atiLite: atiLiteTestSuites,
};