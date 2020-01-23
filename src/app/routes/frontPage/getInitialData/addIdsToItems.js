import uuid from 'uuid';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';

const getGroups = path(['content', 'groups']);

const addIdToItem = ({ id, ...item }) => ({ ...item, id: id || uuid() });

const addIdsToGroupItems = ({ items, ...group }) => ({
  ...group,
  items: items && items.map(addIdToItem),
});

const mapGroups = groups => groups.map(addIdsToGroupItems);

const mergeContentWithAddedIdItems = itemsWithIds => jsonRaw => ({
  ...jsonRaw,
  content: {
    ...path(['content'], jsonRaw),
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
