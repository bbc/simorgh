import { splitEvery, splitAt, take } from 'ramda';

export const getAllowedItems = (items, isFirstSection) =>
  isFirstSection ? take(13, items) : take(10, items);

// Split the top row stories out into their own list
const splitFirstRow = (items, isFirstSection) => {
  // First section always has a single top story
  if (isFirstSection || items.length % 4 === 1) {
    return splitAt(1, items);
  }
  if (items.length % 4 > 1) {
    return splitAt(2, items);
  }
  return splitAt(0, items);
};

// Split into fours and make sure slices only go through if a four
const splitStandardRows = items =>
  splitEvery(4, items).filter(itemList => itemList.length === 4);

// Anything beyond the first 2 fours goes into an imageless slice
const splitNoImageRow = standardSlices => splitAt(2, standardSlices);

export const getRows = (items, isFirstSection) => {
  const allowedItems = getAllowedItems(items, isFirstSection);

  const [firstRow, unsplitregularItems] = splitFirstRow(
    allowedItems,
    isFirstSection,
  );
  const [regularRows, [noImageRow]] = splitNoImageRow(
    splitStandardRows(unsplitregularItems),
  );

  return {
    firstRow,
    regularRows,
    noImageRow: noImageRow || [],
  };
};
