import settings from '../config/settings';

export default ({ pageType, tests }) => {
  const settingsMap = new Map(Object.entries(settings));

  settingsMap.forEach((config, service) => {
    const pageTypeSettings = config.pageTypes[pageType];
    if (pageTypeSettings != null) {
      const { path, id } = pageTypeSettings;

      const testArgs = {
        service,
        pageType,
        path,
        id,
      };

      before(() => {
        cy.visit(path);
      });

      tests.forEach(test => test(testArgs));
    }
  });
};
