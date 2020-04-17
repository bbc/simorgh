import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import map from 'ramda/src/map';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import uuid from 'uuid';

const addIdToBlock = (block) => ({ ...block, uuid: uuid() });

const getBlocks = path(['blocks']);

const mapBlocks = pipe(getBlocks, map(addIdToBlock));

export default (jsonRaw) =>
  mergeDeepLeft(
    {
      blocks: mapBlocks(jsonRaw),
    },
    jsonRaw,
  );
