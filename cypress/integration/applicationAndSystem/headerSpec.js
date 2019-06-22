import config from '../../support/config';
import { shouldContainText } from '../../support/bodyTestHelper';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
  });

  it('should render the BBC News branding', () => {
    const newsBrandingLink = cy.get('header a');
    shouldContainText(newsBrandingLink, 'BBC News');
  });
});
