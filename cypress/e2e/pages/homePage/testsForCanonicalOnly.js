import runAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';
import getAppEnv from '../../../support/helpers/getAppEnv';

export default ({ service }) => {
  describe(`Images`, () => {
    it('should have a picture tag around images', () => {
      cy.get('img').each($img => {
        const $section = $img.parents('section');
        if ($section.length > 0) {
          const testId = $section.attr('data-testid');
          if (testId && testId.includes('message-banner')) {
            cy.log(`No picture tag on message banners ${testId}`);
          } else if (testId && testId.includes('portrait-video-carousel')) {
            cy.log(`No picture tag on portrait video images ${testId}`); // do we need picture tags here?
          } else {
            cy.wrap($img).parent().should('match', 'picture');
          }
        }
      });
    });
    it('should have two sources one with webp and one with fallback jpg/png', () => {
      cy.get('picture').each($picture => {
        cy.wrap($picture)
          .find('source')
          .then($sources => {
            expect($sources).to.have.length(2);
            $sources.each((index, source) => {
              // The first <source> srcSet should have webp images
              // The second <source> srcSet should have the fallback jpgs or pngs
              const expectedFileTypes = [/\.webp$/, /\.(jpg|png)$/];
              const srcSet = Cypress.$(source).attr('srcset');
              // remove everything after the file extension including the image widths and the space
              const urls = srcSet
                .split(',')
                .map(url => url.replace(/\s+\S+$/, ''));
              urls.forEach(url => {
                expect(url).to.match(expectedFileTypes[index]);
              });
            });
          });
      });
    });
  });

  describe('Portrait Video Curations', () => {
    // open and close could be 2 separate tests, but would be largely duplicated or tests reliant on the previous ones state for the modal to be open
    it('should open the portrait video modal when a promo is clicked and close it when the modal close button is clicked', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-testid="portrait-video-carousel"]').length > 0) {
          cy.get('[data-testid="portrait-video-carousel"]')
            .first()
            .within(() => {
              cy.get('[data-testid="promo-button"]').first().click();
            });

          cy.get('dialog[open]')
            .should('exist')
            .and('be.visible')
            .within(() => {
              cy.get('[data-e2e="media-loader__container"]')
                .should('exist')
                .and('be.visible');
              cy.get('[data-e2e="media-player"]')
                .should('exist')
                .and('be.visible');

              cy.get('button[data-testid="close-modal-button"]')
                .should('exist')
                .and('be.visible')
                .click();
            });

          cy.get('dialog[open]').should('not.exist');
        } else {
          cy.log('No portrait video carousel found on the page');
        }
      });
    });
    it('should scroll through the promos using the left and right scroll buttons', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-testid="portrait-video-carousel"]').length > 0) {
          cy.get('[data-testid="portrait-video-carousel"]')
            .first()
            .within(() => {
              cy.get('[data-testid="pv-carousel"]').then($carousel => {
                const initialScrollLeft = $carousel[0].scrollLeft;

                // Click the right scroll button five times using a loop to avoid unsafe chaining
                Cypress._.times(5, () => {
                  cy.get('[data-testid="pv-scroll-right"]')
                    .should('not.be.disabled')
                    .click();
                });
                // check the scroll position is further right
                cy.get('[data-testid="pv-carousel"]').should(
                  $updatedCarousel => {
                    expect($updatedCarousel[0].scrollLeft).to.be.greaterThan(
                      initialScrollLeft,
                    );
                  },
                );

                cy.get('[data-testid="pv-carousel"]').then(
                  $afterRightScroll => {
                    const afterRightScrollLeft =
                      $afterRightScroll[0].scrollLeft;

                    cy.get('[data-testid="pv-scroll-left"]')
                      .should('not.be.disabled')
                      .click();
                    // check the scroll position is back to the left, but not the full way as we only clicked left once
                    cy.get('[data-testid="pv-carousel"]').should(
                      $afterLeftScroll => {
                        const afterLeftScrollLeft =
                          $afterLeftScroll[0].scrollLeft;
                        expect(afterLeftScrollLeft).to.be.lessThan(
                          afterRightScrollLeft,
                        );
                        expect(afterLeftScrollLeft).to.be.greaterThan(
                          initialScrollLeft,
                        );
                      },
                    );
                  },
                );
              });
            });
        } else {
          cy.log('No portrait video carousel found on the page');
        }
      });
    });
  });

  if (getAppEnv() === 'local') {
    runAdsTests({ service });
  }

  describe(`Chartbeat analytics`, () => {
    it('should have a script with src value set to chartbeat source', () => {
      cy.hasScriptWithChartbeatSrc();
    });
    it('should have chartbeat config set to window object', () => {
      cy.hasGlobalChartbeatConfig();
    });
  });
};
