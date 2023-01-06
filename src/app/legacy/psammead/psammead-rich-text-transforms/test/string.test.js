import stringToRichText from '#psammead/psammead-rich-text-transforms/src/string';

test('returns a paragraph block when given a string', () => {
  const mockString = 'Hello world';

  expect(stringToRichText(mockString)).toStrictEqual({
    type: 'text',
    model: {
      blocks: [
        {
          type: 'paragraph',
          model: {
            text: 'Hello world',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Hello world',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  });
});
