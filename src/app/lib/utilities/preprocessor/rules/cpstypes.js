import pathOr from 'ramda/src/pathOr';

const whitelist = ['STY', 'MAP', 'PGL', 'LIV', 'PRO'];

export const getRelevantGroup = (data, type) => {
  const groups = pathOr(null, ['content', 'groups'], data);

  if (!groups) {
    return data;
  }

  const newGroups = groups.map(group => {
    // avoid eslint complaints about 'no-param-reassign'
    const newGroup = group;

    if (Array.isArray(group.items)) {
      newGroup.items = group.items.filter(
        item => item[type] && whitelist.includes(item[type]),
      );
    }

    return newGroup;
  });

  const newData = data;
  newData.content.groups = newGroups;

  return newData;
};

export const filterUnknownCpsTypes = data => {
  return getRelevantGroup(data, 'cpsType');
};

export const filterUnknownAssetTypeCodes = data => {
  return getRelevantGroup(data, 'assetTypeCode');
};
