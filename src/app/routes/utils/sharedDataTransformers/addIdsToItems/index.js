import uuid from 'uuid';
import pipe from 'ramda/src/pipe';
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
  const addIdsToItems = pipe(
    getGroups,
    mapGroups,
    mergeContentWithAddedIdItems,
  )(jsonRaw);

  return addIdsToItems(jsonRaw);
};
