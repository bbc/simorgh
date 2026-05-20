/* eslint-disable no-underscore-dangle */

import context from '../context';
import runTestsForPage from '../runTestsForPage';
import { assertLoadsExpectedBundles } from './assertions';

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
    service: 'pidgin',
    runforEnv: ['local'],
    tests: [assertLoadsExpectedBundles],
  },
  {
    path: '/serbian/cyr',
    service: 'serbian',
    runforEnv: 'local',
    variant: 'cyr',
    tests: [assertLoadsExpectedBundles],
  },
  {
    path: '/serbian/lat',
    service: 'serbian',
    runforEnv: 'local',
    variant: 'lat',
    tests: [assertLoadsExpectedBundles],
  },
];

runTestsForPage({ testSuites, onPageRequest });
