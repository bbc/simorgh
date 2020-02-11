import { flatten, isEmpty, isNil } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '../../FrontPageStoryRows';

// Returns the component that should be used for the first row.
// This is either of TopRow or LeadingRow.
const getFirstRowComponent = rowLength => {
  switch (rowLength) {
    case 1:
      return { RowComponent: TopRow };
    case 2:
      return { RowComponent: LeadingRow };
    default:
      return null;
  }
};

/* Flattens the structure created in the storySplitter function,
 * allowing the resulting array to be easily mapped over.
 * Returns an array of objects in the format:
 * [{
 *   stories: [An array of story items],
 *   displayImages: bool - whether images should be displayed in the promos,
 *   RowComponent: the React component that displays the row
 * }]
 */
const getRowDetails = rows => {
  const firstRow = {
    stories: rows.firstRow,
    ...getFirstRowComponent(rows.firstRow.length),
    displayImages: true,
  };

  const regularRows = rows.regularRows.map(row => ({
    stories: row,
    RowComponent: RegularRow,
    displayImages: true,
  }));

  const noImageRow = {
    stories: rows.noImageRow,
    RowComponent: RegularRow,
    displayImages: false,
  };

  return flatten([firstRow, regularRows, noImageRow]).filter(
    row => !isEmpty(row.stories) && !isNil(row.stories),
  );
};

export default getRowDetails;
