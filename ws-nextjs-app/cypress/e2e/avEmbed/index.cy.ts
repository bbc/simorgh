import pageVisit from './pageVisit';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testDetails = {
  pageType: 'avEmbed',
  testSuites: [
    {
      path: '/russian/av-embeds/media-38886884',
      runforEnv: ['live'],
      id: 'media-38886884',
      service: 'russian',
      tests: [pageVisit],
    },
  ],
};

describe('AVEmbed Page Spec', () => {
  runTestsForPage(testDetails);
});
