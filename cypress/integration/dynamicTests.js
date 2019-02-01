import {
  // clickInlineLinkAndTestPageHasHTML,
  checkElementStyles,
  getElement,
  shouldContainText,
  shouldContainStyles,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c9rpqy7pmypo' & 'c85pqyj5m2ko' are available within the PROD enviroment
    cy.visit('/news/articles/c9rpqy7pmypo');
  });

  it('should render a headline', () => {
    cy.window().then(win => {
      const {
        text,
      } = win.SIMORGH_DATA.data.content.model.blocks[0].model.blocks[0].model.blocks[0].model;

      checkElementStyles(
        'h1',
        text,
        'rgb(34, 34, 34)',
        'ReithSerifNewsMedium, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should return a subheading', () => {
    cy.window().then(win => {
      const {
        text,
      } = win.SIMORGH_DATA.data.content.model.blocks[4].model.blocks[0].model.blocks[0].model;

      checkElementStyles(
        'h2',
        text,
        'rgb(64, 64, 64)',
        'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should render a paragraph', () => {
    cy.window().then(win => {
      const {
        text,
      } = win.SIMORGH_DATA.data.content.model.blocks[2].model.blocks[0].model;
      const firstParagraph = getElement('p').eq(1);

      shouldContainText(firstParagraph, text);
    });
  });

  it('should render a timestamp', () => {
    cy.window().then(win => {
      const { lastPublished } = win.SIMORGH_DATA.data.metadata;
      const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');

      checkElementStyles(
        'time',
        timeStamp,
        'rgb(90, 90, 90)',
        'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should have an image copyright label with styling', () => {
    cy.window().then(win => {
      const {
        copyrightHolder,
      } = win.SIMORGH_DATA.data.content.model.blocks[1].model.blocks[0].model;

      const copyrightLabel = getElement('figure')
        .eq(0)
        .within(() => {
          getElement('p').eq(0);
        });
      copyrightLabel.should('contain', copyrightHolder);
      shouldContainStyles(
        copyrightLabel,
        'background-color',
        'rgba(34, 34, 34, 0.75)',
      );
      shouldContainStyles(copyrightLabel, 'color', 'rgb(255, 255, 255)');
    });
  });
});
