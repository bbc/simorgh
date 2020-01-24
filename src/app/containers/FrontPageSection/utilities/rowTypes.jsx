import { flatten, isEmpty, isNil } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '../../FrontPageStoryRows';

const getTopRowType = rowLength => {
  switch (rowLength) {
    case 1:
      return { rowType: TopRow, storyTypes: ['top'] };
    case 2:
      return { rowType: LeadingRow, storyTypes: ['leading', 'regular'] };
    default:
      return null;
  }
};

const getRowTypes = rows => {
  const topRow = {
    row: rows.topRow,
    displayImages: true,
    ...getTopRowType(rows.topRow.length),
  };
  const regularRows = rows.regularRows.map(row => ({
    row,
    rowType: RegularRow,
    storyTypes: ['regular', 'regular', 'regular', 'regular'],
    displayImages: true,
  }));
  const noImageRow = {
    row: rows.noImageRow,
    storyTypes: ['regular', 'regular', 'regular', 'regular'],
    rowType: RegularRow,
    displayImages: false,
  };
  return flatten([topRow, regularRows, noImageRow]).filter(
    row => !isEmpty(row.row) && !isNil(row.row),
  );
};

export default getRowTypes;
