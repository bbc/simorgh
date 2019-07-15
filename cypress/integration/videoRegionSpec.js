import { getBlockByType } from '../support/bodyTestHelper';

const getBlockData = (blockType, win) => {
  const { blocks } = win.SIMORGH_DATA.pageData.content.model;

  return getBlockByType(blocks, blockType);
};

describe('Video', () => {
  beforeEach(() => {
    cy.visit(`/news/articles/c0000000030o`);
    cy.wait(5000);
  });
  it('should play the video', () => {
    cy.window().then(win => {
      const videoData = getBlockData('video', win);
      const id = videoData.model.locator.split(':')[4];
      cy.get(`div#${id} > div > iframe`).then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find('div > button')
          .first()
          .click();

        // assert  that video is playing
        // still on the look out for how to go about this ??
      });
    });
  });
});
