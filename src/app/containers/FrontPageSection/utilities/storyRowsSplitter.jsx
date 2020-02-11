import { splitEvery, splitAt } from 'ramda';

// Split the top row stories out into their own list
const splitFirstRow = (items, isFirstSection) => {
  const shouldHaveOneItemInFirstRow = isFirstSection || items.length % 4 === 1;
  const shouldHaveTwoItemsInFirstRow = items.length % 4 > 1;
  if (shouldHaveOneItemInFirstRow) {
    return splitAt(1, items);
  }
  if (shouldHaveTwoItemsInFirstRow) {
    return splitAt(2, items);
  }
  return splitAt(0, items); // 0 items in first row
};

// Split into fours and make sure slices only go through if a four
const splitStandardRows = items =>
  splitEvery(4, items).filter(itemList => itemList.length === 4);

// Anything beyond the first 2 fours goes into an imageless slice
const splitNoImageRow = standardSlices => splitAt(2, standardSlices);

const getRows = (items, isFirstSection) => {
  const [firstRow, unsplitregularItems] = splitFirstRow(items, isFirstSection);
  const [regularRows, [noImageRow]] = splitNoImageRow(
    splitStandardRows(unsplitregularItems),
  );

  return {
    firstRow,
    regularRows,
    noImageRow: noImageRow || [],
  };
};

export default getRows;
