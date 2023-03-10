import path from 'ramda/src/path';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import {
  getBlockData,
  getVideoEmbedUrl,
  fetchArticlePageData,
} from './helpers';
import config from '../../../support/config/services';
import { serviceNumerals } from '../../../../src/app/legacy/containers/MostRead/Canonical/Rank';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => { });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    // TBD
  });
};
// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => { });
};
