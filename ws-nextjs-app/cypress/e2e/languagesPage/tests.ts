export const homePageTestSuites = [
  {
    path: '/ws/languages',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [
      ({ service, pageType }: { service: string; pageType: string }) => {
        describe(`Tests for ${pageType} page - ${service}`, () => {
          it('should show Test Pidgin Homepage when no renderer_env is set', () => {
            cy.request({
              url: 'https://www.test.bbc.com/pidgin',
            }).then(() => {
              cy.get('nav').should('exist');
              cy.get('main').should('exist');
              cy.get('h1').should('contain', 'BBC News, Pidgin, Home');
              cy.get('h1').should(
                'not.have.text',
                'Get the news in your language',
              );
            });
          });

          it('should show Test Pidgin Homepage when renderer_env=test', () => {
            cy.request(
              `${Cypress.config().baseUrl}/ws/languages?renderer_env=test`,
            ).then(() => {
              cy.request({
                url: 'https://www.test.bbc.com/pidgin',
              }).then(() => {
                cy.get('h1').should('contain', 'BBC News, Pidgin, Home');
                cy.get('h1').should(
                  'not.have.text',
                  'Get the news in your language',
                );
              });
            });
          });

          it('should show Live Pidgin Homepage when renderer_env=live', () => {
            cy.request(
              `${Cypress.config().baseUrl}/ws/languages?renderer_env=live`,
            ).then(() => {
              cy.request({
                url: 'https://www.bbc.com/pidgin',
              }).then(() => {
                cy.get('h1').should('contain', 'BBC News, Pidgin, Home');
                cy.get('h1').should(
                  'not.have.text',
                  'Get the news in your language',
                );
              });
            });
          });
        });
      },
    ],
  },
];

export const staticPageTestSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['live'],
    tests: [
      ({ service, pageType }: { service: string; pageType: string }) => {
        describe(`Tests for ${pageType} page - ${service} in live environment`, () => {
          it('should show Languages page', () => {
            cy.request({
              url: 'https://www.bbc.com/ws/languages',
            }).then(() => {
              cy.get('h1').should('have.text', 'Get the news in your language');
              cy.get('nav').should('exist');
              cy.get('main').should('exist');
            });
          });
        });
      },
    ],
  },
];
