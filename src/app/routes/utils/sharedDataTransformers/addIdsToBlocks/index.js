import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

import addIdsToItems from '../addIdsToItems';

export default json => {
  const content = path(['content'], json);
  const newBlocks = addIdsToItems({
    pathToItems: ['model', 'blocks'],
    recursive: true,
  })(content);

  return mergeDeepLeft(
    {
      content: {
        ...newBlocks,
      },
    },
    json,
  );
};
