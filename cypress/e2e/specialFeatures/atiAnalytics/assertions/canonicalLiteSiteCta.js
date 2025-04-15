import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { CANONICAL_LITE_CTA } = COMPONENTS;

const runUnlessCanonicalToLiteSiteCTAExperimentRunning = service => {
  let run = it;
  let skipReason = '';

  if (service === 'gahuza') {
    skipReason = ` - skipped because Canonical to Lite Site CTA experiment running on ${service}`;
    run = it.skip;
  }

  return { run, skipReason };
};

export const assertCanonicalToLiteSiteCTAComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  service,
}) => {
  const { run, skipReason } =
    runUnlessCanonicalToLiteSiteCTAExperimentRunning(service);

  run(
    `should send a view event for the Canonical to Lite Site CTA component ${skipReason}`,
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-e2e="to-lite-site"]').scrollIntoView({ duration: 1000 });

      assertATIComponentViewEvent({
        component: CANONICAL_LITE_CTA,
        pageIdentifier,
        contentType,
        useReverb,
      });
    },
  );
};

export const assertCanonicalToLiteSiteCTAComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  service,
}) => {
  const { run, skipReason } =
    runUnlessCanonicalToLiteSiteCTAExperimentRunning(service);

  run(
    `should send a click event for the Canonical to Lite Site CTA component ${skipReason}`,
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-e2e="to-lite-site"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-e2e="to-lite-site"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: CANONICAL_LITE_CTA,
        pageIdentifier,
        contentType,
        useReverb,
      });
    },
  );
};
