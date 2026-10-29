const interceptArticleOnwardJourney = (onwardJourney: string) => {
  const alias = `article-onward-journey-${onwardJourney}`;

  cy.intercept({
    method: 'GET',
    pathname: '/fd/simorgh-bff',
    query: { onwardJourney },
  }).as(alias);

  return `@${alias}`;
};

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
    applicationType === 'responsive'
      ? interceptArticleOnwardJourney(onwardJourney)
      : undefined;

  cy.visit(path);

  if (onwardJourneyAlias) {
    cy.wait(onwardJourneyAlias).then(({ response }) => {
      if (response?.statusCode !== 200) testContext.skip();
    });
  }
};

export default interceptArticleOnwardJourney;
