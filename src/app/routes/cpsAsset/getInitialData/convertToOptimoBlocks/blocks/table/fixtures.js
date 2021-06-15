import { optimoTextWithParagraph } from '../../utils/helpers';

export const CPSTable = {
  rows: [
    [
      {
        content: [
          {
            text: 'Men',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'header',
      },
      {
        content: [
          {
            text: 'Women',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'header',
      },
    ],
    [
      {
        content: [
          {
            text: 'Jofra Archer',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'cell',
      },
      {
        content: [
          {
            text: 'Anya Shrubsole',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'cell',
      },
    ],
  ],
  height: 2,
  width: 2,
  type: 'table',
};

export const CPSTableWithMultipleParagraphs = {
  rows: [
    [
      {
        content: [
          {
            text: 'Men',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'header',
      },
      {
        content: [
          {
            text: 'Women',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'header',
      },
    ],
    [
      {
        content: [
          {
            text: 'Jofra Archer',
            markupType: 'plain_text',
            type: 'paragraph',
          },
          {
            text: 'Second Paragraph',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'cell',
      },
      {
        content: [
          {
            text: 'Anya Shrubsole',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'cell',
      },
    ],
  ],
  height: 2,
  width: 2,
  type: 'table',
};

export const CPSTableWithNonParagraphs = {
  rows: [
    [
      {
        content: [
          {
            text: 'Men',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'header',
      },
      {
        content: [
          {
            text: 'Women',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'header',
      },
    ],
    [
      {
        content: [
          {
            text: 'Jofra Archer',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
        cellType: 'cell',
      },
      {
        content: [
          {
            text: 'Trent Rockets',
            markupType: 'plain_text',
            type: 'crosshead',
          },
        ],
        cellType: 'cell',
      },
    ],
  ],
  height: 2,
  width: 2,
  type: 'table',
};

export const buildTableRow = (rows, isHeader = false) => ({
  type: isHeader ? 'tableHeaderRow' : 'tableRow',
  model: {
    blocks: rows.map(row => ({
      type: isHeader ? 'tableHeader' : 'tableCell',
      model: {
        blocks: row.map(text =>
          optimoTextWithParagraph([
            {
              fragments: [
                {
                  fragment: text,
                  attributes: [],
                },
              ],
              text,
            },
          ]),
        ),
      },
    })),
  },
});

export const convertedTable = {
  type: 'table',
  model: {
    blocks: [
      buildTableRow([['Men'], ['Women']], true),
      buildTableRow([['Jofra Archer'], ['Anya Shrubsole']]),
    ],
  },
};

export const convertedTableWithMultipleParagraphs = {
  type: 'table',
  model: {
    blocks: [
      buildTableRow([['Men'], ['Women']], true),
      buildTableRow([['Jofra Archer', 'Second Paragraph'], ['Anya Shrubsole']]),
    ],
  },
};

export const convertedTableWithNonParagraphs = {
  type: 'table',
  model: {
    blocks: [
      buildTableRow([['Men'], ['Women']], true),
      buildTableRow([['Jofra Archer'], []]),
    ],
  },
};
