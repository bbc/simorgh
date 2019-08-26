import uuid from 'uuid';
import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';

// import pidgin from '../../../../../../data/pidgin/frontpage';

const getGroups = jsonRaw => pathOr(null, ['content', 'groups'], jsonRaw);

// let theGroups = getContentGroups(pidgin);

const addIds = groups => {
  groups.map(group => {
    const newGroup = group;

    if (Array.isArray(group.items)) {
      newGroup.items = group.items.forEach(item =>
        item.id ? item : { ...item, id: uuid() },
      );
    }

    return newGroup;
  });
};

const mergeContentWithAddedIdItems = itemsWithIds => jsonRaw => ({
  ...jsonRaw,
  content: {
    ...jsonRaw.content,
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
