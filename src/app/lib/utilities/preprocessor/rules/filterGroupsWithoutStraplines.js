import pathOr from 'ramda/src/pathOr';

const filterGroupsWithoutStraplines = data => {
  const groups = pathOr(null, ['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  // filter out groups that do not have straplines
  const newGroups = groups.filter(group =>
    pathOr(null, ['strapline', 'name'], group),
  );

  const newData = data;
  newData.content.groups = newGroups;
  return newData;
};

export default filterGroupsWithoutStraplines;
