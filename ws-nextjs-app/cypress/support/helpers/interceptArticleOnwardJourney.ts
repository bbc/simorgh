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

const renderedOnwardJourneySelectors: Record<string, string> = {
  topStoriesAndFeatures:
    '[data-testid="top-stories"], [data-testid="features"]',
  mostRead: '[data-e2e="most-read"]',
  latestMedia: '[data-testid="latest-media"]',
};

export const visitArticlePageAndWaitForOnwardJourney = ({
  path,
  applicationType,
  onwardJourney,
  testContext,
  headers,
  triggerSelector,
}: {
  path: string;
  applicationType: string;
  onwardJourney: string;
  testContext: { skip: () => void };
  headers?: Record<string, string>;
  triggerSelector?: string;
}) => {
  const onwardJourneyAlias =
    applicationType === 'responsive' && path.includes('/articles/')
      ? interceptArticleOnwardJourney(onwardJourney)
      : undefined;

  if (onwardJourneyAlias) {
    clearOnwardJourneyCache();
  }

  cy.visit(path, {
    ...(headers && { headers }),
  });

  if (onwardJourneyAlias) {
    const selectors = [
      triggerSelector,
      `[data-testid="onward-journey-skeleton-${onwardJourney}"]`,
      `[data-testid="onward-journey-reservation-${onwardJourney}"]`,
      renderedOnwardJourneySelectors[onwardJourney],
    ].filter(Boolean);
    cy.get(selectors.join(', ')).filter(':visible').first().scrollIntoView();
    cy.wait(onwardJourneyAlias).then(({ response }) => {
      if (response?.statusCode !== 200) testContext.skip();
    });
  }
};

export default interceptArticleOnwardJourney;
