const blocksSingleFragment = (text, attributes = [], position = 1) => [
  {
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text,
            blocks: [
              {
                id: 1,
                type: 'fragment',
                model: {
                  text,
                  attributes,
                },
              },
            ],
          },
        },
      ],
    },
    position: [position],
  },
];

export default blocksSingleFragment;
