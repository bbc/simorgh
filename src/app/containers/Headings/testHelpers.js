const blocksSingleFragment = (text, attributes = []) => [
  {
    id: '7987213',
    type: 'text',
    model: {
      blocks: [
        {
          id: '6897239',
          type: 'paragraph',
          model: {
            text,
            blocks: [
              {
                id: '4209872',
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
