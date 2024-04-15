/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';
import getDataUrl from '../../../support/helpers/getDataUrl';
import topicTagsTest from '../../../support/helpers/topicTagsTest';
import envConfig from '../../../support/config/envs';
import { crossPlatform as mostReadAssertions } from '../mostReadPage/mostReadAssertions';
import getAppEnv from '../../../support/helpers/getAppEnv';

const twoYearsAgo = new Date().getFullYear() - 2;

const isArticleLessThanTwoYearsOld = () => {
  return cy
    .get(`main time`)
    .invoke('attr', 'datetime')
    .then(fullDate => {
      const isNewArticle = Number(fullDate.split('-')[0]) > Number(twoYearsAgo);
      return isNewArticle && getAppEnv() === 'live';
    });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  isAmp,
  variant,
}) => {
  /**
   * As an approach, to make the tests deterministic without relying on BFF, I ran against BFF and console logged the intros we're comparing against
   * - then hardcoded these here (todo: maybe we have a better place to store fixtures)
   * - then used the url matching to find the expected intro and assert it
   * I think this is OK given we ran the tests on these specific pages, I also noticed that the same content exist on other environments.
   * The draw back is that if we add new pages with intro then we have to update this mapping manually (but I think that's ok because this is a "smoke" test for a subset anyhow so no need to add to the subset)
   * Note also that for this AMP page, there is no window.SIMORGH_DATA
   * 
   * Without getting hold of the data, the alternative would to just check an intro exists regardless of its content but that's not great
   * and also the intros seems to not have any special selector (like data-intro or something) .. they're just a paragraph within main styled as bold
   * I removed the second test because it was asserting the same thing as the first one (the values for intro and paragraph are the same)
   * todo: remove todos, comments and consoles before final PR
   * todo: if we decide this approach is acceptable, then should move the harcoded list of intros to somewhere more suitable (fixtures, support?)
  */
  const introductions = [{
    page: '/mundo/23263889.amp',
    intro: 'The first paragraph is manually marked up as an "introduction", which renders it in bold.'
  }, {
    page: '/mundo/noticias-internacional-51266689.amp',
    intro:  'El controvertido Brexit llega finalmente con la salida oficial de Reino Unido de la Unión Europea (UE) este 31 de enero, aunque la incertidumbre respecto a sus efectos prácticos todavía está lejos de ser despejada.'
  }, {
    page: '/russian/features-54391793.amp',
    intro: 'Уже во второй раз в этом году британскую писательницу и автора серии книг о Гарри Поттере обвинили в трансфобии. Сначала это произошло после ее заявления о том, что половая принадлежность - неотъемлемая часть женской личности. Новая волна обвинений идет сейчас, после выхода ее новой книги, где главный персонаж совершает злодейства, переодеваясь в женскую одежду.',
  },
  {
    page: '/russian/news-55041160.amp',
    intro: 'Тысячи жителей Владивостока, где на прошлой неделе прошел ледяной шторм, до сих пор остаются без света, тепла и воды. В регионе продолжает действовать режим чрезвычайной ситуации. Пока экстренные службы разбирают завалы и восстанавливают энергоснабжение, простые владивостокцы тоже не остаются в стороне.'
  }]

  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${variant} ${pageType} `, () => {
    it('should render a description for the page', () => {

      cy.url().then(url => {
        const match = introductions.find(introInfo => url.match(introInfo.page))
        if (match) {
          cy.get('main p').contains(match.intro)
        }
      })
    });

    it('FOR /news/technology-60561162.amp ONLY - should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
      if (service === 'news' && Cypress.env('APP_ENV') !== 'local') {
        const url = '/news/technology-60561162.amp?renderer_env=live';
        cy.visit(`${envConfig.baseUrl}${url}`);
        topicTagsTest();
      } else {
        cy.log('Test is only for /news/technology-60561162.amp');
      }
    });
    it.skip('should render podcast promo if in json and should navigate to correct podcast page', () => {
      cy.log(service);
      if (Cypress.env('APP_ENV') !== 'local') {
        cy.getToggles(service);
        cy.url().then(url => {
          const urlForData = url.replace('.amp', '');

          const firstVisitedPage = url;

          cy.request(getDataUrl(urlForData)).then(() => {
            cy.fixture(`toggles/${service}.json`).then(toggles => {
              const podcastPromoIsEnabled = path(
                ['podcastPromo', 'enabled'],
                toggles,
              );
              cy.log(
                `Story page is configured for podcast promo? ${podcastPromoIsEnabled}`,
              );
              if (podcastPromoIsEnabled) {
                // Gets the podcast promo name
                cy.get(
                  `section[aria-labelledby*='podcast-promo'] > div:nth-child(2) > div:nth-child(2) > h3 > a`,
                ).then($tag => {
                  const podcastTitle = $tag.text();
                  cy.wrap(podcastTitle).as('podcastTitle');
                });
                // Clicks on the podcast promo link
                cy.get(
                  `section[aria-labelledby*='podcast-promo'] > div:nth-child(2) > div:nth-child(2) > h3 > a`,
                ).click();

                // Waits for page load to allow Cypress to retrieve url
                // eslint-disable-next-line cypress/no-unnecessary-waiting
                cy.wait(1000);

                cy.url().then(urlTwo => {
                  const isPodcastBrandPage = urlTwo.includes('/podcasts/');

                  // If link leads to a Podcast brand page, check the title is as expected
                  // If link leads to a Podcast aggregate page, check the first link leads to podcast page
                  if (isPodcastBrandPage) {
                    cy.get('@podcastTitle').then(title => {
                      cy.get('h1').should('contain', title);
                    });
                  } else {
                    // This could fail if editorial chooses a MAP page to be the first promo link instead of a podcast page
                    cy.get('[data-e2e=story-promo]')
                      .first()
                      .find('a')
                      .invoke('attr', 'href')
                      .should('contain', '/podcasts/');
                  }
                });
                cy.visit(firstVisitedPage);
              } else {
                cy.log('Podcast promo is not enabled in toggles');
              }
            });
          });
        });
      } else {
        cy.log('Service is run in local.');
      }
    });

    /**
     * Most Read Component
     */
    mostReadAssertions({ service, variant });
  });

  describe(`Recommendations on ${service} ${pageType}`, () => {
    it('Recommendations have images', () => {
      isArticleLessThanTwoYearsOld().then(runRecommendationTests => {
        if (runRecommendationTests) {
          cy.getToggles(service);
          cy.fixture(`toggles/${service}.json`).then(toggles => {
            const recommendationsEnabled = path(
              ['cpsRecommendations', 'enabled'],
              toggles,
            );
            cy.log(`Recommendations enabled? ${recommendationsEnabled}`);
            if (recommendationsEnabled) {
              cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
              cy.get('[data-e2e=recommendations-heading] > div > ul > li').each(
                (item, index) => {
                  cy.wrap(item).within(() => {
                    cy.log(`List item number: ${index}`);
                    cy.log(`isAmp= ${isAmp}`);
                    if (isAmp) {
                      cy.get(
                        `[data-e2e=story-promo-wrapper] > div > [data-e2e=image-placeholder] > amp-img`,
                      ).should('have.attr', 'width');
                    } else {
                      cy.get(
                        `[data-e2e=story-promo-wrapper] > div > [data-e2e=image-placeholder] > div > img`,
                      ).should('have.attr', 'width');
                    }
                  });
                },
              );
            }
          });
        } else {
          cy.log(
            'Only tests on live and for articles less than 2 years old due to lack of test data',
          );
        }
      });
    });

    it('Recommendations have titles', () => {
      isArticleLessThanTwoYearsOld().then(runRecommendationTests => {
        if (runRecommendationTests) {
          cy.getToggles(service);
          cy.fixture(`toggles/${service}.json`).then(toggles => {
            const recommendationsEnabled = path(
              ['cpsRecommendations', 'enabled'],
              toggles,
            );
            cy.log(`Recommendations enabled? ${recommendationsEnabled}`);
            if (recommendationsEnabled) {
              cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
              cy.get('[data-e2e=recommendations-heading] > div > ul > li').each(
                (item, index) => {
                  cy.wrap(item).within(() => {
                    cy.log(`List item number: ${index + 1}`);
                    cy.get(`[data-e2e=story-promo-wrapper] > div > div > a`)
                      .invoke('text')
                      .then(text => {
                        expect(text.length).to.be.at.least(1);
                      });
                  });
                },
              );
            }
          });
        } else {
          cy.log(
            'Only tests on live and for articles less than 2 years old due to lack of test data',
          );
        }
      });
    });
  });
};
