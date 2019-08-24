const blocksSingleFragment = (text, attributes = []) => [
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
  },
];

export default blocksSingleFragment;
