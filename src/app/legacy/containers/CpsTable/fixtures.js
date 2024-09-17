import { buildTableRow } from '#routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/table/fixtures';
import addIdsToBlocks from '#routes/utils/sharedDataTransformers/addIdsToBlocks';

const table = {
  type: 'table',
  model: {
    blocks: [
      buildTableRow([['Men'], ['Women']], true),
      buildTableRow([['Joe Root'], ['Nat Sciver']]),
      buildTableRow([['Rashid Khan'], ['Katherine Brunt']]),
      buildTableRow([["D'arcy Short"], ['Elyse Villani']]),
    ],
  },
};

const tableWithEmptyCell = {
  type: 'table',
  model: {
    blocks: [
      buildTableRow([['Men'], ['Women']], true),
      buildTableRow([['Joe Root'], ['Nat Sciver']]),
      buildTableRow([['Rashid Khan'], ['Katherine Brunt']]),
      buildTableRow([["D'arcy Short"], []]),
    ],
  },
};

const tableWithMultipleLinesOfText = {
  type: 'table',
  model: {
    blocks: [
      buildTableRow([['Men'], ['Women']], true),
      buildTableRow([['Joe Root', 'Second Line of Text'], ['Nat Sciver']]),
      buildTableRow([['Rashid Khan'], ['Katherine Brunt']]),
      buildTableRow([["D'arcy Short"], ['Elyse Villani']]),
    ],
  },
};

const json = addIdsToBlocks({
  content: {
    model: {
      blocks: [table, tableWithEmptyCell, tableWithMultipleLinesOfText],
    },
  },
});

const tableRowBlocks = json.content.model.blocks.map(
  block => block.model.blocks,
);

export default tableRowBlocks;
