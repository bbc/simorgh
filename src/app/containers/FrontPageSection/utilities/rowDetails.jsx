import { flatten, isEmpty, isNil } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '../../FrontPageStoryRows';

// Returns the component that should be used for the first row.
// This is one of TopRow, LeadingRow.
const getFirstRowComponent = rowLength => {
  switch (rowLength) {
    case 1:
      return { rowComponent: TopRow };
    case 2:
      return { rowComponent: LeadingRow };
    default:
      return null;
  }
};

// Flattens the structure created in the storySplitter function,
// allowing the resulting array to be easily mapped over.
const getRowDetails = rows => {
  const firstRow = {
    stories: rows.firstRow,
    displayImages: true,
    ...getFirstRowComponent(rows.firstRow.length),
  };
  const regularRows = rows.regularRows.map(row => ({
    stories: row,
    rowComponent: RegularRow,
    displayImages: true,
  }));
  const noImageRow = {
    stories: rows.noImageRow,
    rowComponent: RegularRow,
    displayImages: false,
  };
  return flatten([firstRow, regularRows, noImageRow]).filter(
    row => !isEmpty(row.stories) && !isNil(row.stories),
  );
};

export default getRowDetails;
