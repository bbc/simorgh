const interceptArticleOnwardJourney = (onwardJourney: string) => {
  const alias = `article-onward-journey-${onwardJourney}`;

  cy.intercept({
    method: 'GET',
    pathname: '/fd/simorgh-bff',
    query: { onwardJourney },
  }).as(alias);

  return `@${alias}`;
};

export default interceptArticleOnwardJourney;
