import convertParagraph from '../paragraph';

const convertCells = async block => ({
  type: block.cellType === 'header' ? 'tableHeader' : 'tableCell',
  model: {
    blocks: [await convertParagraph(block.content[0])],
  },
});

const convertRows = async block => {
  const cellBlocks = await Promise.all(block.map(convertCells));

  return {
    type: 'tableRow',
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
