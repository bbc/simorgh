import dropWhile from 'ramda/src/dropWhile';
import {
  getAssetTypeCode,
  getHeadlineUrlAndLive,
} from '#lib/utilities/getStoryPromoInfo';

const MAX_ALLOWED_ITEMS_FIRST_SECTION = 13;
const MAX_ALLOWED_ITEMS = 10;

export const getAllowedItems = ({ items, isFirstSection, showAllPromos }) => {
  let allowedItems = [];

  if (isFirstSection) {
    allowedItems = items.slice(0, MAX_ALLOWED_ITEMS_FIRST_SECTION);
  } else if (showAllPromos) {
    allowedItems = items;
  } else {
    allowedItems = items.slice(0, MAX_ALLOWED_ITEMS);
  }
  return allowedItems;
};

export const removeFirstSlotRadioBulletin = dropWhile(
  item => item.contentType === 'RadioBulletin',
);

const isNotTVBulletin = item => item.contentType !== 'TVBulletin';

export const removeTVBulletinsIfNotAVLiveStream = ({ items, type }) =>
  type === 'av-live-streams' ? items : items.filter(isNotTVBulletin);

export const removeItemsWithoutUrlOrHeadline = items =>
  items.filter(item => {
    const { headline, url } = getHeadlineUrlAndLive(
      item,
      getAssetTypeCode(item),
    );
    return headline && url;
  });
