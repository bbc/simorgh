import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { HOME_PAGE } from '../../../../src/app/routes/utils/pageTypes';
import assertScriptSwitch from './assertions';

const testSuites = [
  // Home pages Serbian
  {
    path: '/serbian/cyr',
    service: 'serbian',
    variant: 'cyr',
    otherVariant: 'lat',
    pageType: HOME_PAGE,
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/serbian/lat',
    service: 'serbian',
    variant: 'lat',
    otherVariant: 'cyr',
    pageType: HOME_PAGE,
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Home pages Uzbek
  {
    path: '/uzbek/cyr',
    service: 'uzbek',
    variant: 'cyr',
    otherVariant: 'lat',
    pageType: HOME_PAGE,
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/uzbek/lat',
    service: 'uzbek',
    variant: 'lat',
    otherVariant: 'cyr',
    pageType: HOME_PAGE,
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Home pages Zhongwen
  {
    path: '/zhongwen/simp',
    service: 'zhongwen',
    variant: 'simp',
    otherVariant: 'trad',
    pageType: HOME_PAGE,
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/zhongwen/trad',
    service: 'zhongwen',
    variant: 'trad',
    otherVariant: 'simp',
    pageType: HOME_PAGE,
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Topic pages Serbian
  {
    path: '/serbian/topics/c1gd303q6y6t/cyr',
    service: 'serbian',
    variant: 'cyr',
    otherVariant: 'lat',
    runforEnv: ['local'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/serbian/topics/c1gd303q6y6t/lat',
    service: 'serbian',
    variant: 'lat',
    otherVariant: 'cyr',
    runforEnv: ['local'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/serbian/topics/c06g871g3knt/cyr',
    service: 'serbian',
    variant: 'cyr',
    otherVariant: 'lat',
    runforEnv: ['test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/serbian/topics/c06g871g3knt/lat',
    service: 'serbian',
    variant: 'lat',
    otherVariant: 'cyr',
    runforEnv: ['test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Topic pages Uzbek
  {
    path: '/uzbek/topics/c8y949r98pgt/cyr',
    service: 'uzbek',
    variant: 'cyr',
    otherVariant: 'lat',
    runforEnv: ['local'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/lat',
    service: 'uzbek',
    variant: 'lat',
    otherVariant: 'cyr',
    runforEnv: ['local'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/uzbek/topics/cg72626n7yyt/cyr',
    service: 'uzbek',
    variant: 'cyr',
    otherVariant: 'lat',
    runforEnv: ['test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/uzbek/topics/cg72626n7yyt/lat',
    service: 'uzbek',
    variant: 'lat',
    otherVariant: 'cyr',
    runforEnv: ['test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Topic pages Zhongwen
  {
    path: '/zhongwen/topics/cjnz1d612jzt/simp',
    service: 'zhongwen',
    variant: 'simp',
    otherVariant: 'trad',
    runforEnv: ['test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/zhongwen/topics/cjnz1d612jzt/trad',
    service: 'zhongwen',
    variant: 'trad',
    otherVariant: 'simp',
    runforEnv: ['test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Most Read Serbian
  {
    path: '/serbian/cyr/popular/read',
    service: 'serbian',
    variant: 'cyr',
    otherVariant: 'lat',
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/serbian/lat/popular/read',
    service: 'serbian',
    variant: 'lat',
    otherVariant: 'cyr',
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  // Most Read zhongwen
  {
    path: '/zhongwen/simp/popular/read',
    service: 'zhongwen',
    variant: 'simp',
    otherVariant: 'trad',
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
  {
    path: '/zhongwen/trad/popular/read',
    service: 'zhongwen',
    variant: 'trad',
    otherVariant: 'simp',
    runforEnv: ['local', 'test', 'live'],
    tests: [assertScriptSwitch],
  },
];

runTestsForPage({
  testSuites,
});
