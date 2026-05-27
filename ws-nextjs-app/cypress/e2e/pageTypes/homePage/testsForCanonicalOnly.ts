import runAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';
import chartbeatTests from '../../../support/helpers/chartbeatTests';
import getAppEnv from '../../../support/helpers/getAppEnv';

export default ({ service }) => {
  describe('Images', () => {
    it('should have a picture tag around images', () => {
      cy.get('img').each($img => {
        const $section = $img.parents('section');
        if ($section.length > 0) {
          const testId = $section.attr('data-testid');
          const exceptions = ['message-banner', 'portrait-video-carousel'];

          if (testId && exceptions.some(id => testId.includes(id))) {
            cy.log(`No picture tag on ${testId}`);
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
    beforeEach(() => {
      cy.viewport(600, 800);
    });
    // open and close could be 2 separate tests, but would be largely duplicated or tests reliant on the previous ones state for the modal to be open
    it('should open the portrait video modal when a promo is clicked and close it when the modal close button is clicked', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-testid="portrait-video-carousel"]').length > 0) {
          cy.get('[data-testid="portrait-video-carousel"]')
            .first()
            .within(() => {
              cy.get('[data-testid="promo-button"]').first().click();
            });

          cy.get('div[role="dialog"]')
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

          cy.get('div[role="dialog"]').should('not.exist');
        } else {
          cy.log('No portrait video carousel found on the page');
        }
      });
    });

    it('should close the modal when the background is clicked', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-testid="portrait-video-carousel"]').length > 0) {
          cy.get('[data-testid="portrait-video-carousel"]')
            .first()
            .within(() => {
              cy.get('[data-testid="promo-button"]').first().click();
            });

          cy.get('div[role="dialog"]').should('exist').and('be.visible');

          // cy.root() gets the root element of the current subject (in this case, the open modal dialog).
          cy.root().click('top');

          cy.get('div[role="dialog"]').should('not.exist');
        } else {
          cy.log('No portrait video carousel found on the page');
        }
      });
    });

    it('should close the modal when the Escape key is pressed', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-testid="portrait-video-carousel"]').length > 0) {
          cy.get('[data-testid="portrait-video-carousel"]')
            .first()
            .within(() => {
              cy.get('[data-testid="promo-button"]').first().click();
            });

          cy.get('div[role="dialog"]').should('exist').and('be.visible');

          cy.get('body').type('{esc}');

          cy.get('div[role="dialog"]').should('not.exist');
        } else {
          cy.log('No portrait video carousel found on the page');
        }
      });
    });
  });
  describe('Billboard', () => {
    it('should display the correct number of items in the curation grid if there is at least 2 summaries', () => {
      cy.viewport(1008, 900);
      cy.getPageDataFromWindow().then(data => {
        const billboardCurations =
          data?.pageData?.curations?.filter(
            curation =>
              curation.visualProminence === 'MAXIMUM' &&
              curation.visualStyle === 'BANNER',
          ) || [];

        if (billboardCurations.length === 0) {
          cy.log('No billboard curations found in page data');
          return;
        }

        billboardCurations.forEach((curation, index) => {
          const summaries = curation?.summaries || [];
          const expectedNumberOfAdditionalItems = Math.min(
            Math.max(summaries.length - 1, 0),
            4,
          );
          if (summaries.length > 1) {
            const testId = `billboard-${index + 1}`;
            const gridSelector = `[data-testid="${testId}"] [data-testid="billboard-curation-grid"]`;

            if (summaries.length > 2) {
              cy.get(gridSelector).then($grid => {
                cy.log(`Billboard index: ${index + 1}`);
                cy.log(`Grid selector: ${gridSelector}`);
                cy.log(`Number of grids found: ${$grid.length}`);
                cy.log(`Grid HTML: ${$grid.html()}`);

                cy.get(`${gridSelector} li`).then($lis => {
                  cy.log(`Number of li in grid: ${$lis.length}`);
                  $lis.each((i, el) => {
                    cy.log(`li[${i}] visible: ${Cypress.$(el).is(':visible')}`);
                    cy.log(`li[${i}] HTML: ${el.outerHTML}`);
                  });
                });
              });
              cy.get(`${gridSelector} li:visible`).should(
                'have.length',
                expectedNumberOfAdditionalItems,
              );
            } else if (summaries.length === 2) {
              cy.get(`${gridSelector} div.promo-image`)
                .should('have.length', 1)
                .and('be.visible');
              cy.get(`${gridSelector} div.promo-text`)
                .should('have.length', 1)
                .and('be.visible');
            }
          } else {
            cy.log(
              `No billboard with more than 1 summary found billboard ${index + 1} with title: ${summaries[0]?.title}`,
            );
          }
        });
      });
    });
    it('should not render a curation grid if there is only one summary in the curation', () => {
      cy.getPageDataFromWindow().then(data => {
        const billboardCurations =
          data?.pageData?.curations?.filter(
            curation =>
              curation.visualProminence === 'MAXIMUM' &&
              curation.visualStyle === 'BANNER',
          ) || [];

        if (billboardCurations.length === 0) {
          cy.log('No billboard curations found in page data');
          return;
        }

        billboardCurations.forEach((curation, index) => {
          const summaries = curation?.summaries || [];
          if (summaries.length === 1) {
            const testId = `billboard-${index + 1}`;
            cy.get(`[data-testid="${testId}"]`).within(() => {
              cy.get('[data-testid="billboard-curation-grid"]').should(
                'not.exist',
              );
            });
          }
        });
      });
    });
  });

  if (getAppEnv() === 'local') {
    runAdsTests({ service });
  }

  chartbeatTests();
};
