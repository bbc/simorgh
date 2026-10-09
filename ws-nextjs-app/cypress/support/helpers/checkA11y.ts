const exclude = [
  // These elements can contain a11y violations as we have no control over what is rendered inside of them
  '.bbc-news-vj-embed-wrapper, [id^="include-"]', // VJ includes
  '[class*=dotcom], [id*=dotcom], amp-ad', // GNL ads
  '[id^="toucan-"]', // SMP Toucan player
  '[id^="hearken-"]', // Hearken embeds
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
      paths: nodes.map(({ target }) => target).join(', '),
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
      {
        /*
         * Due to the number of transient iframe elements without title attributes injected into the DOM by ads code we need to disable this rule.
         * Adding elements to the exclude array does not work because the exclude selector must only run when the DOM is ready and some ad elements are injected after the DOM ready event.
         */
        id: 'frame-title',
        enabled: false,
      },
      {
        /*
         * Our ads containers use the aria-hidden attribute however they contain focusable elements within them.
         * Disabling this rule for now until we figure out why the ads container has the aria-hidden attribute.
         */
        id: 'aria-hidden-focus',
        enabled: false,
      },
      {
        /*
         * Our ads containers sometimes cause a color contrast violation depending on what ad is loaded
         * Disabling this rule for now as we cannot work out which class/element to exclude, and we carry out contrast checks in a11y swarms so this rule is not really needed
         */
        id: 'color-contrast',
        enabled: false,
      },
    ],
  });
  cy.checkA11y(
    {
      exclude,
    },
    null,
    logA11yViolations,
  );
};

export default checkA11y;
