import services from '../support/config/services';
import { getElement, shouldContainText } from '../support/bodyTestHelper';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
  });

  it('should render the BBC News branding', () => {
    const newsBrandingLink = getElement('header a');
    shouldContainText(newsBrandingLink, 'BBC News');
  });
});
