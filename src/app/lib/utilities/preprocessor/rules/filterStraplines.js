import pathOr from 'ramda/src/pathOr';

const filterStraplines = data => {
  const groups = pathOr(null, ['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  const newGroups = groups.filter(group => {
    const hasStrapline = pathOr(null, ['strapline', 'name'], group);

    // keep a group if it has a strapline
    if (hasStrapline) {
      return true;
    }
    // delete a group if it does not have a strapline
    return false;
  });

  const newData = data;
  newData.content.groups = newGroups;
  return newData;
};

export default filterStraplines;
