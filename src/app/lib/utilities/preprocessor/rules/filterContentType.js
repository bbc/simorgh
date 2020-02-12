import pathOr from 'ramda/src/pathOr';

const whitelist = ['STY', 'MAP', 'PGL', 'LIV', 'PRO'];
const contentTypes = [
  'Text',
  'Feature',
  'Audio',
  'Video',
  'Gallery',
  'Guide',
  'TVBulletin',
  'RadioBulletin',
  'Podcast',
];

const filterUnknownContentTypes = data => {
  const groups = pathOr(null, ['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  const newGroups = groups.map(group => {
    // avoid eslint complaints about 'no-param-reassign'
    const newGroup = group;

    if (Array.isArray(group.items)) {
      newGroup.items = group.items.filter(item => {
        const itemType = item.assetTypeCode || item.cpsType;
        const isValidItemType = whitelist.includes(itemType);
        const isValidContentType =
          itemType !== 'PRO' || contentTypes.includes(item.contentType);
        const isValidGroupType =
          group.type === 'useful-links'
            ? item.assetTypeCode === 'PRO' && item.contentType === 'Guide'
            : group.type !== 'useful-links' || itemType === 'PRO';

        return isValidItemType && isValidContentType && isValidGroupType;
      });
    }

    return newGroup;
  });

  const newData = data;
  newData.content.groups = newGroups;
  return newData;
};

export default filterUnknownContentTypes;
