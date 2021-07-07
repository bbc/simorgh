import dropWhile from 'ramda/src/dropWhile';
import { getHeadline, getUrl } from '#lib/utilities/getStoryPromoInfo';

const MAX_ALLOWED_ITEMS_FIRST_SECTION = 13;
const MAX_ALLOWED_ITEMS = 10;

export const getAllowedItems = ({ items, isFirstSection, showAllPromos }) => {
  if (showAllPromos) {
    return items;
  }
  if (isFirstSection) {
    return items.slice(0, MAX_ALLOWED_ITEMS_FIRST_SECTION);
  }
  return items.slice(0, MAX_ALLOWED_ITEMS);
};

export const removeFirstSlotRadioBulletin = dropWhile(
  item => item.contentType === 'RadioBulletin',
);

const isNotTVBulletin = item => item.contentType !== 'TVBulletin';

export const removeTVBulletinsIfNotAVLiveStream = ({ items, type }) =>
  type === 'av-live-streams' ? items : items.filter(isNotTVBulletin);

export const removeItemsWithoutUrlOrHeadline = items =>
  items.filter(item => {
    const headline = getHeadline(item);
    const url = getUrl(item);

    return headline && url;
  });
