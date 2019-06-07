/* eslint no-param-reassign: 0 */
import nanoid from 'nanoid';
import deepClone from '../../../../helpers/json/deepClone';

// Given a "model" add an id to every block
const addIdsToModel = model => {
  if (!model || !model.blocks) {
    return model;
  }

  const newModel = deepClone(model);

  newModel.blocks.forEach(block => {
    block.id = nanoid();
    // Recurse if the block has a nested model
    if (block.model) {
      block.model = addIdsToModel(block.model);
    }
  });

  return newModel;
};

// Given an artcle data structure, this preprocessor adds a unique ID to every "block"
const addIds = article => {
  const articleWithIds = deepClone(article);
  articleWithIds.content.model = addIdsToModel(articleWithIds.content.model);
  return articleWithIds;
};

export default addIds;
