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
              headers: {
                Origin: 'https://www.test.bbc.com',
              },
            }).then(response => {
              const testContent = response.body;

              cy.get('nav').should('exist');
              cy.get('main').should('exist');

              cy.get('main').then($main => {
                const localContent = $main.html();
                expect(localContent).to.include(testContent); // TODO: improved comparison
              });
            });
          });

          it('should show Test Pidgin Homepage when renderer_env=test', () => {
            cy.request(
              `${Cypress.config().baseUrl}/ws/languages?renderer_env=test`,
            ).then(localResponse => {
              const localContent = localResponse.body;
              cy.request({
                url: 'https://www.test.bbc.com/pidgin',
                headers: {
                  Origin: 'https://www.test.bbc.com',
                },
              }).then(response => {
                const testContent = response.body;
                expect(localContent).to.include('Pidgin');
                expect(localContent).to.include(testContent); // TODO: improved comparison
              });
            });
          });

          it('should show Live Pidgin Homepage when renderer_env=live', () => {
            cy.request(
              `${Cypress.config().baseUrl}/ws/languages?renderer_env=live`,
            ).then(localResponse => {
              const localContent = localResponse.body;
              cy.request({
                url: 'https://www.bbc.com/pidgin',
                headers: {
                  Origin: 'https://www.bbc.com',
                },
              }).then(response => {
                const liveContent = response.body;
                expect(localContent).to.include('Pidgin');
                expect(localContent).to.include(liveContent); // TODO: improved comparison
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
              headers: {
                Origin: 'https://www.bbc.com',
              },
            }).then(response => {
              const liveContent = response.body;

              cy.get('h1').should('contain', 'Languages');
              cy.get('nav').should('exist');
              cy.get('main').should('exist');

              cy.get('main').then($main => {
                const localContent = $main.html();
                expect(localContent).to.include(liveContent); // TODO: improved comparison
              });
            });
          });
        });
      },
    ],
  },
];
