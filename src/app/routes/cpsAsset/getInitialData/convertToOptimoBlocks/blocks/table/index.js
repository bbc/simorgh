import convertParagraph from '../paragraph';

const convertCells = async block => {
  const paragraphContentOnly = block.content.filter(
    content => content.type === 'paragraph',
  );

  const paragraphBlocks = await Promise.all(
    paragraphContentOnly.map(convertParagraph),
  );

  return {
    type: block.cellType === 'header' ? 'tableHeader' : 'tableCell',
    model: {
      blocks: paragraphBlocks,
    },
  };
};

const convertRows = async block => {
  const cellBlocks = await Promise.all(block.map(convertCells));
  const isHeaderRow = cellBlocks.some(cell => cell.type === 'tableHeader');

  return {
    type: isHeaderRow ? 'tableHeaderRow' : 'tableRow',
    model: {
      blocks: cellBlocks,
    },
  };
};

const convertTable = async block => {
  const rowBlocks = await Promise.all(block.rows.map(convertRows));

  return {
    type: 'table',
    model: {
      blocks: rowBlocks,
    },
  };
};

export default convertTable;
