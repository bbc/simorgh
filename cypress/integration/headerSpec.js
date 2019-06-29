import config from '../support/config/envs';
import { getElement, shouldContainText } from '../support/bodyTestHelper';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
  });

  it('should render the BBC News branding', () => {
    const newsBrandingLink = getElement('header a');
    shouldContainText(newsBrandingLink, 'BBC News');
  });
});
