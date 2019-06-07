import config from '../support/config';

['news', 'persian'].forEach(service => {

	describe(`Script src - ${service}`, () => {
	  // eslint-disable-next-line no-undef
	  before(() => {
	    cy.visit(`/${service}/articles/${config.assets[service]}`);
	  });

	  // Testing the actual fetch is not currently possible
	  it('should have script srcs for service', () => {
	   let expectedMatches = [
	      /(\/static\/js\/main-\w+\.\w+\.js)/g,
	      /(\/static\/js\/vendor-\w+\.\w+\.js)/g,
	      new RegExp("\(\\/static\\/js\\/" + service + "-\\w+\\.\\w+\\.js)", "g"),
	    ];

	    console.log(expectedMatches)

	    cy.get('script').should($p => {
	      const srcs = [];

	      // build array of script src's
	      $p.map((i, el) => {
	        const src = Cypress.$(el).attr('src');
	        if (src) {
	          srcs.push(src);
	        }
	      });

	      // filter out all regexes that have a match in src array
	      expectedMatches = expectedMatches.filter(regex => {
	        const matches = srcs.filter(src => src.match(regex));
	        return matches.length === 0;
	      });

	      // expect no regexes to be left after all have been met
	      expect(expectedMatches).to.be.empty;
	    });
	  });

	});

})
