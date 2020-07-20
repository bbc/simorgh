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
            cy.get(
              'div[class^="StyledVideoContainer"] iframe[class^="StyledIframe"]',
            ).then($iframe => {
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
            cy.get(
              'div[class^="StyledVideoContainer"] iframe[class^="StyledIframe"]',
            ).then($iframe => {
              cy.wrap($iframe.prop('contentWindow'), {
                timeout: 8000,
              })
                .its(
                  'embeddedMedia.playerInstances.mediaPlayer.playlist.holdingImageURL',
                )
                .should(
                  'eq',
                  jsonData.content.blocks[0].image.href.replace(
                    'http',
                    'https',
                  ),
                );
            });
          });
        });
      });
    });
  } else {
    it(`No Legacy MAP urls configured for the ${environment} environment`, () => {});
  }
});
