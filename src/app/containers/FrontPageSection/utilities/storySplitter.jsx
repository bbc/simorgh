import { splitEvery, splitAt, take } from 'ramda';

const getItemLimit = (items, isFirstSection) =>
  isFirstSection ? take(13, items) : take(10, items);

// Split the top row stories out into their own list
const splitTopRowSlice = (items, isFirstSection) => {
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
const splitStandardSlices = items =>
  splitEvery(4, items).filter(itemList => itemList.length === 4);

// Anything beyond the first 2 fours goes into an imageless slice
const splitNoImageSlices = standardSlices => splitAt(2, standardSlices);

const getItems = (items, isFirstSection) => {
  const presentStories = getItemLimit(items, isFirstSection);

  const [featuredSliceItems, unsplitregularItems] = splitTopRowSlice(
    presentStories,
    isFirstSection,
  );
  const [regularItems, [noImageItems]] = splitNoImageSlices(
    splitStandardSlices(unsplitregularItems),
  );

  return {
    featuredSliceItems,
    regularItems,
    noImageItems: noImageItems || [],
  };
};

export default getItems;
