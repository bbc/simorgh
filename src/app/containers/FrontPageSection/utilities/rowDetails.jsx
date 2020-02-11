import { flatten, isEmpty, isNil } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '../../FrontPageStoryRows';

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
  const getFirstRowComponent = rowLength => {
    switch (rowLength) {
      case 1:
        return TopRow;
      case 2:
        return LeadingRow;
      default:
        return null; // This is necessary for when firstRow is empty
    }
  };

  const firstRow = {
    stories: rows.firstRow,
    RowComponent: getFirstRowComponent(rows.firstRow.length),
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
