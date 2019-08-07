Cypress.Commands.add('hasExpectedJsBundles', (host, service) => {
  cy.get('script[src]').each($p => {
    if ($p.attr('src').includes(host)) {
      return expect($p.attr('src')).to.match(
        new RegExp(
          `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
          'g',
        ),
      );
    }
    return null;
  });
});

Cypress.Commands.add('hasOneServiceBundle', service => {
  let matches = 0;

  cy.get('script[src]')
    .each($p => {
      const match = $p
        .attr('src')
        .match(
          new RegExp(`(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`, 'g'),
        );

      if (match) {
        matches += 1;
      }
    })
    .then(() => {
      expect(matches).to.equal(1);
    });
});
