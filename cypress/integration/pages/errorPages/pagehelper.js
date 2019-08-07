import config from '../../../support/config/services';
import testData from '../../../../src/app/lib/config/services';

const iterator = (filterCondition, test) => {
  Object.keys(config)
    .filter(filterCondition)
    .forEach(service => {
      test(service);
    //   describe(`${service} Test we get a 404`, () => {
    //     it('should return a 404 error code', () => {
    //       cy.testResponseCodeAndType(
    //         config[service].pageTypes.errorPage404,
    //         404,
    //         'text/html',
    //       );
    //     });
    //   });

      describe(`${service} Article Error Page Tests`, () => {
        before(() => {
          cy.visit(config[service].pageTypes.errorPage404, {
            failOnStatusCode: false,
          });
        });

        it('should have the correct lang & dir attributes', () => {
          cy.hasHtmlLangDirAttributes({
            lang: `${testData[service].lang}`,
            dir: `${testData[service].dir}`,
          });
        });

        it('should display a relevant error message on screen', () => {
          cy.get('h1 span').should(
            'contain',
            `${testData[service].translations.error[404].statusCode}`,
          );
          cy.get('h1').should(
            'contain',
            `${testData[service].translations.error[404].title}`,
          );
        });

        it('should have an inline link on the page that is linked to the home page', () => {
          cy.get('main p')
            .eq(1)
            .within(() => {
              cy.get('a').should(
                'have.attr',
                'href',
                `${testData[service].translations.error[404].callToActionLinkUrl}`,
              );
            });
        });

        it('should have a relevant error title in the head', () => {
          cy.renderedTitle(
            `${testData[service].translations.error[404].title} - ${testData[service].brandName}`,
          );
        });
      });
    });
};

export default iterator;
