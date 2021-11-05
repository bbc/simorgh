import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

import addIdsToItems from '../addIdsToItems';

export default json => {
  const content = path(['content'], json);

  if (content) {
    const newContent = addIdsToItems({
      pathToItems: ['model', 'blocks'],
      recursive: true,
    })(content);

    return mergeDeepLeft(
      {
        content: {
          ...newContent,
        },
      },
      json,
    );
  }

  return json;
};
