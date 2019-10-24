import pathOr from 'ramda/src/pathOr';

const addHeadingToSTY = jsonRaw => {
  const headlineText = pathOr(
    null,
    ['promo', 'headlines', 'headline'],
    jsonRaw,
  );

  if (!headlineText) {
    return jsonRaw;
  }

  const newBlock = {
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

  return {
    ...jsonRaw,
    content: {
      model: {
        blocks: [
          newBlock,
          ...pathOr([], ['content', 'model', 'blocks'], jsonRaw),
        ],
      },
    },
  };
};

export default addHeadingToSTY;
