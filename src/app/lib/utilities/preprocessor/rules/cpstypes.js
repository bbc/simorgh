import deepGet from '../../../../helpers/json/deepGet';

const whitelist = ['STY', 'MAP'];

const filterUnknownCpsTypes = data => {
  const groups = deepGet(['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  const newGroups = groups.map(group => {
    // avoid eslint complaints about 'no-param-reassign'
    const newGroup = group;
    const newItems =
      group.items &&
      group.items.filter(
        item => item.cpsType && whitelist.includes(item.cpsType),
      );
    newGroup.items = newItems;
    return newGroup;
  });

  const newData = data;
  newData.content.groups = newGroups;

  return newData;
};

export default filterUnknownCpsTypes;
