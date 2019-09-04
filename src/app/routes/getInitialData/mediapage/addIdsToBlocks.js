import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import map from 'ramda/src/map';
import merge from 'ramda/src/merge';
import uuid from 'uuid';

const addIdToBlock = block => merge({ id: uuid() }, block);

const getBlocks = path(['content', 'blocks']);

const getContent = path(['content']);

const mapBlocks = pipe(
  getBlocks,
  map(addIdToBlock),
);

export default jsonRaw =>
  merge(jsonRaw, {
    content: merge(getContent(jsonRaw), { blocks: mapBlocks(jsonRaw) }),
  });
