import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { ARTICLE_LITE_SITE_LINK } = COMPONENTS;

const runUnlessArticleLiteSiteLinkExperimentRunning = service => {
  let run = it;
  let skipReason = '';

  if (service === 'gahuza') {
    skipReason = ` - skipped because Article Lite Site Link experiment running on ${service}`;
    run = it.skip;
  }

  return { run, skipReason };
};

export const assertArticleLiteSiteLinkComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  service,
}) => {
  const { run, skipReason } =
    runUnlessArticleLiteSiteLinkExperimentRunning(service);

  run(
    `should send a view event for the Article Lite Site Link component ${skipReason}`,
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-e2e="article-lite-site-link"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: ARTICLE_LITE_SITE_LINK,
        pageIdentifier,
        contentType,
        useReverb,
      });
    },
  );
};

export const assertArticleLiteSiteLinkComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  service,
}) => {
  const { run, skipReason } =
    runUnlessArticleLiteSiteLinkExperimentRunning(service);

  run(
    `should send a click event for the Article Lite Site Link component ${skipReason}`,
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-e2e="article-lite-site-link"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-e2e="article-lite-site-link"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: ARTICLE_LITE_SITE_LINK,
        pageIdentifier,
        contentType,
        useReverb,
      });
    },
  );
};
