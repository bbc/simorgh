// As this e2e user journey revolves around page navigation and cookies preferences, AMP testing is not relevant
// When you navigate from an AMP page to another - you always progress onto a canonical url
// AMP cookies are saved in a different way to canonical - so there is no persistance of cookeis between AMP & canonical

export default ({ serviceName, pageType, path }) => {
  describe(`No AMP tests for ${serviceName} - ${pageType} - ${path}`, () => {});
};
