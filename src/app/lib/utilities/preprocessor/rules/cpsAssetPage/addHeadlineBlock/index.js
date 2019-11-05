import { pathOr, deepClone } from 'ramda';

const getHeadlineBlocks = json => {
  const headlineText = pathOr(null, ['promo', 'headlines', 'headline'], json);

  if (!headlineText) {
    return json;
  }

  const headlineBlock = {
    model: {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        attributes: [],
                        text: headlineText,
                      },
                      type: 'fragment',
                    },
                  ],
                  text: headlineText,
                },
                type: 'paragraph',
              },
            ],
          },
          type: 'text',
        },
      ],
    },
    type: 'headline',
  };

  const offScreenHeadlineBlock = {
    model: {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        attributes: [],
                        text: headlineText,
                      },
                      type: 'fragment',
                    },
                  ],
                  text: headlineText,
                },
                type: 'paragraph',
              },
            ],
          },
          type: 'text',
        },
      ],
    },
    type: 'offScreenHeadline',
  };

  return { headlineBlock, offScreenHeadlineBlock };
};
const splitBlocksByAresMedia = blocks => {
  const aresMediaIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'aresMedia') + 1;

  const aresMediaBlock = blocks.slice(0, aresMediaIndexPlusOne);
  const mainBlocks = blocks.slice(aresMediaIndexPlusOne, blocks.length);

  return { aresMediaBlock, mainBlocks };
};

const insertHeadlineBlocks = originalJson => {
  const json = deepClone(originalJson);
  const { headlineBlock, offScreenHeadlineBlock } = getHeadlineBlocks(json);
  const { aresMediaBlock, mainBlocks } = splitBlocksByAresMedia(
    json.content.model.blocks,
  );

  if (aresMediaBlock) {
    json.content.model.blocks = [
      ...offScreenHeadlineBlock,
      ...aresMediaBlock,
      ...headlineBlock,
      ...mainBlocks,
    ];
  } else {
    json.content.model.blocks = [
      ...offScreenHeadlineBlock,
      ...headlineBlock,
      ...mainBlocks,
    ];
  }

  return json;
};

export default insertHeadlineBlocks;
