import pathOr from 'ramda/src/pathOr';

const whitelist = ['STY', 'MAP', 'PGL'];

const filterUnknownCpsTypes = data => {
  const groups = pathOr(null, ['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  const newGroups = groups.map(group => {
    // avoid eslint complaints about 'no-param-reassign'
    const newGroup = group;

    if (Array.isArray(group.items)) {
      newGroup.items = group.items.filter(
        item => item.cpsType && whitelist.includes(item.cpsType),
      );
    }

    return newGroup;
  });

  const newData = data;
  newData.content.groups = newGroups;

  return newData;
};

export default filterUnknownCpsTypes;
