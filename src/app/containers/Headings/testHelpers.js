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
