import {
  clickInlineLinkAndTestPageHasHTML,
  checkElementStyles,
  getElement,
  getBlockData,
  shouldContainText,
  shouldContainStyles,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c9rpqy7pmypo' & 'c85pqyj5m2ko' are available within the PROD enviroment
    cy.visit('/news/articles/c9rpqy7pmypo');
  });

  it('should display a headline', () => {
    cy.window().then(win => {
      const headlineData = getBlockData('headline', win);
      const { text } = headlineData.model.blocks[0].model.blocks[0].model;
    checkElementStyles(
        'h1',
        text,
        'rgb(34, 34, 34)',
        'ReithSerifNewsMedium, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should return the service worker', () => {
    cy.window().then(win => {
      const { scriptURL } = win.clientInformation.serviceWorker.controller;
      console.log(scriptURL)
      expect(scriptURL).to.eq('http://localhost:7080/sw-local.js');
    });
  });

  // it('should return a subheading', () => {
  //   cy.window().then(win => {
  //     const subheadingData = getBlockData('subheadline', win);
  //     const { text } = subheadingData.model.blocks[0].model.blocks[0].model;

  //     checkElementStyles(
  //       'h2',
  //       text,
  //       'rgb(64, 64, 64)',
  //       'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
  //     );
  //   });
  // });

  // it('should render a paragraph', () => {
  //   cy.window().then(win => {
  //     const paragraphData = getBlockData('text', win);
  //     const { text } = paragraphData.model.blocks[0].model;
  //     const paragraphExample = getElement('p')

  //     shouldContainText(paragraphExample, text);
  //   });
  // });

  // it('should render a timestamp', () => {
  //   cy.window().then(win => {
  //     const { lastPublished } = win.SIMORGH_DATA.data.metadata;
  //     const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');

  //     checkElementStyles(
  //       'time',
  //       timeStamp,
  //       'rgb(90, 90, 90)',
  //       'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
  //     );
  //   });
  // });

  // it('should have an image copyright label with styling', () => {
  //   cy.window().then(win => {
  //     const copyrightData = getBlockData('image', win);
  //     console.log(copyrightData);
  //     // const { copyrightHolder } = copyrightData.model.blocks[0].model;
  //     // console.log(copyrightHolder.shift());
  //     // const copyrightLabel = getElement('figure p').eq(0);
  //         // getElement('p').eq(0);
  //   //   copyrightLabel.should('contain', copyrightHolder);
  //   //   shouldContainStyles(
  //   //     copyrightLabel,
  //   //     'background-color',
  //   //     'rgba(34, 34, 34, 0.75)',
  //   //   );
  //   //   shouldContainStyles(copyrightLabel, 'color', 'rgb(255, 255, 255)');
  //   });
  // });
});
