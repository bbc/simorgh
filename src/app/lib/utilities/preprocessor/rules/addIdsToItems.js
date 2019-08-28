import uuid from 'uuid';
import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';

const getGroups = jsonRaw => pathOr(null, ['content', 'groups'], jsonRaw);

const addIdToItem = ({ id, ...item }) => ({ ...item, id: id || uuid() });

const addIdsToGroupItems = ({ items, ...group }) => ({
  ...group,
  items: items && items.map(addIdToItem),
});

const mapGroups = groups => groups.map(addIdsToGroupItems);

const mergeContentWithAddedIdItems = itemsWithIds => jsonRaw => ({
  ...jsonRaw,
  content: {
    groups: itemsWithIds,
  },
});

export default jsonRaw => {
  const addIdsToItems = compose(
    mergeContentWithAddedIdItems,
    mapGroups,
    getGroups,
  )(jsonRaw);

  return addIdsToItems(jsonRaw);
};
