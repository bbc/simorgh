import deepGet from '../../../../helpers/json/deepGet';

const whitelist = ['STY', 'MAP'];

const filterUnknownCpsTypes = data => {
  const groups = deepGet(['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  const newGroups = groups.map(g => {
    const ng = g;
    const newItems =
      g.items &&
      g.items.filter(i => i.cpsType && whitelist.includes(i.cpsType));
    ng.items = newItems;
    return ng;
  });

  const newData = data;
  newData.content.groups = newGroups;

  return newData;
};

export default filterUnknownCpsTypes;
