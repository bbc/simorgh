import path from 'ramda/src/path.js';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft.js';

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
