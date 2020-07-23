/* eslint-disable cypress/no-unnecessary-waiting */
import legacyURLs from './config';
import getAppEnv from '../../../../cypress/support/helpers/getAppEnv';
import getDataUrl from '../../support/utilities/getDataUrl';

const environment = getAppEnv();

describe('Legacy MAP Media Playback', () => {
  const paths = legacyURLs[environment];

  if (paths.length > 0) {
    paths.forEach(path => {
      describe(path, () => {
        it(`SMP playlist has expected hrefs, bitrates and undefined url`, () => {
          cy.request(getDataUrl(path)).then(({ body: jsonData }) => {
            const mediaUrlsFromData = jsonData.content.blocks[0].playlist.map(
              item => item.url,
            );
            const bitratesFromData = jsonData.content.blocks[0].playlist.map(
              item => (item.bitrate / 1000).toString(),
            );
            cy.visit(path);

            cy.get('iframe').then($iframe => {
              cy.testResponseCode($iframe.prop('src'), 200);

              cy.wrap($iframe.prop('contentWindow'), {
                timeout: 8000,
              })
                .its('embeddedMedia.playerInstances.mediaPlayer.playlist')
                .then(playlist => {
                  const { originalConnections } = playlist.items[0];
                  const mediaHrefs = originalConnections.map(item => item.href);
                  const bitrates = originalConnections.map(
                    item => item.bitrate,
                  );
                  // eslint-disable-next-line no-unused-expressions
                  expect(playlist.url, 'Playlist URL should be undefined').to.be
                    .undefined;
                  expect(
                    originalConnections.length,
                    'SMP playlist length matches json playlist length',
                  ).equal(mediaUrlsFromData.length);
                  expect(
                    mediaHrefs,
                    'Hrefs of media should match json',
                  ).to.deep.equal(mediaUrlsFromData); // Array checking
                  expect(bitrates, 'Bitrates should match json').to.deep.equal(
                    bitratesFromData,
                  );
                });
            });
          });
        });

        it(`Player has expected image`, () => {
          cy.request(getDataUrl(path)).then(({ body: jsonData }) => {
            cy.visit(path);
            cy.get('iframe').then($iframe => {
              cy.testResponseCode($iframe.prop('src'), 200);
              let expectedURL = '';
              if (jsonData.content.blocks[0].image) {
                expectedURL = jsonData.content.blocks[0].image.href.replace(
                  'http',
                  'https',
                );
              }
              cy.wrap($iframe.prop('contentWindow'), {
                timeout: 8000,
              })
                .its(
                  'embeddedMedia.playerInstances.mediaPlayer.playlist.holdingImageURL',
                )
                .should('eq', expectedURL);
            });
          });
        });

        ['iphone-6', [1024, 786]].forEach(displaySize => {
          it(`Media plays correctly on ${displaySize} screen`, () => {
            if (Cypress._.isArray(displaySize)) {
              cy.viewport(displaySize[0], displaySize[1]);
            } else {
              cy.viewport(displaySize);
            }
            cy.request(getDataUrl(path)).then(({ body: jsonData }) => {
              cy.log(jsonData.content.blocks[0].format);
            });

            cy.visit(path);
            const playButton = 'button.p_cta';
            cy.wait(3000);
            cy.get('iframe').then(iframe => {
              cy.testResponseCode(iframe.prop('src'), 200);

              cy.wrap(iframe.contents().find('iframe'))
                .should(
                  inner => expect(inner.contents().find(playButton)).to.exist,
                )
                .then(inner =>
                  cy.wrap(inner.contents().find(playButton)).click(),
                )
                .then(() => {
                  cy.wrap(iframe.prop('contentWindow'), {
                    timeout: 45000,
                  })
                    .its('embeddedMedia.playerInstances.mediaPlayer')
                    .invoke('currentTime')
                    .should('be.gt', 0);
                });
            });
          });
        });
      });
    });
  } else {
    it(`No Legacy MAP urls configured for the ${environment} environment`, () => {});
  }
});
