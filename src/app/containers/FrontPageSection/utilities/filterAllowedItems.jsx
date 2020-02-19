import pathOr from 'ramda/src/pathOr';
import dropWhile from 'ramda/src/dropWhile';

const MAX_ALLOWED_ITEMS_FIRST_SECTION = 13;
const MAX_ALLOWED_ITEMS = 10;

export const getAllowedItems = (items, isFirstSection) =>
  isFirstSection
    ? items.slice(0, MAX_ALLOWED_ITEMS_FIRST_SECTION)
    : items.slice(0, MAX_ALLOWED_ITEMS);

export const removeFirstSlotRadioBulletin = dropWhile(
  item => item.contentType === 'RadioBulletin',
);

export const isNotTVBulletin = item => item.contentType !== 'TVBulletin';

export const removeTVBulletinsIfNotAVLiveStream = ({ items, type }) =>
  type === 'av-live-streams' ? items : items.filter(isNotTVBulletin);

export const removeItemsWithoutUrlOrHeadline = items =>
  items.filter(item =>
    pathOr(null, ['assetTypeCode'], item) !== null
      ? pathOr(null, ['name'], item) && pathOr(null, ['uri'], item) && item
      : pathOr(null, ['headlines', 'headline'], item) &&
        pathOr(null, ['locators', 'assetUri'], item) &&
        item,
  );
