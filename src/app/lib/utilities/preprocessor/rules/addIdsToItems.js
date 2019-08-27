import uuid from 'uuid';
import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';

const getGroups = jsonRaw => pathOr(null, ['content', 'groups'], jsonRaw);

const addIds = groups => {
  const newGroups = groups.map(group => {
    const newGroup = group;

    if (Array.isArray(group.items)) {
      newGroup.items = group.items.map(item =>
        item.id ? item : { ...item, id: uuid() },
      );
    }
    return newGroup;
  });

  return newGroups;
};

const mergeContentWithAddedIdItems = itemsWithIds => jsonRaw => ({
  ...jsonRaw,
  content: {
    groups: itemsWithIds,
  },
});

export default jsonRaw => {
  const addIdsToProItems = compose(
    mergeContentWithAddedIdItems,
    addIds,
    getGroups,
  )(jsonRaw);

  return addIdsToProItems(jsonRaw);
};
