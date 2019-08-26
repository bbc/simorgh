import uuid from 'uuid';
import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';

const getGroups = jsonRaw => pathOr(null, ['content', 'groups'], jsonRaw);

const addIds = jsonRaw => {
  const groups = pathOr(null, ['content', 'groups'], jsonRaw);

  const newGroups = groups.map(group => {
    const newGroup = group;
    // console.log('A newGroup >>>', newGroup);

    if (Array.isArray(group.items)) {
      // console.log('items >>>', group.items);
      // newGroup.items = group.items.forEach(item => {
      //   item.id ? item : { ...item, id: uuid() };
      // });
      newGroup.items = group.items.map(
        item => {
          if(item.id) {
            return item;
          } else {
            return { ...item, id: uuid() };
          }
        }
      );
    }
    console.log('changed ++++', newGroup);
    return newGroup;
  });

  const final = jsonRaw;
  final.content.groups = newGroups;
  return final;
};

// const mergeContentWithAddedIdItems = itemsWithIds => jsonRaw => ({
//   ...jsonRaw,
//   content: {
//     ...jsonRaw.content,
//     groups: itemsWithIds,
//   },
// });

// console.log('groups ---', getGroups(pidgin));
// console.log('added ids ---', addIds(theGroups));
// console.log('merged stuff ---', mergeContentWithAddedIdItems(addIds(theGroups), pidgin));

// export default jsonRaw => {
//   const addIdsToProItems = compose(
//     // mergeContentWithAddedIdItems,
//     addIds,
//     getGroups,
//   )(jsonRaw);

//   return addIdsToProItems(jsonRaw);
// };

export default addIds;
