import config from '../../support/configOld';
import { firstSubheadlineDataWindow } from '../../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.newsThreeSubheadlines}`);
  });

  it('should render a formatted timestamp', () => {
    cy.window().then(win => {
      const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
      const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');
      cy.get('time').should('contain', timeStamp);
    });
  });

  it('should render an H2, which contains/displays a styled subheading', () => {
    firstSubheadlineDataWindow();
  });
});
