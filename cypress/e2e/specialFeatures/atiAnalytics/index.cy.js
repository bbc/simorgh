import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertPageView } from './assertions';
import { assertFeaturesAnalysisComponentClick } from './assertions/featuresAnalysis';
import { assertLiteSiteSummaryComponentToMainSiteClick } from './assertions/liteSiteSummary';
import {
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
} from './assertions/articleLiteSiteLink';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
} from './assertions/navigation';
import {
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
} from './assertions/socialEmbed';

import { setUserIDCookie } from './helpers';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';

const canonicalTestSuites = [];

const supportsAmp = ({ contentType }) =>
  !['player-live', 'player-episode', 'index-category', 'static'].includes(
    contentType,
  );

const ampTestSuites = canonicalTestSuites.filter(supportsAmp).map(testSuite => {
  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
    applicationType: 'amp',
    tests: [assertPageView],
  };
});

const liteTestSuites = canonicalTestSuites.map(testSuite => {
  const excludedLiteTests = [
    assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
    assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
    assertSocialEmbedComponentView, // Social embeds removed from lite article pages
    assertSocialEmbedComponentClick, // Social embeds removed from lite article pages
    assertArticleLiteSiteLinkComponentView, // Lite Site Link only displayed on canonical article pages
    assertArticleLiteSiteLinkComponentClick, // Lite Site Link only displayed on canonical article pages
    assertFeaturesAnalysisComponentClick, // Features & Analysis component click event test not working on lite pages
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
    siteId: testSuite.service === 'magyarul' ? 134 : testSuite.siteId,
    tests: [...liteSiteTests],
  };
});
runTestsForPage({
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  beforeAll: [setUserIDCookie],
});
