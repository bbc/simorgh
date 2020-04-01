import splitEvery from 'ramda/src/splitEvery';

// Split the top row stories out into their own list
const splitFirstRow = (items, isFirstSection) => {
  const shouldHaveOneItemInFirstRow = isFirstSection || items.length % 4 === 1;
  const shouldHaveTwoItemsInFirstRow = items.length % 4 > 1;
  if (shouldHaveOneItemInFirstRow) {
    return [items.slice(0, 1), items.slice(1)];
  }
  if (shouldHaveTwoItemsInFirstRow) {
    return [items.slice(0, 2), items.slice(2)];
  }
  return [items.slice(0, 0), items.slice(0)]; // 0 items in first row
};

// Split into fours and make sure slices only go through if a four
const splitStandardRows = (items) =>
  splitEvery(4, items).filter((itemList) => itemList.length === 4);

// Anything beyond the first 2 fours goes into an imageless slice
const splitNoImageRow = (standardSlices) => [
  standardSlices.slice(0, 2),
  standardSlices.slice(2),
];

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
