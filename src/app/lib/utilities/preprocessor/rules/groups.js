import deepGet from '../../../../helpers/json/deepGet';

/* eslint-disable import/prefer-default-export */
export const filterEmptyGroupItems = jsonRaw => {
  const json = jsonRaw;
  let groups = deepGet(['content', 'groups'], json);
  if (!groups) {
    return jsonRaw;
  }

  groups = groups.filter(
    group => Array.isArray(group.items) && group.items.length > 0,
  );

  // Override the original groups with the new ones
  json.content.groups = groups;
  return json;
};
