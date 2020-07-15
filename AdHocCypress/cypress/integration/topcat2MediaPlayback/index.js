import legacyURLs from './config';
import getAppEnv from '../../../../cypress/support/helpers/getAppEnv';

const environment = getAppEnv();

describe('Legacy MAP Media Playback', () => {
  const paths = legacyURLs[environment];

  if (paths.length > 0) {
    paths.forEach(path => {
      it(path, () => {
        cy.request(`${path}.json`).then(({ body: jsonData }) => {
          cy.visit(path);

          const dataUrls = jsonData.content.blocks[0].playlist.map(
            item => item.url,
          );

          cy.get('iframe').then($iframe => {
            cy.wrap($iframe.prop('contentWindow'), {
              timeout: 30000,
            })
              .its('embeddedMedia.playerInstances.mediaPlayer.playlist.items')
              .its(0)
              .its('originalConnections')
              .then(connections =>
                connections.map(connection => connection.href),
              )
              .should('eql', dataUrls);
          });
        });
      });
    });
  } else {
    it(`No Legacy MAP urls configured for the ${environment} environment`, () => {});
  }
});
