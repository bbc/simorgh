export default groups => {
  const numberOfGroups = groups.length;
  if (numberOfGroups < 2) {
    return groups;
  }
  const flattenedGroups = [];
  // eslint-disable-next-line no-plusplus
  for (let i = numberOfGroups - 1; i >= 0; i--) {
    const group = groups[i];
    if (group.strapline || i === 0) {
      flattenedGroups.push(group);
    } else {
      const previousGroup = groups[i - 1];
      const flattenItems = [...previousGroup.items, ...group.items];
      previousGroup.items = flattenItems.reduce((itemArray, currentItem) => {
        const itemFound = itemArray.find(item => item.id === currentItem.id);
        if (!itemFound) {
          return itemArray.concat([currentItem]);
        }
        return itemArray;
      }, []);
    }
  }
  return flattenedGroups.reverse();
};
