Cypress.Commands.add('copyrightDataWindow', () => {
  const getBlockByType = (blocks, blockType) => {
    let blockData;

    blocks.forEach(block => {
      if (!blockData && block.type === blockType) {
        blockData = block;
      }
    });
    return blockData;
  };

  const getBlockData = (blockType, win) => {
    const { blocks } = win.SIMORGH_DATA.pageData.content.model;
    return getBlockByType(blocks, blockType);
  };

  cy.window().then(win => {
    const copyrightData = getBlockData('image', win);
    const rawImageblock = getBlockByType(
      copyrightData.model.blocks,
      'rawImage',
    );
    const { copyrightHolder } = rawImageblock.model;
    cy.get('figure p')
      .eq(0)
      .should('contain', copyrightHolder);
  });
});
