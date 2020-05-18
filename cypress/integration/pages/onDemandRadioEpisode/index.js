import services from '../../../support/config/services';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import getPaths from '../../../support/helpers/getPaths';
import visitPage from '../../../support/helpers/visitPage';

import { testsThatFollowSmokeTestConfigForAMPOnly } from './testsForAMPOnly';
import { testsThatFollowSmokeTestConfigForCanonicalOnly } from './testsForCanonicalOnly';

const runAmpTests = testsThatFollowSmokeTestConfigForAMPOnly;
const runCanonicalTests = testsThatFollowSmokeTestConfigForCanonicalOnly;

const pageType = 'onDemandRadioEpisode';

Object.keys(services)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    const { variant, name: service } = services[serviceId];

    const enabledPaths = getPaths(serviceId, pageType);

    let currentPath;
    if (enabledPaths.length > 0) {
      // Get the latest episode for this service from live
      const scheduleDataPath = `https://www.bbc.com/${enabledPaths[0]}/schedule.json`;

      fetch(`${scheduleDataPath}`).then(({ body: scheduleJsonData }) => {
        const episodeId = scheduleJsonData.schedules[0].episode.pid;
        currentPath = `${enabledPaths[0]}/${episodeId}`;
      });
    }

    console.log(currentPath);

    let testArgs;
    fetch(`${currentPath}.json`).then(({ body: jsonData }) => {
      testArgs = {
        service,
        pageType,
        variant,
        jsonData,
      };
    });

    describe(` - ${currentPath} - Canonical`, () => {
      before(() => {
        visitPage(currentPath, pageType);
      });

      runCanonicalTests(testArgs);
    });

    describe(`${pageType} - ${currentPath} - AMP`, () => {
      before(() => {
        visitPage(`${currentPath}.amp`, pageType);
      });

      runAmpTests(testArgs);
    });
  });
