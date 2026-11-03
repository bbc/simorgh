const interceptArticleOnwardJourney = (onwardJourney: string) => {
  const alias = `article-onward-journey-${onwardJourney}`;

  cy.intercept({
    method: 'GET',
    pathname: '/fd/simorgh-bff',
    query: { onwardJourney },
  }).as(alias);

  return `@${alias}`;
};

const clearOnwardJourneyCache = () =>
  cy
    .window()
    .then(window => window.caches?.delete('simorghOnwardJourneysCache_v1'));

export const visitArticlePageAndWaitForOnwardJourney = ({
  path,
  applicationType,
  onwardJourney,
  testContext,
}: {
  path: string;
  applicationType: string;
  onwardJourney: string;
  testContext: { skip: () => void };
}) => {
  const onwardJourneyAlias =
    applicationType === 'responsive' && path.includes('/articles/')
      ? interceptArticleOnwardJourney(onwardJourney)
      : undefined;

  if (onwardJourneyAlias) {
    clearOnwardJourneyCache();
  }

  cy.visit(path);

  if (onwardJourneyAlias) {
    cy.get(
      `[data-testid="onward-journey-skeleton-${onwardJourney}"]`,
    ).scrollIntoView();
    cy.wait(onwardJourneyAlias).then(({ response }) => {
      if (response?.statusCode !== 200) testContext.skip();
    });
  }
};

export default interceptArticleOnwardJourney;
