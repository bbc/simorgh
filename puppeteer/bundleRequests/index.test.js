/* eslint-disable no-underscore-dangle */

import {
  assertLoadsExpectedBundles,
  assertLoadsModernBundles,
} from './assertions';
import runTestsForPage from '../runTestsForPage';
import context from '../context';

global.Cypress = { env: () => 'local' };

jest.setTimeout(context.TIMEOUT); // overriding the default jest timeout

const onPageRequest = request => {
  if (!context.page.__requests) {
    context.page.__requests = [];
  }
  context.page.__requests.push(request.url());
};

const testSuites = [
  {
    path: '/pidgin',
    pageType: 'homepage',
    service: 'pidgin',
    runforEnv: ['local'],
    tests: [assertLoadsExpectedBundles, assertLoadsModernBundles],
  },
  {
    path: '/serbian/cyr',
    pageType: 'homepage',
    service: 'serbian',
    runforEnv: 'local',
    variant: 'cyr',
    tests: [assertLoadsExpectedBundles, assertLoadsModernBundles],
  },
  {
    path: '/serbian/lat',
    pageType: 'homepage',
    service: 'serbian',
    runforEnv: 'local',
    variant: 'lat',
    tests: [assertLoadsExpectedBundles, assertLoadsModernBundles],
  },
];

runTestsForPage({ testSuites, onPageRequest });
