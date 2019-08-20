const getServiceBundleName = (service, serviceVariantConfig) => {
  const serviceVariantBundleName = {
    serbianLat: 'serbian_lat',
    serbianCyr: 'serbian_cyr',
    ukchinaSimp: 'ukchina_simp',
    ukchinaTrad: 'ukchina_trad',
    zhongwenSimp: 'zhongwen_simp',
    zhongwenTrad: 'zhongwen_trad',
  }
  const serviceBundleName = serviceVariantConfig ? serviceVariantBundleName[serviceVariantConfig] : service

  return serviceBundleName
}

Cypress.Commands.add('hasExpectedJsBundles', (host, service, serviceVariantConfig) => {
  const serviceBundleName = getServiceBundleName(service, serviceVariantConfig)
  cy.get('script[src]').each($p => {
    if ($p.attr('src').includes(host)) {
      return expect($p.attr('src')).to.match(
        new RegExp(
          `(\\/static\\/js\\/(main|vendor|${serviceBundleName})-\\w+\\.\\w+\\.js)`,
          'g',
        ),
      );
    }
    return null;
  });
});

Cypress.Commands.add('hasOneServiceBundle', (service, serviceVariantConfig) => {
  const serviceBundleName = getServiceBundleName(service, serviceVariantConfig)
  let matches = 0;

  cy.get('script[src]')
    .each($p => {
      const match = $p
        .attr('src')
        .match(
          new RegExp(`(\\/static\\/js\\/${serviceBundleName}-\\w+\\.\\w+\\.js)`, 'g'),
        );

      if (match) {
        matches += 1;
      }
    })
    .then(() => {
      expect(matches).to.equal(1);
    });
});
