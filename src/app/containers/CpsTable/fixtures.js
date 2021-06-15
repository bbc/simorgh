import { buildTableRow } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/table/fixtures';

export default [
  [
    buildTableRow([['Men'], ['Women']], true),
    buildTableRow([['Joe Root'], ['Nat Sciver']]),
    buildTableRow([['Rashid Khan'], ['Katherine Brunt']]),
    buildTableRow([["D'arcy Short"], ['Elyse Villani']]),
  ],
  [
    buildTableRow([['Men'], ['Women']], true),
    buildTableRow([['Joe Root'], ['Nat Sciver']]),
    buildTableRow([['Rashid Khan'], ['Katherine Brunt']]),
    buildTableRow([["D'arcy Short"], []]),
  ],
  [
    buildTableRow([['Men'], ['Women']], true),
    buildTableRow([['Joe Root', 'Second Line of Text'], ['Nat Sciver']]),
    buildTableRow([['Rashid Khan'], ['Katherine Brunt']]),
    buildTableRow([["D'arcy Short"], ['Elyse Villani']]),
  ],
];
