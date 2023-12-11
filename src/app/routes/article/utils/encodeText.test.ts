import encodeText from './encodeText';

const sampleContent = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Hello world, how are you?',
          blocks: [
            {
              type: 'urlLink',
              model: {
                text: 'Hello there, how are you?',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'Hello now, how are you?',
                    },
                  },
                ],
              },
            },
            {
              type: 'fragment',
              model: {
                text: 'Hello again, how are you?',
              },
            },
            {
              type: 'urlLink',
              model: {
                text: 'Hello you, how are you?',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'Good bye!',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

describe('encodeText', () => {
  it('Encodes all nested text blocks', () => {
    const input = sampleContent;

    const actual = encodeText(input);

    expect(true).toBe(actual);
  });
});
