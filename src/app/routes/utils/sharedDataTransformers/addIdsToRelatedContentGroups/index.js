import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

import addIdsToItems from '../addIdsToItems';

export default json => {
  const groups = path(['relatedContent', 'groups'], json);

  if (groups) {
    const newGroups = groups.map(({ promos, ...group }) => ({
      ...group,
      promos: addIdsToItems({
        pathToItems: [],
        customKeyName: 'a11yId',
      })(promos),
    }));

    return mergeDeepLeft(
      {
        relatedContent: {
          groups: newGroups,
        },
      },
      json,
    );
  }

  return json;
};
