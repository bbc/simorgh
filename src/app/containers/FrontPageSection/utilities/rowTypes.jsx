import { flatten, isEmpty, isNil } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '../../FrontPageStoryRows';

// Returns the component that should be used for the first row.
// This is one of TopRow, LeadingRow.
const getTopRowType = rowLength => {
  switch (rowLength) {
    case 1:
      return { rowType: TopRow };
    case 2:
      return { rowType: LeadingRow };
    default:
      return null;
  }
};

// Flattens the structure created in the storySplitter function,
// allowing the resulting array to be easily mapped over.
const getRowTypes = rows => {
  const topRow = {
    stories: rows.topRow,
    displayImages: true,
    ...getTopRowType(rows.topRow.length),
  };
  const regularRows = rows.regularRows.map(row => ({
    stories: row,
    rowType: RegularRow,
    displayImages: true,
  }));
  const noImageRow = {
    stories: rows.noImageRow,
    rowType: RegularRow,
    displayImages: false,
  };
  return flatten([topRow, regularRows, noImageRow]).filter(
    row => !isEmpty(row.stories) && !isNil(row.stories),
  );
};

export default getRowTypes;
