const MAX_ALLOWED_ITEMS_FIRST_SECTION = 13;
const MAX_ALLOWED_ITEMS = 10;

const getAllowedItems = (items, isFirstSection) =>
  isFirstSection
    ? items.slice(0, MAX_ALLOWED_ITEMS_FIRST_SECTION)
    : items.slice(0, MAX_ALLOWED_ITEMS);

export default getAllowedItems;
