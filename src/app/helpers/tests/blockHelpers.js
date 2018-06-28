export const textBlock = text => ({
  blocks: [
    {
      type: 'text',
      model: {
        blocks: [
          {
            type: 'paragraph',
            model: {
              text,
            },
          },
        ],
      },
    },
  ],
});

export const blockContainingText = (type, text) => ({
  type,
  model: textBlock(text),
});
