const exclude = [
  '[id^="include-"]', // VJ includes (we have no control over these)
];

const logA11yViolations = violations => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`,
  );

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      'rule id': id,
      impact,
      description,
      occurrences: nodes.length,
      paths: nodes.map(({ target }) => target).join('\n'),
    }),
  );

  cy.task('table', violationData);
};

const checkA11y = () => {
  cy.injectAxe();
  cy.configureAxe({
    runOnly: {
      type: 'tag',
      values: ['wcag21a', 'wcag21aa', 'wcag2a', 'wcag2aa', 'best-practice'],
    },
    rules: [
      {
        /*
         * We need to exclude this rule for AV embeds because of the inner & outer double iframe setup we have with media players.
         * When Toucan is implemented we won't have iframes so we can remove the disabling of the frame-title-unique rule.
         * Please remove this when Toucan is implemented so we can catch real frame-title-unique a11y errors.
         */
        id: 'frame-title-unique',
        selector: '*:not([src*="/ws/av-embeds/"])',
      },
    ],
  });
  cy.checkA11y(
    {
      exclude: [exclude],
    },
    null,
    logA11yViolations,
  );
};

export default checkA11y;
