import config from '../../support/configOld';
import { describeForLocalAndTest } from '../../support/limitEnvRuns';
import {
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../../support/bodyTestHelper';

describeForLocalAndTest('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.persian}`);
  });

  it('should have a visible image without a caption', () => {
    visibleImageNoCaption(cy.get('figure').eq(0));
  });

  it('should have a visible image with a caption', () => {
    const imageHasNotLoaded = cy.get('figure').eq(2);

    imageHasNotLoaded.within(() => {
      const lazyLoadPlaceholder = cy.get('div div');
      lazyLoadPlaceholder.should('have.class', 'lazyload-placeholder');
    });

    imageHasNotLoaded.scrollIntoView();

    const imageHasLoaded = cy.get('figure').eq(2);

    visibleImageWithCaption(imageHasLoaded);
    imageHasLoaded.within(() => {
      const noscriptImg = cy.get('noscript');
      noscriptImg.contains('<img ');

      const ImageContainer = cy.get('div div');
      ImageContainer.should('not.have.class', 'lazyload-placeholder');
    });
  });
});
