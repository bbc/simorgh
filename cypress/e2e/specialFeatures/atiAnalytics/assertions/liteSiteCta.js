import { liteEnabledServices } from '#app/components/LiteSiteCta/liteSiteConfig';
import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent } from '.';

const { LITE_SITE_CTA } = COMPONENTS;

const runIfLiteEnabled = service => {
  let run = it;
  let skipReason = '';

  if (!liteEnabledServices.includes(service)) {
    run = it.skip;
    reason = `- skipped because ${service} does not have lite enabled`;
  }

  return { run, skipReason };
};

// eslint-disable-next-line import/prefer-default-export
export const assertLiteSiteCTAComponentClick = ({
  pageIdentifier,
  contentType,
  path,
  service,
}) => {
  const { run, skipReason } = runIfLiteEnabled(service);

  run(
    `should send a click event for the Lite Site CTA component ${skipReason}`,
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-e2e="to-main-site"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-e2e="to-main-site"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: LITE_SITE_CTA,
        pageIdentifier,
        contentType,
      });
    },
  );
};
