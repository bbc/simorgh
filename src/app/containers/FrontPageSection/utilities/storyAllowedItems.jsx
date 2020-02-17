import take from 'ramda/src/take';

const MAX_ALLOWED_ITEMS_FIRST_SECTION = 13;
const MAX_ALLOWED_ITEMS = 10;

const getAllowedItems = (items, isFirstSection) =>
  isFirstSection
    ? take(MAX_ALLOWED_ITEMS_FIRST_SECTION, items)
    : take(MAX_ALLOWED_ITEMS, items);

export default getAllowedItems;
