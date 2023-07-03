import config from '../../../support/config/services';
import getAppEnv from '../../../support/helpers/getAppEnv';
import visitPage from '../../../support/helpers/visitPage';

const pageType = 'mostReadPage';

describe(`Most Read Data`, () => {
  Object.values(config).forEach(({ name: service, variant, pageTypes }) => {
    const { mostReadPage } = pageTypes;

    const urls =
      mostReadPage.environments &&
      mostReadPage.environments[getAppEnv()]?.paths;

    it(`should render correctly for ${service} ${
      variant !== 'default' ? variant : ''
    }`, () => {
      urls?.forEach(url => {
        visitPage(url, pageType);

        cy.get('[data-e2e="most-read"] li').should('have.length', 10);
      });
    });
  });
});
