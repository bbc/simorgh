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

Cypress.Commands.add('firstHeadlineDataWindow', () => {
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
  const shouldMatchReturnedData = (data, element) => {
    cy.get(element).should('contain', data);
  };

  cy.window().then(win => {
    const headlineData = getBlockData('headline', win);
    const { text } = headlineData.model.blocks[0].model.blocks[0].model;

    shouldMatchReturnedData(text, 'h1');
  });
});

Cypress.Commands.add('firstParagraphDataWindow', () => {
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
    const paragraphData = getBlockData('text', win);
    const { text } = paragraphData.model.blocks[0].model;
    cy.get('p').should('contain', text);
  });
});
