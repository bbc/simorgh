import path from 'ramda/src/path';

export default json => {
  const content = path(['content'], json);

  if (content) {
    const newBlocks = content.model.blocks.reduce((accumulator, block) => {
      const accumulatedBlocksByType = accumulator.filter(
        ({ type }) => type === block.type,
      );

      const numOfAccumulatedBlocksByType = accumulatedBlocksByType.length;

      const lastBlockByType =
        accumulatedBlocksByType[numOfAccumulatedBlocksByType - 1];

      if (lastBlockByType) {
        const { indexOfBlockType } = lastBlockByType;

        return [
          ...accumulator,
          {
            ...block,
            indexOfBlockType: indexOfBlockType + 1,
          },
        ];
      }

      return [
        ...accumulator,
        {
          ...block,
          indexOfBlockType: 1,
        },
      ];
    }, []);

    return {
      ...json,
      content: {
        ...json.content,
        model: {
          ...json.content.model,
          blocks: newBlocks,
        },
      },
    };
  }

  return json;
};
