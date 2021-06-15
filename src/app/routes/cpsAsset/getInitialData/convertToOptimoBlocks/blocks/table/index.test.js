import convertTable from '.';
import {
  CPSTable,
  convertedTable,
  CPSTableWithMultipleParagraphs,
  convertedTableWithMultipleParagraphs,
  CPSTableWithNonParagraphs,
  convertedTableWithNonParagraphs,
} from './fixtures';

describe('convertTable', () => {
  it('should convert a CPS table', async () => {
    const table = await convertTable(CPSTable);
    expect(table).toEqual(convertedTable);
  });

  it('should convert a CPS table with multiple cell paragraphs', async () => {
    const table = await convertTable(CPSTableWithMultipleParagraphs);
    expect(table).toEqual(convertedTableWithMultipleParagraphs);
  });

  it('should ignore non-paragraphs', async () => {
    const table = await convertTable(CPSTableWithNonParagraphs);
    expect(table).toEqual(convertedTableWithNonParagraphs);
  });
});
