export default groups => {
  const numberOfGroups = groups.length;

  if (numberOfGroups < 2) {
    return groups;
  }

  const flattenedGroups = [];

  // eslint-disable-next-line no-plusplus
  for (let i = numberOfGroups - 1; i > 0; i--) {
    const group = groups[i];

    if (group.strapline) {
      flattenedGroups.push(group);
    } else {
      const previousGroup = groups[i - 1];
      previousGroup.items = [...previousGroup.items, ...group.items];
    }
  }

  flattenedGroups.push(groups[0]);

  return flattenedGroups.reverse();
};
